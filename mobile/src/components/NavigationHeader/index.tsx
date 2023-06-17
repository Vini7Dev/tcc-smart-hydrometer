import React, { useCallback, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import {
    Container,
    NavigationIcon,
    ScreenTitle,
    NavContainer,
    NavWrapper,
    NavHeader,
    NavCloseButton,
    NavTitle,
    NavListArea,
    NavItem,
    NavItemText,
    NavItemIcon,
} from './styles'
import { primaryColor, whiteColor } from '../../styles/variables'

interface NavigationContainerProps {
    closeNavigation: () => void
}

const NavigationContainer: React.FC<NavigationContainerProps> = ({
    closeNavigation,
}) => {
    const navigation = useNavigation()

    const navItems = [
        { name: 'Home', placehoder: 'Início', icon: 'home' },
        { name: 'GenerateHydrometer', placehoder: 'Gerar Hydrômetro', icon: 'engine' },
    ]

    const handleNavigateToSelectedItem = useCallback((pageName: string) => {
        closeNavigation()

        if (pageName === 'Home') {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' as never }]
            })

            return
        }

        navigation.navigate(pageName as never)
    }, [navigation])

    return (
        <NavContainer>
            <NavWrapper>
                <NavHeader>
                    <NavCloseButton
                        name="x"
                        size={30}
                        color={whiteColor}
                        onPress={closeNavigation}
                    />

                    <NavTitle>Menu</NavTitle>
                </NavHeader>

                <NavListArea>
                    {
                        navItems.map(navItem => (
                            <NavItem
                                onPress={() => handleNavigateToSelectedItem(navItem.name)}
                            >
                                <>
                                <NavItemIcon
                                    name={navItem.icon}
                                    size={24}
                                    color={primaryColor}
                                />

                                <NavItemText>{navItem.placehoder}</NavItemText>
                                </>
                            </NavItem>
                        ))
                    }
                </NavListArea>
            </NavWrapper>
        </NavContainer>
    )
}

export const NavigationHeader: React.FC = () => {
    const navigation = useNavigation()

    const [isShowNavigation, setIsShowNavigation] = useState(false)

    const handleGoBackScreen = useCallback(() => {
        navigation.goBack()
    }, [navigation])

    const toggleisShowNavigation = useCallback(() => {
        setIsShowNavigation(!isShowNavigation)
    }, [isShowNavigation])

    return (
        <Container isShowNavigation={isShowNavigation}>
            <NavigationIcon
                onPress={handleGoBackScreen}
                name="chevron-left"
                size={24}
                color={whiteColor}
            />

            <ScreenTitle>Início</ScreenTitle>

            <NavigationIcon
                name="menu"
                size={24}
                color={whiteColor}
                onPress={toggleisShowNavigation}
            />

            {
                isShowNavigation  && (
                    <NavigationContainer closeNavigation={toggleisShowNavigation} />
                )
            }
        </Container>
    )
}
