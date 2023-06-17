import React from 'react'

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

export const Home: React.FC = () => {
    return (
        <ScreenContainer>
            <NavigationHeader />

            <ScreenContent>
                <UserAvatarContainer>
                    <UserAvatar source={EmptyAvatarImage} />
                </UserAvatarContainer>

                <Title>Bem Vindo(a)</Title>

                <ButtonMargin>
                    <Button
                        text="GERAR HIDRÔMETRO"
                        iconName="plus"
                        style={{width: '100%'}}
                    />
                </ButtonMargin>

                <ButtonMargin>
                    <Button
                        text="GERENCIAR ADMINSTRADORES"
                        iconName="user"
                        style={{width: '100%'}}
                    />
                </ButtonMargin>

                <ButtonMargin>
                    <Button
                        text="GERENCIAR NOTÍCIAS E DICAS"
                        iconName="note"
                        style={{width: '100%'}}
                    />
                </ButtonMargin>
            </ScreenContent>
        </ScreenContainer>
    )
}
