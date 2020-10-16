<template>
  <div class="channel-edit">
    <div class="channel-top">
      <div class="left">我的频道</div>
      <van-button
        plain
        type="info"
        color="#fa8383"
        size="mini"
        round
        @click="iconShow = !iconShow"
        >{{ iconShow ? "完成" : "编辑" }}</van-button
      >
    </div>
    <div class="channel-conent">
      <van-grid :gutter="10">
        <van-grid-item
          :class="index === textIndex ? 'text grid-item' : 'grid-item'"
          v-for="(value, index) in myChannelList"
          :key="value.id"
          :border="false"
          :square="false"
          :text="value.name"
          :icon="iconShow && index !== 0 ? 'clear' : ''"
          @click="onDelete(index, value.id)"
        />
      </van-grid>
    </div>
    <div class="channel-top">
      <div class="left">频道推荐</div>
    </div>
    <div class="channel-conent">
      <van-grid :gutter="10">
        <van-grid-item
          class="grid-item"
          v-for="value in getChannelRecommendation"
          :key="value.id"
          :border="false"
          :square="false"
          :icon="iconShow ? 'add' : ''"
          :text="value.name"
          @click="onAdd(value)"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannels, addUserChannels, DeletUserChannels } from '../api/channel'
import { mapState } from 'vuex'
import { setItem } from '../utils/storage'
export default {
  props: {
    myChannelList: {
      type: Array,
      required: true,
    },
    textIndex: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannel: [],
      iconShow: false,
      isShowText: false
    };
  },

  components: {},

  computed: {
    ...mapState(['user']),
    getChannelRecommendation() {
      return this.allChannel.filter(item => {
        return !this.myChannelList.find(myitem => {
          return myitem.id === item.id
        })
      })
    }
  },

  mounted() {
    this.getAllChannels()
  },

  methods: {
    async getAllChannels() {
      await getAllChannels().then(res => {
        console.log("所有频道数据", res)
        if (this.user)
          this.allChannel = res.channels
        else
          this.allChannel = res.data.data.channels
      })
    },
    async addUserChannels(item) {
      await addUserChannels({
        channels: [{
          id: item.id,
          seq: this.myChannelList.length
        }]
      })
    },
    async DeletUserChannels(id) {
      await DeletUserChannels(id).then(res => {

      })
    },
    onAdd(item) {
      if (this.iconShow)
        this.myChannelList.push(item)
      else
        this.$emit('close')
      if (this.user) {
        this.addUserChannels(item)
      } else {
        setItem('user-channels', this.myChannelList)
      }
    },
    onDelete(index, id) {
      if (this.iconShow) {
        if (index) {
          this.myChannelList.splice(index, 1)
          if (index <= this.textIndex) {
            this.$emit('update-active', this.textIndex - 1)
          }
        }
      } else {
        this.$emit('close')
        this.$emit('update-active', index)
      }
      if (this.user) {
        this.DeletUserChannels(id)
      } else {
        setItem('user-channels', this.myChannelList)
      }
    }
  },
}
</script>

<style scoped lang='less'>
.channel-top {
  margin-top: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  .left {
    font-size: 22px;
    color: #333333;
  }
}
.channel-conent {
  margin-top: 18px;
}
/deep/ .grid-item {
  width: 80px;
  height: 43px;
  .van-grid-item__content {
    background-color: #f4f5f6;
  }
  .van-grid-item__text {
    font-size: 13px;
    color: #222;
    margin-top: 0;
  }
  .van-icon {
    position: absolute;
    right: 0;
    top: -4px;
    font-size: 16px;
    z-index: 999;
    color: #ccc;
  }
}
.van-button__content {
  width: 50px;
}
/deep/ .text {
  .van-grid-item__text {
    color: rgb(250, 131, 131) !important;
    font-size: 16px !important;
  }
}
</style>