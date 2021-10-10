import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { StyleSheet, Animated, GestureResponderEvent } from 'react-native'
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

const CLOSED_POSITION = -1000
const OPENED_POSITION = 20
const Alert = observer(() => {
  const [isVisible, setIsVisible] = useState(false)
  const [initialCoords, setInitialCoords] = useState<null | number>(null)
  const [scrolled, setScrolled] = useState(0)
  const slideUpAnimation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    setIsVisible(true)
    Animated.timing(slideUpAnimation, {
      toValue: alert.alertMessage.length ? OPENED_POSITION : CLOSED_POSITION,
      duration: 500,
      useNativeDriver: false,
    }).start(handleAnimationEnd)
  }, [alert.alertMessage])

  const handleAnimationEnd = () => {
    !alert.alertMessage.length && setIsVisible(false)
  }

  const animateAlertMoving = (toValue: number) => {
    Animated.spring(slideUpAnimation, {
      toValue,
      tension: 20,
      useNativeDriver: false,
    }).start()
  }
  const handleTouchStart = (e: GestureResponderEvent) => {
    setInitialCoords(e.nativeEvent.pageY)
  }
  const handleTouchEnd = () => {
    if (Math.abs(scrolled) >= OPENED_POSITION) { // close alert message
      alert.closeAlertMessage()
    } else { // return to default position
      animateAlertMoving(OPENED_POSITION)
    }
    setInitialCoords(null)
    setScrolled(0)
  }
  const handleCloseAlert = (e: GestureResponderEvent) => {
    if (!initialCoords) throw new Error('Initial coords is missing')

    const delta = initialCoords - e.nativeEvent.pageY
    if (delta > OPENED_POSITION) return false

    setScrolled(delta)
    animateAlertMoving(delta)
  }

  const truncatedMessage = alert.alertMessage.length > 30
    ? `${alert.alertMessage.slice(0, 30)}...`
    : alert.alertMessage

  if (!isVisible) return null
  return (
    <Animated.View
      style={[styles.wrapper, {
        backgroundColor: ALERT_COLORS[alert.alertType].color,
        bottom: slideUpAnimation
      }]}
      onMoveShouldSetResponder={() => true}
      onResponderMove={handleCloseAlert}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Icon name={ALERT_COLORS[alert.alertType].icon} size={20} />
      <Text style={styles.alertText}>{truncatedMessage}</Text>
    </Animated.View>
  )
})

export default Alert
