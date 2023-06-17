import styled from 'styled-components/native'

import { blackColor, grayColor, primaryColor, whiteColor } from '../../styles/variables'

interface HydrometerInfoContainerProps {
    isActive: boolean
}

export const ScreenContainer = styled.View``

export const ScreenContent = styled.View`
    flex: 1;
    padding: 75px 16px;
    align-items: center;
`

export const ButtonLabel = styled.Text`
    height: 25px;
    margin-bottom: 16px;
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
    text-align: center;
    color: ${blackColor};
`

export const ButtonMargin = styled.View``

export const HydrometerInfoContainer = styled.View<HydrometerInfoContainerProps>`
    flex: 1;
    width: 100%;
    margin-top: 120px;
    opacity: ${props => props.isActive ? 1 : 0};
`

export const HydrometerInfoTitle = styled.Text`
    width: 100%;
    height: 60px;
    padding: 18px 0;
    margin-bottom: 18px;
    font-family: 'Nunito';
    font-weight: 700;
    font-size: 24px;
    line-height: 25px;
    text-align: center;
    color: ${primaryColor};
    background-color: ${whiteColor};
    border: 1px solid ${grayColor};
`

export const HydrometerInfoInputsContainer = styled.View`
    flex: 1;
    padding: 0 16px;
`

export const HydrometerInfoButtonMargin = styled.View`
    align-items: center;
    width: 100%;
    margin-top: 150px;
`

