import styled from 'styled-components/native'

import { secondaryColor, whiteColor } from '../../styles/variables'

export const Container = styled.View`
    position: relative;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 120px;
    margin-bottom: 40px;
    border-radius: 120px;
    background-color: ${whiteColor};
`

export const AvatarImage = styled.Image``

export const UpdateAvatarButton = styled.TouchableHighlight`
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 8px;
    border-radius: 50px;
    background-color: ${secondaryColor};
`
