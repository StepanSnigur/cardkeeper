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
import * as LocalAuthentication from 'expo-local-authentication'

import MenuNavigation from './src/navigation/MenuNavigation'
import Alert from './src/components/Alert'
import CardInfo from './src/screens/CardInfo'

import alert from './src/store/alert'
import profile from './src/store/profile'

// Fix for the react-native-draggable-flatlist library
import { LogBox } from 'react-native'
LogBox.ignoreLogs([
  'ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.',
])

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
      await SplashScreen.preventAutoHideAsync()
      await settings.getDefaultSettings()
      DefaultNavigationTheme.colors.background = settings.darkTheme
        ? darkTheme.colors.background
        : lightTheme.colors.background
    }

    init().finally(async () => {
      try {
        await SplashScreen.hideAsync()

        if (settings.enterType === 'fingerprint' && !profile.userId) {
          const savedBiometrics = await LocalAuthentication.isEnrolledAsync()
          if (!savedBiometrics) alert.showAlertMessage('error', 'У вас не установлен отпечаток пальца')

          const { success } = await LocalAuthentication.authenticateAsync()
          if (success) {
            profile.checkAutoLogin()
          }
        }
      } catch (e) {
        alert.showAlertMessage('error', e.message)
      }
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
