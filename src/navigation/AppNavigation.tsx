import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Cards from '../screens/Cards'
import Profile from '../screens/Profile'
import Settings from '../screens/Settings'

const AppStack = createStackNavigator()

const AppNavigation = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <AppStack.Screen name="Home" component={Cards} />
      <AppStack.Screen name="Profile" component={Profile} />
      <AppStack.Screen name="Settings" component={Settings} />
    </AppStack.Navigator>
  )
}

export default AppNavigation
