import React, { useState } from 'react'
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { newPassword } from './styles'

export const NewPassword: React.FC = () => {
    const [newPass, setNewPass] = useState('nova senha')
    const [confirm, setConfirm] = useState('confirme a senha')

    return (
        <SafeAreaView
            style={
                newPassword.container
            }>
            <Image source={
                require("../../../assets/logo.png")
            }
            alt={"Logo"}
            />

            <Text
                style={
                    newPassword.program
                }>
                NOME DO PROGRAMA
            </Text>

            <Text
                style={
                    newPassword.title
                }>
                Alterar A Senha
            </Text>

            <View style={{
                display: "flex",
            }}>
                <TextInput
                    style={
                        newPassword.buttons
                    }
                    placeholder="nova senha"
                    onChangeText={newPass => setNewPass(newPass)}
                    defaultValue="nova senha"
                />

                <TextInput
                    style={
                        newPassword.buttons
                    }
                    keyboardType="visible-password"
                    placeholder="confirme a senha"
                    onChangeText={confirm => setConfirm(confirm)}
                    defaultValue="confirme a senha"
                />
            </View>

            <View style={newPassword.containerButton}>
                <TouchableOpacity
                        style={
                            newPassword.login
                        }>
                    <Text>
                        Entrar
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
