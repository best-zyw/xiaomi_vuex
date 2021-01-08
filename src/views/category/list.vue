<template>
    <div id="wrapper">
        <div class="page-list" data-log="商品列表">
            <ol class="version">
                <li v-for="item in data">
                    <a class="version-item"  @click="views(item.id)">
                        <div class="version-item-img"><img
                                :src="item.image | imageurl">
                        </div>
                        <div class="version-item-intro">
                            <div class="version-item-name"><p>{{item.name}}</p></div>
                            <div class="version-item-intro-price"><span>{{item.price}}元</span></div>
                        </div>
                    </a>
                </li>
            </ol>
            <footer_link></footer_link>

        </div>
    </div>
</template>
<script>
    import footer from "../../components/footer";

    export default {
        components: {
            'footer_link':footer,
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
        data(){
            return{
                data:[]
            }
        },
        created(){
            this.init()
        },
        methods: {
            init(){
                let id=this.$route.params.id
                this.axios.get(`http://localhost:8000/api/product/list?id=${id}`).then(res=>{
                    console.log(res)
                    this.data=res.data
                })
            },
            views(id){
                console.log(id)
                this.$router.push({name:'view',params:{id:id,}})
            },
        }
    }
</script>