import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Text, useTheme, Switch } from 'react-native-paper'
import settings, { enterTypes } from '../store/settings'
import profile from '../store/profile'
import DropDown from 'react-native-paper-dropdown'

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

const Settings = observer(() => {
  const [enterTypeDropDownVisible, setEnterTypeDropDownVisible] = useState(false)
  const { colors } = useTheme()

  return (
    <View style={[styles.wrapper, { backgroundColor: colors.background }]}>
      <View
        style={[styles.settingContainer, {
          borderBottomColor: colors.text,
          borderBottomWidth: 1
        }]}
      >
        <Text style={styles.settingTitle}>Темная тема</Text>
        <Switch value={settings.darkTheme} onValueChange={settings.changeDarkTheme} />
      </View>
      <View
        style={[styles.settingContainer, {
          borderBottomColor: colors.text,
          borderBottomWidth: 0
        }]}
      >
        <Text style={styles.settingTitle}>Тип входа</Text>
        <DropDown
          visible={enterTypeDropDownVisible}
          mode="outlined"
          inputProps={{
            style: {
              maxWidth: 175
            }
          }}
          onDismiss={() => setEnterTypeDropDownVisible(false)}
          showDropDown={() => setEnterTypeDropDownVisible(true)}
          value={settings.enterType}
          setValue={val => {
            settings.changeEnterType(val)
            profile.saveUserLoginData()
          }}
          list={enterTypes}
        />
      </View>
    </View>
  )
})

export default Settings
