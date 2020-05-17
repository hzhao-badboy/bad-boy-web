<template>
  <div>
    <div v-for="item in images"
         :key="item.id">
      <el-image style="width: 100px; height: 100px"
                :src="host + item.fileid"></el-image>
    </div>
  </div>
</template>

<script>
import { getAlbumList } from '../api/Api';
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      loading: false,
      noMoreData: false,
      host: 'http://img.bad-boy.xyz/',
      images: []
    };
  },
  mounted() {
    this.getList();
    document.addEventListener("scroll", this.scrollFun);
  },
  methods: {
    scrollFun(val) {
      const windowHeight = document.documentElement.clientHeight;
      const scrollHeight = document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight;

      if (windowHeight + scrollHeight > documentHeight - 5) {
        if (!this.loading && !this.noMoreData) {
          this.loading = true;
          this.pageIndex += 1;
          this.getList();
        }
      }
    },
    async getList() {
      const res = await getAlbumList({
        page_index: this.pageIndex,
        page_size: this.pageSize
      });
      if (res.data && res.data.length > 0) {
        this.images = this.images.concat(res.data);
      } else {
        this.noMoreData = true;
      }
      this.loading = false;
    }
  }
};
</script>

<style scoped>
</style>
