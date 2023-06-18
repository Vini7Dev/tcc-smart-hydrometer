import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Home } from '../screens/Home'
import { NewsList } from '../screens/NewsList'
import { ViewNews } from '../screens/ViewNews'

const CustomerNav = createStackNavigator()

export const CustomerRoutes: React.FC = () => {
    return (
        <CustomerNav.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <CustomerNav.Screen name="Home" component={Home} />
            <CustomerNav.Screen name="NewsList" component={NewsList} />
            <CustomerNav.Screen name="ViewNews" component={ViewNews} />
        </CustomerNav.Navigator>
    )
}
