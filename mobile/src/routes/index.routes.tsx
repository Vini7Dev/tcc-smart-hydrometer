import React from 'react'
import { View, ActivityIndicator } from 'react-native'

import { primaryColor } from '../styles/variables'
import { useAuth } from '../hooks/Auth'
import { AppRoutes } from './app.routes'
import { AdminRoutes } from './admin.routes'
import { CustomerRoutes } from './customer.routes'
import { ADMIN_ACCOUNT_TYPE } from '../utils/constants'

export const Routes: React.FC = () => {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color={primaryColor} />
            </View>
        )
    }

    if (user) {
        if (user.account_type === ADMIN_ACCOUNT_TYPE) {
            return <AdminRoutes />
        }

        return <CustomerRoutes />
    }

    return <AppRoutes />
}
