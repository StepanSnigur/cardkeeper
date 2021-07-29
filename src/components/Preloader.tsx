import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ActivityIndicator, useTheme } from 'react-native-paper'

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
})

const Preloader = () => {
	const { colors } = useTheme()

  return (
		<View style={[styles.wrapper, { backgroundColor: colors.background }]}>
			<ActivityIndicator animating size={32} color={colors.text} />
		</View>
	)
}

export default Preloader
