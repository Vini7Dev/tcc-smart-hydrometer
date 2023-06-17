import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { SignIn } from '../screens/SignIn'
import { SignUp } from '../screens/SignUp'
import { ForgotPassword } from '../screens/ForgotPassword'
import { NewPassword } from '../screens/NewPassword'

const AppNav = createStackNavigator()

export const AppRoutes: React.FC = () => {
    return (
        <AppNav.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <AppNav.Screen name="SignIn" component={SignIn} />
            <AppNav.Screen name="SignUp" component={SignUp} />
            <AppNav.Screen name="ForgotPassword" component={ForgotPassword} />
            <AppNav.Screen name="NewPassword" component={NewPassword} />
        </AppNav.Navigator>
    )
}
