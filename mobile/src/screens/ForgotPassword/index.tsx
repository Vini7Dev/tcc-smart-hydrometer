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

export const ForgotPassword: React.FC = () => {
    const navigation = useNavigation()

    const [email, setEmail] = useState('')

    const handleSendForgotPasswordCode = useCallback(async () => {
        try {
            await api.post('/password/forgot', { email })

            navigation.navigate('NewPassword' as never)
        } catch(err) {
            console.error(err)
        }
    }, [email, navigation])

    return (
        <ScreenContainer>
            <AppLogo />

            <Title>Recuperar senha</Title>

            <Input
                iconName="mail"
                placeholder="Informe o email cadastrado"
                onChangeText={email => setEmail(email)}
                defaultValue="Informe o email cadastrado"
            />

            <ButtonMargin>
                <Button text="ENVIAR" onPress={handleSendForgotPasswordCode} />
            </ButtonMargin>
        </ScreenContainer>
    )
}
