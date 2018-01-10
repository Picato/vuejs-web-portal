<template>
  <div v-if="detail" style="background: white; padding: 16px;">
    <h1 class="title">
      <a :href="'https://bittrex.com/Market/Index?MarketName=' + detail.key" :target="detail.key">{{detail.key}}</a>
      <small class="subtitle">{{detail.last | $number}}
        <small :class="{'has-text-success': detail.num > 0, 'has-text-danger': detail.num < 0}">{{detail.num > 0 ? '+' : ''}}{{detail.num | $number}}</small>
      </small>            
      <small class="subtitle" style="position: absolute; right: 16px; top: 20px;">{{detail.time | $date('HH:mm DD/MM/YYYY')}}</small>
    </h1>        
    <div class="control">
      <label class="radio">
        <input type="radio" value="HandlerMin1" v-model="ftime">
        Last 1 minutes
      </label>
      <label class="radio">
        <input type="radio" value="HandlerMin3" v-model="ftime">
        Last 3 minutes
      </label>
      <label class="radio">
        <input type="radio" value="HandlerMin5" v-model="ftime">
        Last 5 minutes
      </label>
      <label class="radio">
        <input type="radio" value="HandlerMin30" v-model="ftime">
        Last 30 minutes
      </label>
      <label class="radio">
        <input type="radio" value="HandlerHour1" v-model="ftime">
        Last 1 hours
      </label>
      <label class="radio">
        <input type="radio" value="HandlerDay1" v-model="ftime">
        Last 1 days
      </label>
    </div>
    <hr />
    <div class="columns">
      <div class="column">
        <div class="columns">
          <div class="column">
            <CandleChart :market="detail.key" :time="ftime"></CandleChart>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <VolumeChart :market="detail.key" :time="ftime"></VolumeChart>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <TimeInDecreaseChart :market="detail.key" :time="ftime"></TimeInDecreaseChart>
          </div>
        </div>
      </div>
      <div class="column is-3">
        <TrendsMessage :market="detail.key" :time="ftime"></TrendsMessage>
      </div>
    </div>
  </div>
</template>

<script>
import TimeInDecreaseChart from './_TimeInDecreaseChart'
import VolumeChart from './_VolumeChart'
import CandleChart from './_CandleChart'
import TrendsMessage from './_TrendsMessage'
import Bittrex from '../../provider/Bittrex'

export default {
  filters: { },
  components: { VolumeChart, CandleChart, TrendsMessage, TimeInDecreaseChart },
  data() {
    return {
      market: undefined,
      detail: undefined,
      ftime: 'HandlerMin30',
      tab: 'candle'
    }
  },
  watch: { },
  computed: { },
  mounted() {
    const self = this
    this.market = this.$route.params.key
    if (!this.market) {
      return alert('Not found market')
    }
    self.updateLastPrice().then(() => {
      setInterval(() => {
        self.updateLastPrice.apply(self)
      }, 5000)
    })
  },
  methods: {
    updateLastPrice() {
      const self = this
      return Bittrex.getPriceDetail('HandlerMin1', self.market).then(data => {
        if (self.ftime !== 'HandlerMin1') {
          return Bittrex.getPriceDetail(self.ftime, self.market).then(odata => {
            self.detail = Object.assign(data, { num: data.last - odata.last })
          })
        }
      })
    }
  }
}
</script> 
