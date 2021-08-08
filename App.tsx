import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { StatusBar } from 'expo-status-bar'
import { Provider as PaperProvider, DarkTheme, DefaultTheme } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import settings from './src/store/settings'

import MenuNavigation from './src/navigation/MenuNavigation'

const darkTheme = {
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
const lightTheme = DefaultTheme

const App = observer(() => {
  useEffect(() => {
    (async () => await settings.getDefaultSettings())()
  }, [])

  return (
    <NavigationContainer>
      <PaperProvider theme={settings.darkTheme ? darkTheme : lightTheme}>
        <StatusBar />
        <MenuNavigation />
      </PaperProvider>
    </NavigationContainer>
  )
})

export default App
