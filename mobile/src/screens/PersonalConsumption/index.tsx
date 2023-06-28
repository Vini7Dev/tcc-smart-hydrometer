import React, { useCallback, useEffect, useState } from 'react'
import { LineChart } from 'react-native-gifted-charts'
import { format } from 'date-fns'

import {
    ChartContainer,
    ScreenScrollView,
    ScreenContainer,
    ScreenContent,
    ChartLabelContainer,
    ChartLabelItem,
    ChartLabelSquareColor,
    ChartLabelSquareText,
    ChrtTitle,
} from './styles'
import { errorColor, grayColor, infoColor, successColor } from '../../styles/variables'
import { NavigationHeader } from '../../components/NavigationHeader'
import { CompareByOptions } from '../../components/CompareByOptions'
import { Select } from '../../components/Select'
import { api } from '../../services/api'

interface ConsumptionProps {
    created_at_reference: Date
    date_group: string
    consumption: number
    monetary_value: number
}

interface ConsumptionChartProps {
    groupedConsumptionMarkings?: GroupedConsumptionMarkings
}

interface GroupedConsumptionMarkings {
    pastGroup: ConsumptionMarking[]
    presentGroup: ConsumptionMarking[]
}

interface ConsumptionMarking {
    created_at_reference: Date
    date_group: string
    consumption: number
    monetary_value: number
}

interface HydrometerProps {
    id: string
    name: string
}

const DATE_GROUP_FOTMATS = {
    perHour: { raw: 'yyyy-MM-dd HH:mm', toFormat: 'H', sufix: 'h' },
    perDate: { raw: 'yyyy-MM-dd', toFormat: 'MM/dd', sufix: '' },
    perWeekDay: { raw: 'yyyy-MM-iii', toFormat: 'MM/dd', sufix: '' },
    perMonth: { raw: 'yyyy-MM', toFormat: 'yy/MM', sufix: '' },
}

const ConsumptionChart: React.FC<ConsumptionChartProps> = ({
    groupedConsumptionMarkings = { pastGroup: [], presentGroup: [] },
}) => {
    const calculateMonetaryValueTotal = useCallback((
        consumptionsGroup: ConsumptionProps[],
        reverse = false,
    ) => {
        let lastConsumption = consumptionsGroup[0]

        if (!lastConsumption) {
            return 0
        }

        if (reverse) {
            lastConsumption = consumptionsGroup[consumptionsGroup.length-1]
        }

        return lastConsumption.monetary_value
    }, [])

    const calculateConsumptionsTotal = useCallback((
        consumptionsGroup: ConsumptionProps[],
    ) => {
        const { total: consumptionTotal } = consumptionsGroup.reduce((acc, cur) => {
            return { total: acc.total + cur.consumption }
        }, { total: 0 })

        return consumptionTotal
    }, [])

    const formatChartLabelOfConsumption = useCallback((dateGroup: string) => {
        const dateGroupLength = dateGroup.length

        if (dateGroupLength === DATE_GROUP_FOTMATS.perHour.raw.length) {
            return DATE_GROUP_FOTMATS.perHour
        } else if (dateGroupLength === DATE_GROUP_FOTMATS.perDate.raw.length) {
            return DATE_GROUP_FOTMATS.perDate
        } else if (dateGroupLength === DATE_GROUP_FOTMATS.perWeekDay.raw.length) {
            return DATE_GROUP_FOTMATS.perWeekDay
        } else {
            return DATE_GROUP_FOTMATS.perMonth
        }
    }, [])

    const buildChartConsumptionData = useCallback(({
        consumption,
        created_at_reference,
        date_group,
    }: ConsumptionProps) => {
        const {
            toFormat,
            sufix,
        } = formatChartLabelOfConsumption(date_group)

        return {
            value: consumption,
            label: `${format(new Date(created_at_reference), toFormat)}${sufix}`,
        }
    }, [])

    const { pastGroup, presentGroup } = groupedConsumptionMarkings

    if (!pastGroup.length || !presentGroup.length) {
        return <></>
    }

    const pastGroupFormatted = pastGroup
        .map(consumption => buildChartConsumptionData(consumption))

    const presentGroupFormatted = presentGroup
        .reverse()
        .map(consumption => buildChartConsumptionData(consumption))

    return (
        <ChartContainer>
            <ChrtTitle>Consumo X Tempo</ChrtTitle>

            <LineChart
                areaChart
                showVerticalLines
                data={presentGroupFormatted as any}
                data2={pastGroupFormatted as any}
                height={300}
                spacing={80}
                initialSpacing={0}
                color1={infoColor}
                color2={successColor}
                hideDataPoints
                dataPointsColor1={grayColor}
                dataPointsColor2={errorColor}
                startFillColor1={infoColor}
                startFillColor2={successColor}
                endFillColor1={infoColor}
                endFillColor2={successColor}
                startOpacity={1}
                endOpacity={0.5}
                yAxisTextStyle={{ color: grayColor }}
                xAxisLabelTextStyle={{ color: grayColor }}
            />

            <ChartLabelContainer>
                <ChartLabelItem>
                    <ChartLabelSquareColor backgroundColor={'success'} />

                    <ChartLabelSquareText>
                        Ontem ( R${
                            (calculateMonetaryValueTotal(pastGroup) / 100).toFixed(2).toString().replace('.', ',')
                        } | {
                            calculateConsumptionsTotal(pastGroup)
                        }/m3 )
                    </ChartLabelSquareText>
                </ChartLabelItem>

                <ChartLabelItem>
                    <ChartLabelSquareColor backgroundColor={'info'} />

                    <ChartLabelSquareText>
                        Hoje ( R${
                            (calculateMonetaryValueTotal(presentGroup, true) / 100).toFixed(2).toString().replace('.', ',')
                        } | {
                            calculateConsumptionsTotal(presentGroup)
                        }/m3 )
                    </ChartLabelSquareText>
                </ChartLabelItem>
            </ChartLabelContainer>
        </ChartContainer>
    );
};

