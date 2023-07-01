import styled from 'styled-components/native'
import { blackColor, infoColor, successColor, whiteColor } from '../../styles/variables'

interface ChartLabelSquareColorProps {
    backgroundColor: 'success' | 'info'
}

export const ChartLabelContainer = styled.View`
    width: 100%;
    padding: 24px;
    background-color: ${whiteColor};
`

export const ChartLabelTitle = styled.Text`
    margin-bottom: 12px;
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    color: ${blackColor};
    text-align: center;
`

export const ChartLabelTitleMargin = styled.View`
    margin-top: 24px;
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

