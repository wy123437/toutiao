<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item
        v-for="(item, index) in list"
        :key="index"
        :comment="item"
        @replybtnClick="replybtnClick"
      ></comment-item>
    </van-list>
  </div>
</template>

<script>
import { getComments } from '../../../api/comment'
import commentItem from './comment-item'
export default {
  name: 'comment-list',
  props: {
    source: {
      type: [String, Number, Object],
      required: true
    },
    type:{
      type:String,
      default:'a'
    },
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    };
  },

  components: {
    commentItem
  },

  computed: {},

  mounted() { },

  methods: {
    async onLoad() {
      await getComments({
        type: this.type,
        source: this.source.toString(),
        offset: this.offset,
        limit: this.limit,
      }).then(res => {
        this.$emit('updateTotal',res.total_count)
        this.list.push(...res.results)
        this.loading = false
        if (!res.results.length) {
          this.finished = true
        } else {
          this.offset = res.last_id
        }
      })
    },
     replybtnClick(comment){
      this.$emit('replybtnClick',comment)
    }
  },
}
</script>

<style scoped lang='less'>
</style>