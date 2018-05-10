import appcan from '../libs/appcan'
import Vue from 'vue'
import global from './global'
import { ToastPlugin, AlertPlugin, LoadingPlugin } from 'vux'
Vue.use(global)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(LoadingPlugin)

let config = {
  site: ''
}
if (process.env.NODE_ENV === 'production') {
  config.site = 'http://192.168.4.45:8080'
}
let url = {
  healthNum: {
    getList: config.site + '/cPortal/v1/healthNum/getList'
  }
}
export default {
  api_url: url,
  errFn(t, err) {
    Vue.$vux.loading.hide()
    if (t === 1) {
      if (err.data.retCode === '010016' || err.data.status === 14504) {
        // 未登录
        Vue.$router.push({ name: 'login' })
      } else {
        Vue.$vux.toast.show({
          text: err
            ? err.data.errInfo || err.data.msg || err.data.message
            : '请求错误',
          type: 'text'
        })
      }
    } else {
      Vue.$vux.toast.show({
        text: '网络不给力，请稍后重试',
        type: 'text'
      })
    }
  },
  getHealthNumListList(param) {
    let self = this
    return new Promise((resolve, reject) => {
      appcan
        .request({
          url: this.api_url.healthNum.getList,
          method: 'POST',
          data: param
        })
        .then(function(response) {
          if (response.data.retCode === '000000') return resolve(response)
          else self.errFn(1, response)
        })
        .catch(function(err) {
          self.errFn(err)
          // return reject(err)
        })
    })
  }
}
