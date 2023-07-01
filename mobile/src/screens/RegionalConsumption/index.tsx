import React, { useCallback, useEffect, useState } from 'react'
import { format } from 'date-fns'

import {
    ScreenScrollView,
    ScreenContainer,
    ScreenContent,
    CityMapImage,
    MapLabelContainer,
    MapLabelItem,
    MapLabelSquareColor,
    MapLabelSquareLabel,
    CityMapTitle,
    CityMapContainer,
    MapLabelSquareValue,
    MapLabelTitle,
} from './styles'
import { NavigationHeader } from '../../components/NavigationHeader'
import { CompareByOptions } from '../../components/CompareByOptions'
import { errorColor, lightGray3, primaryColor, secondaryColor, successColor } from '../../styles/variables'
import { api } from '../../services/api'
import { ConsumptionChart } from '../../components/ConsumptionChart'
import { ConsumptionChartLabel } from '../../components/ConsumptionChartLabel'

type CompareBy = 'YESTERDAY' | 'PAST_MONTH' | 'PAST_YEAR' | 'CUSTOM'

type Region = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST' | 'CENTER'

interface GroupedConsumptionMarkings {
    pastGroup: ConsumptionMarking[]
    presentGroup: ConsumptionMarking[]
    presentTotals: Totals
    pastTotals: Totals
}

interface ConsumptionMarking {
    created_at_reference: Date
    date_group: string
    consumption: number
    monetary_value: number
}

interface Totals {
    NORTH: Total
    SOUTH: Total
    EAST: Total
    WEST: Total
    CENTER: Total
}

interface Total {
    consumption: number
    monetary_value: number
}

const CityMap = require('../../../assets/cityMaps/franca-city-map.png')

export const RegionalConsumption: React.FC = () => {
    const [compareBy, setCompareBy] = useState<CompareBy>('YESTERDAY')
    const [groupedConsumptionMarkings, setGroupedConsumptionMarkings] = useState<GroupedConsumptionMarkings>({} as GroupedConsumptionMarkings)
    const [isLoadingConsumptions, setIsLoadingConsumptions] = useState(false)

    const getConsumptionValueTotalByRegion = useCallback((region: Region) => {
        const presentRegionTotals = groupedConsumptionMarkings.presentTotals?.[region]
        const pastRegionTotals = groupedConsumptionMarkings.pastTotals?.[region]

        const presentConsumptionValueFormat = (
            compareBy === 'PAST_YEAR'
                ? presentRegionTotals?.consumption / 10
                : presentRegionTotals?.consumption / 100
        ).toFixed(2).replace('.', ',')

        const pastConsumptionValueFormat = (
            compareBy === 'PAST_YEAR'
                ? pastRegionTotals?.consumption / 10
                : pastRegionTotals?.consumption / 100
        ).toFixed(2).replace('.', ',')

        return `Antes: ${pastConsumptionValueFormat}/m³ → Atual: ${presentConsumptionValueFormat}/m³`
    }, [compareBy, groupedConsumptionMarkings])

    const handleGetConsumptionMarkings = async (query?: string) => {
        setIsLoadingConsumptions(true)

        const {
            data: groupedConsumptionMarkingsResponse
        } = await api.get<GroupedConsumptionMarkings>(
            `/regional-consumption-markings?period_type=${compareBy}&${query}`
        )

        setGroupedConsumptionMarkings(groupedConsumptionMarkingsResponse)
        setIsLoadingConsumptions(false)
    }

    useEffect(() => {
        handleGetConsumptionMarkings()
    }, [compareBy])

    const handleLoadConsumptionsByCustomInterval = useCallback(async (
        start: Date,
        end: Date,
    ) => {
        const formatStartDate = `${format(start, 'yyyy-MM-dd')}T00:00:00.000Z`
        const formatEndDate = `${format(end, 'yyyy-MM-dd')}T23:59:59.999Z`

        handleGetConsumptionMarkings(`start_date=${formatStartDate}&end_date=${formatEndDate}`)
    }, [compareBy, handleGetConsumptionMarkings])

    const handleUpdateCompareBy = useCallback((value: CompareBy) => {
        setCompareBy(value)
    }, [])

    return (
        <ScreenContainer>
            <NavigationHeader title="Consumo Reginonal" />

            <ScreenScrollView>
                <ScreenContent>
                    <CompareByOptions
                        onSelectCompareOption={handleUpdateCompareBy}
                        onSelectValidCustomInterval={handleLoadConsumptionsByCustomInterval}
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

                                <CityMapContainer>
                                    <CityMapTitle>Mapa da cidade de Franca</CityMapTitle>

                                    <CityMapImage source={CityMap} resizeMode="center" />

                                    <MapLabelContainer>
                                        <MapLabelTitle>Consumo do intervalo</MapLabelTitle>

                                        <MapLabelItem>
                                            <MapLabelSquareColor
                                                backgroundColor={primaryColor}
                                            />

                                            <MapLabelSquareLabel>Centro</MapLabelSquareLabel>

                                            <MapLabelSquareValue>
                                                {getConsumptionValueTotalByRegion('CENTER')}
                                            </MapLabelSquareValue>
                                        </MapLabelItem>

                                        <MapLabelItem>
                                            <MapLabelSquareColor
                                                backgroundColor={secondaryColor}
                                            />

                                            <MapLabelSquareLabel>Norte</MapLabelSquareLabel>

                                            <MapLabelSquareValue>
                                                {getConsumptionValueTotalByRegion('NORTH')}
                                            </MapLabelSquareValue>
                                        </MapLabelItem>

                                        <MapLabelItem>
                                            <MapLabelSquareColor
                                                backgroundColor={errorColor}
                                            />

                                            <MapLabelSquareLabel>Sul</MapLabelSquareLabel>

                                            <MapLabelSquareValue>
                                                {getConsumptionValueTotalByRegion('SOUTH')}
                                            </MapLabelSquareValue>
                                        </MapLabelItem>

                                        <MapLabelItem>
                                            <MapLabelSquareColor
                                                backgroundColor={lightGray3}
                                            />

                                            <MapLabelSquareLabel>Leste</MapLabelSquareLabel>

                                            <MapLabelSquareValue>
                                                {getConsumptionValueTotalByRegion('EAST')}
                                            </MapLabelSquareValue>
                                        </MapLabelItem>

                                        <MapLabelItem>
                                            <MapLabelSquareColor
                                                backgroundColor={successColor}
                                            />

                                            <MapLabelSquareLabel>Oeste</MapLabelSquareLabel>

                                            <MapLabelSquareValue>
                                                {getConsumptionValueTotalByRegion('WEST')}
                                            </MapLabelSquareValue>
                                        </MapLabelItem>
                                    </MapLabelContainer>
                                </CityMapContainer>
                            </>
                        )
                    }
                </ScreenContent>
            </ScreenScrollView>
        </ScreenContainer>
    )
}
