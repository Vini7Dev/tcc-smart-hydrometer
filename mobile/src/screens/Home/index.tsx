import React, { useCallback, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import { adminNavigationOptions, customerNavigationOptions } from '../../utils/navigationOptions'
import { NavigationHeader } from '../../components/NavigationHeader'
import { Button } from '../../components/Button'
import {
    ButtonMargin,
    ScreenContainer,
    ScreenContent,
    Title,
    UserAvatar,
    UserAvatarContainer
} from './styles'
import { useAuth } from '../../hooks/Auth'
import { ADMIN_ACCOUNT_TYPE, API_FILES_URL } from '../../utils/constants'

interface RouteParams {
    reloadAvatar?: boolean
}

const EmptyAvatarImage = require('../../../assets/avatar-user.png')

export const Home: React.FC = () => {
    const { user, profile, reloadProfile } = useAuth()
    const navigation = useNavigation()
    const route = useRoute()
    const routeParams = route.params as RouteParams

    const navigationOptions = user.account_type === ADMIN_ACCOUNT_TYPE
        ? adminNavigationOptions
        : customerNavigationOptions

    const handleGoToSelectedOption = useCallback((screenName: string) => {
        navigation.navigate(screenName as never)
    }, [navigation])

    useEffect(() => {
        reloadProfile()
    }, [routeParams?.reloadAvatar])

    return (
        <ScreenContainer>
            <NavigationHeader title="Início" />

            <ScreenContent>
                <UserAvatarContainer>
                    <UserAvatar source={profile?.avatar_file
                        ? { uri: API_FILES_URL(profile.avatar_file) }
                        : EmptyAvatarImage
                    }/>
                </UserAvatarContainer>

                <Title>Bem Vindo(a)</Title>

                {
                    navigationOptions.map((navigateOption, idx) => {
                        if (navigateOption.screenName === 'Home') {
                            return null
                        }

                        return (
                            <ButtonMargin key={idx}>
                                <Button
                                    text={navigateOption.screenLabel}
                                    iconName={navigateOption.screenIcon}
                                    align="flex-start"
                                    style={{width: '100%' }}
                                    onPress={() => handleGoToSelectedOption(
                                        navigateOption.screenName
                                    )}
                                />
                            </ButtonMargin>
                        )
                    })
                }
            </ScreenContent>
        </ScreenContainer>
    )
}
