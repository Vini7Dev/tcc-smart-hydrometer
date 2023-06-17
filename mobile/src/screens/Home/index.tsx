import React from 'react'
import { View, Text } from 'react-native'
import { NavigationHeader } from '../../components/NavigationHeader'

export const Home: React.FC = () => {
    return (
        <View style={{ flex: 1 }}>
            <NavigationHeader />

            <Text style={{ color: 'black' }}>HOME PAGE</Text>
        </View>
    )
}
