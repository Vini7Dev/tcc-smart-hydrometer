import 'react-native-gesture-handler'
import React from 'react'
import {
  SafeAreaView,
  StatusBar,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import { backgroundColor } from './src/styles/variables'

import { Routes } from './src/routes/index.routes'
import { AppProvider } from './src/hooks'

const App: React.FC = () => {
  return (
    <SafeAreaView
        style={{
            flex: 1,
            backgroundColor: backgroundColor,
        }}
    >
        <NavigationContainer>
            <StatusBar/>

            <AppProvider>
                <Routes />
            </AppProvider>
        </NavigationContainer>
    </SafeAreaView>
  )
}

export default App
