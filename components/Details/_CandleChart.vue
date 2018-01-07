<template>
  <div>
    <div class="chart" style="height: 500px"></div>
  </div>
</template>

<script>
import { GoogleCharts } from 'google-charts'
import moment from 'moment'
import Bittrex from '../../provider/Bittrex'

export default {
  props: ['market', 'time'],
  filters: { },
  data() {
    return {
      data: undefined,
      chart: undefined
    }
  },
  watch: {
    market(value) {
      if (value) {
        this.loadData()
      }
    },
    time(value) {
      if (value) {
        this.loadData()
      }
    },
    data(value) {
      if (value) {
        this.chart.draw(GoogleCharts.api.visualization.arrayToDataTable([
          [
            {label: 'Time', type: 'date'},
            {label: 'Low', type: 'number'},
            {label: 'Open', type: 'number'},
            {label: 'Close', type: 'number'},
            {label: 'High', type: 'number'},
            {type: 'string', role: 'tooltip', 'p': {'html': true}}
          ],
          ...value
        ], false), {
          title: `Last price of ${this.market}`,
          width: '100%',
          legend: { position: 'none' },
          // legend: 'none',
          chartArea: {left: 150, top: 30, bottom: 60, width: '100%', height: '100%'},
          tooltip: { isHtml: false },
          explorer: {
            axis: 'horizontal',
            keepInBounds: true,
            maxZoomIn: 4.0,
            maxZoomOut: 1.0
          },
          hAxis: {
            title: 'Time (5min)',
            gridlines: {
              count: -1,
              units: {
                days: {format: ['MMM dd']},
                hours: {format: ['HH:mm', 'ha']}
              },
              minorGridlines: {
                units: {
                  hours: {format: ['hh:mm:ss a', 'ha']},
                  minutes: {format: ['HH:mm a Z', ':mm']}
                }
              }
            }
          },
          vAxis: {
            title: `Last price ${this.market.split('-')[0]}`
          },
          candlestick: {
            fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
            risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
          }
        })
      }
    }
  },
  computed: { },
  mounted() {
    const self = this
    GoogleCharts.load(() => {
      self.chart = new GoogleCharts.api.visualization.CandlestickChart(this.$el.querySelector('.chart'))
      self.loadData()
    })
  },
  methods: {
    loadData() {
      if (this.market && this.time) {
        const self = this
        Bittrex.getPrice(self.time, self.market).then(data => {
          if (data) {
            self.data = data.reverse().map(e => {
              return [new Date(e.time), e.low, e.open, e.last, e.high, `Time: ${moment(e.time).format('HH:mm DD/MM/YYYY')}
- Low: ${e.low}
- Open: ${e.open}
- Close: ${e.last}
- High: ${e.high}
`]
            })
          }
        })
      }
    }
  }
}
</script> 
