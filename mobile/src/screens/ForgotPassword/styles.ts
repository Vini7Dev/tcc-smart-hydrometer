import styled from 'styled-components/native'
import { grayColor } from '../../styles/variables'

export const ScreenContainer = styled.View`
    flex: 1;
    padding: 75px 16px;
    align-items: center;
`

export const Title = styled.Text`
    margin-bottom: 40px;
    font-family: 'Nunito';
    font-weight: 700;
    font-size: 24px;
    line-height: 33px;
    color: ${grayColor};
    opacity: 0.8;
`

export const ButtonMargin = styled.View`
    margin-top: 130px;
`
