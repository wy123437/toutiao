<template>
  <div class="post-comment">
    <van-field
      v-model="content"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入评论"
      show-word-limit
    />
    <van-button round :disabled="!content" size="mini" type="info" @click="onPost">发布</van-button>
  </div>
</template>

<script>
import { addcomments } from '../../../api/comment'
export default {
  name: 'post-comment',
  props: {
    target: {
      type: [String, Number, Object],
      required: true
    },
    artId: {
      type: [String, Number, Object],
      default: null
    }
  },
  data() {
    return {
      content: '',
    };
  },

  components: {},

  computed: {},

  mounted() { },

  methods: {
    async onPost() {
      this.$Toast.loading({
        message: '发布中...',
        forbidClick: true
      })
      await addcomments({
        target: this.target === null ? null : this.target.toString(),
        content: this.content,
        art_id: this.artId === null ? null : this.artId.toString()
      }).then(res => {
        this.content = ""
        this.$Toast.success("发布成功")
        this.$emit("closePost",false)
        this.$emit("post-success",res.new_obj)
      })
    }
  },
}
</script>

<style scoped lang='less'>
.post-comment {
  display: flex;
  align-items: center;
  padding: 14px;
  .van-button {
    width: 60px;
  }
}
</style>