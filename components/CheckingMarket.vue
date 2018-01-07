<template>
  <div>
    <RateComponent v-if="rate" :rate="rate" :lastsync="lastsync" @changeVND="changeVND($event)"></RateComponent>
    <div class="tabs is-boxed" v-if="rate">
      <ul>
        <li :class="{'is-active': menu === 'tatca'}" @click="menu='tatca'"><a>
          <span class="icon is-small"><i class="fa fa-dashboard"></i></span>
          <span>Thống kê</span>
        </a></li>
        <li :class="{'is-active': menu === 'chart'}" @click="menu='chart'">
          <a>
            <span class="icon is-small"><i class="fa fa-line-chart"></i></span>
            <span>Chart summary</span>
          </a>
        </li>
        <li :class="{'is-active': menu === 'trendingmessage'}" @click="menu='trendingmessage'">
          <a>
            <span class="icon is-small"><i class="fa fa-commenting-o"></i></span>
            <span>Trendding messsages</span>
          </a>
        </li>
        <li :class="{'is-active': menu === 'telegram'}" @click="menu='telegram'">
          <a>
            <span class="icon is-small"><i class="fa fa-rss"></i></span>
            <span>NewsFeed</span>
          </a>
        </li>        
        <li :class="{'is-active': menu === 'tinhlai'}" @click="menu='tinhlai'">
          <a>
            <span class="icon is-small"><i class="fa fa-calculator"></i></span>
            <span>Tính lãi</span>
          </a>
        </li>        
      </ul>
    </div>
    <div>
      <MarketComponent :rate="rate" v-if="rate && menu === 'tatca'"></MarketComponent>
      <ChartSummaryComponent v-if="menu === 'chart'"></ChartSummaryComponent>
      <TrendingMessageComponent v-if="menu === 'trendingmessage'"></TrendingMessageComponent>
      <TelegramComponent v-show="menu === 'telegram'"></TelegramComponent>
      <TinhLaiComponent :rate="rate" v-if="rate" v-show="menu === 'tinhlai'"></TinhLaiComponent>            
    </div>

  </div>
</template>
<style>
.is-USDT {
  color: #00d1b2;
}
.is-VND {
  color: red !important;
  font-size: 110% !important;
}
.is-BTC {
  color: #dc8b44;
}
.is-ETH {
  color: #209cee;
}
.is-link {
  cursor: pointer;
}
</style>

<script>
import MarketComponent from './_Market'
import TinhLaiComponent from './_TinhLai'
import RateComponent from './_Rate'
import TelegramComponent from './_Telegram'
import TrendingMessageComponent from './_TrendingMessage'
import ChartSummaryComponent from './Summary/_ChartSummary'
import Bittrex from '../provider/Bittrex'

export default {
  components: { MarketComponent, TinhLaiComponent, RateComponent, TelegramComponent, TrendingMessageComponent, ChartSummaryComponent },
  filters: {
    $coinname(value) {
      return value.split('-')[0]
    }
  },
  data() {
    return {
      lastSync: undefined,
      rate: undefined,
      menu: 'tinhlai'
    }
  },
  computed: { },
  mounted() {
    this.loadRate()
  },
  watch: {
    $route({ name }) { }
  },
  methods: {
    changeVND(vndRate) {
      this.$set(this.rate, 'vnd', vndRate)
    },
    loadRate() {
      const self = this
      Bittrex.getRate().then(data => {
        self.rate = Object.assign({}, self.rate, data)
        self.lastsync = new Date()
        setTimeout(self.loadRate, 5000)
      })
    }
  }
}
</script> 
