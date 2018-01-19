<template>
  <div>
    <div class="chart"></div>
  </div>
</template>

<script>
import { GoogleCharts } from 'google-charts'
import Bittrex from '../../provider/Bittrex'

export default {
  props: ['title', 'time', 'cur', 'type'],
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
      self.chart = new GoogleCharts.api.visualization.CandlestickChart(this.$el.querySelector('.chart'))
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
    type(value) {
      this.loadData()
    },
    data(value) {
      const self = this
      if (value) {
        let getLabel = (e) => {
          if (self.time === 'byDay') {
            return `${Bittrex.getDayOfWeek(e._id.day)}`
          } else if (self.time === 'byHour') {
            return `${e._id.hours}`
          } else if (self.time === 'byDate') {
            return `${e._id.date}/${e._id.month + 1}`
          }
        }
        const color = self.type === 'sell' ? '#23d160' : '#ff3860'
        this.chart.draw(GoogleCharts.api.visualization.arrayToDataTable([
          [
            {label: 'Time', type: 'string'},
            {label: `${self.type} Min`, type: 'number'},
            {label: `${self.type} Min`, type: 'number'},
            {label: `${self.type} Max`, type: 'number'},
            {label: `${self.type} Max`, type: 'number'},
            {type: 'string', role: 'tooltip', 'p': {'html': true}}
          ],
          ...value.map(e => {
            let act = self.type === 'sell' ? 'Bid' : 'Ask'
            return [
              getLabel(e),
              e[`min${act}`],
              e[`min${act}`],
              e[`max${act}`],
              e[`max${act}`],
              `${getLabel(e)}
 - Min: ${Bittrex.formatNumber(e[`min${act}`], 0)} VND
 - Max: ${Bittrex.formatNumber(e[`max${act}`], 0)} VND
 = ${Bittrex.formatNumber(e[`max${act}`] - e[`min${act}`], 0)} VND`
            ]
          })
        ], false), {
          title: `${this.title}`,
          width: '100%',
          height: 400,
          // legend: 'none',
          chartArea: {left: 100, top: 30, bottom: 60, right: 0, width: '100%', height: '100%'},
          tooltip: { isHtml: false },
          colors: [color],
          hAxis: {
            title: this.xtitle
          },
          candlestick: {
            fallingColor: { strokeWidth: 0, fill: color }, // red
            risingColor: { strokeWidth: 0, fill: color }   // green
          }
        })
      }
    }
  },
  methods: {
    loadData() {
      const self = this
      Bittrex.getRemitanoData(this.time, this.cur).then(data => {
        self.data = data.reverse()
      })
    }
  }
}
</script> 
