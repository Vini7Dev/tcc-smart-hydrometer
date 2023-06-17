import React, { useState } from 'react'

import {
    ScreenContainer,
    Title,
    Subtitle,
    ButtonMargin,
} from './styles'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { AvatarUpload } from '../../components/AvatarUpload'

export const SignUp: React.FC = () => {
    const [name, setName] = useState('Name')
    const [email, setEmail] = useState('Email')
    const [password, setPassword] = useState('Password')

    return (
        <ScreenContainer>
            <Title>Bem Vindo (a)</Title>

            <Subtitle>Cadastre-se</Subtitle>

            <AvatarUpload />

            <Input
                iconName="user"
                placeholder="Nome"
                onChangeText={name => setName(name)}
            />

            <Input
                iconName="mail"
                placeholder="Email"
                onChangeText={email => setEmail(email)}
            />

            <Input
                iconName="lock"
                placeholder="Senha"
                keyboardType="visible-password"
                onChangeText={password => setPassword(password)}
            />

            <ButtonMargin>
                <Button
                    text="CADASTRAR"
                />
            </ButtonMargin>
        </ScreenContainer>
    )
}