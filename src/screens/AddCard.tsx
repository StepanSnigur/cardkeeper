import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { homeScreenType } from '../navigation/AppNavigation'
import { useTheme, Text, IconButton } from 'react-native-paper'
import { Camera } from 'expo-camera'
import { BarCodeScanner } from 'expo-barcode-scanner'
import * as ImageManipulator from 'expo-image-manipulator'
import cards from '../store/cards'
import alert from '../store/alert'
import LinePreloader from '../components/LinePreloader'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  interfaceWrapper: {
    flex: 1,
  },
  cardWindow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,

    elevation: 50,
  },
  row: {
    flexDirection: 'row',
    height: '20%',
  },
  cell: {
    width: '33.333%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, .8)',
  },
  smallCell: {
    width: '6%',
  },
  centralCell: {
    width: '88%',
    backgroundColor: 'transparent',
  },
  cardWindowBlackBorder: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderStyle: 'solid',
    borderWidth: 5,
    borderColor: 'rgba(0, 0, 0, .8)',
    zIndex: 1,
  },
  cardWindowBorder: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 12,
    borderStyle: 'solid',
    borderWidth: 5,
    zIndex: 2,
  },
  cardRow: {
    height: '28%',
  },
  smallRow: {
    height: '12%',
  },
  shotCardsRow: {
    height: '25%',
  },
  rowUnderShotCards: {
    height: '15%',
  },
  shotCardsCell: {
    width: '50%',
  },
  shotCard: {
    width: 135,
    height: 90,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: 8,
    overflow: 'hidden',
    borderStyle: 'solid',
  },
  shotButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
})

const AddCard = observer(() => {
  const [isLoading, setIsLoading] = useState(false)
  const [progressBar, setProgressBar] = useState(0)
  const [hasPermission, setHasPermission] = useState<boolean | null>(false)
  const [camera, setCamera] = useState<Camera | null>(null)
  const [images, setImages] = useState<string[]>([])
  const [base64Images, setBase64Images] = useState<string[]>([])
  const [activeCardFace, setActiveCardFace] = useState<number | null>(0)
  const cardCameraRef = useRef<View | null>(null)
  const navigation = useNavigation<homeScreenType>()
  const { colors } = useTheme()

  useEffect(() => {
    const init = async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    }
    init()
  }, [])

  const handleLoadImages = (e: ProgressEvent) => {
    const { loaded, total } = e

    const completed = Math.round(loaded * 100 / total)
    setProgressBar(completed)
  }
  const handleTakePicture = async () => {
    if (camera && cardCameraRef.current) {
      try {
        const photo = await camera.takePictureAsync()

        const cropImage = await ImageManipulator.manipulateAsync(photo.uri, [{
          crop: {
            originX: photo.width / 100 * 6, // 6% from top
            originY: photo.height / 100 * 12, // 12% from left
            width: photo.width / 100 * 88, // 88% width from original size
            height: photo.height / 100 * 28, // 28% height from original size
          },
        }], { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: true })

        if (activeCardFace !== null) {
          const newImages = [...images]
          const newBase64Images = [...base64Images]

          newImages[activeCardFace] = cropImage.uri
          newBase64Images[activeCardFace] = cropImage.base64 || cropImage.uri

          setImages(newImages)
          setBase64Images(newBase64Images)
        }
        setNextCardFace()
      } catch (e) {
        alert.showAlertMessage('error', e.message)
      }
    }
  }
  const setNextCardFace = () => {
    if (activeCardFace === null) return false

    const nextCardFaceNum: number | null = activeCardFace < 1 ? activeCardFace + 1 : null
    setActiveCardFace(nextCardFaceNum)
  }
  const scanQRCodes = async (cards: string[]) => {
    const scannedCodes = cards.map(async cardUri => await BarCodeScanner.scanFromURLAsync(cardUri))
    return await Promise.all(scannedCodes)
  }
  const handleCreateNewCard = async () => {
    try {
      setIsLoading(true)
      const qrCodes = await scanQRCodes(images)
      const qrData = qrCodes.flat().map(code => code.data)
      console.log(qrData, 'codes')
      await cards.addCard(base64Images[0], base64Images[1], qrData, handleLoadImages)
      navigation.navigate('Home')
    } catch (e) {
      console.log(e.response.data.message)
      alert.showAlertMessage('error', e.response.data.message || e.message)
      setIsLoading(false)
    }
  }

  if (hasPermission === null) return <View />
  if (hasPermission === false) return <Text>Нет доступа к камере</Text>
  return (
    <View style={[styles.wrapper, { backgroundColor: colors.background }]}>
      <LinePreloader progress={progressBar} />
      <Camera
        type={Camera.Constants.Type.back}
        style={styles.camera}
        ratio={'18:9'}
        ref={setCamera}
      >
        <View style={styles.interfaceWrapper}>
          <View style={[styles.row, styles.smallRow]}>
            <View style={styles.cell} />
            <View style={styles.cell} />
            <View style={styles.cell} />
          </View>
          <View style={[styles.row, styles.cardRow]}>
            <View style={[styles.cell, styles.smallCell]} />
            <View style={[styles.cell, styles.centralCell]} ref={cardCameraRef}>
              <View style={styles.cardWindowBlackBorder} />
              <View style={[styles.cardWindowBorder, { borderColor: colors.primary }]} />
            </View>
            <View style={[styles.cell, styles.smallCell]} />
          </View>
          <View style={[styles.row, styles.shotCardsRow]}>
            <View style={[styles.cell, styles.shotCardsCell]}>
              <TouchableOpacity
                style={[
                  styles.shotCard,
                  {
                    backgroundColor: colors.background,
                    borderWidth: activeCardFace === 0 ? 3 : 0,
                    borderColor: colors.primary
                  }
                ]}
                onPress={() => setActiveCardFace(0)}
              >
                {images[0] ? <Image source={{ uri: images[0] }} style={styles.cardImage} /> : null}
              </TouchableOpacity>
            </View>
            <View style={[styles.cell, styles.shotCardsCell]}>
              <TouchableOpacity
                style={[
                  styles.shotCard,
                  {
                    backgroundColor: colors.background,
                    borderWidth: activeCardFace === 1 ? 3 : 0,
                    borderColor: colors.primary
                  }
                ]}
                onPress={() => setActiveCardFace(1)}
              >
                {images[1] ? <Image source={{ uri: images[1] }} style={styles.cardImage} /> : null}
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.row, styles.rowUnderShotCards]}>
            <View style={styles.cell} />
            <View style={styles.cell} />
            <View style={styles.cell} />
          </View>
          <View style={styles.row}>
            <View style={styles.cell} />
            <View style={styles.cell}>
              <IconButton
                icon="camera"
                disabled={isLoading}
                size={40}
                style={[styles.shotButton, { backgroundColor: colors.primary }]}
                onPress={handleTakePicture}
              />
            </View>
            <View style={styles.cell}>
              {images.length === 2 ?<IconButton
                icon="check"
                disabled={isLoading}
                size={40}
                style={[styles.shotButton, { backgroundColor: colors.primary }]}
                onPress={handleCreateNewCard}
              /> : null}
            </View>
          </View>
        </View>
      </Camera>
    </View>
  )
})

export default AddCard
