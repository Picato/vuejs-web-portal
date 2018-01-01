import axios from 'axios'
import { appconfig } from '../package.json'

export default {
  toETH(price, market, rate) {
    return price * (rate[`${market}-ETH`] || 1)
  },
  toBTC(price, market, rate) {
    return price * (rate[`${market}-BTC`] || 1)
  },
  toUSDT(price, market, rate) {
    return price * (rate[`${market}-USDT`] || 1)
  },
  getPrice(type, coin) {
    if (!coin) {
      return axios.get(`${appconfig.app.apiUrl}/market`, {
        params: {
          type
        }
      }).then(resp => resp.data)
    }
    return axios.get(`${appconfig.app.apiUrl}/market/${coin}`, {
      params: {
        type
      }
    }).then(resp => resp.data)
  },
  getRate(type) {
    return axios.get(`${appconfig.app.apiUrl}/rate`).then(resp => resp.data)
  },
  getTrends(type) {
    return axios.get(`${appconfig.app.apiUrl}/trends`, {
      params: { type }
    }).then(resp => resp.data)
  },
  getTrendingMessage(type) {
    return axios.get(`${appconfig.app.apiUrl}/trending-message`, {
      params: { type }
    }).then(resp => resp.data)
  }
}
