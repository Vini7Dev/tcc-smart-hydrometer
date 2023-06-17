import React from 'react'
import {
  SafeAreaView,
  StatusBar,
} from 'react-native'

import { backgroundColor } from './src/styles/variables'
import { SignUp } from './src/screens/SignUp'
import { SignIn } from './src/screens/SignIn'
import { ForgotPassword } from './src/screens/ForgotPassword'
import { NewPassword } from './src/screens/NewPassword'

const App: React.FC = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: backgroundColor,
      }}>
      <StatusBar/>
        <NewPassword />
    </SafeAreaView>
  )
}

export default App
