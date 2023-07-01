import { format } from 'date-fns'
import React, { useCallback } from 'react'
import { ChartContainer, ChrtSubtitle, ChrtTitle } from './styles'
import { LineChart } from 'react-native-gifted-charts'

import { errorColor, grayColor, infoColor, successColor } from '../../styles/variables'

type CompareBy = 'YESTERDAY' | 'PAST_MONTH' | 'PAST_YEAR' | 'CUSTOM'

interface ConsumptionProps {
    created_at_reference: Date
    date_group: string
    consumption: number
    monetary_value: number
}

interface ConsumptionChartProps {
    groupedConsumptionMarkings?: GroupedConsumptionMarkings
    compareBy: CompareBy
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

const DATE_GROUP_FOTMATS = {
    perHour: { raw: 'yyyy-MM-dd HH:mm', toFormat: 'H', sufix: 'h' },
    perDate: { raw: 'yyyy-MM-dd', toFormat: 'dd', sufix: '' },
    perMonth: { raw: 'yyyy-MM', toFormat: 'MM', sufix: '' },
}

export const ConsumptionChart: React.FC<ConsumptionChartProps> = ({
    groupedConsumptionMarkings = { pastGroup: [], presentGroup: [] },
    compareBy,
}) => {
    const getCompareByLabel = useCallback(() => {
        switch (compareBy) {
            case 'YESTERDAY':
                return 'hora'
            case 'PAST_MONTH':
                return 'dia'
            case 'PAST_YEAR':
                return 'mês'
            case 'CUSTOM':
                return 'tempo'
            default:
                return 'data'
        }
    }, [compareBy])

    const formatChartLabelOfConsumption = useCallback((dateGroup: string) => {
        const dateGroupLength = dateGroup.length

        if (dateGroupLength === DATE_GROUP_FOTMATS.perHour.raw.length) {
            return DATE_GROUP_FOTMATS.perHour
        } else if (dateGroupLength === DATE_GROUP_FOTMATS.perDate.raw.length) {
            return DATE_GROUP_FOTMATS.perDate
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

    if (!pastGroup?.length || !presentGroup?.length) {
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
            <ChrtSubtitle>m³ X {getCompareByLabel()}</ChrtSubtitle>

            <LineChart
                areaChart
                showVerticalLines
                data={presentGroupFormatted as any}
                data2={pastGroupFormatted as any}
                height={300}
                spacing={50}
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
                startOpacity={0.75}
                endOpacity={0.4}
                yAxisTextStyle={{ color: grayColor }}
                xAxisLabelTextStyle={{ color: grayColor }}
            />
        </ChartContainer>
    );
};
