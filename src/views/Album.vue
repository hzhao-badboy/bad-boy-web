<template>
  <div>
    <div class='preview-img'>
      <img v-if='isShowPreview'
           src="imageSrc"
           @click="clickImage">
    </div>
    <div class="waterfall">
      <vue-waterfall-easy :imgsArr="images"
                          ref="waterfall"
                          @scrollReachBottom="getList"
                          @click="previewImg">
      </vue-waterfall-easy>
    </div>
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
      isShowPreview: true,
      imageSrc: 'http://img.bad-boy.xyz/4ccfbd23-fd85-437f-9e19-5afb7338511b',
      images: []
    };
  },
  components: {
    vueWaterfallEasy
  },
  mounted() {
    this.getList();
  },
  computed: {
    srcList() {
      return this.images;
    }
  },
  methods: {
    clickImage() {
      console.log('click image');
      this.isShowPreview = false;
    },
    previewImg(event, { index, value }) {
      // 阻止a标签跳转
      event.preventDefault();
      // 只有当点击到图片时才进行操作
      console.log('index: ', index, 'value: ', value);
      this.imageSrc = value.url;
      this.isShowPreview = true;
    },
    async getList() {
      this.pageIndex += 1;
      const res = await getAlbumList({
        page_index: this.pageIndex,
        page_size: this.pageSize
      });
      if (res && res.length > 0) {
        for (let index = 0; index < res.length; index++) {
          const element = res[index];
          element.src = element.fileid + '?imageView2/0/w/240/interlace/1';
        }
        this.images = this.images.concat(res.map(o => ({ url: o.fileid, src: o.fileid + '?imageView2/0/w/240/interlace/1' })));
      } else {
        this.$refs.waterfall.waterfallOver();
      }
      console.log(this.images);
    }
  }
};
</script>

<style scoped>
.preview-img {
  /*典型的遮罩层做法*/
  width: 300px;
  height: 300px;
  position: absolute;
  top: 0px;
  background: black;
  opacity: 0.3;
  z-index: 100;
  display: none;
}
.waterfall {
  position: absolute;
  top: 32px;
  bottom: 0;
  width: 100%;
}
</style>
