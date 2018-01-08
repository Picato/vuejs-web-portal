import DefaultTemplate from '@/templates/Default'
import CheckingMarket from './components/CheckingMarket'
import DetailsMarket from './components/Details/Detail.vue'

export default [{
  component: DefaultTemplate,
  children: [{
    meta: { requiresAuth: true },
    path: 'market',
    name: 'CheckingMarket',
    component: CheckingMarket
  }, {
    meta: { requiresAuth: true },
    path: 'market/:key',
    name: 'DetailsMarket',
    component: DetailsMarket
  }]
}]
