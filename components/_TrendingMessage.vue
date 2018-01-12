<template>
  <div>
    <div class="control">
      <label class="radio">
        <input type="radio" name="type" value="HandlerMin1" v-model="type" @change="changeType()">
        Last 1 minutes
      </label>
      <label class="radio">
        <input type="radio" name="type" value="HandlerMin3" v-model="type" @change="changeType()">
        Last 3 minutes
      </label>
      <label class="radio">
        <input type="radio" name="type" value="HandlerMin15" v-model="type" @change="changeType()">
        Last 15 minutes
      </label>
      <label class="radio">
        <input type="radio" name="type" value="HandlerMin30" v-model="type" @change="changeType()">
        Last 30 minutes
      </label>
      <label class="radio">
        <input type="radio" name="type" value="HandlerHour1" v-model="type" @change="changeType()">
        Last 1 hours
      </label>
      <label class="radio">
        <input type="radio" name="type" value="HandlerDay1" v-model="type" @change="changeType()">
        Last 1 days
      </label>
    </div>
    <hr/>
    <table class="table is-bordered is-striped is-narrow is-fullwidth">
      <tr v-for="item in data" :key="item._id">
        <td width="200">
          <a :href="'/coin/market/' + item.key" :target="item.key">{{item.key}}</a>        
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
      type: 'HandlerMin1',
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
      Bittrex.getTrendingMessage(undefined, this.type).then(data => {
        self.data = data
        setTimeout(self.changeType, 30000)
      })
    }
  }
}
</script> 
