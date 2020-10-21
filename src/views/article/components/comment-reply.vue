<template>
  <div class="comment-reply">
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon slot="left" name="cross" @click="closeReply"></van-icon>
    </van-nav-bar>
    <div class="messgae">
      <comment-item :comment="comment"></comment-item>
      <van-cell title="所有回复"></van-cell>
      <comment-list :source="comment.com_id" type="c" :list="commentList"></comment-list>
    </div>
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <van-popup
      v-model="isPostShow"
      position="bottom"
    >
    <post-comment :target="comment.com_id" :artId="articleId" @closePost="isPostShow=$event" @post-success="postSuccess"></post-comment>
    </van-popup>
  </div>
</template>

<script>
import commentItem from './comment-item'
import commentList from './comment-list'
import postComment from './post-comment'
export default {
  name: 'comment-reply',
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId:{
      type: [String, Number, Object],
      required: true
    }
  },
  data() {
    return {
      isPostShow:false,
      commentList:[]
    };
  },

  components: {
    commentItem,
    commentList,
    postComment
  },

  computed: {},

  mounted() { },

  methods: {
    closeReply() {
      this.$emit('closeReply')
    },
    postSuccess(data){
      this.commentList.unshift(data)
      this.comment.reply_count = this.comment.reply_count + 1
      this.isPostShow = false
    }
  },
}
</script>

<style scoped lang='less'>
.messgae {
  position: fixed;
  bottom: 40px;
  left: 0;
  right: 0;
  overflow-y: auto;
  top: calc(20% + 46px);
}
.article-bottom {
  height: 40px;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  border-top: 1px solid #d8d8d8;
  align-items: center;
  .van-button {
    width: 80%;
    height: 25px;
    color: #333333;
  }
}
</style>