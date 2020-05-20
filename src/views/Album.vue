<template>
  <div>
    <waterfall style="margin-top: 40px; overflow: scroll !improtant;"
               :line-gap="200"
               :min-line-gap="180"
               :max-line-gap="220"
               :watch="images">
      <waterfall-slot v-for="(item, index) in images"
                      :width="item.width"
                      :height="item.height"
                      :order="index"
                      :key="index">
        <el-image :src="host + item.fileid"
                  :preview-src-list="srcList"></el-image>
      </waterfall-slot>
    </waterfall>
  </div>
</template>

<script>
import { getAlbumList } from '../api/Api';
import Waterfall from 'vue-waterfall/lib/waterfall';
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot';

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
  components: {
    Waterfall,
    WaterfallSlot
  },
  mounted() {
    this.getList();
    document.addEventListener("scroll", this.scrollFun);
  },
  computed: {
    srcList() {
      return this.images.map(res => { return this.host + res.fileid; });
    }
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
        console.log(this.images.length);
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
