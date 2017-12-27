import axios from 'axios'

const HOST = 'http://localhost:10009'

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
  getPrice(type) {
    return axios.get(`${HOST}/market`).then(resp => resp.data)
  },
  getRate(type) {
    return axios.get(`${HOST}/rate`).then(resp => resp.data)
  },
  getTrends(type) {
    return axios.get(`${HOST}/trends`, {
      params: { type }
    }).then(resp => resp.data)
  }
}
