<template>
  <div>
    <div class="columns">
      <div class="column">
        <div class="control is-pulled-right">
          <label><b>Group by</b></label>&nbsp;&nbsp;&nbsp;
          <label class="radio">
            <input type="radio" value="HandlerMin30" v-model="type">
            30 Minutes
          </label>
          <label class="radio">
            <input type="radio" value="HandlerHour1" v-model="type">
            Hours
          </label>
          <label class="radio">
            <input type="radio" value="HandlerDay1" v-model="type">
            Days
          </label>
        </div>
      </div>
    </div>
    <div class="chart"></div>
  </div>
</template>

<script>
import { GoogleCharts } from 'google-charts'
import Bittrex from '../../provider/Bittrex'

export default {
  props: ['market', 'time'],
  filters: { },
  data() {
    return {
      type: 'HandlerDay1',
      data: undefined
    }
  },
  computed: {
    value() {
      if (this.type === 'HandlerMin30') {
        return [
          [
            {label: 'Min', type: 'string'},
            {type: 'string', role: 'tooltip', 'p': {'html': true}},
            {label: 'Low', type: 'number'},
            {label: 'High', type: 'number'}
          ],
          ...this.data.map(e => {
            return [
              `${e._id.hours}${e._id.minutes > 0 ? `:${e._id.minutes}` : `h`}`,
              `Time: ${e._id.hours}${e._id.minutes > 0 ? `:${e._id.minutes}` : `h`}
- High: ${Bittrex.formatNumber(e.avgHighPrice)}
-  Low: ${Bittrex.formatNumber(e.avgLowPrice)}
`,
              e.avgLowPrice,
              e.avgHighPrice
            ]
          })
        ]
      }
      if (this.type === 'HandlerHour1') {
        return [
          [
            {label: 'Hour', type: 'string'},
            {type: 'string', role: 'tooltip', 'p': {'html': true}},
            {label: 'Low', type: 'number'},
            {label: 'High', type: 'number'}
          ],
          ...this.data.map(e => {
            return [
              `${e._id.hours}h`,
              `Hour: ${e._id.hours}
- High: ${Bittrex.formatNumber(e.avgHighPrice)}
-  Low: ${Bittrex.formatNumber(e.avgLowPrice)}
`,
              e.avgLowPrice,
              e.avgHighPrice
            ]
          })
        ]
      }
      if (this.type === 'HandlerDay1') {
        return [
          [
            {label: 'Day Of Week', type: 'string'},
            {type: 'string', role: 'tooltip', 'p': {'html': true}},
            {label: 'Low', type: 'number'},
            {label: 'High', type: 'number'}
          ],
          ...this.data.map(e => {
            return [
              `${Bittrex.getDayOfWeek(e._id.day)}`,
              `Day: ${Bittrex.getDayOfWeek(e._id.day)}
- High: ${Bittrex.formatNumber(e.avgHighPrice)}
-  Low: ${Bittrex.formatNumber(e.avgLowPrice)}
`,
              e.avgLowPrice,
              e.avgHighPrice
            ]
          })
        ]
      }
      return []
    }
  },
  mounted() {
    const self = this
    GoogleCharts.load(() => {
      self.chart = new GoogleCharts.api.visualization.LineChart(this.$el.querySelector('.chart'))
      self.loadData()
    })
  },
  watch: {
    $route({ name }) {},
    time() {
      this.type = this.time.indexOf('HandlerMin') !== -1 ? 'HandlerMin30' : (this.time.indexOf('HandlerHour') !== -1 ? 'HandlerHour1' : 'HandlerDay1')
    },
    type() {
      this.loadData()
    },
    refresh() {
      this.loadData()
    },
    fmarket(value) {
      this.loadData()
    },
    data(value) {
      if (value) {
        const color = ['#ff3860', '#23d160']
        let vl = this.value
        const self = this
        this.chart.draw(GoogleCharts.api.visualization.arrayToDataTable(vl, false), {
          title: `Avg Lowest (Highest) prices of ${self.market}`,
          width: '100%',
          height: 400,
          legend: { position: 'none' },
          // legend: 'none',
          focusTarget: 'category',
          chartArea: {left: 150, top: 30, bottom: 60, right: 100, width: '100%', height: '100%'},
          tooltip: { isHtml: false },
          colors: color,
          vAxis: {
            title: `Avg price (${self.market.split('-')[0]})`
          },
          hAxis: {
            gridlines: { count: vl.length - 1 }
          }
        })
      }
    }
  },
  methods: {
    loadData() {
      const self = this
      Bittrex.getPriceByTime(self.time, undefined, {
        type: self.type,
        key: self.market
      }).then(data => {
        self.data = data
      })
    }
  }
}
</script> 
