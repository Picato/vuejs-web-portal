import coinRoutes from '@/zones/coin'

export default [
  ...coinRoutes.map(e => {
    if (!e.path) e.path = '/coin'
    return e
  })
]
