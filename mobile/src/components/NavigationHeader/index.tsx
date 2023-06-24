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
    DisconnectButtonMargin,
} from './styles'
import { ADMIN_ACCOUNT_TYPE } from '../../utils/constants'
import { primaryColor, transparent, whiteColor } from '../../styles/variables'
import { Button } from '../Button'
import { useAuth } from '../../hooks/Auth'
import { adminNavigationOptions, customerNavigationOptions } from '../../utils/navigationOptions'

interface NavigationHeaderProps {
    title: string
}

interface NavigationContainerProps {
    closeNavigation: () => void
}

const HOME_STATE_INDEX = 1

const NavigationContainer: React.FC<NavigationContainerProps> = ({
    closeNavigation,
}) => {
    const navigation = useNavigation()
    const { user, logout } = useAuth()

    const navigationOptions = user.account_type === ADMIN_ACCOUNT_TYPE
        ? adminNavigationOptions
        : customerNavigationOptions

    const handleLogoutUser = useCallback(() => {
        logout()
    }, [logout])

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
                        navigationOptions.map(navItem => (
                            <NavItem
                                onPress={() => handleNavigateToSelectedItem(navItem.screenName)}
                            >
                                <>
                                    <NavItemIcon
                                        name={navItem.screenIcon}
                                        size={24}
                                        color={primaryColor}
                                    />

                                    <NavItemText>{navItem.screenLabel}</NavItemText>
                                </>
                            </NavItem>
                        ))
                    }

                    <DisconnectButtonMargin>
                        <Button
                            text="DESCONECTAR"
                            iconName="power"
                            align="flex-start"
                            style={{ width: '100%' }}
                            onPress={handleLogoutUser}
                        />
                    </DisconnectButtonMargin>
                </NavListArea>
            </NavWrapper>
        </NavContainer>
    )
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
    title,
}) => {
    const navigation = useNavigation()

    const [isShowNavigation, setIsShowNavigation] = useState(false)

    const handleGoBackScreen = useCallback(() => {
        const navigationState = navigation.getState()

        if (navigationState.routes.length <= HOME_STATE_INDEX) {
            return
        }

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
                color={
                    navigation.getState().routes.length <= HOME_STATE_INDEX
                        ? transparent
                        : whiteColor
                }
            />

            <ScreenTitle>{title}</ScreenTitle>

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
