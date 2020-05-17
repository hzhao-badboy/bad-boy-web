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
    jumpTo() {
      this.drawer = false;
      this.$router.push('Baby');
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
