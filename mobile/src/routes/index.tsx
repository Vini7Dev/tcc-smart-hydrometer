import React from 'react'
import { View, ActivityIndicator } from 'react-native'

import { primaryColor } from '../styles/variables'
import { useAuth } from '../hooks/Auth'
import { AppRoutes } from './app.routes'
import { AdminRoutes } from './admin.routes'

export const Routes: React.FC = () => {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color={primaryColor} />
            </View>
        )
    }

    return (user ? <AdminRoutes /> : <AppRoutes />);
}
