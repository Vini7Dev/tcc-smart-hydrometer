import React, { createContext, useCallback, useState, useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import { api } from '../services/api'

interface User {
    id: string
    name: string
    email: string
    account_type: 'ADMIN' | 'CUSTOMER'
}

interface AuthData {
    token: string
    user: User
}

interface LoginCredentials {
    email: string
    password: string
}

interface AuthValue {
    user: User
    loading: boolean
    login(credentials: LoginCredentials): Promise<void>
    logout(): void
}

const AuthContext = createContext<AuthValue>({} as AuthValue)

export const AuthProvider: React.FC<{ children: any }> = ({ children }) => {
    const [data, setData] = useState<AuthData>({} as AuthData)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadStorageData(): Promise<void> {
            setLoading(true)

            const [token, user] = await AsyncStorage.multiGet(['@Inteliagua:token', '@Inteliagua:user'])

            if(token[1] && user[1]){
                api.defaults.headers.authorization = `Bearer ${token}`

                setData({ token: token[1], user: JSON.parse(user[1]) })
            }

            setLoading(false)
        }

        loadStorageData()
    }, [])

    const login = useCallback(async ({ email, password }: LoginCredentials) => {
        try {
            const response = await api.post('/authenticate', {
                email,
                password
            })

            const {user, token} = response.data

            await AsyncStorage.multiSet([
                ['@Inteliagua:token', token],
                ['@Inteliagua:user', JSON.stringify(user)]
            ])

            api.defaults.headers.authorization = `Bearer ${token}`

            setData({ token, user })
        } catch(err) {
            console.error(err)
        }
    }, [])

    const logout = useCallback(async () => {
        await AsyncStorage.multiRemove(
            ['@Inteliagua:token', '@Inteliagua:user']
        )

        setData({} as AuthData)
    }, [])

    return (
        <AuthContext.Provider value={ { user: data.user, loading, login, logout } }>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth():  AuthValue{
    const context = useContext(AuthContext)

    if(!context)
        throw new Error('useAuth must be used within an AuthProvider.')

    return context
}
