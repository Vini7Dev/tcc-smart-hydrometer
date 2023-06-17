import styled from 'styled-components/native'
import Icons from 'react-native-vector-icons/Feather'

import { lightGray, primaryColor, secondaryColor, transparent } from '../../styles/variables'

interface ContainerProps {
    buttonStyle: 'primary' | 'secondary'
}

interface ButtonTextProps {
    buttonStyle: 'primary' | 'secondary'
}

interface ContainerWrapperProps {
    align: 'center' | 'flex-start' | 'flex-end'
}

export const Container = styled.TouchableHighlight<ContainerProps>`
    justify-content: center;
    align-items: center;
    width: 198px;
    height: 60px;
    border-radius: 3px;
    background: ${props => props.buttonStyle === 'primary' ? primaryColor : transparent};
    border: 2px solid ${props => props.buttonStyle === 'primary' ? transparent : secondaryColor};
`

export const ContainerWrapper = styled.View<ContainerWrapperProps>`
    flex-direction: row;
    justify-content: ${(props) => props.align};
    align-items: center;
    width: 100%;
    padding: 0 20px;
`

export const ButtonIcon = styled(Icons)`
    width: 24px;
    height: 24px;
    margin-right: 8px;
`

export const ButtonText = styled.Text<ButtonTextProps>`
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    color: ${props => props.buttonStyle === 'primary' ? lightGray : secondaryColor};
`
