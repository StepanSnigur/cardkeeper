import React, { useState, useEffect } from 'react'
import { useRoute, getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { appNavigationRoutes, IHomeScreenParamList } from '../navigation/AppNavigation'
import { MenuNavigationParams } from '../navigation/MenuNavigation'
import { Appbar, useTheme, Text } from 'react-native-paper'
import {
  useFonts,
  EncodeSans_300Light,
} from '@expo-google-fonts/encode-sans'
import { KeysEnum } from '../utils/keysEnum'
import CardsSearch from './CardsSearch'

type HeaderProps = {
  openDrawer: () => void
}

const HEADER_DEFAULT_TITLE = 'CardKeeper'
type headerFunctionButtonType = KeysEnum<IHomeScreenParamList | MenuNavigationParams, React.ComponentType>
const headerFunctionButton: headerFunctionButtonType = {
  Home: CardsSearch,
}
type currentRouteNameType = keyof typeof headerFunctionButton
const Header: React.FC<HeaderProps> = ({ openDrawer }) => {
  const [headerTitle, setHeaderTitle] = useState(HEADER_DEFAULT_TITLE)
  const [currentRouteName, setCurrentRouteName] = useState<currentRouteNameType>('Home')
  const route = useRoute()
  const { colors } = useTheme()
  const [fontsLoaded] = useFonts({ EncodeSans_300Light })

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route)
    setCurrentRouteName(routeName as currentRouteNameType || 'Home')
    const routeTitle = appNavigationRoutes.find(route => route.name === routeName)?.title
    setHeaderTitle(routeTitle || HEADER_DEFAULT_TITLE)
  }, [route])

  return (
    <Appbar.Header style={{ backgroundColor: colors.background }}>
      <Appbar.Action icon="menu" onPress={openDrawer} />
      <Appbar.Content
        style={{ alignItems: 'center', }}
        title={<Text
          style={{ fontFamily: fontsLoaded ? 'EncodeSans_300Light' : 'sans-serif' }}
        >{headerTitle}</Text>}
      />
      {(currentRouteName && headerFunctionButton[currentRouteName])
        ? React.createElement(headerFunctionButton[currentRouteName] as React.ComponentType)
        : <Appbar.Action icon="" />}
    </Appbar.Header>
  )
}

export default Header
