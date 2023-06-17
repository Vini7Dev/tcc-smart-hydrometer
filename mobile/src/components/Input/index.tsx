import React from 'react'
import { TextInputProps } from 'react-native/types'

import { Container, TextInput, Icon } from './styles'
import { blackColor } from '../../styles/variables'

interface InputProps extends TextInputProps {
    iconName?: string
}

export const Input: React.FC<InputProps> = ({
    iconName,
    placeholder,
    keyboardType,
    onChangeText,
}) => {
    return (
        <Container>
            <TextInput
                placeholder={placeholder}
                keyboardType={keyboardType}
                onChangeText={onChangeText}
            />

            {
                iconName && <Icon name={iconName} size={24} color={blackColor} />
            }
        </Container>
    )
}
