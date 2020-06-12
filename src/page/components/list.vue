<template>
  <group :gutter="0">
    <cell v-for="item in list" :key="item.uniqueField" :title="item.name" @click.native="onItemClick" is-link>
      <img slot="icon" width="20" style="display:block;margin-right:5px;" v-lazy="item.avatorLoc">
    </cell>
  </group>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: ['list'],
  name: 'glist',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters('login', ['isLogin'])
  },
  methods: {
    onItemClick(item) {
      console.log(item)
      this.$router.push({ name: 'jssdk' })
    }
  },
  mounted() {
    console.log(this.list)
  },
  created() {
  },
  beforeDestroy() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
