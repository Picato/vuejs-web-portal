import axios from 'axios'

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
    return axios.get(`http://localhost:10009/market`).then(resp => resp.data)
  },
  getRate(type) {
    return axios.get(`http://localhost:10009/rate`).then(resp => resp.data)
  }
}
