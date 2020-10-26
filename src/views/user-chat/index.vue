<template>
  <div class="user-chat">
    <van-nav-bar
      title="小智同学"
      class="app-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />

    <van-cell-group class="message-content">
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
    </van-cell-group>

    <van-cell-group class="send-messge">
      <van-field
        v-model="messge"
        placeholder="请输入消息"
        :border="false"
      ></van-field>
      <van-button type="primary" size="small" @click="send">发送</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import io from 'socket.io-client'

//建立连接
// var socket = io('http://ttapi.research.itcast.cn');
// socket.on('connect', function () { });
// socket.on('event', function (data) { });
// socket.on('disconnect', function () { });
export default {
  name: 'user-chat',
  data() {
    return {
      messge: '',
      socket: null,
    };
  },

  components: {},

  computed: {},

  created() {
    this.socket = io('http://ttapi.research.itcast.cn')

    this.socket.on('connect', function () {
      console.log("建立连接成功")
    });
    this.socket.on('disconnect', function () {
      console.log("连接已经断开")
    });
    this.socket.on('message',function(data){
      console.log(data)
    })
  },

  mounted() {

  },

  methods: {
    send() {
      this.socket.emit('message', {
        msg: this.messge,
        timestamp: Date.now()
      })
      console.log("发送的信息", this.socket.emit('message', {
        msg: this.messge,
        timestamp: Date.now()
      }))
    }
  },
}
</script>

<style scoped lang='less'>
.send-messge {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0 14px;
  justify-content: space-between;
  .van-cell {
    width: 80%;
  }
}
.message-content {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 44px;
  overflow-y: auto;
}
</style>