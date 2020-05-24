<template>
  <div>
    <el-form :label-position="labelPosition"
             label-width="80px"
             :model="formLabelAlign">
      <el-form-item label="用户名">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formLabelAlign.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '../api/Api';

export default {
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        password: ''
      }
    };
  },
  methods: {
    async onLogin() {
      console.log(this.formLabelAlign);
      const res = await login({
        name: this.formLabelAlign.name,
        password: this.formLabelAlign.password
      });
      if (res) {
        localStorage.setItem('token', res);
        this.$router.push('Album');
      }
    }
  }
};
</script>

<style scoped>
</style>
