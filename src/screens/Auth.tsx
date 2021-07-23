import React, { useState } from 'react'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { MenuNavigationParams } from '../navigation/MenuNavigation'
import { View, StyleSheet } from 'react-native'
import { Text, TextInput, Button, useTheme } from 'react-native-paper'
import {
  useFonts,
  EncodeSans_300Light,
} from '@expo-google-fonts/encode-sans'

type AuthPage = {
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

const Auth: React.FC<AuthPage> = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const { colors } = useTheme()
  const [fontsLoaded] = useFonts({ EncodeSans_300Light })


  const handleEmailChange = (value: string) => {
    setEmail(value)
  }
  const handlePasswordChange = (value: string) => {
    setPassword(value)
  }
  const handleChangePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }
  const handleAuth = () => {
    console.log(email, password, 'auth')
    navigation.navigate('Main')
    setEmail('')
    setPassword('')
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
      <Button
        mode="outlined"
        theme={{ colors: { primary: colors.text } }}
        onPress={handleAuth}
        style={styles.button}
      >Войти</Button>
    </View>
  )
}

export default Auth
