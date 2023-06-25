import styled, { css } from 'styled-components/native'

import { blackColor, primaryColor } from '../../styles/variables'

interface CheckBoxMarkProps {
    active: boolean
}

export const Container = styled.TouchableHighlight`
    flex-direction: row;
    align-items: center;
    gap: 16px;
    width: 100%;
    margin-top: 8px;
`

export const CheckBoxMark = styled.View<CheckBoxMarkProps>`
    width: 24px;
    height: 24px;
    border-radius: 3px;
    border: 2px solid ${primaryColor};

    ${props => props.active && css`background-color: ${primaryColor};`}
`

export const CheckboxLabel = styled.Text`
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 18px;
    color: ${blackColor};
`
