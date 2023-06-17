import React, { useState } from 'react'

import {
    ScreenContainer,
    Title,
    ForgotPasswordButton,
    ForgotPasswordText,
    CreateAccountContainer,
    CreateAccountLink,
    CreateAccountLinkHighlight,
} from './styles'
import { AppLogo } from '../../components/AppLogo'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

export const SignIn: React.FC = () => {
    const [user, setUser] = useState('User')
    const [password, setPassword] = useState('Password')

    return (
        <ScreenContainer>
            <AppLogo />

            <Title>ENTRAR</Title>

            <Input
                iconName="user"
                placeholder="Usuário"
                onChangeText={user => setUser(user)}
            />

            <Input
                iconName="lock"
                placeholder="Senha"
                keyboardType="visible-password"
                onChangeText={password => setPassword(password)}
            />

            <ForgotPasswordButton>
                <ForgotPasswordText>Esqueci a senha</ForgotPasswordText>
            </ForgotPasswordButton>

            <Button text="ENTRAR" />

            <CreateAccountContainer>
                <CreateAccountLink>Não tem conta?{' '}</CreateAccountLink>

                <CreateAccountLinkHighlight>Criar agora</CreateAccountLinkHighlight>
            </CreateAccountContainer>
        </ScreenContainer>
    )
}
