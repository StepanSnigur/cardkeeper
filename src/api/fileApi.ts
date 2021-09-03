import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

class FileApi {
  getFile = async (url: string) => {
    const savedImage = await this.getImageFromLocalStorage(url)
    if (savedImage) return savedImage

    const base64Image = await axios.get(url).then(res => res.data)
    await this.saveImageToLocalStorage(url, base64Image)
    return base64Image
  }

  saveImageToLocalStorage = async (url: string, base64: string) => {
    return await AsyncStorage.setItem(url, base64)
  }
  removeImageFromLocalStorage = async (url: string) => {
    return await AsyncStorage.removeItem(url)
  }
  getImageFromLocalStorage = async (url: string) => {
    return await AsyncStorage.getItem(url)
  }
}

export default new FileApi()
