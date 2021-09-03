import React, { useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { StyleSheet, View, Animated, Dimensions } from 'react-native'
import { useTheme, IconButton } from 'react-native-paper'
import Card from '../components/Card'
import cardInfo from '../store/cardInfo'

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 50,
  },
  goBackBtn: {
    marginBottom: 30,
  },
})


interface ICardInfo {}
const CardInfo: React.FC<ICardInfo> = observer(() => {
  const { colors } = useTheme()
  const slideAnimation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (cardInfo.isOpen) openCardInfo()
    else closeCardInfo()
  }, [cardInfo.isOpen])

  const openCardInfo = () => {
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }
  const closeCardInfo = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start()
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
      <View style={styles.goBackBtn}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={cardInfo.closeCard}
        />
      </View>
      {cardInfo.activeCard ? <View>
        <Card key={cardInfo.activeCard.frontFace} frontFaceUri={cardInfo.activeCard.frontFace} />
        <Card key={cardInfo.activeCard.backFace} frontFaceUri={cardInfo.activeCard.backFace} />
      </View> : null}
    </Animated.View>
  )
})

export default CardInfo
