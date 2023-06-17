import React, { useCallback, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import {
    ScreenContainer,
    Title,
    Subtitle,
    ButtonMargin,
    SignInContainer,
    SignInLink,
    SignInLinkHighlight,
} from './styles'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { AvatarUpload } from '../../components/AvatarUpload'

export const SignUp: React.FC = () => {
    const navigation = useNavigation()

    const [name, setName] = useState('Nome')
    const [email, setEmail] = useState('Email')
    const [password, setPassword] = useState('Senha')

    const handleGoBackToSignIn = useCallback(() => {
        navigation.goBack()
    }, [navigation])

    const handleSignUp = useCallback(async () => {
        //
    }, [name, email, password])

    return (
        <ScreenContainer>
            <Title>Bem Vindo (a)</Title>

            <Subtitle>Cadastre-se</Subtitle>

            <AvatarUpload />

            <Input
                iconName="user"
                placeholder="Nome"
                onChangeText={name => setName(name)}
                defaultValue={name}
            />

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

            <ButtonMargin>
                <Button
                    text="CADASTRAR"
                />
            </ButtonMargin>

            <SignInContainer onPress={handleGoBackToSignIn}>
                <SignInLink>Já possuí uma conta?{' '}</SignInLink>

                <SignInLinkHighlight>Entrar</SignInLinkHighlight>
            </SignInContainer>
        </ScreenContainer>
    )
}
