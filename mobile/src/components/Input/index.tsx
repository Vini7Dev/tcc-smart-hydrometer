import React from 'react'
import { TextInputProps } from 'react-native/types'

import { Container, TextInput, Icon } from './styles'
import { blackColor, whiteColor } from '../../styles/variables'

interface InputProps extends TextInputProps {
    iconName?: string
    backgroundColor?: string
}

export const Input: React.FC<InputProps> = ({
    iconName,
    backgroundColor = whiteColor,
    style = {} as object,
    ...rest
}) => {
    return (
        <Container style={{ backgroundColor }}>
            <TextInput {...rest} style={{ ...style, backgroundColor }} />

            {
                iconName && <Icon name={iconName} size={24} color={blackColor} style={{ backgroundColor }} />
            }
        </Container>
    )
}
