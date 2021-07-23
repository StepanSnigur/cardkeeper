import React, { useState, useEffect } from 'react'
import { useRoute, getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { appNavigationRoutes } from '../navigation/AppNavigation'
import { Appbar, useTheme, Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/AntDesign'
import {
  useFonts,
  EncodeSans_300Light,
} from '@expo-google-fonts/encode-sans'

type HeaderProps = {
  openDrawer: () => void
}

const HEADER_DEFAULT_TITLE = 'CardKeeper'
const Header: React.FC<HeaderProps> = ({ openDrawer }) => {
  const { colors } = useTheme()
  const [fontsLoaded] = useFonts({ EncodeSans_300Light })
  const route = useRoute()
  const [headerTitle, setHeaderTitle] = useState(HEADER_DEFAULT_TITLE)

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route)
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
      <Appbar.Action icon="" />
    </Appbar.Header>
  )
}

export default Header
