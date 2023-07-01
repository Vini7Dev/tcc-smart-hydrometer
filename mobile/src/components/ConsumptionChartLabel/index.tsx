import React, { useCallback } from 'react'
import { ChartLabelContainer, ChartLabelItem, ChartLabelSquareColor, ChartLabelSquareText, ChartLabelTitle, ChartLabelTitleMargin } from './styles'

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

export const ConsumptionChartLabel: React.FC<ConsumptionChartProps> = ({
    groupedConsumptionMarkings = { pastGroup: [], presentGroup: [] },
    compareBy,
}) => {
    const calculateMonetaryValueTotal = useCallback((
        consumptionsGroup: ConsumptionProps[],
        reverse = false,
    ) => {
        if (compareBy === 'PAST_YEAR') {
            const { total: totalOfMoneraty } = consumptionsGroup.reduce((acc, cur) => {
                return { total: acc.total + cur.monetary_value }
            }, { total: 0 })

            return (totalOfMoneraty / 100).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
        }

        let lastConsumption = consumptionsGroup[0]

        if (!lastConsumption) {
            return 0
        }

        if (reverse) {
            lastConsumption = consumptionsGroup[consumptionsGroup.length-1]
        }

        return (lastConsumption.monetary_value / 100).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    }, [compareBy])

    const calculateConsumptionsTotal = useCallback((
        consumptionsGroup: ConsumptionProps[],
    ) => {
        const { total: consumptionTotal } = consumptionsGroup.reduce((acc, cur) => {
            return { total: acc.total + cur.consumption }
        }, { total: 0 })

        const result = compareBy === 'PAST_YEAR' ? consumptionTotal / 10 : consumptionTotal / 100

        return `${result.toFixed(2).replace('.', ',')}/m³`
    }, [compareBy])

    const { pastGroup, presentGroup } = groupedConsumptionMarkings

    if (!pastGroup.length || !presentGroup.length) {
        return <></>
    }

    return (
        <ChartLabelContainer>
            <ChartLabelTitle>Consumo do intervalo</ChartLabelTitle>

            <ChartLabelItem>
                <ChartLabelSquareColor backgroundColor={'success'} />

                <ChartLabelSquareText>
                    Ontem: {calculateConsumptionsTotal(pastGroup)}
                </ChartLabelSquareText>
            </ChartLabelItem>

            <ChartLabelItem>
                <ChartLabelSquareColor backgroundColor={'info'} />

                <ChartLabelSquareText>
                    Hoje: {'   '} {calculateConsumptionsTotal(presentGroup)}
                </ChartLabelSquareText>
            </ChartLabelItem>

            <ChartLabelTitleMargin>
                <ChartLabelTitle>Valor pago no mês</ChartLabelTitle>
            </ChartLabelTitleMargin>

            <ChartLabelItem>
                <ChartLabelSquareColor backgroundColor={'success'} />

                <ChartLabelSquareText>
                    Anterior: {calculateMonetaryValueTotal(pastGroup)}
                </ChartLabelSquareText>
            </ChartLabelItem>

            <ChartLabelItem>
                <ChartLabelSquareColor backgroundColor={'info'} />

                <ChartLabelSquareText>
                    Atual: {'     '} {calculateMonetaryValueTotal(presentGroup, true)}
                </ChartLabelSquareText>
            </ChartLabelItem>
        </ChartLabelContainer>
    );
};
