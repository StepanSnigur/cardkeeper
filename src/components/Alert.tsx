import React from 'react'
import { observer } from 'mobx-react-lite'
import { View, StyleSheet } from 'react-native'
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
  const truncatedMessage = alert.alertMessage.length > 30
    ? `${alert.alertMessage.slice(0, 30)}...`
    : alert.alertMessage

  if (!alert.alertMessage.length) return null
  return (
    <View
      style={[styles.wrapper, { backgroundColor: ALERT_COLORS[alert.alertType].color }]}
    >
      <Icon name={ALERT_COLORS[alert.alertType].icon} size={20} />
      <Text style={styles.alertText}>{truncatedMessage}</Text>
    </View>
  )
})

export default Alert
