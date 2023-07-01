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
    reverse?: boolean
}

export const calculateMonetaryValueTotal = ({
    consumptionsGroup,
    compareBy,
    reverse = false,
}: CalculateMonetaryValueTotalProps) => {
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
}
