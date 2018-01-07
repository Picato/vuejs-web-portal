<template>
  <div v-if="detail" style="background: white; padding: 16px;">
    <div class="tabs is-boxed">
      <ul>        
        <li :class="{'is-active': tab === 'candle'}" @click="tab = 'candle'">
          <a>
            <span class="icon is-small"><i class="fa fa-area-chart"></i></span>
            <span>Candle</span>
          </a>
        </li>
        <li :class="{'is-active': tab === 'volume'}" @click="tab = 'volume'">
          <a>
            <span class="icon is-small"><i class="fa fa-bar-chart"></i></span>
            <span>Volume</span>
          </a>
        </li>
        <li :class="{'is-active': tab === 'message'}" @click="tab = 'message'">
          <a>
            <span class="icon is-small"><i class="fa fa-envelope"></i></span>
            <span>Message</span>
          </a>
        </li>
        <li style="position: absolute; right: 0px; margin-right: 50px;">
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
        </li>
      </ul>
    </div>
    <div>      
      <VolumeChart v-if="tab === 'volume'" :market="detail.key" :time="ftime"></VolumeChart>
      <CandleChart v-if="tab === 'candle'" :market="detail.key" :time="ftime"></CandleChart>
      <TrendsMessage v-if="tab === 'message'" :market="detail.key" :time="ftime"></TrendsMessage>
    </div>
  </div>
</template>

<script>
import VolumeChart from './_VolumeChart'
import CandleChart from './_CandleChart'
import TrendsMessage from './_TrendsMessage'
import Bittrex from '../../provider/Bittrex'

export default {
  props: ['detail', 'time'],
  filters: { },
  components: { VolumeChart, CandleChart, TrendsMessage },
  data() {
    return {
      ftime: undefined,
      tab: 'candle'
    }
  },
  watch: { },
  computed: { },
  mounted() {
    const self = this
    this.ftime = this.time
    setInterval(() => {
      self.updateLastPrice.apply(self)
    }, 5000)
  },
  methods: {
    updateLastPrice() {
      const self = this
      Bittrex.getPriceDetail('HandlerMin1', self.detail.key).then(data => {
        self.$set(self.detail, 'last', data.last)
        self.$set(self.detail, 'time', data.time)
      })
    }
  }
}
</script> 
