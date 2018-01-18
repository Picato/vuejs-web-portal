<template>
  <div>
    <div class="columns">
      <div class="column">
        <div class="control is-pulled-left">
          <label><b>Group by</b></label>&nbsp;&nbsp;&nbsp;
          <label class="radio">
            <input type="radio" value="HandlerMin30" v-model="type">
            30 Minutes
          </label>
          <label class="radio">
            <input type="radio" value="HandlerDay1" v-model="type">
            Day of week
          </label>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="control is-pulled-left">
          <label><b>Group by</b></label>&nbsp;&nbsp;&nbsp;
          <label class="radio">
            <input type="radio" value="low" v-model="priceType">
            Lowest
          </label>
          <label class="radio">
            <input type="radio" value="high" v-model="priceType">
            Highest
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
      priceType: 'low',
      type: 'HandlerMin30',
      data: undefined
    }
  },
  computed: {
    value() {
      if (this.type === 'HandlerMin30') {
        let head = [
          {label: 'Time', type: 'string'},
          {type: 'string', role: 'tooltip', 'p': {'html': true}}
        ]
        let body = []
        let len
        const now = new Date()
        let w = 1
        for (let time in this.data) {
          if (!len) len = this.data[time].length
          const d = new Date(time)
          let label
          if (d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()) {
            if (w === 1) label = 'Yesterday'
            else label = w + ' days ago'
            w++
          }
          if (this.priceType === 'low') head.push({label, type: 'number'})
          else head.push({label, type: 'number'})
        }
        for (let i = 0; i < len; i++) {
          let data = []
          for (let time in this.data) {
            let e = this.data[time][i]
            if (data.length === 0) {
              data.push(`${e._id.hours}${e._id.minutes > 0 ? `:${e._id.minutes}` : `h`}`,
`Time: ${e._id.hours}${e._id.minutes > 0 ? `:${e._id.minutes}` : `h`}
  -  Price: ${Bittrex.formatNumber(this.priceType === 'low' ? e.avgLowPrice : e.avgHighPrice)}`)
            }
            if (this.priceType === 'low') data.push(e ? e.avgLowPrice : undefined)
            else data.push(e ? e.avgHighPrice : undefined)
          }
          body.push(data)
        }
        return [
          head,
          ...body
        ]
      }
      if (this.type === 'HandlerDay1') {
        let head = [
          {label: 'Time', type: 'string'},
          {type: 'string', role: 'tooltip', 'p': {'html': true}}
        ]
        let body = []
        let len
        const now = new Date()
        let w = 1
        for (let time in this.data) {
          if (!len) len = this.data[time].length
          const d = new Date(time)
          let label
          if (d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()) {
            label = w++ + ' weeks ago'
          }
          if (this.priceType === 'low') head.push({label, type: 'number'})
          else head.push({label, type: 'number'})
        }
        for (let i = 0; i < len; i++) {
          let data = []
          for (let time in this.data) {
            let e = this.data[time][i]
            if (data.length === 0) {
              data.push(`${Bittrex.getDayOfWeek(e._id.day)}`,
`Day: ${Bittrex.getDayOfWeek(e._id.day)}
  -  Price: ${Bittrex.formatNumber(this.priceType === 'low' ? e.avgLowPrice : e.avgHighPrice)}`)
            }
            if (this.priceType === 'low') data.push(e ? e.avgLowPrice : undefined)
            else data.push(e ? e.avgHighPrice : undefined)
          }
          body.push(data)
        }
        return [
          head,
          ...body
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
    priceType() {
      this.loadData()
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
        let vl = this.value
        const self = this
        this.chart.draw(GoogleCharts.api.visualization.arrayToDataTable(vl, false), {
          title: `Avg ${self.priceType === 'low' ? 'Lowest' : 'Highest'} prices of ${self.market}`,
          width: '100%',
          height: 400,
          // legend: { position: 'none' },
          // legend: 'none',
          focusTarget: 'category',
          chartArea: {left: 150, top: 30, bottom: 60, right: 100, width: '100%', height: '100%'},
          tooltip: { isHtml: false },
          // colors: color,
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
