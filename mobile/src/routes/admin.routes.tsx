import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Home } from '../screens/Home'
import { GenerateHydrometer } from '../screens/GenerateHydrometer'

const AdminNav = createStackNavigator()

export const AdminRoutes: React.FC = () => {
    return (
        <AdminNav.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <AdminNav.Screen name="Home" component={Home} />
            <AdminNav.Screen name="GenerateHydrometer" component={GenerateHydrometer} />
        </AdminNav.Navigator>
    )
}
