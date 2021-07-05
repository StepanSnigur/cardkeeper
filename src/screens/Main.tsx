import React from 'react'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { MenuNavigationParams } from '../navigation/MenuNavigation'
import AppNavigation from '../navigation/AppNavigation'
import Header from '../components/Header'

type CardsProps = {
  navigation: DrawerNavigationProp<MenuNavigationParams, 'Main'>
}

const Main: React.FC<CardsProps> = ({ navigation }) => {
  return (
    <>
      <Header openDrawer={navigation.openDrawer} />
      <AppNavigation />
    </>
  )
}

export default Main
