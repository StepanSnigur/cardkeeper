import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Provider as PaperProvider, DarkTheme, Button } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'

import MenuNavigation from './src/navigation/MenuNavigation'

const theme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: '#30374a',
    surface: '#181c25',
    background: '#161b22', //'#0D1117',
    text: '#c9d1d9',
    placeholder: '#fff'
  }
}

const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <StatusBar />
        <MenuNavigation />
      </PaperProvider>
    </NavigationContainer>
  )
}

export default App
