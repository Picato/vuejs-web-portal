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
          <select v-model="ftime" @change="getTatca()">
            <option value="sec">Thời gian 30 giây</option>
            <option value="min">5 phút</option>
            <option value="hour">1 tiếng</option>
            <option value="day">1 ngày</option>
          </select>
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
        <th @click="sortLast=sortBid=sortAsk=sortPercent=0; ++sortVolume;" class="is-cursor">Volume
          <span class="icon is-pulled-right">
            <i class="fa" v-show="this.sortVolume % 3 !== 0" :class="{'fa-level-up': this.sortVolume % 3 === 2, 'fa-level-down': this.sortVolume % 3 === 1}"></i>
          </span>
        </th>
        <th @click="sortVolume=sortBid=sortAsk=sortPercent=0; ++sortLast;" class="is-cursor">Last price (High - Low)
          <span class="icon is-pulled-right">
            <i class="fa" v-show="this.sortLast % 3 !== 0" :class="{'fa-level-up': this.sortLast % 3 === 2, 'fa-level-down': this.sortLast % 3 === 1}"></i>
          </span>
        </th>
        <th @click="sortLast=sortVolume=sortAsk=sortPercent=0; ++sortBid;" class="is-cursor">Bid price
          <span class="icon is-pulled-right">
            <i class="fa" v-show="this.sortBid % 3 !== 0" :class="{'fa-level-up': this.sortBid % 3 === 2, 'fa-level-down': this.sortBid % 3 === 1}"></i>
          </span>
        </th>
        <th @click="sortLast=sortBid=sortVolume=sortPercent=0; ++sortAsk;" class="is-cursor">Ask price
          <span class="icon is-pulled-right">
            <i class="fa" v-show="this.sortAsk % 3 !== 0" :class="{'fa-level-up': this.sortAsk % 3 === 2, 'fa-level-down': this.sortAsk % 3 === 1}"></i>
          </span>
        </th>
        <th @click="sortLast=sortBid=sortVolume=sortAsk; ++sortPercent;" class="is-cursor">Changing in 30s
          <span class="icon is-pulled-right">
            <i class="fa" v-show="this.sortPercent % 3 !== 0" :class="{'fa-level-up': this.sortPercent % 3 === 2, 'fa-level-down': this.sortPercent % 3 === 1}"></i>
          </span>
        </th>
      </tr>
      <tr v-for="(vl, k) in data" :key="k">
        <th><a :href="'https://bittrex.com/Market/Index?MarketName=' + vl.market + '-' + vl.name" :target="vl.name">{{vl.name}}</a><span class="tag">{{vl.market}}</span></th>
        <td>
          <div class="tag"><b>{{vl.baseVolume | $number}}</b><span :class="'is-' + vl.market">&nbsp;{{vl.market}}</span></div>
          <div class="tag is-pulled-right" :class="{'has-text-danger': vl.baseVolumePercent < 0, 'has-text-success': vl.baseVolumePercent > 0}" v-if="vl.baseVolumePercent">{{vl.baseVolumePercent | $number}}%</div>
        </td>
        <td>          
          <div class="tag"><b>{{vl.last | $number}}</b>&nbsp;<i :class="'is-' + vl.market">{{vl.market}}</i></div>
          <div class="tag">( {{vl.low | $number}} - {{vl.high | $number}} )</div>          
        </td>
        <td>          
          <div class="tag"><b>{{vl.bid | $number}}</b>&nbsp;<i :class="'is-' + vl.market">{{vl.market}}</i></div>
        </td>
        <td>
          <div class="tag"><b>{{vl.ask | $number}}</b>&nbsp;<i :class="'is-' + vl.market">{{vl.market}}</i></div>          
        </td>
        <td>
          <span class="fa" :class="{'fa-long-arrow-up has-text-success': vl.percent > 0, 'fa-long-arrow-down has-text-danger': vl.percent < 0 }" v-show="vl.percent"></span>&nbsp;{{vl.percent}} %
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
      sortPercent: 0,
      minsBefore: 5,
      sortVolume: 0,
      sortLast: 0,
      sortBid: 0,
      sortAsk: 0,
      ftime: 'sec',
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

      if (this.sortPercent % 3 === 1) data.sort((a, b) => b.percent - a.percent)
      else if (this.sortPercent % 3 === 2) data.sort((a, b) => a.percent - b.percent)

      else if (this.sortVolume % 3 === 1) data.sort((a, b) => b.baseVolume - a.baseVolume)
      else if (this.sortVolume % 3 === 2) data.sort((a, b) => a.baseVolume - b.baseVolume)

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
    this.getTatca()
  },
  watch: {
    $route({ name }) {}
  },
  methods: {
    convertData(data) {
      return data
    },
    getTatca() {
      const self = this
      Bittrex.getPrice(self.ftime).then(data => {
        self.tmpData = self.convertData(data)
        setTimeout(self.getTatca, 30000)
      })
    }
  }
}
</script> 
