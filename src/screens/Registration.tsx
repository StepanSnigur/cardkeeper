import React, { useState } from 'react'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { MenuNavigationParams } from '../navigation/MenuNavigation'
import { View, StyleSheet } from 'react-native'
import { Text, TextInput, Button, useTheme } from 'react-native-paper'
import {
  useFonts,
  EncodeSans_300Light,
} from '@expo-google-fonts/encode-sans'

type RegistrationPage = {
  navigation: DrawerNavigationProp<MenuNavigationParams, 'Main'>
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  input: {
    width: '80%',
    marginBottom: 12,
  },
  button: {
    width: '80%',
    marginTop: 10,
  },
  headline: {
    fontSize: 24,
    textTransform: 'uppercase',
    marginBottom: 40,
  },
})

const Registration: React.FC<RegistrationPage> = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [comparablePassword, setComparablePassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const { colors } = useTheme()
  const [fontsLoaded] = useFonts({ EncodeSans_300Light })


  const handleEmailChange = (value: string) => {
    setEmail(value)
  }
  const handlePasswordChange = (value: string) => {
    setPassword(value)
  }
  const handleComparablePasswordChange = (value: string) => {
      setComparablePassword(value)
  }
  const handleChangePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }
  const handleAuth = () => {
    console.log(email, password, comparablePassword, 'registration')
    setEmail('')
    setPassword('')
    setComparablePassword('')
  }

  return (
    <View
      style={[styles.wrapper, { backgroundColor: colors.background }]}
    >
      <Text
        style={[styles.headline, { fontFamily: fontsLoaded ? 'EncodeSans_300Light' : 'sans-serif' }]}
      >cardkeeper</Text>
      <TextInput
        mode="outlined"
        theme={{ colors: { primary: colors.text } }}
        label="Email"
        value={email}
        onChangeText={handleEmailChange}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        secureTextEntry={!isPasswordVisible}
        theme={{ colors: { primary: colors.text } }}
        right={<TextInput.Icon name={isPasswordVisible ? 'eye-off' : 'eye'} onPress={handleChangePasswordVisible} />}
        label="Пароль"
        value={password}
        onChangeText={handlePasswordChange}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        theme={{ colors: { primary: colors.text } }}
        label="Повторите пароль"
        value={comparablePassword}
        onChangeText={handleComparablePasswordChange}
        style={styles.input}
      />
      <Button
        mode="outlined"
        theme={{ colors: { primary: colors.text } }}
        onPress={handleAuth}
        style={styles.button}
      >Зарегистрироваться</Button>
    </View>
  )
}

export default Registration
