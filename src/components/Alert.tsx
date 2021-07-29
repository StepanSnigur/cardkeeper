import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'

const ALERT_COLORS = {
  info: { icon: 'info-outline', color: '#17a2b8' },
  error: { icon: 'error-outline', color: '#dc3545' },
  log: { icon: 'info-outline', color: '#343a40' },
}
interface IAlert {
  type: keyof typeof ALERT_COLORS,
  message: string
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 20,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
  },
  alertText: {
    marginLeft: 12,
    fontSize: 16,
  },
})
const Alert: React.FC<IAlert> = ({ type, message }) => {
  const truncatedMessage = message.length > 30
    ? `${message.slice(0, 30)}...`
    : message

  return (
    <View
      style={[styles.wrapper, { backgroundColor: ALERT_COLORS[type].color }]}
    >
      <Icon name={ALERT_COLORS[type].icon} size={20} />
      <Text style={styles.alertText}>{truncatedMessage}</Text>
    </View>
  )
}

export default Alert
