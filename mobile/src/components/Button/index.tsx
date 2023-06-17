import React from 'react'
import { TouchableHighlightProps } from 'react-native/types'

import { whiteColor } from '../../styles/variables'
import { Container, ButtonText, ButtonIcon, ContainerWrapper } from './styles'

interface ButtonProps extends TouchableHighlightProps {
    text: string
    iconName?: string
}

export const Button: React.FC<ButtonProps> = ({
    text,
    iconName,
    ...rest
}) => {
    return (
        <Container {...rest}>
            <ContainerWrapper haveIcon={!!iconName}>
                {
                    iconName && <ButtonIcon name={iconName} size={24} color={whiteColor} />
                }

                <ButtonText>{text}</ButtonText>
            </ContainerWrapper>
        </Container>
    )
}
