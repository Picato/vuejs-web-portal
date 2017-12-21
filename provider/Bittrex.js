import axios from 'axios'

export default {
  getPrice(type) {
    return axios.get(`http://blaz.clipvnet.com/checking-coin`, {
      params: {
        type
      }
    }).then(resp => resp.data)
  }
}
