<template>
  <div class="waterfall">
    <vue-waterfall-easy :imgsArr="images"
                        ref="waterfall"
                        @scrollReachBottom="getList"></vue-waterfall-easy>
  </div>
</template>

<script>
import { getAlbumList } from '../api/Api';
import vueWaterfallEasy from 'vue-waterfall-easy';

export default {
  data() {
    return {
      pageIndex: 0,
      pageSize: 10,
      images: []
    };
  },
  components: {
    vueWaterfallEasy
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      this.pageIndex += 1;
      const res = await getAlbumList({
        page_index: this.pageIndex,
        page_size: this.pageSize
      });
      if (res && res.length > 0) {
        this.images = this.images.concat(res.map(o => ({ src: o.fileid })));
      } else {
        this.$refs.waterfall.waterfallOver();
      }
    }
  }
};
</script>

<style scoped>
.waterfall {
  position: absolute;
  top: 32px;
  bottom: 0;
  width: 100%;
}
</style>
