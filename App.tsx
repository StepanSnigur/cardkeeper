import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { StatusBar } from 'expo-status-bar'
import { Provider as PaperProvider, DarkTheme, DefaultTheme } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import settings from './src/store/settings'
import * as SplashScreen from 'expo-splash-screen'

import MenuNavigation from './src/navigation/MenuNavigation'
import Alert from './src/components/Alert'

const darkTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: '#30374a',
    surface: '#181c25',
    background: '#161b22', //'#0D1117',
    text: '#c9d1d9',
    placeholder: '#fff',
  },
}
const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#30374a',
  },
}

const App = observer(() => {
  useEffect(() => {
    const init = async () => {
      await SplashScreen.preventAutoHideAsync()
      await settings.getDefaultSettings()
    }

    init().finally(async () => {
      await SplashScreen.hideAsync()
    })
  }, [])

  return (
    <NavigationContainer>
      <PaperProvider theme={settings.darkTheme ? darkTheme : lightTheme}>
        <Alert />
        <StatusBar />
        <MenuNavigation />
      </PaperProvider>
    </NavigationContainer>
  )
})

export default App
