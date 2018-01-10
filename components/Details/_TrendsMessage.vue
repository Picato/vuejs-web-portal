<template>
  <div>
    <h1 class="subtitle">Bot Messages</h1>
    <div>
      <table class="table is-striped is-narrow is-fullwidth" v-if="data && data.length > 0">
        <tr v-for="(item, i) in data" :key="item._id">
          <td>
            <p class="has-text-justified"><b>{{i+1}}</b>. <span>{{item.txt}}</span> <span class="tag" :class="{'is-info': item.style === 'VOLUME', 'is-primary': item.style === 'COIN'}">{{item.style}}</span></p>
          </td>
          <td width="1" class="has-text-right has-text-dark">
            <div class="has-text-grey-light">
              {{item.updated_at | $date('HH:mm:SS')}}
              <small>{{item.updated_at | $date}}</small>
            </div>
          </td>
        </tr>
      </table>
      <div v-else>
        No message
      </div>
    </div>
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
