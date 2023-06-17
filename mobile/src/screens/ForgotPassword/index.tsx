import React, { useState } from 'react'

import {
    ScreenContainer,
    Title,
    ButtonMargin,
} from './styles'
import { AppLogo } from '../../components/AppLogo'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

export const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('')

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
                <Button text="ENVIAR" />
            </ButtonMargin>
        </ScreenContainer>
    )
}
