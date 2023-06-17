import styled from 'styled-components/native'

import { lightGray, primaryColor, whiteColor } from '../../styles/variables'

export const Container = styled.TouchableHighlight`
    justify-content: center;
    align-items: center;
    width: 198px;
    height: 60px;
    border-radius: 3px;
    background: ${primaryColor};
`

export const ButtonText = styled.Text`
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    color: ${lightGray};
`
