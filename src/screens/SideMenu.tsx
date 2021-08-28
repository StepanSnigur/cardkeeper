import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer'
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
} from 'react-native-paper'
import Icon from 'react-native-vector-icons/AntDesign'
import profile from '../store/profile'

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfo: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
})

const SideMenu: React.FC<any> = observer((props) => {
  const handleLogOut = () => {
    console.log('log out')
  }

  return (
    <View style={{ flex:1, backgroundColor: props.themeColors.background }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfo}>
            <View style={{ flexDirection:'row', marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: profile.avatar || 'https://api.adorable.io/avatars/50/abott@adorable.png'
                }}
                size={50}
              />
              <View style={{ marginLeft:15, flexDirection:'column' }}>
                <Title style={styles.title}>{profile.email}</Title>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                <Caption style={styles.caption}>карт добавлено</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              labelStyle={{ color: props.themeColors.text }}
              icon={({ size }) => (
                <Icon
                  name="plus"
                  color={props.themeColors.text}
                  size={size}
                />
              )}
              label="Добавить карту"
              onPress={() => props.navigation.navigate('AddCard')}
            />
            <DrawerItem
              labelStyle={{ color: props.themeColors.text }}
              icon={({ size }) => (
                <Icon
                  name="home"
                  color={props.themeColors.text}
                  size={size}
                />
              )}
              label="Главная"
              onPress={() => props.navigation.navigate('Home')}
            />
            <DrawerItem
              labelStyle={{ color: props.themeColors.text }}
              icon={({ size }) => (
                <Icon
                  name="profile"
                  color={props.themeColors.text}
                  size={size}
                />
              )}
              label="Профиль"
              onPress={() => props.navigation.navigate('Profile')}
            />
            <DrawerItem
              labelStyle={{ color: props.themeColors.text }}
              icon={({ size }) => (
                <Icon
                  name="setting"
                  color={props.themeColors.text}
                  size={size}
                />
              )}
              label="Настройки"
              onPress={() => props.navigation.navigate('Settings')}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          labelStyle={{ color: props.themeColors.text }}
          icon={({ size }) => (
            <Icon
              name="arrowleft"
              color={props.themeColors.text}
              size={size}
            />
          )}
          label="Sign Out"
          onPress={handleLogOut}
        />
      </Drawer.Section>
    </View>
  )
})

export default SideMenu
