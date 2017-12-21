<template>
  <div>
    <div class="tabs">
      <ul>
        <li :class="{'is-active': menu === 'tangmanh'}" @click="getTangManh()"><a>Tăng mạnh</a></li>
        <li :class="{'is-active': menu === 'giammanh'}" @click="getGiamManh()"><a>Giảm mạnh</a></li>
        <li :class="{'is-active': menu === 'binhthuong'}" @click="getBinhthuong()"><a>Ít biến động</a></li>
        <li :class="{'is-active': menu === 'tatca'}" @click="getTatca()"><a>Tất cả</a></li>
      </ul>
    </div>
    <div v-if="data">
      <div class="columns">
        <div class="column">
          <div class="control has-icons-left">
            <input class="input" type="text" placeholder="Coin name" v-model="fcoinname">
            <span class="icon is-small is-left">
              <i class="fa fa-search"></i>
            </span>
          </div>
        </div>
        <div class="column is-2">
          <div class="select is-fullwidth">
            <select v-model="fmarket">
              <option :value="undefined">Market</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="USDT">USDT</option>
            </select>
          </div>
        </div>
        <div class="column is-2">
          <input class="input" type="text" placeholder="1USDT= ? VND" v-model="vndRate">
        </div>
      </div>
      <table class="table is-bordered is-striped is-narrow is-fullwidth">
        <tr>
          <th>Market-Coin</th>
          <th @click="sortLast=sortBid=sortAsk=0; ++sortVolume;">Volume (Base Volume)
            <span class="icon is-pulled-right">
              <i class="fa" v-show="this.sortVolume % 3 !== 0" :class="{'fa-level-up': this.sortVolume % 3 === 2, 'fa-level-down': this.sortVolume % 3 === 1}"></i>
            </span>
          </th>
          <th @click="sortVolume=sortBid=sortAsk=0; ++sortLast;">Last price (High - Low)
            <span class="icon is-pulled-right">
              <i class="fa" v-show="this.sortLast % 3 !== 0" :class="{'fa-level-up': this.sortLast % 3 === 2, 'fa-level-down': this.sortLast % 3 === 1}"></i>
            </span>
          </th>
          <th @click="sortLast=sortVolume=sortAsk=0; ++sortBid;">Bid price
            <span class="icon is-pulled-right">
              <i class="fa" v-show="this.sortBid % 3 !== 0" :class="{'fa-level-up': this.sortBid % 3 === 2, 'fa-level-down': this.sortBid % 3 === 1}"></i>
            </span>
          </th>
          <th @click="sortLast=sortBid=sortVolume=0; ++sortAsk;">Ask price
            <span class="icon is-pulled-right">
              <i class="fa" v-show="this.sortAsk % 3 !== 0" :class="{'fa-level-up': this.sortAsk % 3 === 2, 'fa-level-down': this.sortAsk % 3 === 1}"></i>
            </span>
          </th>
          <th>Note</th>
        </tr>
        <tr v-for="(vl, k) in data" :key="k">          
          <th><a :href="'https://bittrex.com/Market/Index?MarketName=' + vl.market + '-' + vl.name" :target="vl.name">{{vl.name}}</a><span class="tag">{{vl.market}}</span></th>
          <td><b class="tag">{{vl.volume | $number}}</b> <small class="tag">( {{vl.baseVolume | $number}} = {{ (vl.baseVolume * vl.last.usdt) | $number}} )</small></td>
          <td>
            <div class="tag" v-if="vndRate"><b>{{vl.last.vnd | $number}}</b>&nbsp;<i class="has-text-danger">VND</i></div>
            <div class="tag" v-if="vndRate">( {{vl.low.vnd | $number}} - {{vl.high.vnd | $number}} )</div>
            <br v-if="vndRate"/>
            <div class="tag"><b>{{vl.last.usdt | $number}}</b>&nbsp;<i class="has-text-primary">USDT</i></div>
            <div class="tag">( {{vl.low.usdt | $number}} - {{vl.high.usdt | $number}} )</div>
            <br/>
            <div class="tag"><b>{{vl.last.btc | $number}}</b>&nbsp;<i class="has-text-info">BTC</i></div>
            <div class="tag">( {{vl.low.btc | $number}} - {{vl.high.btc | $number}} )</div>
            <br/>
            <div class="tag"><b>{{vl.last.eth | $number}}</b>&nbsp;<i class="has-text-warning">ETH</i></div>
            <div class="tag">( {{vl.low.eth | $number}} - {{vl.high.eth | $number}} )</div>
          </td>
          <td>
            <div class="tag" v-if="vndRate"><b>{{vl.bid.vnd | $number}}</b>&nbsp;<i class="has-text-primary">VND</i></div>
            <br v-if="vndRate"/>
            <div class="tag"><b>{{vl.bid.usdt | $number}}</b>&nbsp;<i class="has-text-primary">USDT</i></div>
            <br/>
            <div class="tag"><b>{{vl.bid.btc | $number}}</b>&nbsp;<i class="has-text-info">BTC</i></div>
            <br/>
            <div class="tag"><b>{{vl.bid.eth | $number}}</b>&nbsp;<i class="has-text-warning">ETH</i></div>
          </td>
          <td>
            <div class="tag" v-if="vndRate"><b>{{vl.ask.vnd | $number}}</b>&nbsp;<i class="has-text-primary">VND</i></div>
            <br v-if="vndRate"/>
            <div class="tag"><b>{{vl.ask.usdt | $number}}</b>&nbsp;<i class="has-text-primary">USDT</i></div>
            <br/>
            <div class="tag"><b>{{vl.ask.btc | $number}}</b>&nbsp;<i class="has-text-info">BTC</i></div>
            <br/>
            <div class="tag"><b>{{vl.ask.eth | $number}}</b>&nbsp;<i class="has-text-warning">ETH</i></div>
          </td>
          <td><span class="fa" :class="{'fa-long-arrow-down has-text-danger': vl.status < 0, 'fa-long-arrow-up has-text-success': vl.status > 0}"></span>
            &nbsp;{{vl.status}} lần liên tục</td>
        </tr>
      </table>
    </div>   
  </div>
