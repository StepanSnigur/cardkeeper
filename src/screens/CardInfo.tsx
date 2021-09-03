import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import { useTheme, IconButton } from 'react-native-paper'
import Card from '../components/Card'
import { RouteProp } from '@react-navigation/native'
import { MenuNavigationParams } from '../navigation/MenuNavigation'
import { DrawerNavigationProp } from '@react-navigation/drawer'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 50,
  },
  goBackBtn: {
    marginBottom: 30,
  },
})


type RouteProps = RouteProp<MenuNavigationParams, 'Card'>
interface ICardInfo {
  route: RouteProps
  navigation: DrawerNavigationProp<MenuNavigationParams>
}
const CardInfo: React.FC<ICardInfo> = ({ route, navigation }) => {
  const { colors } = useTheme()

  useEffect(() => {

  }, [route.params])

  const handleGoBack = () => {
    navigation.navigate('Main')
  }

  return (
    <Animated.View
      style={[styles.wrapper, { backgroundColor: colors.background }]}
    >
      <View style={styles.goBackBtn}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={handleGoBack}
        />
      </View>
      {route.params ? <View>
        <Card key={route.params.frontFace} frontFaceUri={route.params.frontFace} />
        <Card key={route.params.backFace} frontFaceUri={route.params.backFace} />
      </View> : null}
    </Animated.View>
  )
}

export default CardInfo
