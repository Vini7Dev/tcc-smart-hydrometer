import React, { useCallback, useState } from 'react'
import { format } from 'date-fns'
import { LineChart } from 'react-native-gifted-charts'

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
import { blackColor, errorColor, grayColor, infoColor, successColor } from '../../styles/variables'
import { NavigationHeader } from '../../components/NavigationHeader'
import { CompareByOptions } from '../../components/CompareByOptions'
import { MOCK_CONSUMPTIONS } from './MOCK_CONSUMPTIONS'
import { Select } from '../../components/Select'

interface ConsumptionProps {
    id: string
    consumption: number
    monetary_value: number
    created_at: string
}

const ChartComponent: React.FC = () => {
    const {
        pastGroup,
        presentGroup,
    } = MOCK_CONSUMPTIONS

    const buildChartConsumptionData = useCallback(({
        consumption,
        created_at,
    }: ConsumptionProps) => {
        return {
            value: consumption,
            label: `${format(new Date(created_at), 'HH')}h`
        }
    }, [])

    const calculateMonetaryValueTotal = useCallback((
        consumptionsGroup: ConsumptionProps[],
        reverse = false,
    ) => {
        let lastConsumption = consumptionsGroup[0]

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

    return (
        <ChartContainer>
            <ChrtTitle>Consumo X Tempo</ChrtTitle>

            <LineChart
                areaChart
                showVerticalLines
                data={pastGroup.reverse().map(consumption => buildChartConsumptionData(consumption)) as any}
                data2={presentGroup.map(consumption => buildChartConsumptionData(consumption)) as any}
                height={300}
                spacing={44}
                initialSpacing={0}
                color1={infoColor}
                color2={successColor}
                textColor1={blackColor}
                hideDataPoints
                dataPointsColor1={grayColor}
                dataPointsColor2={errorColor}
                startFillColor1={infoColor}
                startFillColor2={successColor}
                endFillColor1={infoColor}
                endFillColor2={successColor}
                startOpacity={1}
                endOpacity={0.5}
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
    const [selectedHydrometerId, setSelectedHydrometerId] = useState<string>()

    const handleSelectHydrometer = useCallback((value?: string) => {
        setSelectedHydrometerId(value)
    }, [])

    return (
        <ScreenContainer>
            <NavigationHeader title="Consumo Pessoal" />

            <ScreenScrollView>
                <ScreenContent>
                    <Select
                        placeholder="Selecione um hidrômetro"
                        options={[
                            { label: 'Casa 1', value: '1' },
                            { label: 'Casa 2', value: '2' },
                        ]}
                        onSelect={handleSelectHydrometer}
                    />

                    {
                        selectedHydrometerId && (
                            <>
                                <CompareByOptions />

                                <ChartComponent />
                            </>
                        )
                    }
                </ScreenContent>
            </ScreenScrollView>
        </ScreenContainer>
    )
}
