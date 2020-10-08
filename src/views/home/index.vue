<template>
  <div class="home-container">
    <van-nav-bar class="app-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        icon="search"
        type="info"
        round
        size="small"
        >搜索</van-button
      >
    </van-nav-bar>
    <van-tabs v-model="active"  swipeable animated>
      <van-tab v-for="item in channeLsList" :key="item.id" :title="item.name">
        内容 
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getChannelsList } from '@/api/user'
export default {
  name: 'homeIndex',
  data() {
    return {
      active: 0,
      channeLsList: [],
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.loadChannels()
  },

  methods: {
    async loadChannels() {
      await getChannelsList().then(res => {
        this.channeLsList = res.channels
      })
    }
  },
}
</script>

<style scoped lang='less'>
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    height: 30px;
    width: 250px;
    background-color: #5babfb;
    font-size: 14px;
  }
}
</style>