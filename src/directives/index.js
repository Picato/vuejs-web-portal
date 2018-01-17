import Vue from 'vue'

Vue.directive('page', {
  inserted(_el, binding) {
    if (binding.value !== undefined && binding.arg === 'title') document.title = binding.value
  },
  update(_el, binding) {
    if (binding.value !== undefined && binding.arg === 'title') document.title = binding.value
  }
})
