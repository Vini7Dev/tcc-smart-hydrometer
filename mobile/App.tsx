/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

import { backgroundColor } from './src/source/commons/styles/style';
import { Login } from './src/presentation/login';

function App(): JSX.Element {
  return (
    <SafeAreaView 
      style={{
        backgroundColor: backgroundColor, 
        flex: 1, 
        borderColor: "#000000",
        borderWidth: 10,
      }}>
      <StatusBar/>
        <Login />
    </SafeAreaView>
  );
}

export default App;
