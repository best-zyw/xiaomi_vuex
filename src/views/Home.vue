<template>
  <div id="wrapper">
    <div class="page-index" id="home" data-log="首页">
      <div class="index-header">
        <div class="search_bar">
          <a href="/1/#/search/index">
            <span class="icon icon-search"></span>
            <span class="text">搜索商品名称</span>
          </a>
        </div>
        <div class="search_bottom"></div>
      </div>

      <!--焦点图-->
      <section class="slider">
        <div class="flexslider">
            <Swiper v-if="slides.length > 0">
              <Slide v-for="item in slides" :key="item.id">
                <img :src="item.image | imageurl" width="100%" />
              </Slide>
            </Swiper>
        </div>
      </section>

      <!--推荐商品-->
      <div class="list">
        <div class="section">
          <div class="mcells_auto_fill">
            <div class="body">
              <div v-for="item in banners">
                <div class="items">
                  <img :src="item.image | imageurl">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="section" v-for="item in recommends">
          <div>
            <div class="item">
              <div class="img">
                <img class="ico" :src="item.image | imageurl">
                <img class="tag " src="http://c1.mifile.cn/f/i/f/mishop/iic/xp.png">
              </div>
              <div class="info">
                <div class="name"><p>{{item.name}}</p></div>
                <div class="brief"><p>{{item.description}}</p></div>
                <div class="price"><p>{{item.price}} 起</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>

     <footer_link></footer_link>
    </div>
  </div>
</template>

<script>
  import { Swiper, Slide } from 'vue-swiper-component';
  import footer from "../components/footer";
export default {
  components: {
    'footer_link':footer,
    Swiper,
    Slide
  },
  data(){
    return{
        slides:[],
      banners:[],
      recommends:[],
    }
  },
  filters:{
    imageurl(val) {
      if (val == null) {
        return "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F16%2F08%2F26%2F1957c0226aaca58.jpg%21%2Ffwfh%2F804x1005%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue&refer=http%3A%2F%2Fku.90sjimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612343340&t=46af54e3d0a73c18986895de721b5bbc";
      } else if (val.substr(0, 4) == "http") {
        return val;
      } else {
        return "http://images.canon4ever.com/" + val;
      }
    },
  },
  created(){
    this.axios.get(`http://localhost:8000/api`).then(res=>{
      console.log(res)
      this.slides=res.data.slides
      this.banners=res.data.banners
      this.recommends=res.data.recommends
    })
  }
}
</script>
