<template>
  <div style="height:100%;z-index:5;background-color:#ffffff;">
    <view-box ref="viewBox"  body-padding-top="46px"  body-padding-bottom="0">
    <x-header slot="header" :left-options="{backText: ''}" style="width:100%;position:absolute;left:0;top:0;z-index:100;">list
    </x-header>
    <!-- :data="data" -->
    <!-- :startY="parseInt(startY)" -->
    <scroll ref="scroll" v-show="!isNoData"
              :scrollbar="false"
              :pullDownRefresh="pullDownRefreshObj"
              :pullUpLoad="pullUpLoadObj"
              @pullingDown="refresh"
              @pullingUp="getHealthNumList"
              :startY="startY"
      >
      <glist :list="data" :cols="2"></glist>
      </scroll>
    <noData text="暂无数据" v-show="isNoData"></noData>
    </view-box>
  </div>
</template>

<script>
import glist from '../components/list'
import noData from '../../components/noData'
import scroll from '../../components/scroll/scroll'
import API from '../../js/common'
import { mapGetters } from 'vuex'
export default {
  directives: {},
  components: {
    glist,
    noData,
    scroll
  },
  name: 'list',
  data() {
    return {
      msg: 'CPortal',
      data: [],
      follow: 0,
      catId: '',
      currentPage: 1,
      pageSize: 25,
      isNoData: false,
      totalPage: null,
      startY: 0,
      pullDownRefreshObj: {
        threshold: 50,
        stop: 40,
        txt: '刷新成功'
      },
      pullUpLoadObj: {
        threshold: 0,
        txt: {
          more: '拖动获取更多数据',
          noMore: '到底了'
        }
      }
    }
  },
  methods: {
    init() {
      this.currentPage = 1
      this.getHealthNumList()
    },
    getHealthNumList() {
      var self = this
      if (this._isDestroyed) {
        return
      }
      API.getHealthNumListList({
        follow: this.follow,
        catId: this.catId,
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(response => {
        if (response.data.retCode === '000000') {
          this.totalPage =
            parseInt(response.data.data.totalNum / this.pageSize) + 1

          if (this.currentPage === 1) {
            this.data = response.data.data.list
          } else {
            // self.data = self.data.concat(response.data.data.list)
            this.data = this.dataForm(response.data.data.list, this.data, 'id')
          }

          // // scroll传入data时
          // if (response.data.data.list.length === 0) {
          //   // this.isEnd = true
          //   // 如果没有新数据
          //   this.$refs.scroll.forceUpdate()
          // } else {
          //   this.currentPage++
          // }

          if (this.totalPage !== this.currentPage) {
            this.currentPage++
          }
          this.$nextTick(m => {
            this.$refs.scroll.forceUpdate()
          })
        }
      })
    },
    dataForm(newData, oldData, idx) {
      let old = [...oldData, ...newData]
      let neww = {}
      const newArr = old.reduce((item, next) => {
        neww[next[idx]] ? '' : (neww[next[idx]] = true && item.push(next))
        return item
      }, [])
      return newArr
    },
    refresh() {
      this.init()
    },
    rebuildScroll() {
      this.nextTick(() => {
        this.$refs.scroll.destroy()
        this.$refs.scroll.initScroll()
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === 'home') {
      next(vm => {
        // 通过 `vm` 访问组件实例
        vm.catId = vm.$route.params.catId
        vm.data = []
        vm.currentPage = 1
        vm.isNoData = false
        vm.totalPage = null
        vm.startY = 0
        vm.init()
      })
    } else next()
  },
  created() {},
  activated() {
    // var self = this
    // if (this.position.top) {
    //   setTimeout(() => {
    //     self.$refs.myscroller.scrollBy(
    //       self.position.left,
    //       self.position.top,
    //       false
    //     )
    //     self.position = {}
    //   })
    // }
  },
  beforeRouteLeave(to, from, next) {
    // this.position = this.$refs.myscroller.getPosition()
    next()
  },
  watch: {
    isLogin(val) {
      this.init()
    },
    startY() {
      this.rebuildScroll()
    }
  },
  computed: {
    ...mapGetters('login', ['isLogin']),
    ...mapGetters(['device'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.itemImg {
  width: 3rem !important;
  height: 3rem !important;
  left: -0.625rem;
  top: -1.25rem;
  position: relative;
}
.itemLable {
  position: relative;
}
#child {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  overflow: hidden;
  z-index: 5;
  background-color: #fbf9fe;
}
.position {
  padding-top: 46px;
  height: calc(~'100% - 46px') !important;
}
.positionios {
  padding-top: 66px;
  height: calc(~'100% - 66px') !important;
}
</style>
