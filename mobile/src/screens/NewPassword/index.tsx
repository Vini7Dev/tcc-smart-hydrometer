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

export const NewPassword: React.FC = () => {
    const navigation = useNavigation()

    const [code, setCode] = useState('')
    const [password, setPassword] = useState('')

    const handleGoBackToSignIn = useCallback(() => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'SignIn' as never }]
        })
    }, [navigation.navigate])

    return (
        <ScreenContainer>
            <AppLogo />

            <Title>Alterar Senha</Title>

            <Input
                iconName="mail"
                placeholder="Informe o código de verificação"
                onChangeText={code => setCode(code)}
                defaultValue="Informe o código de verificação"
            />

            <Input
                iconName="lock"
                placeholder="Informe a nova senha"
                onChangeText={password => setPassword(password)}
                defaultValue="Informe a nova senha"
            />

            <ButtonMargin>
                <Button text="SALVAR" onPress={handleGoBackToSignIn} />
            </ButtonMargin>
        </ScreenContainer>
    )
}
