<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      success-text="刷新成功"
      success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          v-for="(item,index) in list"
          :key="index"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '../../api/article'
import articleItem from '../../components/articleItem'
import { mapState } from 'vuex'
export default {
  name: 'article-list',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      timestamp: null,
    };
  },

  components: {
    articleItem
  },

  computed: {
    ...mapState(['user'])
  },

  mounted() { },

  methods: {
    async onLoad() {
      let data = {
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1,
      }
      await getArticles(data).then(res => {
        //console.log("文章数据",res.results)
        if (this.user) {
          this.list.push(...res.results)
          this.loading = false
          if (res.results.length) {
            this.timestamp = res.pre_timestamp
          } else {
            this.finished = true
          }
        } else {
          this.list.push(...res.data.data.results)
          this.loading = false
          if (res.data.data.results.length) {
            this.timestamp = res.data.data.pre_timestamp
          } else {
            this.finished = true
          }
        }
      })
    },
    async onRefresh() {
      let data = {
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1,
      }
      await getArticles(data).then(res => {
        // console.log("文章数据",res.results)
        if (this.user) {
          this.list.unshift(...res.results)
          console.log("文章数据", this.list)
          this.refreshing = false
        } else {
          this.list.unshift(...res.data.data.results)
          console.log("文章数据", this.list)
          this.refreshing = false
        }

      })
    }
  },
}
</script>

<style scoped lang='less'>
.article-list {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 50px;
  top: 90px;
  overflow-y: auto;
}
</style>