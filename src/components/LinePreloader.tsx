import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import { useTheme } from 'react-native-paper'

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: 3,
    zIndex: 2,
  },
  bar: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    backgroundColor: '#3282B8',
  },
})

interface ILinePreloader {
  progress: number // 0 ... 100
}
const LinePreloader: React.FC<ILinePreloader> = ({ progress }) => {
  const progressBarAnimation = useRef(new Animated.Value(0)).current
  const { colors } = useTheme()

  useEffect(() => {
    animate()
  }, [progress])

  const animate = () => {
    Animated.timing(progressBarAnimation, {
      toValue: progress,
      duration: 700,
      useNativeDriver: false,
    }).start()
  }

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[styles.bar, {
          backgroundColor: colors.surface,
          width: progressBarAnimation.interpolate({
            inputRange: [0, 20, 40, 60, 80, 100],
            outputRange: ['0%', '20%', '40%', '60%', '80%', '100%'],
          }),
        }]}
      />
    </View>
  )
}

export default LinePreloader
