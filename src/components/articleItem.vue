<template>
  <!-- <div class="article-item">文章列表</div> -->
  <van-cell class="article-item">
    <div slot="title" style="font-size:15px;font-weight: bold;">{{ article.title }}</div>
    <div slot="label">
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <van-image
        class="cover-wrap-item"
          width="105"
          height="65"
          fit="cover"
          v-for="(item, index) in article.cover.images" :key="index"
          :src="item"
        />
      </div>
      <div class="label-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <van-image
          v-if="article.cover.type === 1"
          width="105"
          height="65"
          fit="cover"
          :src="article.cover.images[0]"
        />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {};
  },

  components: {},

  computed: {},

  mounted() { },

  methods: {},
}
</script>

<style scoped lang='less'>
.cover-wrap{
  margin-top: 15px;
  display: flex;
  flex-wrap: nowrap;
  .cover-wrap-item{
    flex: 1;
  }
}
.label-wrap{
  margin-top: 15px;
  span{
    margin-right: 10px;
  }
}
</style>