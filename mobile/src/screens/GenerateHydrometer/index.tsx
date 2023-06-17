import React from 'react'
import { View, Text } from 'react-native'
import { NavigationHeader } from '../../components/NavigationHeader'

export const GenerateHydrometer: React.FC = () => {
    return (
        <View style={{ flex: 1 }}>
            <NavigationHeader />

            <Text style={{ color: 'black' }}>GENERATE HYDROMETER</Text>
        </View>
    )
}
