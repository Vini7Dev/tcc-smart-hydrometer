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
import { api } from '../../services/api'
import { MULTPART_FORM_DATA_HEADERS } from '../../utils/constants'

interface AvatarProps {
    type: string
    name: string
    uri?: string
}

export const SignUp: React.FC = () => {
    const navigation = useNavigation()

    const [name, setName] = useState('Nome')
    const [email, setEmail] = useState('Email')
    const [password, setPassword] = useState('Senha')
    const [avatar, setAvatar] = useState<AvatarProps>()

    const handleReceiveSelectedAvatar = useCallback((avatarProps: AvatarProps) => {
        setAvatar(avatarProps)
    }, [])

    const handleGoBackToSignIn = useCallback(() => {
        navigation.goBack()
    }, [navigation])

    const handleSignUp = useCallback(async () => {
        try {
            const formData = new FormData()

            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)

            if (avatar) {
                formData.append('avatar_file', avatar)
            }

            await api.post('/customers', formData, MULTPART_FORM_DATA_HEADERS)

            handleGoBackToSignIn()
        } catch (err: any) {
            console.error(err)
        }
    }, [avatar, name, email, password, handleGoBackToSignIn])

    return (
        <ScreenContainer>
            <Title>Bem Vindo (a)</Title>

            <Subtitle>Cadastre-se</Subtitle>

            <AvatarUpload onSelectAvatar={handleReceiveSelectedAvatar} />

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
                    onPress={handleSignUp}
                />
            </ButtonMargin>

            <SignInContainer onPress={handleGoBackToSignIn}>
                <SignInLink>Já possuí uma conta?{' '}</SignInLink>

                <SignInLinkHighlight>Entrar</SignInLinkHighlight>
            </SignInContainer>
        </ScreenContainer>
    )
}
