import Vue from 'vue'
import Router from 'vue-router'

Router.prototype.go = function(t) {
  this.isBack = true
  console.log('go===' + this.history.current.name)
  let currentName = this.history.current.name
  if (!t) window.history.go(-1)
  else window.history.go(t)
  var self = this
  setTimeout(function() {
    if (currentName === self.history.current.name) {
      try {
        uexWindow.close(-1)
      } catch (e) {}
    }
  }, 100)
}
Router.prototype.back = function(t) {
  this.isBack = true
  let currentName = this.history.current.name
  if (t) window.history.back()
  else window.history.back()
  var self = this
  setTimeout(function() {
    if (currentName === self.history.current.name) {
      try {
        uexWindow.close(-1)
      } catch (e) {}
    }
  }, 100)
}
// 路由懒加载
const index = () => import('@/page/index/index').then(m => m.default)
const home = () => import('@/page/index/home/index').then(m => m.default)
const b = () => import('@/page/index/b/index').then(m => m.default)
const jssdk = () => import('@/page/jssdk/jssdk').then(m => m.default)
const list = () => import('@/page/list/index').then(m => m.default)
const upload = () => import('@/page/upload/index').then(m => m.default)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/index/home',
      name: 'index',
      component: index,
      children: [
        {
          path: '/index/home',
          name: 'home',
          component: home
        },
        {
          path: '/index/b',
          name: 'b',
          component: b
        }
      ]
    },
    {
      path: '/jssdk',
      name: 'jssdk',
      component: jssdk
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/upload',
      name: 'upload',
      component: upload
    }
  ]
})
