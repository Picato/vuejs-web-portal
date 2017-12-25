<template>
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
    </div>
    <div v-if="data.length === 0">
      Loading...
    </div>
    <table class="table is-bordered is-striped is-narrow is-fullwidth" v-else>
      <tr>
        <th>Market-Coin</th>
        <th @click="sortLast=sortBid=sortAsk=sortBuf=0; ++sortVolume;">Volume
          <span class="icon is-pulled-right">
            <i class="fa" v-show="this.sortVolume % 3 !== 0" :class="{'fa-level-up': this.sortVolume % 3 === 2, 'fa-level-down': this.sortVolume % 3 === 1}"></i>
          </span>
        </th>
        <th @click="sortVolume=sortBid=sortAsk=sortBuf=0; ++sortLast;">Last price (High - Low)
          <span class="icon is-pulled-right">
            <i class="fa" v-show="this.sortLast % 3 !== 0" :class="{'fa-level-up': this.sortLast % 3 === 2, 'fa-level-down': this.sortLast % 3 === 1}"></i>
          </span>
        </th>
        <th @click="sortLast=sortVolume=sortAsk=sortBuf=0; ++sortBid;">Bid price
          <span class="icon is-pulled-right">
            <i class="fa" v-show="this.sortBid % 3 !== 0" :class="{'fa-level-up': this.sortBid % 3 === 2, 'fa-level-down': this.sortBid % 3 === 1}"></i>
          </span>
        </th>
        <th @click="sortLast=sortBid=sortVolume=sortBuf=0; ++sortAsk;">Ask price
          <span class="icon is-pulled-right">
            <i class="fa" v-show="this.sortAsk % 3 !== 0" :class="{'fa-level-up': this.sortAsk % 3 === 2, 'fa-level-down': this.sortAsk % 3 === 1}"></i>
          </span>
        </th>
        <th @click="sortLast=sortBid=sortVolume=sortAsk; ++sortBuf;">Giá 45 phút trước
          <span class="icon is-pulled-right">
            <i class="fa" v-show="this.sortBuf % 3 !== 0" :class="{'fa-level-up': this.sortBuf % 3 === 2, 'fa-level-down': this.sortBuf % 3 === 1}"></i>
          </span>
        </th>
      </tr>
      <tr v-for="(vl, k) in data" :key="k">
        <th><a :href="'https://bittrex.com/Market/Index?MarketName=' + vl.market + '-' + vl.name" :target="vl.name">{{vl.name}}</a><span class="tag">{{vl.market}}</span></th>
        <td>
          <div class="tag is-usdt"><b>{{vl.histories[0].baseVolume.usdt | $number}}</b><span class="has-text-primary">&nbsp;USDT</span></div><br/>
          <div class="tag is-btc" v-if="vl.histories[0].baseVolume.btc"><b>{{vl.histories[0].baseVolume.btc | $number}}</b><span class="has-text-info">&nbsp;BTC</span></div>
          <div class="tag is-eth" v-if="vl.histories[0].baseVolume.eth"><b>{{vl.histories[0].baseVolume.eth | $number}}</b><span class="has-text-warning">&nbsp;ETH</span></div>
        </td>
        <td>
          <div class="tag is-vnd" v-if="rate.vnd"><b>{{vl.histories[0].last.vnd | $number}}</b>&nbsp;<i class="has-text-dark">VND</i></div>
          <div class="tag is-vnd" v-if="rate.vnd">( {{vl.histories[0].low.vnd | $number}} - {{vl.histories[0].high.vnd | $number}} )</div>
          <br v-if="rate.vnd"/>
          <div class="tag is-usdt"><b>{{vl.histories[0].last.usdt | $number}}</b>&nbsp;<i class="has-text-primary">USDT</i></div>
          <div class="tag is-usdt">( {{vl.histories[0].low.usdt | $number}} - {{vl.histories[0].high.usdt | $number}} )</div>
          <br/>
          <div class="tag is-btc"><b>{{vl.histories[0].last.btc | $number}}</b>&nbsp;<i class="has-text-info">BTC</i></div>
          <div class="tag is-btc">( {{vl.histories[0].low.btc | $number}} - {{vl.histories[0].high.btc | $number}} )</div>
          <br/>
          <div class="tag is-eth"><b>{{vl.histories[0].last.eth | $number}}</b>&nbsp;<i class="has-text-warning">ETH</i></div>
          <div class="tag is-eth">( {{vl.histories[0].low.eth | $number}} - {{vl.histories[0].high.eth | $number}} )</div>
        </td>
        <td>
          <div class="tag is-vnd" v-if="rate.vnd"><b>{{vl.histories[0].bid.vnd | $number}}</b>&nbsp;<i class="has-text-dark">VND</i></div>
          <br v-if="rate.vnd"/>
          <div class="tag is-usdt"><b>{{vl.histories[0].bid.usdt | $number}}</b>&nbsp;<i class="has-text-primary">USDT</i></div>
          <br/>
          <div class="tag is-btc"><b>{{vl.histories[0].bid.btc | $number}}</b>&nbsp;<i class="has-text-info">BTC</i></div>
          <br/>
          <div class="tag is-eth"><b>{{vl.histories[0].bid.eth | $number}}</b>&nbsp;<i class="has-text-warning">ETH</i></div>
        </td>
        <td>
          <div class="tag is-vnd" v-if="rate.vnd"><b>{{vl.histories[0].ask.vnd | $number}}</b>&nbsp;<i class="has-text-dark">VND</i></div>
          <br v-if="rate.vnd"/>
          <div class="tag is-usdt"><b>{{vl.histories[0].ask.usdt | $number}}</b>&nbsp;<i class="has-text-primary">USDT</i></div>
          <br/>
          <div class="tag is-btc"><b>{{vl.histories[0].ask.btc | $number}}</b>&nbsp;<i class="has-text-info">BTC</i></div>
          <br/>
          <div class="tag is-eth"><b>{{vl.histories[0].ask.eth | $number}}</b>&nbsp;<i class="has-text-warning">ETH</i></div>
        </td>
        <td>
          <LineChart :data="vl.histories.map(e=>e.last[vl.market.toLowerCase()]).reverse()"></LineChart>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import * as _ from 'lodash'
