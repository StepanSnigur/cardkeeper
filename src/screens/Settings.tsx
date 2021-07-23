import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, useTheme, RadioButton } from 'react-native-paper'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 30,
  },
  settingContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 14,
    paddingTop: 12,
  },
  'settingContainer:last-child': {
    borderBottomWidth: 0,
  },
  settingTitle: {
    fontSize: 22,
  },
})

interface IDefaultSettings {
  [key: string]: boolean
}
const defaultSettings: IDefaultSettings = {
  darkTheme: true,
  fingerprintLogin: false,
}

interface ISettingTitles {
  [key: string]: string
}
const settingTitles: ISettingTitles = {
  darkTheme: 'Темная тема',
  fingerprintLogin: 'Вход по отпечатку'
}

const Settings = () => {
  const { colors } = useTheme()
  const userSettings = defaultSettings // TODO

  return (
    <View style={[styles.wrapper, { backgroundColor: colors.background }]}>
      {Object.keys(userSettings).map((key, i, settings) => (
        <View
          style={[styles.settingContainer, {
            borderBottomColor: colors.text,
            borderBottomWidth: i === settings.length - 1 ? 0 : 1
          }]}
          key={key}
        >
          <Text style={styles.settingTitle}>{settingTitles[key]}</Text>
          <RadioButton value={key} status={defaultSettings[key] ? 'checked' : 'unchecked'} />
        </View>
      ))}
    </View>
  )
}

export default Settings
