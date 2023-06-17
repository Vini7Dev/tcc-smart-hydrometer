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

export const ForgotPassword: React.FC = () => {
    const navigation = useNavigation()

    const [email, setEmail] = useState('')

    const handleGoToNewPassword = useCallback(() => {
        navigation.navigate('NewPassword' as never)
    }, [navigation.navigate])

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
                <Button text="ENVIAR" onPress={handleGoToNewPassword} />
            </ButtonMargin>
        </ScreenContainer>
    )
}
