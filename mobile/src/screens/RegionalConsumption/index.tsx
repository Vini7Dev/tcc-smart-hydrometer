import React from 'react'

import {
    ScreenScrollView,
    ScreenContainer,
    ScreenContent,
    CityMapImage,
    MapLabelContainer,
    MapLabelItem,
    MapLabelSquareColor,
    MapLabelSquareText,
    CityMapTitle,
    CityMapContainer,
} from './styles'
import { NavigationHeader } from '../../components/NavigationHeader'
import { CompareByOptions } from '../../components/CompareByOptions'
import { errorColor, infoColor, lightGray3, primaryColor, secondaryColor, successColor } from '../../styles/variables'

const CityMap = require('../../../assets/cityMaps/franca-city-map.png')

export const RegionalConsumption: React.FC = () => {
    return (
        <ScreenContainer>
            <NavigationHeader title="Consumo Reginonal" />

            <ScreenScrollView>
                <ScreenContent>
                    <CompareByOptions />

                    <CityMapContainer>
                        <CityMapTitle>Mapa da cidade de Franca</CityMapTitle>

                        <CityMapImage source={CityMap} resizeMode="center" />

                        <MapLabelContainer>
                            <MapLabelItem>
                                <MapLabelSquareColor
                                    backgroundColor={infoColor}
                                />

                                <MapLabelSquareText>Total</MapLabelSquareText>
                            </MapLabelItem>

                            <MapLabelItem>
                                <MapLabelSquareColor
                                    backgroundColor={primaryColor}
                                />

                                <MapLabelSquareText>Zona Central</MapLabelSquareText>
                            </MapLabelItem>

                            <MapLabelItem>
                                <MapLabelSquareColor
                                    backgroundColor={secondaryColor}
                                />

                                <MapLabelSquareText>Zona Norte</MapLabelSquareText>
                            </MapLabelItem>

                            <MapLabelItem>
                                <MapLabelSquareColor
                                    backgroundColor={errorColor}
                                />

                                <MapLabelSquareText>Zona Sul</MapLabelSquareText>
                            </MapLabelItem>

                            <MapLabelItem>
                                <MapLabelSquareColor
                                    backgroundColor={lightGray3}
                                />

                                <MapLabelSquareText>Zona Leste</MapLabelSquareText>
                            </MapLabelItem>

                            <MapLabelItem>
                                <MapLabelSquareColor
                                    backgroundColor={successColor}
                                />

                                <MapLabelSquareText>Zona Oeste</MapLabelSquareText>
                            </MapLabelItem>
                        </MapLabelContainer>
                    </CityMapContainer>
                </ScreenContent>
            </ScreenScrollView>
        </ScreenContainer>
    )
}
