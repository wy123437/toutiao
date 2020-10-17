<template>
  <div class="searchIndex">
    <form action="/">
      <van-search
        v-model="searchValue"
        show-action
        placeholder="请输入搜索关键词"
        background="#5babfb"
        shape="round"
        @focus="isShow = false"
        @search="onSearch(searchValue)"
        @cancel="$router.back()"
      />
    </form>
    <!-- 搜索结果 -->
    <serachResult v-if="isShow" :searchText="searchValue"></serachResult>
    <!-- 搜索建议 -->
    <searchSuggest
      :searchText="searchValue"
      v-else-if="searchValue"
      @search="onSearch"
    ></searchSuggest>
    <!-- 搜索历史 -->
    <serachHistory
      v-else
      :searchHistoryList="searchHistoryList"
    ></serachHistory>
  </div>
</template>

<script>
import searchSuggest from "./comments/search-suggest"
import serachHistory from './comments/serach-history'
import serachResult from './comments/search-result'
import { setItem, getItem } from '../../utils/storage'
import { mapState } from 'vuex'
import { getSuggestHistories } from '../../api/search'
export default {
  name: 'searchIndex',
  data() {
    return {
      searchValue: '',
      isShow: false,
      searchHistoryList: getItem('search-history') || []
    };
  },

  components: {
    searchSuggest,
    serachHistory,
    serachResult
  },

  computed: {
    ...mapState(['user'])
  },

  mounted() {
    if (this.user)
      this.getSuggestHistories()
  },

  methods: {
    onSearch(searchValue) {
      this.searchValue = searchValue
      if (this.searchHistoryList.indexOf(searchValue) !== -1) {
        this.searchHistoryList.splice(this.searchHistoryList.indexOf(searchValue), 1)
      }

      this.searchHistoryList.unshift(searchValue)
      if (this.user) {
        this.getSuggestHistories()
      }
      else
        setItem('search-history', this.searchHistoryList)

      this.isShow = true
    },
    async getSuggestHistories() {
      let localHistory = getItem('search-history') || []
      await getSuggestHistories().then(res => {
        this.searchHistoryList = [...new Set([...this.searchHistoryList, ...res.keywords])]
      })
    }
  },
}
</script>

<style scoped lang='less'>
</style>