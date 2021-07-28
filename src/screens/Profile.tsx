import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Avatar, Button, useTheme } from 'react-native-paper'

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
  controls: {
    width: '90%',
    marginTop: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  controlButton: {
    marginBottom: 15,
  },
})

const Profile = () => {
  const { colors } = useTheme()

  const handleChangeEmail = () => {
    console.log('change email')
  }
  const handleChangePassword = () => {
    console.log('change password')
  }

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
      <View style={styles.controls}>
        <Button
          mode="contained"
          style={styles.controlButton}
          onPress={handleChangeEmail}
        >Изменить Email</Button>
        <Button
          mode="contained"
          style={styles.controlButton}
          onPress={handleChangePassword}
        >Изменить пароль</Button>
      </View>
    </View>
  )
}

export default Profile
