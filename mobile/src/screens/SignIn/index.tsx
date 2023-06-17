import React, { useCallback, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

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
import { useAuth } from '../../hooks/Auth'

export const SignIn: React.FC = () => {
    const navigation = useNavigation()
    const { login } = useAuth()

    const [email, setEmail] = useState('Email')
    const [password, setPassword] = useState('Senha')

    const handleGoToSignUp = useCallback(() => {
        navigation.navigate('SignUp' as never)
    }, [navigation.navigate])

    const handleGoToForgotPassword = useCallback(() => {
        navigation.navigate('ForgotPassword' as never)
    }, [navigation.navigate])

    const handleLogin = useCallback(async () => {
        await login({
            email,
            password,
        })
    }, [email, password, login])

    return (
        <ScreenContainer>
            <AppLogo />

            <Title>ENTRAR</Title>

            <Input
                iconName="mail"
                placeholder="Email"
                onChangeText={email => setEmail(email)}
                defaultValue={email}
            />

            <Input
                iconName="lock"
                placeholder="Senha"
                keyboardType="visible-password"
                onChangeText={password => setPassword(password)}
                defaultValue={password}
            />

            <ForgotPasswordButton onPress={handleGoToForgotPassword}>
                <ForgotPasswordText>Esqueci a senha</ForgotPasswordText>
            </ForgotPasswordButton>

            <Button text="ENTRAR" onPress={handleLogin} />

            <CreateAccountContainer onPress={handleGoToSignUp}>
                <CreateAccountLink>Não tem conta?{' '}</CreateAccountLink>

                <CreateAccountLinkHighlight>Criar agora</CreateAccountLinkHighlight>
            </CreateAccountContainer>
        </ScreenContainer>
    )
}
