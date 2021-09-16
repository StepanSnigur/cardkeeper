import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  GestureResponderEvent,
} from 'react-native'
import { useTheme, IconButton, Text, Menu, Divider, ActivityIndicator } from 'react-native-paper'
import QRCode from 'react-native-qrcode-svg'
import Card from '../components/Card'
import cardInfo from '../store/cardInfo'
import cards from '../store/cards'

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,
    paddingVertical: 50,
  },
  cardsWrapper: {
    zIndex: 1,
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  cardName: {
    fontSize: 24,
  },
  pullData: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    minHeight: 100,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    paddingVertical: 50,
    paddingHorizontal: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
    zIndex: 2,
  },
  pullDataSquare: {
    position: 'absolute',
    top: 8,
    left: Dimensions.get('screen').width / 2 - 17.5, // place in center
    width: 35,
    height: 7,
    borderRadius: 8,
  },
  pullDataHeadline: {
    textAlign: 'center',
    fontSize: 28,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    marginBottom: 30,
    paddingBottom: 5,
  },
  qrCodeWrapper: {
    width: '100%',
    borderRadius: 14,
    padding: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  loader: {
    marginRight: 16,
  },
})

const CardInfo = observer(() => {
  const [isLoading, setIsLoading] = useState(false)
  const [sliderHeight, setSliderHeight] = useState(100)
  const [sliderPosition, setSliderPosition] = useState(0)
  const [pullDataY, setPullDataY] = useState(0)
  const [startDragY, setStartDragY] = useState(0)
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const slideAnimation = useRef(new Animated.Value(0)).current
  const pullDataAnimation = useRef(new Animated.Value(sliderPosition)).current
  const pullDataRef = useRef<View | null>(null)
  const { colors } = useTheme()

  useEffect(() => { // fires on open and close
    if (pullDataRef.current) {
      pullDataRef.current.measure((ox, oy, width, height) => {
        setSliderHeight(height)
      })
    }
  }, [pullDataRef, cardInfo.isOpen])
  useEffect(() => {
    if (cardInfo.isOpen) {
      openCardInfo()
    } else {
      closeCardInfo()
    }
  }, [cardInfo.isOpen])
  useEffect(() => {
    animatePullData(sliderPosition)
  }, [sliderPosition])
  useEffect(() => {
    setPullDataToDefaultPosition() // closed by default
  }, [sliderHeight])

  const openCardInfo = () => {
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }
  const closeCardInfo = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }
  const handleMove = (e: GestureResponderEvent) => {
    const currentY = e.nativeEvent.pageY
    const delta = currentY - pullDataY
    setSliderPosition(prevSliderPosition => {
      return setNewPosition(prevSliderPosition - delta)
    })
    setPullDataY(currentY)
  }
  const handleTouchStart = (e: GestureResponderEvent) => {
    setPullDataY(e.nativeEvent.pageY)
    setStartDragY(e.nativeEvent.pageY)
  }
  const handleTouchEnd = (e: GestureResponderEvent) => {
    const currentY = e.nativeEvent.pageY
    const delta = Math.abs(currentY - startDragY)
    const isGoingUp = currentY < startDragY
    if (delta > 100) {
      if (isGoingUp) setSliderPosition(0)
      else setSliderPosition(-sliderHeight + 55)
    } else {
      if (sliderPosition + 100 > 0) setSliderPosition(0)
      else setSliderPosition(-sliderHeight + 55)
    }
  }
  const setNewPosition = (newPosition: number) => {
    if (newPosition >= 0) return 0
    else if (newPosition <= -sliderHeight + 55) return -sliderHeight + 55
    return newPosition
  }
  const animatePullData = (toValue: number, tension = 20) => {
    Animated.spring(pullDataAnimation, {
      toValue,
      tension,
      useNativeDriver: false,
    }).start()
  }
  const setPullDataToDefaultPosition = () => {
    const closedPullDataPosition = -sliderHeight + 55
    setSliderPosition(closedPullDataPosition)
    Animated.timing(pullDataAnimation, {
      toValue: closedPullDataPosition,
      duration: 0,
      useNativeDriver: false,
    }).start()
  }
  const openMenu = () => {
    setIsMenuVisible(true)
  }
  const closeMenu = () => {
    setIsMenuVisible(false)
  }
  const deleteCard = async () => {
    closeMenu()
    setIsLoading(true)
    cardInfo.activeCard && await cards.deleteCard(cardInfo.activeCard._id)
    setIsLoading(false)
    cardInfo.closeCard()
  }
  const changeName = () => {
    closeMenu()
  }

  return (
    <Animated.View
      style={[styles.wrapper, {
        backgroundColor: colors.background,
        transform: [{
          translateY: slideAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [Dimensions.get('screen').height, 0],
          })
        }]
      }]}
    >
      <View style={styles.controls}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={cardInfo.closeCard}
        />
        {cardInfo.activeCard?.cardName
          ? <Text style={styles.cardName}>{cardInfo.activeCard?.cardName}</Text>
          : null}
        {isLoading
          ? <ActivityIndicator animating={isLoading} color="#fff" style={styles.loader} />
          : <Menu
            visible={isMenuVisible}
            onDismiss={closeMenu}
            anchor={<IconButton
              icon="dots-vertical"
              size={24}
              onPress={openMenu}
            />}
          >
            <Menu.Item onPress={changeName} title="Изменить название" icon="pencil" />
            <Divider />
            <Menu.Item onPress={deleteCard} title="Удалить" icon="delete" />
          </Menu>}
      </View>
      {cardInfo.activeCard ? <View style={styles.cardsWrapper}>
        <Card key={cardInfo.activeCard.frontFace} frontFaceUri={cardInfo.activeCard.frontFace} />
        <Card key={cardInfo.activeCard.backFace} frontFaceUri={cardInfo.activeCard.backFace} />
      </View> : null}
      {cardInfo.activeCard?.qrCodes.length ? <Animated.View
        style={[styles.pullData, {
          backgroundColor: colors.primary,
          bottom: pullDataAnimation //-sliderHeight + 55
        }]}
        ref={pullDataRef}
        onMoveShouldSetResponder={() => true}
        onResponderMove={handleMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <View style={[styles.pullDataSquare, { backgroundColor: colors.background }]} />
        <Text style={[styles.pullDataHeadline, { borderColor: colors.text }]}>Данные карты</Text>
        {cardInfo.activeCard.qrCodes.map(qrCode => <View style={styles.qrCodeWrapper} key={qrCode}>
          <QRCode
            value={qrCode}
            size={128}
          />
        </View>)}
      </Animated.View> : null}
    </Animated.View>
  )
})

export default CardInfo
