import DefaultTemplate from '@/templates/Default'
import Test from './bittrex/Test'

export default [{
  component: DefaultTemplate,
  children: [{
    path: 'test',
    name: 'Test',
    component: Test
  }]
}]
