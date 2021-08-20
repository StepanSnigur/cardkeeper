import React from 'react'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'

import Cards from '../screens/Cards'
import Profile from '../screens/Profile'
import Settings from '../screens/Settings'
import AddCard from '../screens/AddCard'

interface IRoutes {
  name: string,
  title: string | null,
  component: React.FunctionComponent,
}
type IHomeScreenParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
  AddCard: undefined;
}
export type homeScreenType = StackNavigationProp<IHomeScreenParamList, 'Home'>
export const appNavigationRoutes: IRoutes[] = [
  { name: 'Home', title: null, component: Cards },
  { name: 'Profile', title: 'Профиль', component: Profile },
  { name: 'Settings', title: 'Настройки', component: Settings },
  { name: 'AddCard', title: 'Добавить карту', component: AddCard },
]
const AppStack = createStackNavigator()

const AppNavigation = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false
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
