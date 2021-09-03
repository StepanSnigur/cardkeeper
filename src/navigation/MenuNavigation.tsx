import React from 'react'
import {
  createDrawerNavigator,
  DrawerContentComponentProps
} from '@react-navigation/drawer'
import { useTheme } from 'react-native-paper'
import Main from '../screens/Main'
import SideMenu from '../screens/SideMenu'
import Auth from '../screens/Auth'
import Registration from '../screens/Registration'
import CardInfo from '../screens/CardInfo'
import { ICardData } from '../store/cards'

export type MenuNavigationParams = {
  Main: undefined
  "Регистрация": undefined
  "Авторизация": undefined
  Card: ICardData | undefined
}
const Drawer = createDrawerNavigator()

const MenuNavigation = () => {
  const { colors } = useTheme()

  return (
    <Drawer.Navigator
      initialRouteName="Авторизация"
      drawerContent={(props: DrawerContentComponentProps) => <SideMenu themeColors={colors} {...props} />}
    >
      <Drawer.Screen name="Авторизация" component={Auth} />
      <Drawer.Screen name="Регистрация" component={Registration} />
      <Drawer.Screen name="Main" component={Main} />
      <Drawer.Screen name="Card" component={CardInfo} />
    </Drawer.Navigator>
  )
}

export default MenuNavigation
