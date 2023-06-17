import React from 'react'
import { AuthProvider } from './Auth'

export const AppProvider: React.FC<{ children: any }> = ({ children }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}