import Bittrex from '../provider/Bittrex'
import LineChart from './_LineChart'

export default {
  props: ['rate'],
  components: { LineChart },
  filters: {
    $coinname(value) {
      return value.split('-')[0]
    }
  },
  data() {
    return {
      sortBuf: 0,
      minsBefore: 5,
      sortVolume: 0,
      sortLast: 0,
      sortBid: 0,
      sortAsk: 0,
      fmarket: undefined,
      fcoinname: undefined,
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

      if (this.sortBuf % 3 === 1) data.sort((a, b) => b.buf.usdt - a.buf.usdt)
      else if (this.sortBuf % 3 === 2) data.sort((a, b) => a.buf.usdt - b.buf.usdt)

      else if (this.sortVolume % 3 === 1) data.sort((a, b) => b.histories[0].baseVolume.usdt - a.histories[0].baseVolume.usdt)
      else if (this.sortVolume % 3 === 2) data.sort((a, b) => a.histories[0].baseVolume.usdt - b.histories[0].baseVolume.usdt)

      else if (this.sortLast % 3 === 1) data.sort((a, b) => b.histories[0].last.usdt - a.histories[0].last.usdt)
      else if (this.sortLast % 3 === 2) data.sort((a, b) => a.histories[0].last.usdt - b.histories[0].last.usdt)

      else if (this.sortBid % 3 === 1) data.sort((a, b) => b.histories[0].bid.usdt - a.histories[0].bid.usdt)
      else if (this.sortBid % 3 === 2) data.sort((a, b) => a.histories[0].bid.usdt - b.histories[0].bid.usdt)

      else if (this.sortAsk % 3 === 1) data.sort((a, b) => b.histories[0].ask.usdt - a.histories[0].ask.usdt)
      else if (this.sortAsk % 3 === 2) data.sort((a, b) => a.histories[0].ask.usdt - b.histories[0].ask.usdt)
      return data
    }
  },
  mounted() {
    this.getTatca()
  },
  watch: {
    $route({ name }) {}
  },
  methods: {
    convertData(data) {
      const self = this
      return data.map(t => {
        if (t.buf) {
          Object.defineProperty(t.buf, 'vnd', {
            get() {
              return self.rate.vnd * this.usdt
            }
          })
        }
        t.histories = t.histories.map(e => {
          Object.defineProperty(e.last, 'vnd', {
            get() {
              return self.rate.vnd * this.usdt
            }
          })
          Object.defineProperty(e.low, 'vnd', {
            get() {
              return self.rate.vnd * this.usdt
            }
          })
          Object.defineProperty(e.high, 'vnd', {
            get() {
              return self.rate.vnd * this.usdt
            }
          })
          Object.defineProperty(e.bid, 'vnd', {
            get() {
              return self.rate.vnd * this.usdt
            }
          })
          Object.defineProperty(e.ask, 'vnd', {
            get() {
              return self.rate.vnd * this.usdt
            }
          })
          return e
        })
        return t
      })
    },
    getTatca() {
      const self = this
      Bittrex.getPrice().then(data => {
        self.tmpData = self.convertData(data)
        setTimeout(self.getTatca, 30000)
      })
    },
    getTangManh() {
      const self = this
      Bittrex.getPrice('tangmanh').then(data => {
        self.tmpData = self.convertData(data)
      })
    },
    getGiamManh() {
      const self = this
      Bittrex.getPrice('giammanh').then(data => {
        self.tmpData = self.convertData(data)
      })
    },
    getBinhthuong() {
      const self = this
      Bittrex.getPrice('binhthuong').then(data => {
        self.tmpData = self.convertData(data)
      })
    }
  }
}
</script> 
