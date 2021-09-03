import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { StatusBar } from 'expo-status-bar'
import { Provider as PaperProvider, DarkTheme, DefaultTheme } from 'react-native-paper'
import {
  NavigationContainer,
  DefaultTheme as DefaultNavigationTheme,
} from '@react-navigation/native'
import settings from './src/store/settings'
import * as SplashScreen from 'expo-splash-screen'

import MenuNavigation from './src/navigation/MenuNavigation'
import Alert from './src/components/Alert'
import CardInfo from './src/screens/CardInfo'

const darkTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: '#0F4C75',
    surface: '#3282B8',
    background: '#1B262C',
    text: '#BBE1FA',
    placeholder: '#BBE1FA',
  },
}
const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#CCF2F4',
    surface: '#A4EBF3',
    background: '#F4F9F9',
    text: '#596E79',
    placeholder: '#596E79',
  },
}

const App = observer(() => {
  useEffect(() => {
    const init = async () => {
      DefaultNavigationTheme.colors.background = settings.darkTheme
        ? darkTheme.colors.background
        : lightTheme.colors.background
      await SplashScreen.preventAutoHideAsync()
      await settings.getDefaultSettings()
    }

    init().finally(async () => {
      await SplashScreen.hideAsync()
    })
  }, [])

  return (
    <NavigationContainer theme={DefaultNavigationTheme}>
      <PaperProvider theme={settings.darkTheme ? darkTheme : lightTheme}>
        <Alert />
        <StatusBar />
        <MenuNavigation />
        <CardInfo />
      </PaperProvider>
    </NavigationContainer>
  )
})

export default App
