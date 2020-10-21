<template>
  <div class="article-index">
    <van-nav-bar class="app-nav-bar" left-arrow @click-left="$router.back()">
      <template #right>
        <van-icon name="ellipsis" size="22" />
      </template>
    </van-nav-bar>
    <div class="markdown">
      <h1>{{ articleData.title }}</h1>
      <van-cell class="user-info" center>
        <div class="name" slot="title">{{ articleData.aut_name }}</div>
        <van-image
          class="img"
          slot="icon"
          fit="cover"
          round
          width="35"
          height="35"
          :src="articleData.aut_photo"
        />
        <div slot="label" class="label">
          {{ articleData.pubdate | relativeTime }}
        </div>
        <van-button
          class="btn"
          :icon="articleData.is_followed ? 'success' : 'plus'"
          :type="articleData.is_followed ? 'danger' : 'info'"
          size="small"
          round
          :loading="isLoading"
          @click="btnClick"
          >{{ articleData.is_followed ? "已关注" : "关注" }}</van-button
        >
      </van-cell>
      <div
        class="markdown-body"
        v-html="articleData.content"
        ref="articleContent"
      ></div>
      <comment-list
        :source="articleId"
        :list="commentList"
        @updateTotal="totalCount = $event"
        @replybtnClick="replybtnClick"
      >
      </comment-list>
    </div>
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="commentShow = true"
        >写评论</van-button
      >
      <van-icon name="chat-o" :badge="totalCount" color="#777" />
      <van-icon
        :name="articleData.is_collected ? 'star' : 'star-o'"
        :color="articleData.is_collected ? 'yellow' : '#777'"
        @click="onCollected"
        :loading="isCollectedLoading"
      />
      <van-icon
        :name="articleData.attitude === 1 ? 'good-job' : 'good-job-o'"
        :color="articleData.attitude === 1 ? 'red' : '#777'"
        @click="onLikings"
      />
      <van-icon name="share" color="#777777" />
    </div>
    <van-popup v-model="commentShow" position="bottom">
      <post-comment
        :target="articleId"
        @closePost="commentShow = $event"
        @post-success="onPostSuccess"
      ></post-comment>
    </van-popup>

    <van-popup
      v-model="isReplyShow"
      position="bottom"
      :style="{ height: '80%' }"
    >
      <comment-reply
        v-if="isReplyShow"
        @closeReply="isReplyShow = false"
        :comment="replyComent"
        :articleId="articleId"
      ></comment-reply>
    </van-popup>
  </div>
</template>

<script>
import { getArticlesContent, startCollections, closeCollections, startlikings, closelikings } from '../../api/article'
import { userFollowings, userTarget } from '../../api/user'
import './github-markdown.css'
import { ImagePreview } from 'vant';
import commentList from './components/comment-list'
import postComment from './components/post-comment'
import commentReply from './components/comment-reply'

export default {
  name: 'articleIndex',
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data() {
    return {
      articleData: [],
      isLoading: false,
      isCollectedLoading: false,
      isonLikingsLoading: false,
      commentShow: false,
      commentList: [],
      totalCount: 0,
      isReplyShow: false,
      replyComent: {}
    };
  },

  components: {
    commentList,
    postComment,
    commentReply
  },

  computed: {},

  mounted() {
    this.getArticlesContent()
  },

  methods: {
    async getArticlesContent() {
      await getArticlesContent(this.articleId).then(res => {
        console.log("res", res)
        this.articleData = res
        console.log(" this.$refs.articleContent", this.$refs.articleContent)
        this.$nextTick(() => {
          let imgs = this.$refs.articleContent.querySelectorAll('img')
          let imgPath = []
          imgs.forEach((img, index) => {
            imgPath.push(img.src)
            img.onclick = function () {
              ImagePreview({
                images: imgPath,
                startPosition: index,
                closeable: true,
              });
            }
          })
        })
      })
    },
    async btnClick() {
      this.isLoading = true
      if (this.articleData.is_followed) {
        await userTarget(this.articleData.aut_id).then(res => {
          this.articleData.is_followed = !this.articleData.is_followed
          this.isLoading = false
          this.$Toast.success("取消关注成功")
        })
      } else {
        await userFollowings(this.articleData.aut_id).then(res => {
          this.articleData.is_followed = !this.articleData.is_followed
          this.isLoading = false
          this.$Toast.success("关注成功")
        })
      }
    },
    async onCollected() {
      this.isCollectedLoading = true
      if (this.articleData.is_collected) {
        await closeCollections(this.articleId).then(res => {
          this.articleData.is_collected = !this.articleData.is_collected
          this.isCollectedLoading = false
          this.$Toast.success("取消收藏成功")
        })
      } else {
        await startCollections({ target: this.articleId }).then(res => {
          this.articleData.is_collected = !this.articleData.is_collected
          this.isCollectedLoading = false
          this.$Toast.success("收藏成功")
        })
      }
    },
    async onLikings() {
      this.isonLikingsLoading = true
      if (this.articleData.attitude === 1) {
        await closelikings(this.articleId).then(res => {
          this.articleData.attitude = 0
          this.isonLikingsLoading = false
          this.$Toast.success("取消点赞成功")
        })
      } else {
        await startlikings({ target: this.articleId }).then(res => {
          this.articleData.attitude = 1
          this.isonLikingsLoading = false
          this.$Toast.success("点赞成功")
        })
      }
    },
    onPostSuccess(data) {
      console.log("his.commentList", this.commentList)
      this.totalCount = this.totalCount + 1
      this.commentList.unshift(data)
    },
    replybtnClick(comment) {
      console.log("huif1", this.replyComent)
      this.replyComent = comment
      this.isReplyShow = true
    }
  },
}
</script>

<style scoped lang='less'>
.article-index {
  background-color: #ffffff !important;

  h1 {
    color: #3a3a3a;
    font-size: 20px;
    margin-top: 24px;
    margin-left: 14px;
  }
  .img {
    margin-right: 15px;
  }
  .user-info {
    font-size: 12px;
    color: #383838;
  }
  .label {
    font-size: 12px;
    color: #b4b4b4;
  }
  .btn {
    width: 80px;
    height: 29px;
  }
  .markdown {
    position: fixed;
    right: 0;
    left: 0;
    top: 46px;
    background-color: #ffffff;
    bottom: 42px;
    overflow-y: auto;
  }
  .markdown-body {
    padding: 14px;
  }
  .article-bottom {
    height: 40px;
    position: fixed;
    bottom: 0;
    background-color: #ffffff;
    left: 0;
    right: 0;
    border-top: 1px solid #d8d8d8;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .comment-btn {
      color: #cdcdcd;
      font-size: 14px;
      width: 125px;
      height: 24px;
      flex: 0.5;
    }
    .van-icon {
      font-size: 22px;
    }
  }
}
</style>