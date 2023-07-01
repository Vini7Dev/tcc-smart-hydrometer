import styled from 'styled-components/native'
import { blackColor, grayColor, whiteColor } from '../../styles/variables'

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
