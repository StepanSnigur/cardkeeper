import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { StyleSheet, Animated } from 'react-native'
import { Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import alert, { ALERT_COLORS } from '../store/alert'

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: '10%',
    bottom: 20,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    zIndex: 1,
  },
  alertText: {
    marginLeft: 12,
    fontSize: 16,
  },
})

const Alert = observer(() => {
  const [isVisible, setIsVisible] = useState(false)
  const slideUpAnimation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    setIsVisible(true)
    Animated.timing(slideUpAnimation, {
      toValue: alert.alertMessage.length ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start(handleAnimationEnd)
  }, [alert.alertMessage])

  const handleAnimationEnd = () => {
    !alert.alertMessage.length && setIsVisible(false)
  }

  const truncatedMessage = alert.alertMessage.length > 30
    ? `${alert.alertMessage.slice(0, 30)}...`
    : alert.alertMessage

  if (!isVisible) return null
  return (
    <Animated.View
      style={[styles.wrapper, {
        backgroundColor: ALERT_COLORS[alert.alertType].color,
        bottom: slideUpAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-1000, 20],
        })
      }]}
    >
      <Icon name={ALERT_COLORS[alert.alertType].icon} size={20} />
      <Text style={styles.alertText}>{truncatedMessage}</Text>
    </Animated.View>
  )
})

export default Alert
