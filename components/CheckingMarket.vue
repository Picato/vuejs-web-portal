<template>
  <div>
    <RateComponent v-if="rate" :rate="rate" :lastsync="lastsync" @changeVND="changeVND($event)"></RateComponent>
    <div class="tabs" v-if="rate">
      <ul>
        <li :class="{'is-active': menu === 'tatca'}" @click="menu='tatca'"><a>Thống kê</a></li>
        <!-- <li :class="{'is-active': menu === 'tangmanh'}" @click="getTangManh()"><a>Tăng mạnh</a></li>
        <li :class="{'is-active': menu === 'giammanh'}" @click="getGiamManh()"><a>Giảm mạnh</a></li>
        <li :class="{'is-active': menu === 'binhthuong'}" @click="getBinhthuong()"><a>Ít biến động</a></li>         -->
        <li :class="{'is-active': menu === 'tinhlai'}" @click="menu='tinhlai'"><a>Tính lãi</a></li>
      </ul>
    </div>
    <div v-if="menu === 'tatca'">
      <MarketComponent :rate="rate"></MarketComponent>
    </div> 
    <div v-if="menu === 'tinhlai'">
      <TinhLaiComponent :rate="rate"></TinhLaiComponent>      
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
import Bittrex from '../provider/Bittrex'

export default {
  components: { MarketComponent, TinhLaiComponent, RateComponent },
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
      Bittrex.getPrice('tatca').then(data => {
        self.rate = Object.assign({}, self.rate, data.rate)
        self.lastsync = new Date()
        setTimeout(self.loadRate, 5000)
      })
    }
  }
}
</script> 
