<template>
  <div style="height: 400px"></div>
</template>

<script>
import {GoogleCharts} from 'google-charts'

export default {
  props: ['data'],
  filters: { },
  data() {
    return {
      chart: undefined
    }
  },
  watch: {
    data(value) {
      if (value) {
        this.chart.draw(GoogleCharts.api.visualization.arrayToDataTable([
          [
            {label: 'Time', type: 'string'},
            {label: 'Low', type: 'number'},
            {label: 'Open', type: 'number'},
            {label: 'Close', type: 'number'},
            {label: 'High', type: 'number'},
            {type: 'string', role: 'tooltip', 'p': {'html': true}}
          ],
          ...value
        ], false), {
          legend: 'none',
          tooltip: { isHtml: false },
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
      self.chart = new GoogleCharts.api.visualization.CandlestickChart(this.$el)
    })
  },
  methods: { }
}
</script> 
