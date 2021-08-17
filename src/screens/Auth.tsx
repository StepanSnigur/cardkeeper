import React, { useState, useEffect } from 'react'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { MenuNavigationParams } from '../navigation/MenuNavigation'
import { View, StyleSheet } from 'react-native'
import { Text, TextInput, Button, useTheme } from 'react-native-paper'
import profile from '../store/profile'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {
  useFonts,
  EncodeSans_300Light,
} from '@expo-google-fonts/encode-sans'
import validator from '../utils/validator'

type AuthPage = {
  navigation: DrawerNavigationProp<MenuNavigationParams>
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
  registrationLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    opacity: .9,
  },
})

const Auth: React.FC<AuthPage> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<string | boolean>(false)
  const [emailErrorVisible, setEmailErrorVisible] = useState(false)

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState<string | boolean>(false)
  const [passwordErrorVisible, setPasswordErrorVisible] = useState(false)

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const { colors } = useTheme()
  const [fontsLoaded] = useFonts({ EncodeSans_300Light })

  useEffect(() => {
    if (profile.userId) navigation.navigate('Main')
  }, [profile.userId])

  const handleEmailChange = (value: string) => {
    setEmail(value)
    const emailValidationError = validator.validateEmail(value)
    setEmailError(emailValidationError)
    if (!emailValidationError) setEmailErrorVisible(false)
  }
  const handleEmailBlur = () => {
    setEmailErrorVisible(!!emailError)
  }
  const handlePasswordChange = (value: string) => {
    setPassword(value)
    const passwordValidationError = validator.validatePassword(value)
    setPasswordError(passwordValidationError)
    if (!passwordValidationError) setPasswordErrorVisible(false)
  }
  const handlePasswordBlur = () => {
    setPasswordErrorVisible(!!passwordError)
  }
  const handleChangePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }
  const handleAuth = async () => {
    setIsLoading(true)
    await profile.logUserIn(email, password)
    setIsLoading(false)
  }
  const openRegistration = () => {
    navigation.navigate('Регистрация')
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
      {emailErrorVisible ? <View style={styles.validationError}>
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
      {passwordErrorVisible ? <View style={styles.validationError}>
        <Icon name="error-outline" size={16} color="#dc3545" style={styles.validationErrorIcon} />
        <Text style={styles.validationErrorText}>{passwordError}</Text>
      </View> : null}
      <Button
        mode="outlined"
        disabled={!!emailError || !!passwordError || !email.length || !password.length}
        loading={isLoading}
        theme={{ colors: { primary: colors.text } }}
        onPress={handleAuth}
        style={styles.button}
      >Войти</Button>
      <View style={styles.registrationLink}>
        <Text>Еще нет аккаунта?</Text>
        <Button onPress={openRegistration}>Создать</Button>
      </View>
    </View>
  )
}

export default Auth
