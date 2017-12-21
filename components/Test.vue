<template>
  <div>
    <h1>{{sayHello}}</h1>
  </div>
</template>

<script>
import Test from '../provider/Test'

export default {
  data() {
    return {
      sayHello
    }
  },
  mounted() {
    this.sayHello = Test.getHello('thanh')
  }
}
</script> 
