import styled from 'styled-components/native'

import { blackColor, grayColor, infoColor, successColor, whiteColor } from '../../styles/variables'

interface ChartLabelSquareColorProps {
    backgroundColor: 'success' | 'info'
}

export const ScreenContainer = styled.View``

export const ScreenScrollView = styled.ScrollView``

export const ScreenContent = styled.View`
    flex: 1;
    width: 100%;
    height: 100%;
    padding: 40px 16px 100px;
    align-items: center;
`

export const ChartContainer = styled.View`
    width: 100%;
    margin: 32px 16px 0;
    padding: 16px 8px;
    background-color: ${whiteColor};
`

export const ChrtTitle = styled.Text`
    margin-bottom: 16px;
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 22px;
    color: ${blackColor};
    text-align: center;
`

export const ChrtSubtitle = styled.Text`
    margin-bottom: 14px;
    font-family: 'Roboto';
    font-weight: 400;
    color: ${grayColor};
    text-align: center;
`

export const ChartLabelContainer = styled.View`
    margin: 24px 0 120px;
`

export const ChartLabelItem = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 16px;
`

export const ChartLabelSquareColor = styled.View<ChartLabelSquareColorProps>`
    width: 30px;
    height: 30px;
    margin-right: 8px;
    border-radius: 4px;
    background-color: ${
        props => props.backgroundColor === 'success'
            ? successColor
            : infoColor
    };
`

export const ChartLabelSquareText = styled.Text`
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 18px;
    color: ${blackColor};
`
