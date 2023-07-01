type CompareBy = 'YESTERDAY' | 'PAST_MONTH' | 'PAST_YEAR' | 'CUSTOM'

interface ConsumptionProps {
    created_at_reference: Date
    date_group: string
    consumption: number
    monetary_value: number
}

interface CalculateMonetaryValueTotalProps {
    consumptionsGroup: ConsumptionProps[]
    compareBy: CompareBy
}

export const calculateConsumptionsTotal = ({
    consumptionsGroup,
    compareBy,
}: CalculateMonetaryValueTotalProps) => {
    const { total: consumptionTotal } = consumptionsGroup.reduce((acc, cur) => {
        return { total: acc.total + cur.consumption }
    }, { total: 0 })

    const result = compareBy === 'PAST_YEAR' ? consumptionTotal / 10 : consumptionTotal / 100

    return `${result.toFixed(2).replace('.', ',')}/m³`
}
