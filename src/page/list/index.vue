<template>
  <div style="height:100%;z-index:5;background-color:#ffffff;">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="0">
      <x-header
        slot="header"
        :left-options="{backText: ''}"
        style="width:100%;position:absolute;left:0;top:0;z-index:100;"
      >list</x-header>
      <scroll
        ref="scroll"
        :scrollbar="false"
        :pullDownRefresh="pullDownRefreshObj"
        :pullUpLoad="pullUpLoadObj"
        @pullingDown="refresh"
        @pullingUp="getList"
      >
        <glist :list="data"></glist>
      </scroll>

      <noData text="暂无数据" v-show="!data.length"></noData>
    </view-box>
  </div>
</template>

<script>
import glist from '../components/list'
import noData from '../../components/noData'
import scroll from '../../components/scroll/scroll'
import API from '@/js/common'
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
      domainName: '企业移动门户统一认证',
      orgId: '003',
      currentPage: 1,
      pageSize: 15,
      totalPage: null,
      noMore: false,
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
      this.getList()
    },
    getList() {
      if (this.noMore) {
        this.$nextTick(m => {
          this.$refs.scroll.forceUpdate()
        })
        return
      }
      API.getList({
        domainName: this.domainName,
        orgId: this.orgId,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      }).then(response => {
        if (response.userList) {
          this.totalPage = response.totalPages

          if (response.pageNo === 1) {
            this.data = response.userList
          } else {
            this.data = this.dataForm(
              response.userList,
              this.data,
              'uniqueField'
            )
          }

          if (this.totalPage !== this.currentPage) {
            this.currentPage++
          }
          if (response.pageNo === response.totalPages) {
            this.noMore = true
          }
        } else {
          this.noMore = true
        }
        this.$nextTick(m => {
          this.$refs.scroll.forceUpdate()
        })
      })
    },
    // 合并去重
    dataForm(newData, oldData, idx) {
      let old = [...oldData, ...newData]
      let neww = {}
      const newArr = old.reduce((item, next) => {
        if (!neww[next[idx]]) {
          neww[next[idx]] = true && item.push(next)
        }
        return item
      }, [])
      return newArr
    },
    refresh() {
      this.noMore = false
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
        // vm.catId = vm.$route.params.catId
        vm.data = []
        vm.currentPage = 1
        vm.totalPage = null
        vm.noMore = false
        vm.init()
      })
    } else next()
  },
  mounted() {},
  created() {},
  activated() {},
  beforeRouteLeave(to, from, next) {
    next()
  },
  watch: {
    isLogin(val) {
      this.init()
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
