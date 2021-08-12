import React, { useState } from 'react'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { MenuNavigationParams } from '../navigation/MenuNavigation'
import { View, StyleSheet } from 'react-native'
import { Text, TextInput, Button, useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {
  useFonts,
  EncodeSans_300Light,
} from '@expo-google-fonts/encode-sans'
import validator from '../utils/validator'

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
  validationError: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  validationErrorText: {
    color: '#dc3545',
  },
  validationErrorIcon: {
    marginRight: 7,
  },
})

const Auth: React.FC<AuthPage> = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<string | boolean>(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState<string | boolean>(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const { colors } = useTheme()
  const [fontsLoaded] = useFonts({ EncodeSans_300Light })


  const handleEmailChange = (value: string) => {
    setEmail(value)
  }
  const handleEmailBlur = () => {
    const isEmailValid = validator.validateEmail(email)
    setEmailError(isEmailValid)
  }
  const handlePasswordChange = (value: string) => {
    setPassword(value)
  }
  const handlePasswordBlur = () => {
    const isPasswordValid = validator.validatePassword(password)
    setPasswordError(isPasswordValid)
  }
  const handleChangePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }
  const handleAuth = () => {
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
        onBlur={handleEmailBlur}
        style={styles.input}
      />
      {emailError ? <View style={styles.validationError}>
        <Icon name="error-outline" size={16} color="#dc3545" style={styles.validationErrorIcon} />
        <Text style={styles.validationErrorText}>{emailError}</Text>
      </View> : null}
      <TextInput
        mode="outlined"
        secureTextEntry={!isPasswordVisible}
        theme={{ colors: { primary: colors.text } }}
        right={<TextInput.Icon name={isPasswordVisible ? 'eye-off' : 'eye'} onPress={handleChangePasswordVisible} />}
        label="Пароль"
        value={password}
        onChangeText={handlePasswordChange}
        onBlur={handlePasswordBlur}
        style={styles.input}
      />
      {passwordError ? <View style={styles.validationError}>
        <Icon name="error-outline" size={16} color="#dc3545" style={styles.validationErrorIcon} />
        <Text style={styles.validationErrorText}>{passwordError}</Text>
      </View> : null}
      <Button
        mode="outlined"
        disabled={!!emailError || !!passwordError || !email.length || !password.length}
        theme={{ colors: { primary: colors.text } }}
        onPress={handleAuth}
        style={styles.button}
      >Войти</Button>
    </View>
  )
}

export default Auth
