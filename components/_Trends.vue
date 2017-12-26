<template>
  <div>
    <table class="table is-bordered is-striped is-narrow is-fullwidth" v-if="data">
      <tr>
        <th></th>
        <th>Score</th>
        <th>%</th>
        <th>Last</th>
      </tr>
      <tbody v-for="vl in data" :key="vl._id">
        <tr>
          <th><a :href="'https://bittrex.com/Market/Index?MarketName=' + vl.market + '-' + vl.name" :target="vl.name">{{vl.name}}</a><span class="tag">{{vl.market}}</span></th>
          <td>{{vl.score}}</td>
          <td>{{vl.percent}} %</td>
          <td>
            <div class="tag is-usdt"><b>{{vl.last.usdt | $number}}</b>&nbsp;<i class="has-text-primary">USDT</i></div>
            <br/>
            <div class="tag is-btc"><b>{{vl.last.btc | $number}}</b>&nbsp;<i class="has-text-info">BTC</i></div>
            <br/>
            <div class="tag is-eth"><b>{{vl.last.eth | $number}}</b>&nbsp;<i class="has-text-warning">ETH</i></div>
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <table class="table is-bordered is-striped is-narrow is-fullwidth">
              <tr>
                <td>Prev</td>
                <td>Last</td>
                <td>%</td>
                <td>Time</td>
              </tr>
              <tr v-for="(d, i) in vl.histories" :key="i">
                <td>
                  <div class="tag is-usdt"><b>{{d.prev.usdt | $number}}</b>&nbsp;<i class="has-text-primary">USDT</i></div>
                  <br/>
                  <div class="tag is-btc"><b>{{d.prev.btc | $number}}</b>&nbsp;<i class="has-text-info">BTC</i></div>
                  <br/>
                  <div class="tag is-eth"><b>{{d.prev.eth | $number}}</b>&nbsp;<i class="has-text-warning">ETH</i></div>
                </td>
                <td>
                  <div class="tag is-usdt"><b>{{d.last.usdt | $number}}</b>&nbsp;<i class="has-text-primary">USDT</i></div>
                  <br/>
                  <div class="tag is-btc"><b>{{d.last.btc | $number}}</b>&nbsp;<i class="has-text-info">BTC</i></div>
                  <br/>
                  <div class="tag is-eth"><b>{{d.last.eth | $number}}</b>&nbsp;<i class="has-text-warning">ETH</i></div>
                </td>
                <td><span v-show="d.percent !== 0" :class="{'has-text-success': d.percent > 0, 'has-text-danger': d.percent < 0}"><span class="fa" :class="{'fa-long-arrow-up': d.percent > 0, 'fa-long-arrow-down': d.percent < 0}"></span>&nbsp;{{d.percent | $number}}</span></td>
                <th>{{d.time | $date('HH:mm')}}<small class="tag">{{d.time | $date}}</small></th>
              </tr>
            </table>
          </td>
        </tr>
      </tbody>
    </table>    
  </div>
</template>
<style scoped>

</style>

<script>
import Bittrex from '../provider/Bittrex'

export default {
  props: ['rate'],
  filters: { },
  data() {
    return {
      data: undefined,
      test: undefined
    }
  },
  computed: { },
  mounted() {
    const self = this
    Bittrex.getTrendsMin().then((data) => {
      self.data = data
    })
  },
  watch: {
    $route({ name }) {}
  },
  methods: { }
}
</script> 
