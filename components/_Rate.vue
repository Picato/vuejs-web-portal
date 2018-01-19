<template>
  <table class="table is-bordered is-striped is-narrow is-fullwidth" style="position: fixed; top: 0px; width: 100%; margin: 0px; left: 0px; background: #efefef; z-index: 10; box-shadow: 0px 1px 1px #525252;">
    <tr>
      <td>1 <b class="is-BTC">BTC</b> = <b>{{rate['BTC-USDT'] | $number}}</b> <b class="is-USDT">USDT</b></td>
      <td>1 <b class="is-ETH">ETH</b> = <b>{{rate['ETH-USDT'] | $number}}</b> <b class="is-USDT">USDT</b></td>
      <td>1 <b class="is-BTC">BTC</b> = <b>{{rate['BTC-ETH'] | $number}}</b> <b class="is-ETH">ETH</b></td>            
      <td>1 <b class="is-USDT">USDT</b> = <b>{{rate['vndBuy'] | $number}}</b>/<b>{{rate['vndSell'] | $number}}</b> <b class="is-VND">VND</b></td>
      <td width="150"><span class="fa fa-clock-o"></span>&nbsp;{{ lastsync | $date('HH:mm:ss') }}</td>
      <td width="80"><a @click="logout()">Logout!</a></td>
    </tr>
  </table>
</template>

<script>
import MainEvent from '@/providers/main-event'

export default {
  auth: true,
  props: ['rate', 'lastsync'],
  filters: { },
  data() {
    return { }
  },
  computed: { },
  mounted() { },
  watch: {
    $route({ name }) {}
  },
  methods: {
    logout() {
      MainEvent.$emit('logout')
    }
  }
}
</script> 
