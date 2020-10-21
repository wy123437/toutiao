<template>
  <div class="user-profile" :loading="loading">
    <van-nav-bar
      title="编辑资料"
      class="app-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />
    <input type="file" hidden ref="file" accept="image/*" @change="onFileChange">
    <van-cell title="头像" is-link center @click="$refs.file.click()">
      <van-image
        round
        width="30"
        height="30"
        fit="cover"
        :src="userInfo.photo"
      />
    </van-cell>
    <van-cell
      title="昵称"
      center
      is-link
      :value="userInfo.name"
      @click="isEditNameShow = true"
    ></van-cell>
    <van-cell
      title="性别"
      center
      is-link
      :value="userInfo.gender === 1 ? '女' : '男'"
      @click="isEditGenderShow = true"
    ></van-cell>
    <van-cell
      title="生日"
      center
      is-link
      :value="userInfo.birthday"
      @click="isEditBirthdayShow = true"
    ></van-cell>

    <van-popup
      v-model="isEditNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-name
        @updateNameClose="isEditNameShow = $event"
        @updateNameSumit="updateNameSumit"
        :Name="userInfo.name"
      ></update-name>
    </van-popup>

    <van-popup v-model="isEditGenderShow" position="bottom" round>
      <update-gender
        @closeUpdateSex="isEditGenderShow = $event"
        v-model="userInfo.gender"
      ></update-gender>
    </van-popup>

    <van-popup v-model="isEditBirthdayShow" position="bottom" round>
      <updatebirthday
        v-model="userInfo.birthday"
        @closeupdatebirthday="isEditBirthdayShow = false"
      ></updatebirthday>
    </van-popup>

     <van-popup
      v-model="isEditImgShow"
      position="bottom"
      :style="{ height: '100%' }"
      class="update-photo-popup"
    > 
    <updateimg v-if="isEditImgShow" :file="imgBlob" @closeImg="isEditImgShow=$event" @update-photo="updatephoto"></updateimg>
    </van-popup>
  </div>
</template>

<script>
import { getProfile } from '../../api/user'
import updateName from './commpent/update-name'
import updateGender from './commpent/update-gender'
import updatebirthday from './commpent/update-birthday'
import updateimg from './commpent/update-img'
export default {
  name: 'user-profile',
  data() {
    return {
      loading: false,
      userInfo: {},
      isEditNameShow: false,
      isEditGenderShow: false,
      isEditBirthdayShow: false,
      isEditImgShow:false,
      imgBlob:null
    };
  },

  components: {
    updateName,
    updateGender,
    updatebirthday,
    updateimg
  },

  computed: {},

  mounted() {
    this.getUserInfo()
  },

  methods: {
    async getUserInfo() {
      this.loading = true
      await getProfile().then(res => {
        this.loading = false
        this.userInfo = res
      })
    },
    updateNameSumit(name) {
      this.userInfo.name = name
      this.isEditNameShow = false

    },
    onFileChange(){
      this.isEditImgShow = true
      const file = this.$refs.file.files[0]
      this.imgBlob = file
      this.$refs.file.value = ''
    },
    updatephoto(photo){
      this.userInfo.photo = photo
      this.$refs.file.value = ''
    }
  },
}
</script>

<style scoped lang='less'>
/deep/ .van-popup {
  background-color: #f5f7f9;
}
.update-photo-popup{
  background-color: #000;
}
</style>