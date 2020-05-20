<template>
  <div>
    <i class="el-icon-menu home-btn"
       @click="drawer = true"></i>
    <router-view />

    <el-drawer title="目录"
               :show-close='false'
               :visible.sync="drawer"
               :with-header="false"
               custom-class='menu'>
      <el-menu default-active="2"
               class="el-menu-vertical-demo"
               background-color="#C9AAB4"
               text-color="#fff"
               active-text-color="#ffd04b">
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span slot="title"
                @click="$router.push('/album'); drawer=false;">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-star-on"></i>
          <span slot="title"
                @click="$router.push('/'); drawer=false;">数胎动</span>
        </el-menu-item>
        <div v-if="isLogin">
          <el-menu-item index="3">
            <i class="el-icon-picture"></i>
            <span slot="title"
                  @click="uploadImage">上传图片</span>
          </el-menu-item>
        </div>
        <div v-if="!isLogin">
          <el-menu-item index="4">
            <i class="el-icon-s-custom"></i>
            <span slot="title"
                  @click="$router.push('/login'); drawer=false;">登录</span>
          </el-menu-item>
        </div>

      </el-menu>
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
  computed: {
    isLogin() {
      return !!localStorage.getItem('token');
    }
  },
  methods: {
    uploadImage() {
      const token = localStorage.getItem('token');
      if (token) {
        this.active = 3;
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

<style>
.menu {
  background: #c9aab4 !important;
}
</style>
<style scoped>
.el-menu-vertical-demo {
  text-align: left;
}
.home-btn {
  position: fixed;
  right: 10px;
  top: 10px;
  font-size: 1.5rem;
}
</style>
