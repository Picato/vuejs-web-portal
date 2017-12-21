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
          <td><b class="tag">{{vl.volume | $number}}</b> <small class="tag">( {{vl.baseVolume | $number}} )</small></td>
          <td>
            <div class="tag" v-if="vndRate"><b>{{toVND(vl.last, vl.market) | $number}}</b>&nbsp;<i class="has-text-danger">VND</i></div>
            <div class="tag" v-if="vndRate">( {{toVND(vl.low, vl.market) | $number}} - {{toVND(vl.high, vl.market) | $number}} )</div>
            <br v-if="vndRate"/>
            <div class="tag"><b>{{toUSDT(vl.last, vl.market) | $number}}</b>&nbsp;<i class="has-text-primary">USDT</i></div>
            <div class="tag">( {{toUSDT(vl.low, vl.market) | $number}} - {{toUSDT(vl.high, vl.market) | $number}} )</div>
            <br/>
            <div class="tag"><b>{{toBTC(vl.last, vl.market) | $number}}</b>&nbsp;<i class="has-text-info">BTC</i></div>
            <div class="tag">( {{toBTC(vl.low, vl.market) | $number}} - {{toBTC(vl.high, vl.market) | $number}} )</div>
            <br/>
            <div class="tag"><b>{{toETH(vl.last, vl.market) | $number}}</b>&nbsp;<i class="has-text-warning">ETH</i></div>
            <div class="tag">( {{toETH(vl.low, vl.market) | $number}} - {{toETH(vl.high, vl.market) | $number}} )</div>
          </td>
          <td>
            <div class="tag" v-if="vndRate"><b>{{toVND(vl.bid, vl.market) | $number}}</b>&nbsp;<i class="has-text-primary">VND</i></div>
            <br v-if="vndRate"/>
            <div class="tag"><b>{{toUSDT(vl.bid, vl.market) | $number}}</b>&nbsp;<i class="has-text-primary">USDT</i></div>
            <br/>
            <div class="tag"><b>{{toBTC(vl.bid, vl.market) | $number}}</b>&nbsp;<i class="has-text-info">BTC</i></div>
            <br/>
            <div class="tag"><b>{{toETH(vl.bid, vl.market) | $number}}</b>&nbsp;<i class="has-text-warning">ETH</i></div>
          </td>
          <td>
            <div class="tag" v-if="vndRate"><b>{{toVND(vl.ask, vl.market) | $number}}</b>&nbsp;<i class="has-text-primary">VND</i></div>
            <br v-if="vndRate"/>
            <div class="tag"><b>{{toUSDT(vl.ask, vl.market) | $number}}</b>&nbsp;<i class="has-text-primary">USDT</i></div>
            <br/>
            <div class="tag"><b>{{toBTC(vl.ask, vl.market) | $number}}</b>&nbsp;<i class="has-text-info">BTC</i></div>
            <br/>
            <div class="tag"><b>{{toETH(vl.ask, vl.market) | $number}}</b>&nbsp;<i class="has-text-warning">ETH</i></div>
          </td>
          <td><span class="fa" :class="{'fa-long-arrow-down has-text-danger': vl.status < 0, 'fa-long-arrow-up has-text-success': vl.status > 0}"></span>
            &nbsp;{{vl.status}} lần liên tục</td>
        </tr>
      </table>
    </div>   
  </div>
</template>
<style scoped>
.jsoneditor-vue {
  height: 600px;
}
</style>

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
          return e.name.indexOf(this.fcoinname.toUpperCase()) !== -1
        })
      }
      if (this.sortVolume % 3 === 1) data.sort((a, b) => b.volume - a.volume)
      if (this.sortVolume % 3 === 2) data.sort((a, b) => a.volume - b.volume)

      if (this.sortLast % 3 === 1) data.sort((a, b) => b.last - a.last)
      if (this.sortLast % 3 === 2) data.sort((a, b) => a.last - b.last)

      if (this.sortBid % 3 === 1) data.sort((a, b) => b.bid - a.bid)
      if (this.sortBid % 3 === 2) data.sort((a, b) => a.bid - b.bid)

      if (this.sortAsk % 3 === 1) data.sort((a, b) => b.ask - a.ask)
      if (this.sortAsk % 3 === 2) data.sort((a, b) => a.ask - b.ask)
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
    toVND(price, market) {
      return this.toUSDT(price, market) * (this.vndRate || 1)
    },
    toETH(price, market) {
      return price * (this.rate[`${market}-ETH`] || 1)
    },
    toBTC(price, market) {
      return price * (this.rate[`${market}-BTC`] || 1)
    },
    toUSDT(price, market) {
      return price * (this.rate[`${market}-USDT`] || 1)
    },
    getTatca() {
      const self = this
      Bittrex.getPrice().then(data => {
        self.rate = data.rate
        self.tmpData = data.data
        self.menu = 'tatca'
      })
    },
    getTangManh() {
      Bittrex.getPrice('tangmanh').then(data => {
        this.rate = data.rate
        this.tmpData = data.data
        this.menu = 'tatca'
      })
    },
    getGiamManh() {
      Bittrex.getPrice('giammanh').then(data => {
        this.rate = data.rate
        this.tmpData = data.data
        this.menu = 'giammanh'
      })
    },
    getBinhthuong() {
      Bittrex.getPrice('binhthuong').then(data => {
        this.rate = data.rate
        this.tmpData = data.data
        this.menu = 'binhthuong'
      })
    }
  }
}
</script> 
