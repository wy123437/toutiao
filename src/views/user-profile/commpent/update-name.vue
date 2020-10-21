<template>
  <div class="update-name">
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      :border="false"
    ></van-nav-bar>
    <div class="field">
      <van-field
       :clearable="true"
        v-model="name"
        rows="1"
        autosize
        label="昵称"
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUesrInfo } from '../../../api/user'
export default {
  name: 'update-name',
  props: {
    Name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      name: this.Name
    };
  },

  components: {},

  computed: {},

  mounted() { },

  methods: {
    async onClickLeft() {
      this.$Toast.loading({
        message: '保存中...',
        forbidClick: true,
      })
      await updateUesrInfo({
        name: this.name
      }).then(res => {
        this.name = this.Name
        this.$emit('updateNameClose', false)
      })
    },
   async onClickRight(){
      this.$Toast.loading({
        message: '保存中...',
        forbidClick: true,
      })
      await updateUesrInfo({
        name: this.name
      }).then(res => {
        this.$emit('updateNameSumit', res.name)
        this.$Toast.success("保存成功")
      }).catch(err=>{
        this.$Toast.fail("存在相同昵称")
      })
    }
  },
}
</script>

<style scoped lang='less'>
.field {
  padding: 10px;
}
</style>