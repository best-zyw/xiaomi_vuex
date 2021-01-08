<template>
    <div id="wrapper" style="display: block">
        <div class="page-product-view" data-log="商品详情">

            <div class="header"><div class="left"><a @click="pre"><img src="http://s1.mi.com/m/images/m/icon_back_n.png" class="ib"></a><!--vue-if--><!--vue-if--></div><div class="tit"><!--vue-if--></div><div class="right"><a href="javascript:;" data-event="30000000110001001" data-stat-id="6c93ea1c6bb6eb01" onclick="_msq.push(['trackEvent', '8fb4bea51daee8a5-6c93ea1c6bb6eb01', 'javascript:;', 'pcpid']);"><div class="icon icon-search"></div></a></div></div>

            <div class="product-view">
                <div class="b1">
                    <img :src="product.image | imageurl">
                </div>
                <div class="b2">
                    <div class="b21">
                        <div class="b211">
                            <div class="name"><p>{{product.name}}  </p></div>
                            <div class="price"><strong>{{product.price}}</strong></div>
                        </div>
                        <div class="b212">
                            <div class="icon-fenxiang"></div>
                        </div>
                    </div>
                    <div class="b22">
                        <p>{{product.description}}</p>
                    </div>
                </div>
                <div class="mt20" style="display: none;"></div>

                <!--<ul class="b3">-->
                <!--<li><span class="on">白色</span></li>-->
                <!--</ul>-->

                <ul class="b3" style="display: none;">
                    <li><span>通用</span></li>
                </ul>

                <div class="ui-b7">
                    <h3>为您推荐</h3>
                    <div class="ui-carousel-container">
                        <div class="ui-carousel-viewport">
                            <a v-for="item in recommends">
                                <img :src="item.image | imageurl" @click="recommend_product(item.id)">
                            </a>
                        </div>
                    </div>
                </div>
                <div class="b5">
                    <div class="b51"></div>
                    <div class="b52">
                        <div class="blc">
                            <ul>
                                <li>
                                    <div class="img" v-html="product.markdown_html_code">
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="b7">
                    <div class="b70">
                        <a @click="home">
                            <div class="icon-home"></div>
                        </a>
                    </div>
                    <div class="b72">
                        <!--<a href="javascript:;" class="off">暂时缺货</a>-->
                        <a @click="cart">添加购物车</a>
                    </div>

                    <div class="b73">
                        <a @click="cart">
                            <div class="icon-gouwuche"></div>
                        </a>
                    </div>
                </div>
                <a href="javascript:;" id="top" style="visibility: visible;" @click="backtop">
                    <img src="http://s1.mi.com/m/images/m/top.png">
                </a>
            </div>
            <div class="share-component"></div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                product:{},
                recommends:[]
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
          this.init()
        },
        methods:{
            init(){
                let id=this.$route.params.id
                this.axios.get(`http://localhost:8000/api/product/view?id=${id}`).then(res=>{
                    console.log(res)
                    this.product=res.data.product
                    this.recommends=res.data.recommends
                })
            },
            recommend_product(id){
                this.$router.push({name:'view',params:{id:id}})
                this.init()
            },
            home(){
                this.$router.push({name:"Home"})
            },
            cart(){
                let id=this.$route.params.id
                this.axios.post(`http://localhost:8000/api/cart`,{product_id:id}).then(res=>{

                    }
                )
                this.$router.push({name:"cart"})
            },
            backtop(){
                scrollTo(0,0)
            },
            pre(){
                this.$router.go(-1)
            }
        }
    }
</script>