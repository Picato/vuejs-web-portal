<template>
  <div v-if="rate">
    <div class="columns">
      <div class="column">
        <div class="columns">
          <div class="column is-3">
            <label class="label">Số coin mua vào</label>
            <input class="input" type="number" placeholder="Số coin mua vào" v-model.number="inputCoin">
          </div>
          <div class="column">
            <div class="field has-addons">
              <p class="control is-expanded">
                <label class="label">Giá mua vào</label>
                <input class="input" type="number" placeholder="Giá mua vào" v-model.number="inputMoney">
              </p>
              <p class="control">
                <label class="label">&nbsp;</label>
                <span class="select">
                  <select v-model="inputMarket">
                    <option value="BTC">BTC</option>
                    <option value="USDT">USDT</option>
                    <option value="ETH">ETH</option>
                  </select>
                </span>
              </p>
            </div>        
          </div>
          <div class="column is-3">
            <p class="control">
              <label class="label">&nbsp;</label>            
              <span class="tag is-medium has-text-danger">- {{tienmua | $number}} {{inputMarket}}</span>
            </p>
          </div>
        </div>
        <div class="columns">
          <div class="column is-3">
            <label class="label">Số coin bán ra</label>
            <input class="input" type="number" placeholder="Số coin bán ra" v-model.number="outputCoin">
          </div>
          <div class="column">
            <div class="field has-addons">
              <p class="control is-expanded">
                <label class="label">Giá bán ra</label>
                <input class="input" type="number" placeholder="Giá bán ra" v-model.number="outputMoney">
              </p>
              <p class="control">
                <label class="label">&nbsp;</label>
                <span class="select">
                  <select v-model="outputMarket">
                    <option value="BTC">BTC</option>
                    <option value="USDT">USDT</option>
                    <option value="ETH">ETH</option>
                  </select>
                </span>
              </p>
            </div>        
          </div>
          <div class="column is-3">
            <p class="control">
              <label class="label">&nbsp;</label>            
              <span class="tag is-medium has-text-success">+ {{tienban | $number}} {{outputMarket}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="column">
        <div v-if="tienlaiUSDT">
          <h1 class="title">Kết quả tính toán lãi</h1>
          <table class="table is-striped is-narrow is-fullwidth">
            <tr>
              <th v-if="rate.vnd">VND</th>
              <td :class="{'has-text-success': tienlaiUSDT > 0, 'has-text-danger': tienlaiUSDT < 0}" v-if="rate.vnd">{{tienlaiUSDT > 0 ? '+' : ''}} {{(tienlaiUSDT * rate.vnd) | $number}}</td>
            </tr>
            <tr>
              <th width="80">USDT</th>              
              <td :class="{'has-text-success': tienlaiUSDT > 0, 'has-text-danger': tienlaiUSDT < 0}">{{tienlaiUSDT > 0 ? '+' : ''}} {{tienlaiUSDT | $number}}</td>
            </tr>
            <tr>
              <th>BTC</th>              
              <td :class="{'has-text-success': tienlaiUSDT > 0, 'has-text-danger': tienlaiUSDT < 0}">{{tienlaiUSDT > 0 ? '+' : ''}} {{tienlaiBTC | $number}}</td>
            </tr>
            <tr>
              <th>ETH</th>              
              <td :class="{'has-text-success': tienlaiUSDT > 0, 'has-text-danger': tienlaiUSDT < 0}">{{tienlaiUSDT > 0 ? '+' : ''}} {{tienlaiETH | $number}}</td>
            </tr>
          </table> 
        </div>
      </div>
    </div>
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
      inputMarket: 'BTC',
      inputCoin: undefined,
      inputMoney: undefined,
      outputMarket: 'BTC',
      outputCoin: undefined,
      outputMoney: undefined,
      ketqua: {
        btc: undefined,
        usdt: undefined,
        eth: undefined,
        vnd: undefined
      }
    }
  },
  computed: {
    tienmua() {
      return this.inputCoin * this.inputMoney
    },
    tienban() {
      return this.outputCoin * this.outputMoney
    },
    tienlai() {
      return this.tienban - this.tienmua
    },
    tienlaiUSDT() {
      return Bittrex.toUSDT(this.tienban, this.outputMarket, this.rate) - Bittrex.toUSDT(this.tienmua, this.inputMarket, this.rate)
    },
    tienlaiBTC() {
      return Bittrex.toBTC(this.tienlaiUSDT, 'USDT', this.rate)
    },
    tienlaiETH() {
      return Bittrex.toETH(this.tienlaiUSDT, 'USDT', this.rate)
    },
    tienlaiVND() {
      return this.tienlaiUSDT * this.rate.vnd
    }
  },
  mounted() { },
  watch: {
    $route({ name }) {}
  },
  methods: { }
}
</script> 
