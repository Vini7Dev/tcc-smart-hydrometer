import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'

import {
    Container,
    NavigationIcon,
    ScreenTitle,
} from './styles'
import { whiteColor } from '../../styles/variables'

export const NavigationHeader: React.FC = () => {
    const navigation = useNavigation()

    const handleGoBackScreen = useCallback(() => {
        navigation.goBack()
    }, [navigation])

    return (
        <Container>
            <NavigationIcon
                onPress={handleGoBackScreen}
                name="chevron-left"
                size={24}
                color={whiteColor}
            />

            <ScreenTitle>Início</ScreenTitle>

            <NavigationIcon name="menu" size={24} color={whiteColor} />
        </Container>
    )
}
