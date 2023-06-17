import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'

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

const EmptyAvatarImage = require("../../../assets/avatar-user.png")

const navigationOptions = [
    {
        screenLabel: 'GERAR HIDRÔMETRO',
        screenName: 'GenerateHydrometer',
        screenIcon: 'plus',
    },
    {
        screenLabel: 'GERENCIAR ADMINSTRADORES',
        screenName: 'AdminsList',
        screenIcon: 'user',
    },
    {
        screenLabel: 'GERENCIAR NOTÍCIAS E DICAS',
        screenName: '???',
        screenIcon: 'file-text',
    },
]

export const Home: React.FC = () => {
    const navigation = useNavigation()

    const handleGoToSelectedOption = useCallback((screenName: string) => {
        navigation.navigate(screenName as never)
    }, [navigation])

    return (
        <ScreenContainer>
            <NavigationHeader />

            <ScreenContent>
                <UserAvatarContainer>
                    <UserAvatar source={EmptyAvatarImage} />
                </UserAvatarContainer>

                <Title>Bem Vindo(a)</Title>

                {
                    navigationOptions.map((navigateOption, idx) => (
                        <ButtonMargin key={idx}>
                            <Button
                                text={navigateOption.screenLabel}
                                iconName={navigateOption.screenIcon}
                                align="flex-start"
                                style={{width: '100%'}}
                                onPress={() => handleGoToSelectedOption(
                                    navigateOption.screenName
                                )}
                            />
                        </ButtonMargin>
                    ))
                }
            </ScreenContent>
        </ScreenContainer>
    )
}
