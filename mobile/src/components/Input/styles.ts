import styled from 'styled-components/native'
import Icons from 'react-native-vector-icons/Feather'

import { blackColor, whiteColor } from '../../styles/variables'

interface ContainerProps {
    isMultiline: boolean
}

export const Container = styled.View<ContainerProps>`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: ${props => props.isMultiline ? 'auto' : '50px'};
    width: 100%;
    margin: 8px 0;
    padding: 0 16px;
    background-color: ${whiteColor};
`

export const TextInput = styled.TextInput`
    width: 250px;
    color: ${blackColor};
`

export const Icon = styled(Icons)``
