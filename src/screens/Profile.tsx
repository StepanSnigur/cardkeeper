import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Avatar, useTheme } from 'react-native-paper'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  avatar: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 60,
  },
  useEmail: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
  },
})

const Profile = () => {
  const { colors } = useTheme()

  return (
    <View style={[styles.wrapper, { backgroundColor: colors.background }]}>
      <Avatar.Image
        style={styles.avatar}
        source={{
          uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
        }}
        size={120}
      />
      <Text style={styles.useEmail}>email@emali.com</Text>
    </View>
  )
}

export default Profile
