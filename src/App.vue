<template>
  <div class="app">
    <loading v-model="isLoading"></loading>
    <transition
        @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
        :name="viewTransition" :css="!!direction">
      <keep-alive exclude=''>
        <router-view class="router-view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import appcan from './libs/appcan'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'app',
  data() {
    return {
      keyCode: 0
    }
  },
  created() {
    this.initDevice()
  },
  computed: {
    ...mapGetters(['direction', 'isLoading']),
    viewTransition() {
      if (!this.direction) return ''
      return 'vux-pop-' + (this.direction === 'forward' ? 'in' : 'out')
    }
  },
  methods: {
    ...mapMutations('login', ['set_isLogin']),
    ...mapMutations(['setDevice']),
    initDevice() {
      let self = this
      try {
        appcan.onKeyPressed(this.keyCode, function(key) {
          switch (self.$route.name) {
            case 'home':
              uexWidgetOne.exit(1)
              break
            default:
              self.$router.isBack = true
              self.$router.go(-1)
              break
          }
        })
      } catch (error) {}
      var ua = navigator.userAgent.toLowerCase()
      if (/iphone|ipad|ipod/.test(ua)) {
        this.setDevice('ios')
      }
    }
  }
}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
.app {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.router-view {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #efeff4;
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  right: 0;
  left: 0;
  position: fixed;
  backface-visibility: hidden;
  perspective: 1000;
}
.vux-pop-in-enter,
.vux-pop-out-leave-active {
  transform: translate3d(100%, 0, 1px);
}
html,
body {
  height: 100%;
  width: 100%;
  font-size: 16px;
  margin: 0;
  padding: 0;
  position: relative;
  -webkit-overflow-scrolling: touch;
}
</style>
