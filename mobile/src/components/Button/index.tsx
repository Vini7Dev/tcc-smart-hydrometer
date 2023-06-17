import React from 'react'
import { TouchableHighlightProps } from 'react-native/types'

import { Container, ButtonText } from './styles'

interface ButtonProps extends TouchableHighlightProps {
    text: string
}

export const Button: React.FC<ButtonProps> = ({
    text,
    onPress,
}) => {
    return (
        <Container onPress={onPress}>
            <ButtonText>{text}</ButtonText>
        </Container>
    )
}
