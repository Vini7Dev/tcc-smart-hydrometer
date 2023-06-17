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
    multiline = false,
    style = {} as object,
    ...rest
}) => {
    return (
        <Container isMultiline={multiline} style={{ backgroundColor }}>
            <TextInput
                {...rest}
                multiline={multiline}
                style={{ ...style, backgroundColor, textAlignVertical: 'top' }}
            />

            {
                iconName && <Icon name={iconName} size={24} color={blackColor} style={{ backgroundColor }} />
            }
        </Container>
    )
}
