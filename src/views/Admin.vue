<template>
  <div>
    <el-upload class="upload-demo"
               ref="upload"
               action=""
               multiple
               :file-list="fileList"
               :http-request="uploadImage"
               :auto-upload="false">
      <el-button slot="trigger"
                 size="small"
                 type="primary">选取图片</el-button>
      <el-button style="margin-left: 10px;"
                 size="small"
                 type="success"
                 @click="submitUpload">上传图片</el-button>
    </el-upload>
  </div>
</template>

<script>
import { upload } from '../api/Api';
export default {
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    async uploadImage(f) {
      const res = await upload({ file: f.file });
      console.log(res);
    },
    submitUpload() {
      this.$refs.upload.submit();
    }
  }
};
</script>

<style scoped>
</style>
