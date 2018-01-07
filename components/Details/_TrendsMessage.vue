<template>
  <div>
    <table class="table is-bordered is-striped is-narrow is-fullwidth">
      <tr v-for="item in data" :key="item._id">
        <td width="130">
          <a :href="'https://bittrex.com/Market/Index?MarketName=' + item.key" :target="item.key">{{item.key}}</a>        
        </td>       
        <td>{{item.txt}}</td>
        <th width="120"><span class="tag" :class="{'is-info': item.style === 'VOLUME', 'is-primary': item.style === 'COIN'}">{{item.style}}</span></th>
        <td width="160">
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
import Bittrex from '../../provider/Bittrex'

export default {
  props: ['market', 'time'],
  filters: { },
  data() {
    return {
      data: undefined,
      tm: undefined
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
    }
  },
  computed: { },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      if (this.market && this.time) {
        const self = this
        Bittrex.getTrendingMessage(this.market, this.time).then(data => {
          self.data = data
          if (self.tm) clearTimeout(self.tm)
          self.tm = setTimeout(() => {
            self.loadData.apply(self)
          }, Bittrex.getTimeUpdate(self.time))
        })
      }
    }
  }
}
</script> 
