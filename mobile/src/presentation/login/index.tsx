import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { loginStyles } from "./style";

function Login() {
    const [user, setUser] = useState("User")
    const [password, setPassword] = useState("Password")

    const login = () => {
        console.log("1")
    }

    return (
        <SafeAreaView
            style={
                loginStyles.container
            }>
            <Image source={
                require("../../../assets/logo.png")
            } 
            alt={"Logo"}
            />
            
            <Text 
                style={
                    loginStyles.program
                }>
                NOME DO PROGRAMA
            </Text>
            
            <Text 
                style={
                    loginStyles.title
                }>
                ENTRAR
            </Text>

            <View style={{
                display: "flex", 
            }}>
                <TextInput
                    style={
                        loginStyles.buttons
                    }
                    placeholder="user"
                    onChangeText={user => setUser(user)}
                    defaultValue="username"
                /> 

                <TextInput
                    style={
                        loginStyles.buttons
                    }
                    keyboardType="visible-password"
                    placeholder="password"
                    onChangeText={password => setPassword(password)}
                    defaultValue="password"
                />
            </View>

            <View style={loginStyles.containerButton}>
                <TouchableOpacity >
                    <Text 
                        style={
                            loginStyles.forgot
                        }>
                        Esqueci a senha
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={
                        loginStyles.login
                    }
                    onPress={login}>
                    <Text>
                        Entrar
                    </Text>
                </TouchableOpacity>
            </View>
            
            <Text 
                style={
                    loginStyles.title
                }>
                    Não tem conta
            </Text>
            <Text 
                style={
                    loginStyles.forgot
                }>
                Criar agora
            </Text>
        </SafeAreaView>
    )
}

export { Login }