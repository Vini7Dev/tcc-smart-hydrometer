import styled from 'styled-components/native'
import Icons from 'react-native-vector-icons/Feather'

import { lightGray, primaryColor, whiteColor } from '../../styles/variables'

interface ContainerWrapperProps {
    haveIcon: boolean
}

export const Container = styled.TouchableHighlight`
    justify-content: center;
    align-items: center;
    width: 198px;
    height: 60px;
    border-radius: 3px;
    background: ${primaryColor};
`

export const ContainerWrapper = styled.View<ContainerWrapperProps>`
    flex-direction: row;
    justify-content: ${(props) => props.haveIcon ? 'flex-start' : 'center'};
    align-items: center;
    width: 100%;
    padding: 0 20px;
`

export const ButtonIcon = styled(Icons)`
    width: 24px;
    height: 24px;
    margin-right: 8px;
`

export const ButtonText = styled.Text`
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    color: ${lightGray};
`
