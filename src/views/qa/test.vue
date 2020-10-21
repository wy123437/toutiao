<template>
   <div><div @click="sss">自按</div>></div>
</template>

<script>
export default {
  props:{
    list:{
       type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {};
  },

  components: {},

  computed:{},

  mounted () {
   
  },

  methods: {
    sss(){
       this.list.push({name:1111})
    }
  },
}
</script>

<style scoped lang='less'>

</style>