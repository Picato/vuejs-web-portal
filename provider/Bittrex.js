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
    return axios.get(`http://blaz.clipvnet.com/checking-coin`, {
      params: {
        type
      }
    }).then(resp => resp.data)
  }
}
