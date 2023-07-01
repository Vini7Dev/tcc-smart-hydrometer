import styled from 'styled-components/native'

import { blackColor, infoColor, successColor, whiteColor } from '../../styles/variables'

interface MapLabelSquareColorProps {
    backgroundColor: string
}

export const ScreenContainer = styled.View``

export const ScreenScrollView = styled.ScrollView``

export const ScreenContent = styled.View`
    flex: 1;
    width: 100%;
    padding: 40px 16px;
    align-items: center;
`

export const CityMapContainer = styled.View`
    width: 100%;
    margin: 0 16px;
    padding: 16px 8px;
    background-color: ${whiteColor};
`


export const CityMapTitle = styled.Text`
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 22px;
    color: ${blackColor};
    text-align: center;
`

export const CityMapImage = styled.Image`
    width: 100%;
    height: 370px;
    margin-top: 16px;
`

export const MapLabelContainer = styled.View`
    width: 100%;
    margin: 24px 0 120px;
`

export const MapLabelItem = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 16px;
`

export const MapLabelSquareColor = styled.View<MapLabelSquareColorProps>`
    width: 30px;
    height: 30px;
    margin-right: 8px;
    border-radius: 4px;
    background-color: ${props => props.backgroundColor};
`

export const MapLabelSquareLabel = styled.Text`
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 18px;
    color: ${blackColor};
`

export const MapLabelSquareValue = styled.Text`
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 14px;
    color: ${blackColor};
    margin-left: auto;
`

export const MapLabelTitle = styled.Text`
    margin-bottom: 12px;
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    color: ${blackColor};
    text-align: center;
`
