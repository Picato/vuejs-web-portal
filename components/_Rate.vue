<template>
  <table class="table is-bordered is-striped is-narrow is-fullwidth" style="position: fixed; top: 0px; width: 100%; margin: 0px; left: 0px; background: #efefef; z-index: 10; box-shadow: 0px 1px 1px #525252;">
    <tr>
      <td>1 <b class="has-text-info">BTC</b> = <b>{{rate['BTC-USDT'] | $number}}</b> <b class="has-text-primary">USDT</b></td>
      <td>1 <b class="has-text-warning">ETH</b> = <b>{{rate['ETH-USDT'] | $number}}</b> <b class="has-text-primary">USDT</b></td>
      <td>1 <b class="has-text-info">BTC</b> = <b>{{rate['BTC-ETH'] | $number}}</b> <b class="has-text-warning">ETH</b></td>            
      <td>1 <b class="has-text-warning">USD</b> = <input type="number" v-model.number="vndRate" /> <b class="has-text-danger">VND</b></td>
      <td width="150"><span class="fa fa-clock-o"></span>&nbsp;{{ lastsync | $date('HH:mm:ss') }}</td>
    </tr>
  </table>
</template>

<script>

export default {
  props: ['rate', 'lastsync'],
  filters: { },
  data() {
    return {
      vndRate: undefined
    }
  },
  computed: { },
  mounted() { },
  watch: {
    $route({ name }) {},
    vndRate(value) {
      this.$emit('changeVND', value)
    }
  },
  methods: { }
}
</script> 
