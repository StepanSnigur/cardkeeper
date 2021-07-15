import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { useTheme } from 'react-native-paper'
import Main from '../screens/Main'
import SideMenu from '../screens/SideMenu'
import Auth from '../screens/Auth'

export type MenuNavigationParams = {
  Main: undefined
}
const Drawer = createDrawerNavigator()

const MenuNavigation = () => {
  const { colors } = useTheme()

  return (
    <Drawer.Navigator drawerContent={props => <SideMenu themeColors={colors} {...props} />}>
      <Drawer.Screen name="Авторизация" component={Auth} />
      <Drawer.Screen name="Главная" component={Main} />
    </Drawer.Navigator>
  )
}

export default MenuNavigation
