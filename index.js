import DefaultTemplate from '@/templates/Default'
import CheckingMarket from './components/CheckingMarket'

export default [{
  component: DefaultTemplate,
  children: [{
    meta: { requiresAuth: true },
    path: 'market',
    name: 'CheckingMarket',
    component: CheckingMarket
  }]
}]
