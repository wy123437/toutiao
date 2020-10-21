<template>
  <div class="updateGender">
    <van-picker
      title="性别"
      show-toolbar
      :default-index="defaultIndex"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { updateUesrInfo } from '../../../api/user'
export default {
  name: 'updateGender',
  props:{
    value:{
      type:Number,
      required:true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      defaultIndex:this.value
    };
  },

  components: {},

  computed: {},

  mounted() { },

  methods: {
    async onConfirm(value, index) {
      this.$Toast.loading({
        message: '保存中...',
        forbidClick: true,
      })
      await updateUesrInfo({
        gender:index
      }).then(res=>{
        this.$emit("input",index)
        this.$emit("closeUpdateSex",false)
        this.$Toast.success("修改成功")
      })
    },
    onCancel() {
      this.$emit("closeUpdateSex",false)
    },
  },
}
</script>

<style scoped lang='less'>
</style>