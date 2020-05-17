<template>
  <div>
    <i class="el-icon-s-fold home-btn"
       @click="drawer = true"></i>
    <router-view />

    <el-drawer title="目录"
               :show-close='false'
               :visible.sync="drawer">
      <div>
        <div>
          <router-link to='/'
                       @click.native="drawer = false">首页</router-link>
        </div>
        <div>
          <router-link to='/baby'
                       @click.native="drawer = false">数胎动</router-link>
        </div>
        <div>
          <span @click="uploadImage">上传图片</span>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      direction: 'rtl'
    };
  },
  methods: {
    uploadImage() {
      const token = localStorage.getItem('token');
      if (token) {
        this.$router.push('Admin');
      } else {
        this.open();
      }
      this.drawer = false;
    },
    open() {
      this.$confirm('请先登录', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$router.push('Login');
      }).catch(action => {
      });
    }
  }
};
</script>

<style scoped>
.home-btn {
  position: fixed;
  right: 10px;
  top: 10px;
  font-size: 1.5rem;
}
</style>
