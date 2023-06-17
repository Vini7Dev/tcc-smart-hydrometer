import styled from 'styled-components/native'
import Icons from 'react-native-vector-icons/Feather'

import { whiteColor } from '../../styles/variables'

export const Container = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    width: 100%;
    margin: 8px 0;
    padding: 0 16px;
    background-color: ${whiteColor};
`

export const TextInput = styled.TextInput`
    width: 250px;
`

export const Icon = styled(Icons)``
