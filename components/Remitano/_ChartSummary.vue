<template>
  <div>
    <div class="columns">
      <div class="control column has-text-right">  
        <label class="label">Currency</label>    
        <label class="radio">
          <input type="radio" value="usdt" v-model="cur">
          USDT
        </label>
        <label class="radio">
          <input type="radio" value="btc" v-model="cur">
          BTC
        </label>
      </div>
      <div class="control column">
        <label class="label">Type</label>
        <label class="radio">
          <input type="radio" value="buy" v-model="type">
          Buy
        </label>
        <label class="radio">
          <input type="radio" value="sell" v-model="type">
          Sell
        </label>
      </div>
    </div>
    <hr/>
    <div class="columns">
      <div class="column">
        <PriceChart :cur="cur" title="Realtime"></PriceChart>
      </div>
      <div class="column">
        <PriceGroupChart :cur="cur" :type="type" time="byHour" title="By Hour (In a day)"></PriceGroupChart>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <PriceGroupChart :cur="cur" :type="type" time="byDate" title="By Date (In a month)"></PriceGroupChart>
      </div>
      <div class="column">
        <PriceGroupChart :cur="cur" :type="type" time="byDay" title="By Day (In a week)"></PriceGroupChart>
      </div>
    </div>
  </div>
</template>

<script>
import PriceChart from './_Price'
import PriceGroupChart from './_PriceGroup'

export default {
  props: ['rate', 'lastsync'],
  components: { PriceChart, PriceGroupChart },
  filters: { },
  data() {
    return {
      cur: 'usdt',
      type: 'buy'
    }
  },
  computed: { },
  mounted() { },
  watch: {
    $route({ name }) {}
  },
  methods: { }
}
</script> 
