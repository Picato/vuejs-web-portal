<template>
  <div>
    <RateComponent v-if="rate" :rate="rate" :lastsync="lastsync" @changeVND="changeVND($event)"></RateComponent>
    <div class="tabs" v-if="rate">
      <ul>
        <li :class="{'is-active': menu === 'tatca'}" @click="menu='tatca'"><a>Thống kê</a></li>        
        <li :class="{'is-active': menu === 'tinhlai'}" @click="menu='tinhlai'"><a>Tính lãi</a></li>
        <li :class="{'is-active': menu === 'telegram'}" @click="menu='telegram'"><a>Tăng mạnh</a></li>
      </ul>
    </div>
    <div>
      <MarketComponent :rate="rate" v-if="rate" v-show="menu === 'tatca'"></MarketComponent>
      <TinhLaiComponent :rate="rate" v-if="rate" v-show="menu === 'tinhlai'"></TinhLaiComponent>      
      <TelegramComponent v-show="menu === 'telegram'"></TelegramComponent>      
    </div>

  </div>
</template>
<style>
.is-usdt {
  font-size: 110% !important;
}
.is-vnd {
  color: red !important;
  font-size: 110% !important;
}
.is-btc {
  color: gray !important;
}
.is-eth {
  color: gray !important;
}
</style>

<script>
import MarketComponent from './_Market'
import TinhLaiComponent from './_TinhLai'
import RateComponent from './_Rate'
import TelegramComponent from './_Telegram'
import Bittrex from '../provider/Bittrex'

export default {
  components: { MarketComponent, TinhLaiComponent, RateComponent, TelegramComponent },
  filters: {
    $coinname(value) {
      return value.split('-')[0]
    }
  },
  data() {
    return {
      lastSync: undefined,
      rate: undefined,
      menu: 'tatca'
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
        setTimeout(self.loadRate, 30000)
      })
    }
  }
}
</script> 
