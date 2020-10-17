<template>
  <div class="home-container">
    <div class="line"></div>
    <van-nav-bar class="app-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        icon="search"
        type="info"
        round
        size="small"
        to="/serach"
        >搜索</van-button
      >
    </van-nav-bar>

    <van-tabs class="channel-tabs" v-model="active" swipeable color="#007cf9">
      <van-tab v-for="item in channeLsList" :key="item.id" :title="item.name">
        <article-list :channel="item"></article-list>
      </van-tab>
      <div slot="nav-right" @click="show = true" class="nav">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <van-popup
      v-model="show"
      position="top"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
      get-container="body"
    >
      <channel-edit
        :myChannelList="channeLsList"
        @close="show = false"
        @update-active="updateActive"
        :textIndex="active"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getChannelsList } from '@/api/user'
import articleList from '../components/article-list'
import channelEdit from '../../components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '../../utils/storage'
export default {
  name: 'homeIndex',
  data() {
    return {
      active: 0,
      channeLsList: [],
      show: false
    };
  },

  components: {
    articleList,
    channelEdit
  },

  computed: {
    ...mapState(['user']),
  },

  mounted() {
    this.loadChannels()
  },

  methods: {
    async loadChannels() {
      this.channeLsList = []
      if (this.user) {
        await getChannelsList().then(res => {
          this.channeLsList = res.channels
        })
      } else {
        if (getItem('user-channels'))
          this.channeLsList = getItem('user-channels')
        else {
          await getChannelsList().then(res => {
            this.channeLsList = res.data.data.channels
          })
        }
      }
    },
    updateActive(index) {
      this.active = index
    },
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
.channel-tabs {
  /deep/ .van-tab {
    border-right: 1px solid #edeff3;
    border-bottom: 1px solid #edeff3;
  }
}
.nav {
  .van-icon {
    position: fixed;
    right: 0;
    width: 33px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    height: 44px;
    background-color: #fff;
    opacity: 0.9;
  }
}
.line {
  width: 1px;
  height: 29px;
  background-color: #ccc;
  position: absolute;
  top: 54px;
  right: 29px;
  z-index: 999;
}
/deep/ .van-icon {
  color: #333;
}
</style>