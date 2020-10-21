<template>
  <div class="update-img">
    <img class="userImg" :src="Img" alt="" ref="Img" />
    <van-nav-bar
      class="toolbar"
      left-text="取消"
      right-text="确认"
      @click-left="$emit('closeImg', false)"
      @click-right="onClickRight"
    ></van-nav-bar>
  </div>
</template>

<script>
import { updateUesrImg } from '../../../api/user'
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
export default {
  name: 'update-img',
  props: {
    file: {
      required: true,
    }
  },
  data() {
    return {
      Img: window.URL.createObjectURL(this.file),
      cropper:null
    };
  },

  components: {},

  computed: {},

  mounted() {
    const image = this.$refs.Img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true,
    });
  },

  methods: {
    getCroppedCanvas() {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
          resolve(blob)
        })
      })
    },
    async onClickRight() {
      this.$Toast.loading({
        message: '上传中...',
        forbidClick: true,
      })
      const file = await this.getCroppedCanvas()
      let fd = new FormData()
      fd.append('photo',file)
      await updateUesrImg(fd).then(res => {
        this.$Toast.success("上传成功")
        this.$emit('update-photo',window.URL.createObjectURL(file))
        this.$emit('closeImg', false)
      })
    }
  },
}
</script>

<style scoped lang='less'>
.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
.userImg {
  display: block;

  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
.toolbar {
  background-color: #000;
}
</style>