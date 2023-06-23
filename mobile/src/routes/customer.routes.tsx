import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Home } from '../screens/Home'
import { NewsList } from '../screens/NewsList'
import { ViewNews } from '../screens/ViewNews'
import { PersonalHydrometersList } from '../screens/PersonalHydrometersList'
import { AssociateHydrometer } from '../screens/AssociateHydrometer'
import { PersonalConsumption } from '../screens/PersonalConsumption'
import { RegionalConsumption } from '../screens/RegionalConsumption'

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
            <CustomerNav.Screen name="PersonalHydrometersList" component={PersonalHydrometersList} />
            <CustomerNav.Screen name="AssociateHydrometer" component={AssociateHydrometer} />
            <CustomerNav.Screen name="PersonalConsumption" component={PersonalConsumption} />
            <CustomerNav.Screen name="RegionalConsumption" component={RegionalConsumption} />
        </CustomerNav.Navigator>
    )
}
