import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Home } from '../screens/Home'
import { GenerateHydrometer } from '../screens/GenerateHydrometer'
import { AdminsList } from '../screens/AdminsList'
import { SignUpAdmin } from '../screens/SignUpAdmin'
import { NewsList } from '../screens/NewsList'
import { ViewNews } from '../screens/ViewNews'
import { CreateNews } from '../screens/CreateNews'

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
            <AdminNav.Screen name="AdminsList" component={AdminsList} />
            <AdminNav.Screen name="SignUpAdmin" component={SignUpAdmin} />
            <AdminNav.Screen name="NewsList" component={NewsList} />
            <AdminNav.Screen name="ViewNews" component={ViewNews} />
            <AdminNav.Screen name="CreateNews" component={CreateNews} />
        </AdminNav.Navigator>
    )
}
