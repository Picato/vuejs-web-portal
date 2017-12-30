<template>
  <div>
    <div class="control">
      <label class="radio">
        <input type="radio" name="type" value="min" v-model="type" @change="changeType()">
        Last 30 minutes
      </label>
      <label class="radio">
        <input type="radio" name="type" value="hour" v-model="type" @change="changeType()">
        Last 5 hours
      </label>
      <label class="radio">
        <input type="radio" name="type" value="day" v-model="type" @change="changeType()">
        Last 5 days
      </label>
    </div>
    <br/>
    <div v-if="!data">
      Loading...
    </div>
    <ul v-else>
      <li v-for="item in data" :key="item.key">
        <a :href="'https://bittrex.com/Market/Index?MarketName=' + item.key" :target="item.name">{{item.key}}&nbsp;&nbsp;&nbsp;<span class="tag"><b>{{item.time | $date('HH:mm')}}</b>&nbsp;<small>{{item.time | $date("DD/MM/YYYY")}}</small></span></a>
        <ul>
          <li v-for="(m, i) in item.msgs" :key="i" :class="{'has-text-success': m.type > 0, 'has-text-danger': m.type < 0}">&nbsp;-&nbsp;{{m.txt}}</li>
        </ul>        
      </li>    
    </ul>
  </div>
</template>
<style scoped>
.is-bullet {
  list-style-type: disc;    
  padding: 0px 0px 0px 24px;
}
</style>

<script>
import Bittrex from '../provider/Bittrex'

export default {
  props: [],
  filters: {},
  data() {
    return {
      type: 'min',
      data: []
    }
  },
  computed: {},
  mounted() {
    this.changeType()
  },
  watch: {
    $route({ name }) {}
  },
  methods: {
    changeType() {
      const self = this
      this.data = undefined
      Bittrex.getTrendingMessage(this.type).then(data => {
        self.data = data
      })
    }
  }
}
</script> 
