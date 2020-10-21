<template>
  <van-cell class="comment-item">
    <van-image
      class="img"
      slot="icon"
      width="36"
      height="36"
      :src="comment.aut_photo"
      round
      fit="cover"
    />
    <div slot="title" class="title">
      <div style="display: flex; justify-content: space-between">
        <div class="name">{{ comment.aut_name }}</div>
        <div class="like-wrap">
          <van-icon :loading="isonLikingLoading" :color="comment.is_liking?'red':''" :name="comment.is_liking?'good-job':'good-job-o'" class="like-icon" @click="onliking"></van-icon>
          <span class="like-count">{{comment.like_count}}</span>
        </div>
      </div>
      <div class="content">{{ comment.content }}</div>

      <div>
        <span class="pubdate">{{ comment.pubdate | dateTime}}</span>
        <van-button class="reply-btn" round size="mini" @click="replybtnClick">{{comment.reply_count}}&nbsp;回复</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import {Commentslikings,closeCommentslikings} from '../../../api/comment'
export default {
  name: '',
  props: {
    comment: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      isonLikingLoading:false
    };
  },

  components: {},

  computed: {},

  mounted() { },

  methods: {
   async onliking(){
       this.isonLikingLoading = true
      if (this.comment.is_liking) {
        await closeCommentslikings(this.comment.com_id.toString()).then(res => {
          this.comment.is_liking= !this.comment.is_liking
          this.isonLikingLoading = false
          this.comment.like_count = this.comment.like_count - 1
          this.$Toast.success("取消关注成功")
        })
      } else {
        await Commentslikings({target:this.comment.com_id.toString()}).then(res => {
          this.comment.is_liking= !this.comment.is_liking
          this.isonLikingLoading = false
           this.comment.like_count = this.comment.like_count + 1
          this.$Toast.success("关注成功")
        })
      }
    },
    replybtnClick(){
      this.$emit('replybtnClick',this.comment)
    }
  },
}
</script>

<style scoped lang='less'>
.comment-item {
  .img {
    margin-right: 13px;
  }
  .name {
    font-size: 14px;
    color: #406599;
  }
  .content {
    font-size: 16px;
    color: #222222;
  }
  .pubdate {
    font-size: 10px;
  }
  .reply-btn{
    margin-left: 5px;
    font-size: 12px;
    color: #222222;
    padding: 10px;
    background-color:rgb(244,245,266);
  }
  .like-wrap{
    display: flex;
    align-items: center;
    .like-icon{
      //font-size: 16px;
    }
  }
  .like-count{
   // font-size: 17px;
  }
}
</style>