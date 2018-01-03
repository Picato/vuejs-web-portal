<template>
  <div>
    <div class="control">
      <label class="radio">
        <input type="radio" name="type" value="min1" v-model="type" @change="changeType()">
        Last 1 minutes
      </label>
      <label class="radio">
        <input type="radio" name="type" value="min3" v-model="type" @change="changeType()">
        Last 3 minutes
      </label>
      <label class="radio">
        <input type="radio" name="type" value="min5" v-model="type" @change="changeType()">
        Last 5 minutes
      </label>
      <label class="radio">
        <input type="radio" name="type" value="min15" v-model="type" @change="changeType()">
        Last 15 minutes
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
    <table v-else class="table is-bordered is-striped is-narrow is-fullwidth">
      <tr v-for="item in data" :key="item._id">
        <td width="200">
          <a :href="'https://bittrex.com/Market/Index?MarketName=' + item.key" :target="item.key">{{item.key}}&nbsp;&nbsp;&nbsp;<span class="tag"><b>{{item.time | $date('HH:mm')}}</b>&nbsp;<small>{{item.time | $date("DD/MM/YYYY")}}</small></span></a>        
        </td>       
        <td>{{item.txt}}</td>
        <th><span class="tag" :class="{'is-info': item.style === 'VOLUME', 'is-primary': item.style === 'COIN'}">{{item.style}}</span></th>
        <td>
          {{item.updated_at | $date('HH:mm:SS')}} <span class="tag">{{item.updated_at | $date}}</span>
        </td>
      </tr>
    </table>
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
      type: 'min1',
      data: undefined
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
      Bittrex.getTrendingMessage(this.type).then(data => {
        self.data = data
        setTimeout(self.changeType, 30000)
      })
    }
  }
}
</script> 
