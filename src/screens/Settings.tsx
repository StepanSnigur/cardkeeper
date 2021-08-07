import React from 'react'
import { View, StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Text, useTheme, Switch } from 'react-native-paper'
import settings, { titles, settingsKeys } from '../store/settings'

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
  const { colors } = useTheme()

  const handleChangeSettings = (settingName: settingsKeys) => {
    settings.switchSetting(settingName)
  }

  return (
    <View style={[styles.wrapper, { backgroundColor: colors.background }]}>
      {Object.keys(settings).map((key, i, settingsKeys) => {
        const typedKey = key as settingsKeys
        const switchValue = settings[typedKey]
        return (
          <View
            style={[styles.settingContainer, {
              borderBottomColor: colors.text,
              borderBottomWidth: i === settingsKeys.length - 1 ? 0 : 1
            }]}
            key={key}
          >
            <Text style={styles.settingTitle}>{titles[typedKey]}</Text>
            <Switch value={switchValue} onValueChange={() => handleChangeSettings(typedKey)} />
          </View>
        )
      })}
    </View>
  )
})

export default Settings
