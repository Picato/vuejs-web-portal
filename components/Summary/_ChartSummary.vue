<template>
  <div>
    <div class="control">
      <label class="radio">
        <input type="radio" value="RawHandler" v-model="type">
        Last 5 sec
      </label>
      <label class="radio">
        <input type="radio" value="HandlerMin1" v-model="type">
        Last 1 minutes
      </label>
      <label class="radio">
        <input type="radio" value="HandlerMin3" v-model="type">
        Last 3 minutes
      </label>
      <label class="radio">
        <input type="radio" value="HandlerMin15" v-model="type">
        Last 15 minutes
      </label>
      <label class="radio">
        <input type="radio" value="HandlerMin30" v-model="type">
        Last 30 minutes
      </label>
      <label class="radio">
        <input type="radio" value="HandlerHour1" v-model="type">
        Last 1 hours
      </label>
      <label class="radio">
        <input type="radio" value="HandlerDay1" v-model="type">
        Last 1 days
      </label>
    </div>
    <hr/>
    <div class="columns">
      <div class="column">
        <VolumeChartComponent :refresh="refresh" :time="type" top="baseVolumeNum" prev="prevBaseVolume" last="baseVolume" title="[VOL] Top giá trị vốn hóa biến động" xtitle="Volume change"></VolumeChartComponent>
      </div>
      <div class="column">
        <VolumeChartComponent :refresh="refresh" :time="type" top="num" prev="prev" last="last" title="[$] Top giá biến động" xtitle="Price change"></VolumeChartComponent>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <VolumeChartComponent :refresh="refresh" :time="type" top="baseVolumePercent" prev="prevBaseVolume" last="baseVolume" format="percent" title="[VOL] Top tỉ lệ vốn hóa biến động %" xtitle="Volume change %"></VolumeChartComponent>
      </div>
      <div class="column">
        <VolumeChartComponent :refresh="refresh" :time="type" top="percent" prev="prev" last="last" format="percent" title="[$] Top tỉ lệ giá biến động %" xtitle="Last price change %"></VolumeChartComponent>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <VolumeChartComponent :refresh="refresh" :time="type" top="baseVolume" title="[VOL] Top giá trị vốn hóa lớn (nhỏ) nhất" xtitle="Volume"></VolumeChartComponent>
      </div>
      <div class="column">
        <VolumeChartComponent :refresh="refresh" :time="type" top="last" title="[$] Top giá hiện tại lớn (nhỏ) nhất" xtitle="Last price"></VolumeChartComponent>
      </div>
    </div>    
  </div>
</template>

<script>
import VolumeChartComponent from './_VolumeChart'
import BarLastPrevChart from './_BarLastPrevChart'
import Bittrex from '../../provider/Bittrex'

export default {
  props: ['rate', 'lastsync'],
  components: { VolumeChartComponent, BarLastPrevChart },
  filters: { },
  data() {
    return {
      refresh: undefined,
      type: 'RawHandler',
      tm: undefined
    }
  },
  computed: { },
  mounted() {
    this.loadRefesh()
  },
  watch: {
    $route({ name }) {},
    type(value) {
      this.loadRefesh()
    }
  },
  methods: {
    loadRefesh() {
      const self = this
      if (this.tm) clearInterval(this.tm)
      this.tm = setInterval(() => {
        self.refresh = new Date()
      }, Bittrex.getTimeUpdate(self.type))
    }
  }
}
</script> 
