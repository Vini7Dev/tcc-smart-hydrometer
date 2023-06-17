import React from 'react'
import {
  SafeAreaView,
  StatusBar,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import { backgroundColor } from './src/styles/variables'

import { Routes } from './src/routes'

const App: React.FC = () => {
  return (
    <SafeAreaView
    style={{
        flex: 1,
        backgroundColor: backgroundColor,
    }}>
        <NavigationContainer>
            <StatusBar/>

            <Routes />
        </NavigationContainer>
    </SafeAreaView>
  )
}

export default App
