import React, { useState } from 'react'

import {
    ScreenContainer,
    Title,
    Subtitle,
    ButtonMargin,
    ScreenContent,
} from './styles'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { AvatarUpload } from '../../components/AvatarUpload'
import { NavigationHeader } from '../../components/NavigationHeader'

export const SignUpAdmin: React.FC = () => {
    const [name, setName] = useState('Nome')
    const [email, setEmail] = useState('Email')
    const [password, setPassword] = useState('Senha')

    return (
        <ScreenContainer>
            <NavigationHeader />

            <ScreenContent>
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
            </ScreenContent>
        </ScreenContainer>
    )
}
