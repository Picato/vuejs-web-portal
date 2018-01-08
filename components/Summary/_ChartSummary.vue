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
        <input type="radio" value="HandlerMin5" v-model="type">
        Last 5 minutes
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
        <VolumeChartComponent :refresh="refresh" :time="type" top="num" :sort="-1" title="[$] Top số lượng giá biến động" xtitle="Price change"></VolumeChartComponent>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <VolumeChartComponent :refresh="refresh" :time="type" top="baseVolumeNum" :sort="-1" title="[VOL] Top số lượng vốn hóa biến động" xtitle="Volume change"></VolumeChartComponent>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <VolumeChartComponent :refresh="refresh" :time="type" top="baseVolumePercent" format="percent" :sort="-1" title="[VOL] Top tỉ lệ vốn hóa biến động %" xtitle="Volume change %"></VolumeChartComponent>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <VolumeChartComponent :refresh="refresh" :time="type" top="percent" format="percent" :sort="-1" title="[$] Top tỉ lệ giá biến động %" xtitle="Last price change %"></VolumeChartComponent>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <VolumePieChartComponent :refresh="refresh" :time="type" top="baseVolume" :sort="-1" title="[VOL] Top giá trị vốn hóa" xtitle="Volume"></VolumePieChartComponent>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <VolumeChartComponent :refresh="refresh" :time="type" top="last" :sort="-1" title="[$] Top giá hiện tại" xtitle="Last price"></VolumeChartComponent>
      </div>
    </div>
  </div>
</template>

<script>
import VolumeChartComponent from './_VolumeChart'
import VolumePieChartComponent from './_VolumePieChart'
import Bittrex from '../../provider/Bittrex'

export default {
  props: ['rate', 'lastsync'],
  components: { VolumeChartComponent, VolumePieChartComponent },
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
      console.log('refesh', Bittrex.getTimeUpdate(self.type))
      if (this.tm) clearInterval(this.tm)
      this.tm = setInterval(() => {
        self.refresh = new Date()
      }, Bittrex.getTimeUpdate(self.type))
    }
  }
}
</script> 
