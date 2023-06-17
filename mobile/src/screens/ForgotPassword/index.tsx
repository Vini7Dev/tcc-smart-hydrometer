import React, { useState } from 'react'
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { forgot_password } from './styles'

export const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('User')

    return (
        <SafeAreaView
            style={
                forgot_password.container
            }>
            <Image source={
                require("../../../assets/logo.png")
            }
            alt={"Logo"}
            />

            <Text
                style={
                    forgot_password.program
                }>
                NOME DO PROGRAMA
            </Text>

            <Text
                style={
                    forgot_password.title
                }>
                RECUPERAR SENHA
            </Text>

            <TextInput
                style={
                    forgot_password.buttons
                }
                placeholder="email"
                onChangeText={email => setEmail(email)}
                defaultValue="informe o e-mail cadastrado"
            />

            <TouchableOpacity
                    style={
                        forgot_password.login
                    }>
                <Text>
                    Entrar
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}