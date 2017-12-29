<template>
  <div>
    <table class="table is-bordered is-striped is-narrow is-fullwidth">
      <tr>
        <th>Case matcher</th>
        <th>Market</th>
        <th>Message</th>
        <th>Time</th>
      </tr>
      <tr v-for="item in data" :key="item.key">
        <td>{{item.matcher}}</td>
        <td v-class="{'has-text-danger': item.type < 0, 'has-text-success': item.type > 0}">
          <a :href="'https://bittrex.com/Market/Index?MarketName=' + item.key" :target="item.name">{{item.key}}</a><span class="tag">{{item.market}}</span>
        </td>
        <td>
          <pre>{{item.msg}}</pre>
        </td>
        <td>{{item.time | $date("DD/MM/YYY HH:mm")}}</td>
      </tr>
    </table>    
  </div>
</template>
<style scoped>

</style>

<script>
import Bittrex from '../provider/Bittrex'

export default {
  props: [],
  filters: {},
  data() {
    return {
      data: []
    }
  },
  computed: {},
  mounted() {
    const self = this
    Bittrex.getTrendingMessage().then(data => {
      self.data = data
    })
  },
  watch: {
    $route({ name }) {}
  },
  methods: {}
}
</script> 
