<template>
  <div>
    <div class="columns">
      <div class="column">
        <div class="control">
          <label class="label">Market123
          <label class="radio is-pulled-right">
            <input type="radio" :value="1" v-model.number="sort">
            Giảm
          </label>
          <label class="radio is-pulled-right">
            <input type="radio" :value="-1" v-model.number="sort">
            Tăng&nbsp;
          </label>          
          </label>
          <div class="select is-fullwidth">
            <select v-model="fmarket">
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="USDT">USDT</option>
            </select>
          </div>
        </div>
      </div>
      <div class="column is-4">
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
      <div class="column is-2">
        <div class="control">
          <label class="label">Page</label>
          <input class="input" type="number" placeholder="Page" v-model.number.lazy="page">
        </div>
      </div>  
    </div>
    <div class="card">
      <div class="card-content">
        <div class="chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { GoogleCharts } from 'google-charts'
import Bittrex from '../../provider/Bittrex'

export default {
  props: ['title', 'time', 'top', 'last', 'prev', 'xtitle', 'format', 'refresh'],
  filters: { },
  data() {
    return {
      sort: -1,
      fmarket: 'BTC',
      recordsPerPage: 20,
      page: 1,
      data: undefined
    }
  },
  computed: { },
  mounted() {
    const self = this
    GoogleCharts.load(() => {
      self.chart = new GoogleCharts.api.visualization.BarChart(this.$el.querySelector('.chart'))
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
        const color = ['#23d160', '#ff3860']
        this.chart.draw(GoogleCharts.api.visualization.arrayToDataTable([
          [
            {label: 'Market', type: 'string'},
            {label: 'Last', type: 'number'},
            {label: 'Prev', type: 'number'}
          ],
          ...value.map(e => {
            console.log(e[this.last], e[this.prev])
            return [
              e.key,
              e[this.last],
              e[this.prev]
            ]
          })
        ], false), {
          title: this.title,
          width: '100%',
          height: this.recordsPerPage * 600 / 20,
          legend: { position: 'none' },
          // legend: 'none',
          chartArea: {left: 150, top: 30, bottom: 60, right: 100, width: '100%', height: '100%'},
          tooltip: { isHtml: false },
          colors: color,
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
        console.log(data)
      })
    }
  }
}
</script> 
