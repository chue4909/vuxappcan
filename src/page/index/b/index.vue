<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px">
      <x-header slot="header" :left-options="{showBack: false}" style="width:100%;position:absolute;left:0;top:0;z-index:100;">健康</x-header>
      <group title="">
        <cell title="jssdk" is-link :link="{name:'jssdk'}"></cell>
      </group>
    </view-box>
  </div>
</template>

<script>

export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  }
}
</script>

<style>

</style>
