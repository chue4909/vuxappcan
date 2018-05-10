
exports.install = function (Vue, options) {
  Vue.prototype.$log = function() {
    console.log(...arguments)
  }
}
