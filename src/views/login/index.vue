<template>
  <div class="login-container">
    <van-nav-bar
      title="注册 / 登录"
      class="app-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />
    <van-form
      @submit="onLogin"
      @failed="onfailed"
      :show-error="false"
      ref="loginFrom"
      :show-error-message="false"
      validate-first
    >
      <van-field
        v-model="loginData.mobile"
        clearable
        center
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入手机号"
        :rules="fromRules.mobile"
        :show-error="false"
        name="mobile"
      />
      <van-field
        v-model="loginData.code"
        center
        clearable
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        :rules="fromRules.code"
        name="code"
      >
        <template #button>
          <van-button
            class="btnText"
            size="small"
            round
            color="#e9e9e9"
            @click.prevent="onSendSms"
            v-if="isCountDownShow"
            >发送验证码</van-button
          >
          <van-count-down
            :time="time"
            format="ss秒"
            v-else
            :loading="isSendSmsLoding"
            @finish="isCountDownShow = true"
          />
        </template>
      </van-field>
      <div class="btn">
        <van-button type="info" block round>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
export default {
  name: 'loginIndex',
  data() {
    return {
      time: 60 * 1000,
      isCountDownShow: true,
      isSendSmsLoding: false,
      loginData: {
        mobile: '',
        code: '',
      },
      fromRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入有效手机号' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
    };
  },

  components: {},

  computed: {},

  mounted() { },

  methods: {
    /**
     * 万能验证码246810
     */
    onLogin() {
      this.$Toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      });
      login(this.loginData).then(res => {
        console.log("ss", res)
        if (res.message === "OK")
          this.$Toast.success("登录成功！");
      }).catch((err) => {
        console.log(err)
        this.$Toast.fail("登录失败,手机或验证码错误！")
      })
    },
    onfailed(error) {

      if (error.errors[0])
        this.$Toast(
          {
            message: error.errors[0].message,
            position: 'top'
          }
        )

    },
    onSendSms() {
      this.$refs.loginFrom.validate('mobile').then(res => {
        this.isSendSmsLoding = true
        sendSms(this.loginData.mobile).then((res) => {
          this.isSendSmsLoding = false
          this.isCountDownShow = false
        }).catch(err => {
          this.isSendSmsLoding = false
          this.$Toast(
            {
              message: '60s内只能发送一次',
              position: 'top'
            }
          )
        })
      }).catch(err => {
        console.dir(err)
        this.$Toast(
          {
            message: err.message,
            position: 'top'
          }
        )
        this.isSendSmsLoding = false
      })
    }
  },
}
</script>

<style scoped lang='less'>
.btn {
  width: 90%;
  margin: 0 auto;
  margin-top: 15px;
}
.btnText {
  .van-button__text {
    color: #5d5d5d !important;
  }
}
</style>