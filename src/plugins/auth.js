export default {
  install(Vue, options) {
    // 1. add global method or property
    Vue.myGlobalMethod = function () {
      // something logic ...
    }

    // 2. add a global asset
    Vue.directive('my-directive', {
      bind(el, binding, vnode, oldVnode) {
        // something logic ...s
      }
    })

    // 3. inject some component options
    Vue.mixin({
      created: function () {
        // console.log(this)
        // something logic ...
      }
    })

    // 4. add an instance method
    Vue.prototype.$myMethod = function (methodOptions) {
      // something logic ...
    }
  }
}
