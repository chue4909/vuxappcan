import appcan from '../libs/appcan'
import Vue from 'vue'
import global from './global'
import { ToastPlugin, AlertPlugin, LoadingPlugin, md5 } from 'vux'
Vue.use(global)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(LoadingPlugin)

let config = {
  site: ''
}

if (navigator.userAgent.toLowerCase().indexOf('appcan') > 0) {
  // if (process.env.NODE_ENV === 'production') {
  config.site = 'http://yapi.smart-xwork.cn/mock/116495'
  // }
}
let url = {
  getList: config.site + '/demo/list/get',
  demoUrl: config.site + '',
  fileUpload: config.site + '/demo/upload'
}
export default {
  api_url: url,
  getHeader() {
    var curTime = Date.now()
    var key = md5('EPortal:0647513c-88f1-46c9-b764-b38e19f0e4e6:' + curTime)
    // var emmToken = JSON.parse(appcan.val('emmToken'))
    var accessToken = '227b7c9c-ce15-4873-875f-1bff418545a2'
    var headerParam = {
      'x-mas-app-id': 'EPortal',
      appverify: 'md5=' + key + ';ts=' + curTime,
      accessToken: accessToken
    }
    return headerParam
  },
  errFn(t, err) {
    Vue.$vux.loading.hide()
    if (t === 1) {
      if (err.data.code === '000001') {
        // 未登录
        Vue.$router.push({ name: 'login' })
      } else {
        Vue.$vux.toast.show({
          text: err ? err.data.message : '请求错误',
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
  // upload
  fileUpload(param, cb) {
    let self = this
    return new Promise((resolve, reject) => {
      appcan
        .upload({
          url: this.api_url.fileUpload,
          path: param,
          type: 0,
          field: 'myFile',
          quality: 1,
          maxwidth: 640,
          onUploadProgress: function(response) {
            cb(response.percent)
          }
        })
        .then(
          function(response) {
            var data = JSON.parse(response.responseString)
            if (data.ret === 0) return resolve(data)
            else {
              Vue.$vux.loading.hide()
              Vue.$vux.toast.show({
                text: '上传失败',
                type: 'text'
              })
            }
          },
          function(err) {
            self.errFn(err)
            // Vue.$vux.loading.hide()
            return reject(err)
          }
        )
        .catch(function(err) {
          // Vue.$vux.loading.hide()
          self.errFn(err)
          return reject(err)
        })
    })
  },
  // post demo
  postList(data) {
    let self = this
    return new Promise((resolve, reject) => {
      appcan
        .request({
          url: this.api_url.demoUrl,
          method: 'POST',
          data,
          headers: this.getHeader()
        })
        .then(function(response) {
          resolve(response.data)
        })
        .catch(function(err) {
          self.errFn(err)
          // return reject(err)
        })
    })
  },
  // get demo demoUrl无效
  getList(params) {
    let self = this
    return new Promise((resolve, reject) => {
      appcan
        .request({
          url: this.api_url.getList,
          method: 'GET',
          params,
          headers: this.getHeader()
        })
        .then(function(response) {
          if (response.data.code === '100000') {
            return resolve(response.data.data)
          } else self.errFn(1, response)
        })
        .catch(function(err) {
          self.errFn(err)
          // return reject(err)
        })
    })
  }
}