export const PersonalConsumption: React.FC = () => {
    const [compareBy, setCompareBy] = useState('YESTERDAY')
    const [selectedHydrometerId, setSelectedHydrometerId] = useState<string>()
    const [userHydrometerList, setUserHydrometerList] = useState<HydrometerProps[]>([])
    const [groupedConsumptionMarkings, setGroupedConsumptionMarkings] = useState<GroupedConsumptionMarkings>()
    const [isLoadingConsumptions, setIsLoadingConsumptions] = useState(false)

    useEffect(() => {
        const handleGetUserHydrometerList = async () => {
            const {
                data: userHydrometerListResponse
            } = await api.get<HydrometerProps[]>('/user-hydrometers')

            setUserHydrometerList(userHydrometerListResponse)
        }

        handleGetUserHydrometerList()
    }, [])

    useEffect(() => {
        const handleGetConsumptionMarkings = async () => {
            if (!selectedHydrometerId) {
                return
            }

            setIsLoadingConsumptions(true)

            const {
                data: groupedConsumptionMarkingsResponse
            } = await api.get<GroupedConsumptionMarkings>(
                `/personal-consumption-markings?hydrometer_id=${selectedHydrometerId}&period_type=${compareBy}`
            )

            setGroupedConsumptionMarkings(groupedConsumptionMarkingsResponse)
            setIsLoadingConsumptions(false)
        }

        handleGetConsumptionMarkings()
    }, [compareBy, selectedHydrometerId])

    const handleSelectHydrometer = useCallback((value?: string) => {
        setSelectedHydrometerId(value)
    }, [])

    const handleUpdateCompareBy = useCallback((value: string) => {
        setCompareBy(value)
    }, [])

    return (
        <ScreenContainer>
            <NavigationHeader title="Consumo Pessoal" />

            <ScreenScrollView>
                <ScreenContent>
                    <Select
                        placeholder="Selecione um hidrômetro"
                        options={userHydrometerList.map(hydrometer => ({
                            value: hydrometer.id,
                            label: hydrometer.name,
                        }))}
                        onSelect={handleSelectHydrometer}
                    />

                    {
                        selectedHydrometerId && (
                            <>
                                <CompareByOptions
                                    onSelectCompareOption={handleUpdateCompareBy}
                                />

                                {
                                    !isLoadingConsumptions && (
                                        <ConsumptionChart
                                            groupedConsumptionMarkings={groupedConsumptionMarkings}
                                        />
                                    )
                                }
                            </>
                        )
                    }
                </ScreenContent>
            </ScreenScrollView>
        </ScreenContainer>
    )
}
