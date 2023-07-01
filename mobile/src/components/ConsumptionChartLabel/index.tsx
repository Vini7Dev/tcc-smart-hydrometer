import React from 'react'

import {
    ChartLabelContainer,
    ChartLabelItem,
    ChartLabelSquareColor,
    ChartLabelSquareText,
    ChartLabelTitle,
    ChartLabelTitleMargin
} from './styles'
import { calculateMonetaryValueTotal } from '../../utils/calculateMonetaryValueTotal'
import { calculateConsumptionsTotal } from '../../utils/calculateConsumptionsTotal'

type CompareBy = 'YESTERDAY' | 'PAST_MONTH' | 'PAST_YEAR' | 'CUSTOM'

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
    const { pastGroup, presentGroup } = groupedConsumptionMarkings

    if (!pastGroup?.length || !presentGroup?.length) {
        return <></>
    }

    return (
        <ChartLabelContainer>
            <ChartLabelTitle>Consumo do intervalo</ChartLabelTitle>

            <ChartLabelItem>
                <ChartLabelSquareColor backgroundColor={'success'} />

                <ChartLabelSquareText>
                    Ontem: {calculateConsumptionsTotal({
                        consumptionsGroup: pastGroup,
                        compareBy,
                    })}
                </ChartLabelSquareText>
            </ChartLabelItem>

            <ChartLabelItem>
                <ChartLabelSquareColor backgroundColor={'info'} />

                <ChartLabelSquareText>
                    Hoje: {'   '} {calculateConsumptionsTotal({
                        consumptionsGroup: presentGroup,
                        compareBy,
                    })}
                </ChartLabelSquareText>
            </ChartLabelItem>

            <ChartLabelTitleMargin>
                <ChartLabelTitle>Valor pago no mês</ChartLabelTitle>
            </ChartLabelTitleMargin>

            <ChartLabelItem>
                <ChartLabelSquareColor backgroundColor={'success'} />

                <ChartLabelSquareText>
                    Anterior: {calculateMonetaryValueTotal({
                        consumptionsGroup: pastGroup,
                        compareBy,
                    })}
                </ChartLabelSquareText>
            </ChartLabelItem>

            <ChartLabelItem>
                <ChartLabelSquareColor backgroundColor={'info'} />

                <ChartLabelSquareText>
                    Atual: {'     '} {calculateMonetaryValueTotal({
                        consumptionsGroup: presentGroup,
                        reverse: true,
                        compareBy,
                    })}
                </ChartLabelSquareText>
            </ChartLabelItem>
        </ChartLabelContainer>
    );
};
