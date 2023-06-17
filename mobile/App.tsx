import React from 'react'
import {
  SafeAreaView,
  StatusBar,
} from 'react-native'

import { backgroundColor } from './src/styles/variables'
import { SignIn } from './src/screens/SignIn'

const App: React.FC = () => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: backgroundColor,
        flex: 1,
        borderColor: "#000000",
        borderWidth: 10,
      }}>
      <StatusBar/>
        <SignIn />
    </SafeAreaView>
  )
}

export default App
