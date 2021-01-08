<template>
    <div id="wrapper">
        <div :class="show" class="cart-index">
            <div class="cart-index-wrap">
                <div class="cart-list">
                    <ul>
                        <li class="item" v-for="(item,index) in tabledata.carts" >
                            <div class="ui-box">
                                <div class="imgProduct"><a ><img
                                        :src="item.product.image |imageurl"></a></div>
                                <div class="info ui-box-flex">
                                    <div class="name">
                                        <span>{{item.product.name}}</span>
                                    </div>
                                    <div class="price">
                                        <p>
                                            <span>售价：</span><span>{{item.product.price}}</span>
                                            <span>合计：</span><span>{{item.product.price*item.num}}</span>
                                        </p>
                                        <div class="tip">
                                            <span style="display: none;">请于2016/04/11 00:58前下单，逾期将失效。</span>
                                        </div>
                                    </div>
                                    <div class="num">
                                        <div class="xm-input-number">
                                            <div :class="{'input-sub':true,'active':item.num>1}" @click="changeNum(item,'dec')"></div>
                                            <div class="input-num"><span>{{item.num}}</span></div>
                                            <div class="input-add active" @click="changeNum(item,'inc')"></div>
                                        </div>
                                        <div class="delete" @click="delete_(item,index)">
                                            <a href="javascript:;">
                                                <span class="icon-iconfontshanchu"></span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="append"></div>
                        </li>
                    </ul>
                </div>
                <div class="pointBox">
                    <div class="point" style="display: none;"><span class="act act_special">包邮</span><span></span></div>
                    <div class="point">
                        <p>温馨提示：产品是否购买成功，以最终下单为准，请尽快结算</p>
                    </div>
                </div>

                <!-- Navbar -->
                <div class="bottom-submit ui-box">
                    <div class="price"><span>共{{count.num}}件 金额：</span><br><strong>{{count.total_price}}</strong><span>元</span></div>
                    <div class="btn"><a class="ui-button ui-button-disable"
                                        @click="home"><span>继续购物</span></a></div>
                    <div class="btn"><a class="ui-button"
                                        href="/1/#/order/checkout?address_type=common"><span>去结算</span></a></div>
                </div>
            </div>
        </div>
        <div :class="notshow"  class="cart-index">
            <div style="height:1rem;"></div>
            <div class="cart-index-wrap">
                <div class="empt">
                    <div class="b3">
                        <a @click="all" class="ui-button ui-button-disable">
                            <span>全部商品</span>
                        </a>
                        <a @click="all" class="ui-button">
                            <span>精选商品</span>
                        </a>
                    </div>
                </div>
            </div>

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
                tabledata:{
                    carts:[],
                    count:{},
                },
                show:"notshow",
                notshow:"notshow",
                changing:false,
            }
        },
        computed:{
            count(){
                let num=0
                let total_price=0
                this.tabledata.carts.map(res=>{
                    num+=res.num;
                    total_price+=res.num*res.product.price
                })
                return {num:num,total_price:total_price}
            }
        },
        watch:{
            tabledata:function(){
                console.log(this.tabledata.carts)
                if(this.tabledata.carts.length>0){
                    this.show="show"
                    this.notshow="notshow"
                    return
                }
                this.show="notshow"
                this.notshow="show"
            },

        },
        created(){
            this.init()
        },
        methods:{
            init(){
                this.axios.get(`http://localhost:8000/api/cart`).then(res=>{
                    console.log(res)
                    this.tabledata=res.data
                })
            },
            home(){
                this.$router.push({name:"Home"})
            },
            changeNum(item,type){
                if(this.changing){
                    return
                }
                if(type=="dec" && item.num==1){
                    return;
                }
                this.changing=true
                this.axios.patch(`api/cart `,{type:type,cart_id:item.id}).then(res=>{
                        type=="inc"?item.num++:item.num--,
                            this.changing=false
                })
            },
            delete_(item,index){
                this.axios.delete(`api/cart?cart_id=${item.id}`).then(res=>{
                           console.log(index)
                    // this.tabledata.carts.splice(index,1)
                    // if(this.tabledata.carts.length<1){
                    //     this.init()
                    // }
                })
            },
            all(){
                this.$router.push({name:"category"})
            }
        }
    }
</script>
<style scoped>
    .show{
        display: block;
    }
    .notshow{
        display: none;
    }
</style>