import axios from 'axios'

class FileApi {
  getFile = async (url: string) => {
    return await axios.get(url).then(res => res.data)
  }
}

export default new FileApi()
