<template>
  <div class="weui-tab">
    <slot name="header"></slot>
    <div class="weui-tab__panel vux-fix-safari-overflow-scrolling" ref="viewBoxBody" id="vux_view_box_body" :style='{paddingTop: _bodyPaddingTop, paddingBottom: _bodyPaddingBottom}'>
      <slot></slot>
    </div>
    <slot name="bottom"></slot>
  </div>
</template>

<script>
export default {
  name: 'view-box',
  props: ['bodyPaddingTop', 'bodyPaddingBottom'],
  methods: {
    scrollTo (top) {
      this.$refs.viewBoxBody.scrollTop = top
    },
    getScrollTop () {
      return this.$refs.viewBoxBody.scrollTop
    },
    getScrollBody () {
      return this.$refs.viewBoxBody
    }
  },
  computed: {
    isAddX () {
      // iPhone X、iPhone XS
      var isIPhoneX = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 375 && window.screen.height === 812;
      // iPhone XS Max
      var isIPhoneXSMax = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 414 && window.screen.height === 896;
      // iPhone XR
      var isIPhoneXR = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 2 && window.screen.width === 414 && window.screen.height === 896;
        return isIPhoneX || isIPhoneXSMax || isIPhoneXR
    },
    _bodyPaddingTop () {
      var ua = navigator.userAgent.toLowerCase()
      if (/iphone|ipad|ipod/.test(ua)) {

       if (this.isAddX) {
          // 是iphoneX
        return  (parseInt(this.bodyPaddingTop) + 32) +'px'
      } else {
          // 不是iphoneX
       return  (parseInt(this.bodyPaddingTop) + 20) +'px'
      }

      }
      return this.bodyPaddingTop
    },
    _bodyPaddingBottom () {
      var ua = navigator.userAgent.toLowerCase()
      var btnum = this.bodyPaddingBottom ? parseInt(this.bodyPaddingBottom) : 0
      if (/iphone|ipad|ipod/.test(ua)) {
        if (this.isAddX) {
          // 是iphoneX
          return  (btnum + 35) +'px'
        } else {
            // 不是iphoneX
        return  (parseInt(this.bodyPaddingBottom)) +'px'
        }
      }
      return this.bodyPaddingBottom
    },
  },
}
</script>

<style lang="less">
@import '../../styles/weui/widget/weui_tab/vux-tabbar';
</style>
