<template>
  <div>
    <div class="columns">
      <div class="column">
        <div class="chart"></div>
      </div>
      <div class="column">        
        <div class="columns">
          <div class="column is-4">
            <div class="control">
              <label class="label">Page</label>
              <input class="input" type="number" placeholder="Page" v-model.number.lazy="page">
            </div>
          </div>
          <div class="column">
            <div class="control">
              <label class="label">Records per page</label>
              <div class="select is-fullwidth">
                <select v-model="recordsPerPage">
                  <option :value="10">10 Records</option>
                  <option :value="20">20 Records</option>
                  <option :value="50">50 Records</option>
                  <option :value="100">100 Records</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="control column">
            <label class="radio">
              <input type="radio" :value="-1" v-model.number="sort">
              Tăng
            </label>
            <label class="radio">
              <input type="radio" :value="1" v-model.number="sort">
              Giảm
            </label>
          </div>
          <div class="column">
            <div class="select is-fullwidth">
              <select v-model="fmarket">
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
                <option value="USDT">USDT</option>
              </select>
            </div>
          </div>
        </div>                
      </div>
    </div>      
  </div>
</template>

<script>
import { GoogleCharts } from 'google-charts'
import Bittrex from '../../provider/Bittrex'

export default {
  filters: { },
  data() {
    return {
      title: '[VOL] Top giá trị vốn hóa',
      top: 'baseVolume',
      xtitle: 'Volume',
      refresh: 5000,
      fmarket: 'BTC',
      sort: -1,
      recordsPerPage: 10,
      page: 1,
      data: undefined
    }
  },
  computed: { },
  mounted() {
    const self = this
    GoogleCharts.load(() => {
      self.chart = new GoogleCharts.api.visualization.PieChart(this.$el.querySelector('.chart'))
      self.loadData()
      GoogleCharts.api.visualization.events.addListener(this.chart, 'select', e => {
        if (self.chart.getSelection()[0]) {
          let vl = self.data[self.chart.getSelection()[0].row]
          window.open(`/coin/market/${vl.key}`, vl.key)
        }
      })
    })
  },
  watch: {
    $route({ name }) {},
    refresh() {
      this.loadData()
    },
    fmarket(value) {
      this.loadData()
    },
    time(value) {
      this.loadData()
    },
    sort(value) {
      this.loadData()
    },
    page(value) {
      this.loadData()
    },
    recordsPerPage(value) {
      this.loadData()
    },
    data(value) {
      if (value) {
        // const color = this.sort < 0 ? '#23d160' : '#ff3860'
        this.chart.draw(GoogleCharts.api.visualization.arrayToDataTable([
          [
            {label: 'Market', type: 'string'},
            {label: 'Value', type: 'number'},
            {type: 'string', role: 'annotation'},
            {type: 'string', role: 'tooltip', 'p': {'html': true}}
          ],
          ...value.map(e => {
            return [e.key, e[this.top], `${Bittrex.formatNumber(e[this.top])}${this.format === 'percent' ? '%' : ''}`, `Time: ${e.time}
  - ${this.xtitle}: ${Bittrex.formatNumber(e[this.top])}`]
          })
        ], false), {
          title: this.title,
          width: '100%',
          height: 500,
          legend: { position: 'none' },
          // legend: 'none',
          chartArea: {left: 150, top: 30, bottom: 60, right: 100, width: '100%', height: '100%'},
          pieSliceText: 'label',
          tooltip: { isHtml: false },
          // colors: [ color ],
          hAxis: {
            title: this.xtitle
          }
        })
      }
    }
  },
  methods: {
    loadData() {
      const self = this
      Bittrex.getPrice(self.time, undefined, {
        market: self.fmarket,
        top: self.top,
        sort: self.sort,
        page: self.page,
        recordsPerPage: self.recordsPerPage
      }).then(data => {
        self.data = data
      })
    }
  }
}
</script> 
