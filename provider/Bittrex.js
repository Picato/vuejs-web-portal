import axios from 'axios'
import { appconfig } from '../package.json'

export default {
  getDayOfWeek(day) {
    if (day === 0) return 'Sun'
    if (day === 1) return 'Mon'
    if (day === 2) return 'Tue'
    if (day === 3) return 'Wed'
    if (day === 4) return 'Thu'
    if (day === 5) return 'Fri'
    if (day === 6) return 'Sat'
    return 'Error'
  },
  getTimeUpdate(type) {
    if (type === 'HandlerMin1') return 60 * 1000
    if (type === 'HandlerMin3') return 3 * 60 * 1000
    if (type === 'HandlerMin15') return 15 * 60 * 1000
    if (type === 'HandlerMin30') return 30 * 60 * 1000
    if (type === 'HandlerHour1') return 60 * 60 * 1000
    return 5000
  },
  formatNumber(value, digit = 8) {
    return Number(value).toLocaleString(undefined, { maximumFractionDigits: digit, minimumFractionDigits: digit })
  },
  toETH(price, market, rate) {
    return price * (rate[`${market}-ETH`] || 1)
  },
  toBTC(price, market, rate) {
    return price * (rate[`${market}-BTC`] || 1)
  },
  toUSDT(price, market, rate) {
    return price * (rate[`${market}-USDT`] || 1)
  },
  getPriceDetail(type, coin) {
    return axios.get(`${appconfig.app.apiUrl}/market/${coin}`, {
      params: {
        type
      }
    }).then(resp => resp.data)
  },
  getPriceByTime(type, coin, opts = {}) {
    if (!coin) {
      return axios.get(`${appconfig.app.apiUrl}/statistic/markets-by-time`, {
        params: Object.assign({ type }, opts)
      }).then(resp => resp.data)
    }
    return axios.get(`${appconfig.app.apiUrl}/statistic/markets-by-time/${coin}`, {
      params: {
        type
      }
    }).then(resp => resp.data)
  },
  getPrice(type, coin, opts = {}) {
    if (!coin) {
      return axios.get(`${appconfig.app.apiUrl}/markets`, {
        params: Object.assign({ type }, opts)
      }).then(resp => resp.data)
    }
    return axios.get(`${appconfig.app.apiUrl}/markets/${coin}`, {
      params: {
        type
      }
    }).then(resp => resp.data)
  },
  getRate(type) {
    return axios.get(`${appconfig.app.apiUrl}/rate`).then(resp => resp.data)
  },
  getRemitanoRate() {
    return axios.get(`${appconfig.app.apiUrl}/remitano/rate`).then(resp => resp.data)
  },
  getRemitanoData(type, cur) {
    return axios.get(`${appconfig.app.apiUrl}/remitano`, {
      params: {
        type,
        cur
      }
    }).then(resp => resp.data)
  },
  getTrends(type) {
    return axios.get(`${appconfig.app.apiUrl}/trends`, {
      params: { type }
    }).then(resp => resp.data)
  },
  getTrendingMessage(key, type) {
    return axios.get(`${appconfig.app.apiUrl}/trending-message`, {
      params: { key, type }
    }).then(resp => resp.data)
  }
}
