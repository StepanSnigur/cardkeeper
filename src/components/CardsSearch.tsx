import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { StyleSheet, Dimensions, Animated, View } from 'react-native'
import { Appbar, TextInput } from 'react-native-paper'
import cardsData from '../store/cards'

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  searchInputWrapper: {
    position: 'absolute',
    right: 0,
    width: Dimensions.get('screen').width - 8,
    height: 55,
  },
  searchInput: {
    height: 55,
  },
})

const CardsSearch = observer(() => {
  const [searchPanelOpened, setSearchPanelOpened] = useState(false)
  const slideAnimation = useRef(new Animated.Value(-Dimensions.get('screen').width)).current

  useEffect(() => {
    if (searchPanelOpened) {
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start()
    }
  }, [searchPanelOpened])

  const handleOpenSearchPanel = () => {
    setSearchPanelOpened(true)
  }
  const handleCloseSearchPanel = () => {
    Animated.timing(slideAnimation, {
      toValue: -Dimensions.get('screen').width,
      duration: 300,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        setSearchPanelOpened(false)
        cardsData.setSearchTerm('')
      }
    })
  }
  const handleChangeSearchTerm = (value: string) => {
    cardsData.setSearchTerm(value)
  }

  return (
    <View style={styles.wrapper}>
      <Appbar.Action
        icon="magnify"
        color="#fff"
        onPress={handleOpenSearchPanel}
      />
      {searchPanelOpened
        ? <Animated.View style={[styles.searchInputWrapper, {
            right: slideAnimation,
          }]}>
            <TextInput
              label="Введите имя карты"
              style={styles.searchInput}
              right={<TextInput.Icon
                name="close-circle"
                onPress={handleCloseSearchPanel}
              />}
              onChangeText={handleChangeSearchTerm}
              autoFocus={true}
            />
          </Animated.View>
        : null}
    </View>
  )
})

export default CardsSearch
