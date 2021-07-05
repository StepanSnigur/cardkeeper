import React from 'react'
import { Appbar, useTheme, Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/AntDesign'
import {
  useFonts,
  EncodeSans_300Light,
} from '@expo-google-fonts/encode-sans'

type HeaderProps = {
  openDrawer: () => void
}

const Header: React.FC<HeaderProps> = ({ openDrawer }) => {
  const { colors } = useTheme()
  const [fontsLoaded] = useFonts({ EncodeSans_300Light })

  return (
    <Appbar.Header style={{ backgroundColor: colors.background }}>
      <Appbar.Action icon="menu" onPress={openDrawer} />
      <Appbar.Content
        style={{ alignItems: 'center', }}
        title={<Text
          style={{ fontFamily: fontsLoaded ? 'EncodeSans_300Light' : 'sans-serif' }}
        >CardKeeper</Text>}
      />
      <Appbar.Action icon="" />
    </Appbar.Header>
  )
}

export default Header
