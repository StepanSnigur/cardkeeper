import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Cards from '../screens/Cards'
import Profile from '../screens/Profile'
import Settings from '../screens/Settings'

export const appNavigationRoutes = [
  { name: 'Home', title: null, component: Cards },
  { name: 'Profile', title: 'Профиль', component: Profile },
  { name: 'Settings', title: 'Настройки', component: Settings }
]
const AppStack = createStackNavigator()

const AppNavigation = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {appNavigationRoutes.map(route => <AppStack.Screen
        name={route.name}
        component={route.component}
        key={route.name}
      />)}
    </AppStack.Navigator>
  )
}

export default AppNavigation
