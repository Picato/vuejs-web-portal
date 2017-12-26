import Vue from 'vue'
import moment from 'moment'

Vue.filter('$find', function (value, list, key = '_id') {
  return list.find(e => e[key] === value)
})

Vue.filter('$show', function (value, field) {
  if (!value) return ''
  return value[field] || 'Unknown'
})

Vue.filter('$number', function (value, defaultValue) {
  if (!value) return defaultValue === undefined ? '' : defaultValue
  return Number(value).toLocaleString(undefined, { maximumFractionDigits: 9 })
})

Vue.filter('$date', function (value, format) {
  if (!value) return ''
  return moment(String(value)).format(format || 'DD/MM/YYYY')
})
