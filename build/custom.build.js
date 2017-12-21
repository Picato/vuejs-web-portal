const fs = require('fs')
const path = require('path')

exports.copyRoutes = function() {
  const p = path.join(__dirname, '../src/zones')
  const sites = fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory())
  const sf = {
    import : [],
    routes: []
  }
  sites.forEach(e => {
    sf.import.push(`import ${e}Routes from '@/zones/${e}'`)
    sf.routes.push(`...${e}Routes.map(e => {
    if (!e.path) e.path = '/${e}'
    return e
  })`)
  })
  fs.writeFileSync(path.join(__dirname, '../src/router/zones.routes.js'), sf.import.join('\n') + '\n\n' + `export default [\n  ${sf.routes.join(',\n  ')}\n]\n`)
}
