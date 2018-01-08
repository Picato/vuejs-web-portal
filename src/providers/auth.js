import axios from 'axios'
import AppConfig from '@/appconfig'
import MainEvent from './main-event'

if (localStorage.getItem('token')) {
  axios.defaults.headers.common['token'] = localStorage.getItem('token')
}

const AuthProvider = {
  ping() {
    return axios.head(`${AppConfig.service.auth}/Ping`)
  },
  login(user, pj) {
    return axios.post(`${AppConfig.service.auth}/Login`, user, {
      headers: {
        pj: AppConfig.pj
      }
    }).then(resp => {
      const loginDone = (token) => {
        localStorage.setItem('token', token)
        axios.defaults.headers.common['token'] = token
      }
      if (resp.status !== 202) {
        return loginDone(resp.headers.token)
      }
      // If turn on 2-step verification
      const verification = () => {
        const code = window.prompt('Input the google authenticator code')
        if (code !== null) {
          return axios.post(`${AppConfig.service.auth}/Login2`, { code }, { headers: { token: resp.headers.token } }).then(resp => {
            return loginDone(resp.headers.token)
          })
        }
        return Promise.reject(new Error('Verification 2-step'))
      }
      return verification()
    })
  },
  logout() {
    return axios.get(`${AppConfig.service.auth}/Logout`).then(() => {
      localStorage.clear()
      delete axios.defaults.headers.common['token']
    }).catch(() => {
      localStorage.clear()
      delete axios.defaults.headers.common['token']
    })
  }
}

export default AuthProvider

MainEvent.$on('logout', () => {
  AuthProvider.logout().then(() => { location.href = '/login' })
})
