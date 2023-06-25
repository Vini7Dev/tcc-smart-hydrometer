import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

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
import { API_FILES_URL } from '../../utils/constants'

interface RouteParams {
    id?: string
    name?: string
    email?: string
    avatar_file?: string
}

interface AvatarProps {
    type: string
    name: string
    uri?: string
}

export const SignUpAdmin: React.FC = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const routeParams = route.params as RouteParams

    const [name, setName] = useState(routeParams.name ?? 'Nome')
    const [email, setEmail] = useState(routeParams.email ?? 'Email')
    const [password, setPassword] = useState(routeParams.id ? undefined : 'Senha')
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

            if (password) {
                formData.append('password', password)
            }

            if (avatar) {
                formData.append('avatar_file', avatar)
            }

            if (routeParams.id) {
                await api.patch(`/admins/${routeParams.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            } else {
                await api.post('/admins', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            }

            handleGoBackToAdminsList()
        } catch (err: any) {
            console.error(err)
        }
    }, [avatar, name, email, password, handleGoBackToAdminsList])

    return (
        <ScreenContainer>
            <NavigationHeader title="Cadastrar Administrador" />

            <ScreenContent>
                <AvatarUpload
                    defaultAvatar={routeParams.avatar_file ? API_FILES_URL(routeParams.avatar_file) : undefined}
                    onSelectAvatar={handleReceiveSelectedAvatar}
                />

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
