import React, { useCallback, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import {
    ScreenContainer,
    Title,
    ButtonMargin,
} from './styles'
import { AppLogo } from '../../components/AppLogo'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { api } from '../../services/api'

export const NewPassword: React.FC = () => {
    const navigation = useNavigation()

    const [token, setToken] = useState('')
    const [password, setPassword] = useState('')

    const handleSendForgotPasswordCode = useCallback(async () => {
        try {
            await api.post('/password/reset', { token, password })

            navigation.reset({
                index: 0,
                routes: [{ name: 'SignIn' as never }]
            })
        } catch(err) {
            console.error(err)
        }
    }, [token, password, navigation])

    return (
        <ScreenContainer>
            <AppLogo />

            <Title>Alterar Senha</Title>

            <Input
                iconName="mail"
                placeholder="Informe o código de verificação"
                onChangeText={token => setToken(token)}
                defaultValue="Informe o código de verificação"
            />

            <Input
                iconName="lock"
                placeholder="Informe a nova senha"
                onChangeText={password => setPassword(password)}
                defaultValue="Informe a nova senha"
            />

            <ButtonMargin>
                <Button text="SALVAR" onPress={handleSendForgotPasswordCode} />
            </ButtonMargin>
        </ScreenContainer>
    )
}
