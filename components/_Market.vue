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
    <table class="table is-bordered is-striped is-narrow is-fullwidth">
      <tr>
        <th>Market-Coin</th>
        <th @click="sortLast=sortBid=sortAsk=0; ++sortVolume;">Volume
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
        <th>So với 5p trước</th>
      </tr>
      <tr v-for="(vl, k) in data" :key="k">          
        <th><a :href="'https://bittrex.com/Market/Index?MarketName=' + vl.market + '-' + vl.name" :target="vl.name">{{vl.name}}</a><span class="tag">{{vl.market}}</span></th>
        <td>
          <div class="tag is-usdt"><b>{{vl.baseVolume.usdt | $number}}</b><span class="has-text-primary">&nbsp;USDT</span></div><br/>
          <div class="tag is-btc" v-if="vl.baseVolume.btc"><b>{{vl.baseVolume.btc | $number}}</b><span class="has-text-info">&nbsp;BTC</span></div>
          <div class="tag is-eth" v-if="vl.baseVolume.eth"><b>{{vl.baseVolume.eth | $number}}</b><span class="has-text-warning">&nbsp;ETH</span></div>
        </td>
        <td>
          <div class="tag is-vnd" v-if="rate.vnd"><b>{{vl.last.vnd | $number}}</b>&nbsp;<i class="has-text-dark">VND</i></div>
          <div class="tag is-vnd" v-if="rate.vnd">( {{vl.low.vnd | $number}} - {{vl.high.vnd | $number}} )</div>
          <br v-if="rate.vnd"/>
          <div class="tag is-usdt"><b>{{vl.last.usdt | $number}}</b>&nbsp;<i class="has-text-primary">USDT</i></div>
          <div class="tag is-usdt">( {{vl.low.usdt | $number}} - {{vl.high.usdt | $number}} )</div>
          <br/>
          <div class="tag is-btc"><b>{{vl.last.btc | $number}}</b>&nbsp;<i class="has-text-info">BTC</i></div>
          <div class="tag is-btc">( {{vl.low.btc | $number}} - {{vl.high.btc | $number}} )</div>
          <br/>
          <div class="tag is-eth"><b>{{vl.last.eth | $number}}</b>&nbsp;<i class="has-text-warning">ETH</i></div>
          <div class="tag is-eth">( {{vl.low.eth | $number}} - {{vl.high.eth | $number}} )</div>
        </td>
        <td>
          <div class="tag is-vnd" v-if="rate.vnd"><b>{{vl.bid.vnd | $number}}</b>&nbsp;<i class="has-text-dark">VND</i></div>
          <br v-if="rate.vnd"/>
          <div class="tag is-usdt"><b>{{vl.bid.usdt | $number}}</b>&nbsp;<i class="has-text-primary">USDT</i></div>
          <br/>
          <div class="tag is-btc"><b>{{vl.bid.btc | $number}}</b>&nbsp;<i class="has-text-info">BTC</i></div>
          <br/>
          <div class="tag is-eth"><b>{{vl.bid.eth | $number}}</b>&nbsp;<i class="has-text-warning">ETH</i></div>
        </td>
        <td>
          <div class="tag is-vnd" v-if="rate.vnd"><b>{{vl.ask.vnd | $number}}</b>&nbsp;<i class="has-text-dark">VND</i></div>
          <br v-if="rate.vnd"/>
          <div class="tag is-usdt"><b>{{vl.ask.usdt | $number}}</b>&nbsp;<i class="has-text-primary">USDT</i></div>
          <br/>
          <div class="tag is-btc"><b>{{vl.ask.btc | $number}}</b>&nbsp;<i class="has-text-info">BTC</i></div>
          <br/>
          <div class="tag is-eth"><b>{{vl.ask.eth | $number}}</b>&nbsp;<i class="has-text-warning">ETH</i></div>
        </td>
        <td>
          <span class="fa" :class="{'fa-long-arrow-down has-text-danger': vl.trends.usdt < 0, 'fa-long-arrow-up has-text-success': vl.trends.usdt > 0}"></span>&nbsp;
          <div class="tag is-vnd" v-if="rate.vnd && vl.trends.usdt != 0"><b>{{vl.trends.vnd | $number}}</b>&nbsp;<i class="has-text-dark">VND</i></div>
          <br v-if="rate.vnd"/>
          <div class="tag is-usdt" v-show="vl.trends.usdt != 0"><b>{{vl.trends.usdt | $number}}</b>&nbsp;<i class="has-text-primary">USDT</i></div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import * as _ from 'lodash'
import Bittrex from '../provider/Bittrex'

export default {
  props: ['rate'],
  filters: {
    $coinname(value) {
      return value.split('-')[0]
    }
  },
  data() {
    return {
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

      if (this.sortVolume % 3 === 1) data.sort((a, b) => b.baseVolume.usdt - a.baseVolume.usdt)
      else if (this.sortVolume % 3 === 2) data.sort((a, b) => a.baseVolume.usdt - b.baseVolume.usdt)

      else if (this.sortLast % 3 === 1) data.sort((a, b) => b.last.usdt - a.last.usdt)
      else if (this.sortLast % 3 === 2) data.sort((a, b) => a.last.usdt - b.last.usdt)

      else if (this.sortBid % 3 === 1) data.sort((a, b) => b.bid.usdt - a.bid.usdt)
      else if (this.sortBid % 3 === 2) data.sort((a, b) => a.bid.usdt - b.bid.usdt)

      else if (this.sortAsk % 3 === 1) data.sort((a, b) => b.ask.usdt - a.ask.usdt)
      else if (this.sortAsk % 3 === 2) data.sort((a, b) => a.ask.usdt - b.ask.usdt)
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
      return data.map(e => {
        if (e.trends) {
          Object.defineProperty(e.trends, 'vnd', {
            get() {
              return self.rate.vnd * this.usdt
            }
          })
        }
        Object.defineProperty(e.prev, 'vnd', {
          get() {
            return self.rate.vnd * this.usdt
          }
        })
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
