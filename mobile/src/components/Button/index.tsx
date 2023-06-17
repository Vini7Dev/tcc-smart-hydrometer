import React from 'react'
import { TouchableHighlightProps } from 'react-native/types'

import { lightGray, secondaryColor } from '../../styles/variables'
import { Container, ButtonText, ButtonIcon, ContainerWrapper } from './styles'

interface ButtonProps extends TouchableHighlightProps {
    text: string
    iconName?: string
    align?: 'center' | 'flex-start' | 'flex-end'
    buttonStyle?: 'primary' | 'secondary'
}

export const Button: React.FC<ButtonProps> = ({
    text,
    iconName,
    align = 'center',
    buttonStyle = 'primary',
    ...rest
}) => {
    return (
        <Container {...rest} buttonStyle={buttonStyle}>
            <ContainerWrapper align={align}>
                {
                    iconName && (
                        <ButtonIcon
                            name={iconName}
                            size={24}
                            color={buttonStyle === 'primary' ? lightGray : secondaryColor}
                        />
                    )
                }

                <ButtonText buttonStyle={buttonStyle}>{text}</ButtonText>
            </ContainerWrapper>
        </Container>
    )
}
