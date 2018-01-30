<template>
  <div>
     <div v-if="data">
      <div class="columns">
        <div class="column is-2">
          <div class="control has-icons-left">
            <input class="input" type="text" placeholder="Coin name" v-model="fcoinname">
            <span class="icon is-small is-left">
              <i class="fa fa-search"></i>
            </span>
          </div>
        </div>
        <div class="column is-1">
          <div class="select is-fullwidth">
            <select v-model="fmarket">
              <option :value="undefined">Market</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="USDT">USDT</option>
            </select>
          </div>
        </div>
        <div class="column">
          <div class="control">
            <label class="radio">
              <input type="radio" value="RawHandler" v-model="ftime" @change="getTatca()">
              Last 5s
            </label>
            <label class="radio">
              <input type="radio" value="HandlerMin1" v-model="ftime" @change="getTatca()">
              Last 1 minutes
            </label>
            <label class="radio">
              <input type="radio" value="HandlerMin30" v-model="ftime" @change="getTatca()">
              Last 30 minutes
            </label>
            <label class="radio">
              <input type="radio" value="HandlerHour1" v-model="ftime" @change="getTatca()">
              Last 1 hours
            </label>
            <label class="radio">
              <input type="radio" value="HandlerDay1" v-model="ftime" @change="getTatca()">
              Last 1 days
            </label>
          </div>
        </div>        
      </div>
      <hr/>
      <table class="table is-bordered is-striped is-narrow is-fullwidth">
        <tr>
          <th width="120">Coin <span class="tag">Market</span></th>
          <th @click="sortLast=sortBid=sortAsk=sortPercent=sortPrev=0; ++sortVolume;" class="is-cursor" width="350">Volume
            <span class="icon is-pulled-right">
              <i class="fa" v-show="this.sortVolume % 5 !== 0" :class="{'fa-level-up': [2, 4].includes(this.sortVolume % 5), 'fa-level-down': [1, 3].includes(this.sortVolume % 5)}"></i>&nbsp;
              <span v-show="[1, 2].includes(this.sortVolume % 5)"></span>
              <span v-show="[3, 4].includes(this.sortVolume % 5)">%</span>
            </span>
          </th>
          <th @click="sortVolume=sortBid=sortAsk=sortPercent=sortPrev=0; ++sortLast;" class="is-cursor" width="320">Last price (High - Low)
            <span class="icon is-pulled-right">
              <i class="fa" v-show="this.sortLast % 3 !== 0" :class="{'fa-level-up': this.sortLast % 3 === 2, 'fa-level-down': this.sortLast % 3 === 1}"></i>
            </span>
          </th>
          <th @click="sortLast=sortVolume=sortAsk=sortPercent=sortBid=0; ++sortPrev;" class="is-cursor" width="180">Prev price
            <span class="icon is-pulled-right">
              <i class="fa" v-show="this.sortPrev % 3 !== 0" :class="{'fa-level-up': this.sortPrev % 3 === 2, 'fa-level-down': this.sortPrev % 3 === 1}"></i>
            </span>
          </th>          
          <th @click="sortLast=sortVolume=sortAsk=sortPercent=sortPrev=0; ++sortBid;" class="is-cursor" width="180" v-if="ftime === 'RawHandler'">Bid price
            <span class="icon is-pulled-right">
              <i class="fa" v-show="this.sortBid % 3 !== 0" :class="{'fa-level-up': this.sortBid % 3 === 2, 'fa-level-down': this.sortBid % 3 === 1}"></i>
            </span>
          </th>
          <th @click="sortLast=sortBid=sortVolume=sortPercent=sortPrev=0; ++sortAsk;" class="is-cursor" width="180" v-if="ftime === 'RawHandler'">Ask price
            <span class="icon is-pulled-right">
              <i class="fa" v-show="this.sortAsk % 3 !== 0" :class="{'fa-level-up': this.sortAsk % 3 === 2, 'fa-level-down': this.sortAsk % 3 === 1}"></i>
            </span>
          </th>
          <th @click="sortLast=sortBid=sortVolume=sortAsk=sortPrev=0; ++sortPercent;" class="is-cursor">Changing rate
            <span class="icon is-pulled-right">
              <i class="fa" v-show="this.sortPercent % 3 !== 0" :class="{'fa-level-up': this.sortPercent % 3 === 2, 'fa-level-down': this.sortPercent % 3 === 1}"></i>
            </span>
          </th>    
        </tr>
        <tr v-for="(vl, k) in data" :key="k">
          <th>
            <span class="tag">{{vl.market}}</span><a :href="'/coin/market/' + vl.market + '-' + vl.name" :target="vl.name">{{vl.name}}</a>
          </th>
          <td>
            <div class="tag"><b>{{vl.baseVolume | $number}}</b><span :class="'is-' + vl.market">&nbsp;{{vl.market}}</span></div>
            <div class="tag is-pulled-right" :class="{'has-text-danger': vl.baseVolumePercent < 0, 'has-text-success': vl.baseVolumePercent > 0}" v-if="vl.baseVolumePercent">{{vl.baseVolumePercent | $number}}%</div>
          </td>
          <td>          
            <div class="tag"><b>{{vl.last | $number}}</b>&nbsp;<i :class="'is-' + vl.market">{{vl.market}}</i></div>
            <div class="tag" v-if="vl.low !== undefined && vl.high !== undefined">( {{vl.low | $number}} - {{vl.high | $number}} )</div>          
          </td>
          <td>          
            <div class="tag"><b>{{vl.prev | $number}}</b>&nbsp;<i :class="'is-' + vl.market">{{vl.market}}</i></div>
          </td>
          <td v-if="ftime === 'RawHandler'">          
            <div class="tag"><b>{{vl.bid | $number}}</b>&nbsp;<i :class="'is-' + vl.market">{{vl.market}}</i></div>
          </td>
          <td v-if="ftime === 'RawHandler'">
            <div class="tag"><b>{{vl.ask | $number}}</b>&nbsp;<i :class="'is-' + vl.market">{{vl.market}}</i></div>          
          </td>        
          <td>
            <span v-show="vl.percent">
              <span class="fa" :class="{'fa-long-arrow-up has-text-success': vl.percent > 0, 'fa-long-arrow-down has-text-danger': vl.percent < 0 }"></span>&nbsp;{{vl.percent | $number}}%
            </span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<style scoped>
