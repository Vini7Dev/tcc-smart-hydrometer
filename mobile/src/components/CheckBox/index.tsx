import React from 'react'
import { TouchableHighlightProps } from 'react-native/types'

import { Container, CheckBoxMark, CheckboxLabel } from './styles'

interface CheckBoxProps extends TouchableHighlightProps {
    placeholder: string
    value: boolean
}

export const CheckBox: React.FC<CheckBoxProps> = ({
    placeholder,
    value,
    ...rest
}) => {
    return (
        <Container {...rest}>
            <>
                <CheckBoxMark active={value} />

                <CheckboxLabel>{placeholder}</CheckboxLabel>
            </>
        </Container>
    )
}
