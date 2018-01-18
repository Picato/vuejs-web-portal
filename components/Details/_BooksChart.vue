<template>
  <div>
    <div class="chart" style="height: 400px;"></div>
  </div>
</template>

<script>
import { GoogleCharts } from 'google-charts'
import moment from 'moment'
import Bittrex from '../../provider/Bittrex'

export default {
  props: ['market', 'time', 'action'],
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
            {label: 'Time', type: 'string'},
            {label: `Total Price`, type: 'number'},
            {label: 'Total Quantity', type: 'number'}
          ],
          ...value
        ], false), {
          title: `${this.action === 'buy' ? 'Buying' : 'Selling'} of ${this.market}`,
          width: '100%',
          // legend: { position: 'none' },
          // legend: 'none',
          // colors: ['#ff0000', '#00FFFF'],
          // chartArea: {left: 150, top: 30, bottom: 60, width: '100%', height: '100%'},
          focusTarget: 'category',
          tooltip: { isHtml: false },
          explorer: {
            axis: 'horizontal',
            keepInBounds: true,
            maxZoomIn: 4.0,
            maxZoomOut: 1.0
          },
          series: {
            1: {
              type: 'bars',
              targetAxisIndex: 1,
              color: 'orange'
            }
          },
          vAxes: {
            0: {
              title: `Price (${this.marketName})`
            },
            1: {
              title: `Quantity (${this.coinName})`
            }
          }
        })
      }
    }
  },
  computed: {
    marketName() {
      return this.market.split('-')[0]
    },
    coinName() {
      return this.market.split('-')[1]
    }
  },
  mounted() {
    const self = this
    GoogleCharts.load(() => {
      self.chart = new GoogleCharts.api.visualization.LineChart(this.$el.querySelector('.chart'))
      self.loadData()
    })
  },
  methods: {
    loadData() {
      if (this.market && this.time) {
        const self = this
        Bittrex.getPrice(self.time, self.market).then(data => {
          if (data) {
            self.data = data.reverse().map((e, i) => {
              let d = new Date(e.time)
              if (self.time.indexOf('HandlerMin') !== -1) {
                d = moment(e.time).format('HH:mm')
              } else if (self.time.indexOf('HandlerHour') !== -1) {
                d = moment(e.time).format('HH')
              } else if (self.time.indexOf('HandlerDay') !== -1) {
                d = moment(e.time).format('MMM YYYY, DD')
              }
              const quantity = (e.book && e.book[self.action]) ? e.book[self.action].quantity : undefined
              const price = (e.book && e.book[self.action]) ? e.book[self.action].price : undefined
              return [d, price, quantity]
            })
          }
        })
      }
    }
  }
}
</script> 
