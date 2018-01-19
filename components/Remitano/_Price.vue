<template>
  <div>
    <div class="chart"></div>
  </div>
</template>

<script>
import { GoogleCharts } from 'google-charts'
import Bittrex from '../../provider/Bittrex'

export default {
  props: ['title', 'cur'],
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
      self.chart = new GoogleCharts.api.visualization.LineChart(this.$el.querySelector('.chart'))
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
    cur() {
      this.loadData()
    },
    data(value) {
      if (value) {
        const self = this
        const color = ['#ff3860', '#23d160']
        this.chart.draw(GoogleCharts.api.visualization.arrayToDataTable([
          [
            {label: 'Time', type: 'string'},
            {label: 'Sell', type: 'number'},
            {label: 'Buy', type: 'number'}
          ],
          ...value.map(e => {
            return [
              `${e.hours}:${e.minutes}`,
              e[`${self.cur}_bid`],
              e[`${self.cur}_ask`]
            ]
          })
        ], false), {
          title: this.title,
          width: '100%',
          height: 400,
          focusTarget: 'category',
          // legend: 'none',
          chartArea: {left: 100, top: 30, bottom: 60, right: 100, width: '100%', height: '100%'},
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
      Bittrex.getRemitanoData().then(data => {
        self.data = data.reverse()
        setInterval(() => {
          self.loadData.apply(self)
        }, 300000)
      })
    }
  }
}
</script> 
