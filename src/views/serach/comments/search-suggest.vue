<template>
  <div class="search-suggest">
    <van-cell
      icon="search"
      v-for="(item, index) in suggestionList"
      :key="index"
      @click="$emit('search',item)"
    >
    <div v-html="heightString(item)" slot="title"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestion } from '../../../api/search'
import { mapState } from 'vuex'
import { debounce } from 'lodash'
export default {
  name: 'search-suggest',
  props: {
    searchText: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      suggestionList: []
    };
  },

  components: {},

  computed: {
    ...mapState(['user'])
  },

  mounted() { },

  watch: {
    searchText: {
      handler: debounce(async function () {
        await getSuggestion({
          q: this.searchText
        }).then(res => {
          //console.log("搜索建议",res)
          if (this.user)
            this.suggestionList = res.options
          else {
            this.suggestionList = res.data.data.options
          }
        })
      }, 200),
      immediate: true
    }
  },
  methods: {
    heightString(str){
      //RegExp 是正则表达式的构造函数
      //参数1：字符串
      //参数2:匹配模式
      //返回值：正则对象
      let value = new RegExp(this.searchText,'gi')
      return str.replace(value,`<span style="color:red">${this.searchText}</span>`)
    }
  },
}
</script>

<style scoped lang='less'>
</style>