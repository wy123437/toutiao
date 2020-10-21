<template>
  <div class="updatebirthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择生日日期"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="confirm"
      @cancel="$emit('closeupdatebirthday', false)"
    />
  </div>
</template>

<script>
import { updateUesrInfo } from '../../../api/user'
export default {
  name: 'updatebirthday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
    };
  },

  components: {},

  computed: {},

  mounted() { },

  methods: {
    async confirm() {
      this.$Toast.loading({
        message: '保存中...',
        forbidClick: true,
      })
      await updateUesrInfo({
        birthday: `${this.currentDate.getFullYear()}-${this.currentDate.getMonth() + 1}-${this.currentDate.getDate()}`,
      }).then(res => {
        this.$emit('input',res.birthday)
        this.$emit('closeupdatebirthday', false)
        this.$Toast.success("修改成功")
      })
    }
  },
}
</script>

<style scoped lang='less'>
</style>