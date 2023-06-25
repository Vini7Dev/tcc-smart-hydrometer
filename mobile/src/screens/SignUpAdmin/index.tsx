import React, { useCallback, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import {
    ScreenContainer,
    ButtonMargin,
    ScreenContent,
} from './styles'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { AvatarUpload } from '../../components/AvatarUpload'
import { NavigationHeader } from '../../components/NavigationHeader'
import { api } from '../../services/api'

interface AvatarProps {
    type: string
    name: string
    uri?: string
}

export const SignUpAdmin: React.FC = () => {
    const navigation = useNavigation()

    const [name, setName] = useState('Nome')
    const [email, setEmail] = useState('Email')
    const [password, setPassword] = useState('Senha')
    const [avatar, setAvatar] = useState<AvatarProps>()

    const handleReceiveSelectedAvatar = useCallback((avatarProps: AvatarProps) => {
        setAvatar(avatarProps)
    }, [])

    const handleGoBackToAdminsList = useCallback(() => {
        navigation.goBack()
    }, [navigation])

    const handleCreateAdmin = useCallback(async () => {
        try {
            const formData = new FormData()

            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('avatar_file', avatar)

            await api.post('/admins', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            handleGoBackToAdminsList()
        } catch (err: any) {
            console.error(err)
        }
    }, [avatar, name, email, password, handleGoBackToAdminsList])

    return (
        <ScreenContainer>
            <NavigationHeader title="Cadastrar Administrador" />

            <ScreenContent>
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
                        onPress={handleCreateAdmin}
                    />
                </ButtonMargin>
            </ScreenContent>
        </ScreenContainer>
    )
}