</template>

<script>
import * as _ from 'lodash'
import Bittrex from '../provider/Bittrex'

export default {
  filters: {
    $coinname(value) {
      return value.split('-')[0]
    }
  },
  data() {
    return {
      vndRate: 0,
      sortVolume: 0,
      sortLast: 0,
      sortBid: 0,
      sortAsk: 0,
      fmarket: undefined,
      fcoinname: undefined,
      rate: {
        BTC: 0,
        ETH: 0
      },
      menu: 'tangmanh',
      tmpData: [],
      giammanh: [],
      binhthuong: []
    }
  },
  computed: {
    data() {
      if (!this.tmpData) return undefined
      let data = _.clone(this.tmpData)
      if (this.fmarket) {
        data = data.filter(e => e.market === this.fmarket)
      }
      if (this.fcoinname) {
        data = data.filter(e => {
          return `${e.market}-${e.name}`.indexOf(this.fcoinname.toUpperCase()) !== -1
        })
      }
      if (this.sortVolume % 3 === 1) data.sort((a, b) => b.volume - a.volume)
      else if (this.sortVolume % 3 === 2) data.sort((a, b) => a.volume - b.volume)

      else if (this.sortLast % 3 === 1) data.sort((a, b) => b.last - a.last)
      else if (this.sortLast % 3 === 2) data.sort((a, b) => a.last - b.last)

      else if (this.sortBid % 3 === 1) data.sort((a, b) => b.bid - a.bid)
      else if (this.sortBid % 3 === 2) data.sort((a, b) => a.bid - b.bid)

      else if (this.sortAsk % 3 === 1) data.sort((a, b) => b.ask - a.ask)
      else if (this.sortAsk % 3 === 2) data.sort((a, b) => a.ask - b.ask)
      return data
    }
  },
  mounted() {
    this.getTangManh()
  },
  watch: {
    $route({ name }) {}
  },
  methods: {
    toETH(price, market) {
      return price * (this.rate[`${market}-ETH`] || 1)
    },
    toBTC(price, market) {
      return price * (this.rate[`${market}-BTC`] || 1)
    },
    toUSDT(price, market) {
      return price * (this.rate[`${market}-USDT`] || 1)
    },
    convertData(data) {
      const self = this
      return data.map(e => {
        e.last = {
          get vnd() {
            return self.vndRate * this.usdt
          },
          usdt: self.toUSDT(e.last, e.market),
          btc: self.toBTC(e.last, e.market),
          eth: self.toETH(e.last, e.market)
        }
        e.low = {
          get vnd() {
            return self.vndRate * this.usdt
          },
          usdt: self.toUSDT(e.low, e.market),
          btc: self.toBTC(e.low, e.market),
          eth: self.toETH(e.low, e.market)
        }
        e.high = {
          get vnd() {
            return self.vndRate * this.usdt
          },
          usdt: self.toUSDT(e.high, e.market),
          btc: self.toBTC(e.high, e.market),
          eth: self.toETH(e.high, e.market)
        }
        e.bid = {
          get vnd() {
            return self.vndRate * this.usdt
          },
          usdt: self.toUSDT(e.bid, e.market),
          btc: self.toBTC(e.bid, e.market),
          eth: self.toETH(e.bid, e.market)
        }
        e.ask = {
          get vnd() {
            return self.vndRate * this.usdt
          },
          usdt: self.toUSDT(e.ask, e.market),
          btc: self.toBTC(e.ask, e.market),
          eth: self.toETH(e.ask, e.market)
        }
        return e
      })
    },
    getTatca() {
      const self = this
      Bittrex.getPrice().then(data => {
        self.rate = data.rate
        self.tmpData = self.convertData(data.data)
        window.a = self.tmpData
        self.menu = 'tatca'
      })
    },
    getTangManh() {
      const self = this
      Bittrex.getPrice('tangmanh').then(data => {
        self.rate = data.rate
        self.tmpData = self.convertData(data.data)
        self.menu = 'tatca'
      })
    },
    getGiamManh() {
      const self = this
      Bittrex.getPrice('giammanh').then(data => {
        self.rate = data.rate
        self.tmpData = self.convertData(data.data)
        self.menu = 'giammanh'
      })
    },
    getBinhthuong() {
      const self = this
      Bittrex.getPrice('binhthuong').then(data => {
        self.rate = data.rate
        self.tmpData = self.convertData(data.data)
        self.menu = 'binhthuong'
      })
    }
  }
}
</script> 