.modal-content {
  width: 90%;
  min-height: 80vh;
}
</style>

<script>
import * as _ from 'lodash'
import Bittrex from '../provider/Bittrex'

export default {
  props: ['rate'],
  components: { },
  filters: {
    $coinname(value) {
      return value.split('-')[0]
    }
  },
  data() {
    return {
      sortPercent: 0,
      minsBefore: 5,
      sortPrev: 0,
      sortVolume: 0,
      sortLast: 0,
      sortBid: 0,
      sortAsk: 0,
      ftime: 'RawHandler',
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

      else if (this.sortPrev % 3 === 1) data.sort((a, b) => b.prev - a.prev)
      else if (this.sortPrev % 3 === 2) data.sort((a, b) => a.prev - b.prev)

      else if (this.sortVolume % 5 === 1) data.sort((a, b) => b.baseVolume - a.baseVolume)
      else if (this.sortVolume % 5 === 2) data.sort((a, b) => a.baseVolume - b.baseVolume)
      else if (this.sortVolume % 5 === 3) data.sort((a, b) => b.baseVolumePercent - a.baseVolumePercent)
      else if (this.sortVolume % 5 === 4) data.sort((a, b) => a.baseVolumePercent - b.baseVolumePercent)

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
      const time = this.ftime === 'RawHandler' ? 5000 : 30000
      Bittrex.getPrice(self.ftime, undefined, {recordsPerPage: 0}).then(data => {
        self.tmpData = self.convertData(data)
        setTimeout(self.getTatca, time)
      })
    }
  }
}
</script> 
