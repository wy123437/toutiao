<template>
   <div class="qa-container">
     <test :list="testsss"></test>
     <div>{{testsss}}</div>
     <div @click="clikc">按钮哦</div>
   </div>
</template>

<script>
import test from './test';
export default {
  name:'qaIndex',
  data() {
    return {
      testsss:[]
    };
  },

  components: {
    test

  },

  computed:{},

  mounted () {
   
  },

  methods: {
    clikc(){
      //this.testsss.unshift({name:1212})
      console.log("testsss",this.testsss)
    }
  },
}
</script>

<style scoped lang='scss'>

</style>