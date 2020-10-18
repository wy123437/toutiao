<template>
  <div class="serachHistory">
    <van-cell title="搜索历史" class="serachHistory-item">
      <div v-if="isShowDelte" class="box">
        <span style="margin-right: 10px" @click="delteHistorydata">全部删除</span>
        <span @click="isShowDelte = false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isShowDelte = true"></van-icon>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistoryList"
      :key="index"
      @click="searchClick(item)"
    >
      <van-icon
        name="close"
        @click="closeClick(item)"
        v-if="isShowDelte"
      ></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'serachHistory',
  props: {
    searchHistoryList: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      isShowDelte: false
    };
  },

  components: {},

  computed: {},

  mounted() { },

  methods: {
    closeClick(item) {
      if (this.isShowDelte === true) {
        console.log("item", item)
        let index = this.searchHistoryList.indexOf(item)
        this.searchHistoryList.splice(index, 1)
      }


    },
    searchClick(item) {
      if (this.isShowDelte === false) {
        this.$emit('search', item)
      }
    },
    delteHistorydata(){
      this.$emit('update-historyData',[])
    }
  },
}
</script>

<style scoped lang='less'>
.serachHistory-item {
  height: 50px;
  .van-icon {
    font-size: 22px;
  }
}
</style>