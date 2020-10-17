<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSuggestResult } from '../../../api/search'
import { mapState } from 'vuex'
export default {
  name: 'search-result',
  props: {
    searchText: {
      type: String,
      required: true,
      default: '',
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perpage: 10
    };
  },

  components: {},

  computed: {
    ...mapState(['user'])
  },

  mounted() { },

  methods: {
    async onLoad() {
      await getSuggestResult({
        page:this.page,
        per_page:this.perpage,
        q: this.searchText
      }).then(res=>{
        console.log("数据",res)
        let results = []
        if(this.user){
          results = res.results
        }else{
          results = res.data.data.results
        }
        this.list.push(...results)
        this.loading = false
        if(results.length){
          this.page = this.page + 1
        }else{
          this.finished = true
        }
        
      })
    },
  },
}
</script>

<style scoped lang='less'>
.search-result {
  .van-list {
    position: fixed;
    right: 0;
    left: 0;
    overflow-y: auto;
    bottom: 0;
    top: 54px;
  }
}
</style>