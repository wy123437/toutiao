<template>
  <div class="layout-container">
    <router-view />
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o"  to="/qa">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o"  to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="user-o"  to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layoutIndex',
  data() {
    return {
      active: ''
    };
  },

  components: {},

  computed: {},

  mounted() { },

  methods: {},
}
</script>

<style scoped lang='scss'>
</style>