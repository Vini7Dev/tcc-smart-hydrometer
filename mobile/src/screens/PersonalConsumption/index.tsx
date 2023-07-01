import React, { useCallback, useEffect, useState } from 'react'

import {
    ScreenScrollView,
    ScreenContainer,
    ScreenContent,
} from './styles'
import { NavigationHeader } from '../../components/NavigationHeader'
import { CompareByOptions } from '../../components/CompareByOptions'
import { ConsumptionChart } from '../../components/ConsumptionChart'
import { Select } from '../../components/Select'
import { api } from '../../services/api'
import { ConsumptionChartLabel } from '../../components/ConsumptionChartLabel'

type CompareBy = 'YESTERDAY' | 'PAST_MONTH' | 'PAST_YEAR' | 'CUSTOM'

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

export const PersonalConsumption: React.FC = () => {
    const [compareBy, setCompareBy] = useState<CompareBy>('YESTERDAY')
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

    const handleUpdateCompareBy = useCallback((value: CompareBy) => {
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
                                        <>
                                            <ConsumptionChart
                                                groupedConsumptionMarkings={groupedConsumptionMarkings}
                                                compareBy={compareBy}
                                            />

                                            <ConsumptionChartLabel
                                                groupedConsumptionMarkings={groupedConsumptionMarkings}
                                                compareBy={compareBy}
                                            />
                                        </>
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
