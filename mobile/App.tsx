import React from 'react'
import {
  SafeAreaView,
  StatusBar,
} from 'react-native'

import { backgroundColor } from './src/styles/variables'
import { SignUp } from './src/screens/SignUp'
import { SignIn } from './src/screens/SignIn'

const App: React.FC = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: backgroundColor,
      }}>
      <StatusBar/>
        <SignIn />
    </SafeAreaView>
  )
}

export default App
