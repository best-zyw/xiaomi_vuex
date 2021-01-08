<template>
    <div id="wrapper">
        <div class="page-category" data-log="商品分类" >
            <div class="page-category-wrap" >
                <div class="list-wrap"  id="items.id" v-for="items in Data">
                    <h3 class="list_title">{{items.name}}</h3>
                    <ol class="list_category" >
                        <li v-for="item in items.children" @click='product_list(item.id)'>
                            <div class="img"><img :src="item.image | imageurl"></div>
                            <div class="name"><span>{{item.name}}</span></div>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
        <footer_link></footer_link>
    </div>
</template>
<script>
    import footer from "../../components/footer";
    import list from "./list";
    export default{
        components: {
            'footer_link':footer,
        },
        data(){
            return{
                Data:[],
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
        created() {
            this.init()
        },
        methods:{
            init(){
                this.axios.get(`http://localhost:8000/api/category`).then(res=>{
                    console.log(res)
                    this.Data=res.data
                })
            },
            product_list(id){
                console.log(id)
                this.$router.push({name:"list",params:{id:id}})
            }
        },
    }
</script>