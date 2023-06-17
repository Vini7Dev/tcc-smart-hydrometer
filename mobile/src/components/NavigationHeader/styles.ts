import styled from 'styled-components/native'
import Icons from 'react-native-vector-icons/Feather'

import { primaryColor, whiteColor } from '../../styles/variables'

export const Container = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 73px;
    padding: 32px 25px 20px;
    background: ${primaryColor};
`

export const NavigationIcon = styled(Icons)``

export const ScreenTitle = styled.Text`
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    color: ${whiteColor};
`
