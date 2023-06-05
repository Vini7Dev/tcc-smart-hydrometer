import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { signin } from "./style";

function Signin() {
    const [name, setName] = useState("Name")
    const [email, setEmail] = useState("Email")
    const [password, setPassword] = useState("Password")

    return (
        <SafeAreaView
            style={
                signin.container
            }>

            <Text       
                style={
                    signin.program
                }>
                Bem Vindo (a)
            </Text>
            
            <Text       
                style={
                    signin.title
                }>
                Cadastre-se
            </Text>

            <Image source={
                require("../../../assets/avatar-user.png")
            } 
            alt={"avatar"}
            />

            <View style={{
                display: "flex", 
            }}>
                <TextInput
                    style={
                        signin.buttons
                    }
                    placeholder="user"
                    onChangeText={name => setName(name)}
                    defaultValue="username"
                /> 
                
                <TextInput
                    style={
                        signin.buttons
                    }
                    placeholder="user"
                    onChangeText={email => setEmail(email)}
                    defaultValue="username"
                /> 

                <TextInput
                    style={
                        signin.buttons
                    }
                    keyboardType="visible-password"
                    placeholder="password"
                    onChangeText={password => setPassword(password)}
                    defaultValue="password"
                />
            </View>

            <View style={signin.containerButton}>
                <TouchableOpacity 
                        style={
                            signin.login
                        }>
                    <Text>
                        CADASTRAR
                    </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export { Signin }