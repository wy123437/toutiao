<template>
  <div class="serachHistory">
    <van-cell title="搜索历史">
      <div>
        <span style="margin-right: 10px">全部删除</span>
        <span>完成</span>
      </div>
      <!-- <van-icon name="delete"></van-icon> -->
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistoryList"
      :key="index"
    >
      <van-icon name="close" @click="closeClick(item)"></van-icon>
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
    return {};
  },

  components: {},

  computed: {},

  mounted() { },

  methods: {
    closeClick(item) {
      console.log("item", item)
      let index = this.searchHistoryList.indexOf(item)

      this.searchHistoryList.splice(index, 1)


    }
  },
}
</script>

<style scoped lang='less'>
</style>