<template>
  <div>
    <table class="table is-bordered is-striped is-narrow is-fullwidth" v-if="data">
      <tr>
        <th width="2"></th>                               
        <th width="2">% biến động sau 30p</th>
        <th width="2">Last</th> 
        <th>Score</th>
      </tr>
      <tbody v-for="vl in data" :key="vl._id">
        <tr>
          <th><a :href="'https://bittrex.com/Market/Index?MarketName=' + vl.market + '-' + vl.name" :target="vl.name">{{vl.name}}</a><span class="tag">{{vl.market}}</span></th>          
          <td>
            <div :class="{'has-text-success': vl.percent > 0, 'has-text-danger': vl.percent < 0}"><span class="fa" :class="{'fa-long-arrow-up': vl.percent > 0, 'fa-long-arrow-down': vl.percent < 0}"></span>&nbsp;{{vl.percent}} %</div>
          </td>
          <td>
            <div class="tag"><b>{{vl.last[vl.market.toLowerCase()] | $number}}</b>&nbsp;<i class="has-text-primary">{{vl.market}}</i></div>
          </td>
          <td>{{vl.score | $number}}</td>
        </tr>
        <tr>
          <td colspan="3">
            <table class="table is-bordered is-striped is-narrow">
              <tr v-for="(d, i) in vl.histories" :key="i">
                <th>{{d.time | $date('HH:mm')}}<small class="tag">{{d.time | $date}}</small></th>
                <td>
                  <div class="tag"><b>{{d.last[vl.market.toLowerCase()] | $number}}</b>&nbsp;<i class="has-text-primary">{{vl.market}}</i></div>
                </td>
                <td><span v-show="d.percent !== 0" :class="{'has-text-success': d.percent > 0, 'has-text-danger': d.percent < 0}"><span class="fa" :class="{'fa-long-arrow-up': d.percent > 0, 'fa-long-arrow-down': d.percent < 0}"></span>&nbsp;{{d.percent | $number}} %</span></td>
              </tr>
            </table>
          </td>
          <td>
            <ul>
              <li v-for="(m, i) in vl.note" :key="i">{{m}}</li>
            </ul>
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
