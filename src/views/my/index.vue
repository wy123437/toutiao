<template>
  <div class="my-container">
    <van-cell-group class="top" v-if="user">
      <van-cell
        title="单元格"
        value="内容"
        center
        :border="false"
        class="base-info"
      >
        <van-image
          class="avater"
          slot="icon"
          fit="cover"
          round
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div slot="title" class="name">{{ userInfoData.name }}</div>
        <van-button size="small" round class="update-btn">编辑资料</van-button>
      </van-cell>
      <van-grid center class="gridStyle" :border="false">
        <van-grid-item>
          <div slot="text" class="item">
            <div class="span">{{ userInfoData.art_count }}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text" class="item">
            <div class="span">{{ userInfoData.follow_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text" class="item">
            <div class="span">{{ userInfoData.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text" class="item">
            <div class="span">{{ userInfoData.like_count }}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <div class="not-login" @click="$router.push('/login')" v-else>
      <img src="./下载.png" />
      <span>登录 / 注册</span>
    </div>
    <van-grid center :border="false" :column-num="2" class="nav-gird">
      <van-grid-item
        class="nav-gird-item"
        icon-prefix="toutiao"
        icon="shoucang"
        text="收藏"
      />
      <van-grid-item
        class="nav-gird-item"
        icon-prefix="toutiao"
        icon="lishi"
        text="历史"
      />
      <div style="width: 100%; margin-top: 5px">
        <van-cell center title="消息通知" is-link />
        <van-cell center title="小智同学" is-link />
      </div>
      <div style="width: 100%; margin-top: 5px">
        <van-button
          @click="leaveBtn"
          v-if="user"
          plain
          style="color: red; width: 100%"
          >退出登录</van-button
        >
      </div>
    </van-grid>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
import { removeItem } from '@/utils/storage'
export default {
  name: 'myIndex',
  data() {
    return {
      userInfoData: {}
    };
  },

  components: {},

  computed: {
    ...mapState(['user'])
  },

  mounted() {
    this.getUserInfo()
  },

  methods: {
    leaveBtn() {
      this.$dialog.confirm({
        title: '提示',
        message: '确认退出吗？',
      })
        .then(() => {
          this.$store.commit('setUser', null)
          removeItem('user')
          this.$router.push('/login')
        })
        .catch(() => {
          // on cancel
        });
    },
    async getUserInfo() {
      await getUserInfo().then(res => {
        console.log("用户数据", res)
        this.userInfoData = res
      })
    }
  },
}
</script>

<style scoped lang='less'>
.span {
  font-size: 20px;
  color: #fff;
  margin-bottom: 5px;
}
.text {
  font-size: 14px;
  color: #fff;
}
.my-container {
  .not-login {
    background: url("./banner.png") no-repeat;
    background-size: cover;
    height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 100px;
      height: 100px;
    }
    span {
      margin-top: 15px;
      color: #fff;
      font-size: 16px;
    }
  }
  .top {
    background: url("./banner.png") no-repeat;
    background-size: cover;
    .base-info {
      background-color: unset;
      height: 115px;
      box-sizing: border-box;
      padding-top: 38px;
      padding-bottom: 11px;
    }
    .avater {
      height: 66px;
      width: 66px;
      border: 1px #fff solid;
      box-sizing: border-box;
    }
    .name {
      font-size: 15px;
      color: #fff;
      margin-left: 10px;
    }
    .update-btn {
      height: 16px;
      color: #666666;
      font-size: 10px;
    }
    .gridStyle {
      height: 65px;
      padding-bottom: 10px;
      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
    /deep/ .van-grid-item__content {
      background-color: unset;
    }
  }
  .nav-gird {
    .nav-gird-item {
      height: 70px;
      /deep/ .toutiao {
        font-size: 22px;
      }
      /deep/ .toutiao-shoucang {
        color: #eb5253;
      }
      /deep/ .toutiao-lishi {
        color: #ff9d1d;
      }
      /deep/ .van-grid-item__text {
        color: #333333;
        font-size: 14px;
      }
    }
  }
}
</style>