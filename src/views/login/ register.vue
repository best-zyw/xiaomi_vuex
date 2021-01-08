<template>
    <div class="register">
        <form action=""  @submit.prevent="Register">
            <div class="logo">
                <img src="../../assets/img/timg.jpg" alt="" >
                <h1>小米账号注册</h1>
            </div>
            <input type="text" placeholder="邮箱/手机号码/小米id" v-model="accounts.email" >
            <div style="color: red">{{errors.email}}</div>
            <div class="eye">
                <input :type="num" placeholder="密码" v-model="accounts.password">
                <div style="color: red">{{errors.password}}</div>
                <div  @click="isshow">
                    <svg t="1609838306163" class="icon" v-if="num=='password'" id="eye1" viewBox="0 0 2051 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1125" width="20" height="20"><path d="M2030.777206 127.720528c21.888557-35.277324 14.603023-82.313756-14.603023-109.762325-32.848812-27.432593-76.641903-19.587862-102.189204 15.689462-3.658744 3.914377-408.788771 517.368795-890.560702 517.368795-467.168908 0-890.560701-517.368795-894.203468-521.283172-25.563278-31.362947-73.015113-35.277324-102.205181-7.828754C-2.17444 49.305173-5.833185 100.255981 19.714116 131.618928c7.301511 11.759108 94.90367 117.591079 233.584454 235.182159L67.165951 574.534676c-29.206045 31.362947-25.563278 82.313756 3.642768 109.762325 7.301511 15.657508 25.563278 23.502239 43.809067 23.502239s36.49158-7.828754 51.094603-23.518216l200.735641-223.407074c94.90367 70.554648 208.037153 137.194918 332.130891 184.215373l-76.641903 278.288237c-10.944278 43.122055 10.960255 86.228132 51.094602 97.98724h21.888557c32.864789 0 62.054858-23.518216 69.356369-58.79554L840.934426 684.297001c58.396113 11.759108 120.434994 19.603839 182.489851 19.603839 62.038881 0 124.093738-7.828754 182.489852-19.603839l76.641903 274.373859c7.301511 35.277324 40.150324 58.79554 69.340392 58.79554 7.301511 0 14.603023 0 18.261767-3.930354 40.150324-11.759108 62.038881-54.865186 51.094602-97.98724l-76.641903-274.357883c124.093738-47.036432 237.227221-113.660725 332.130891-184.215373l197.092874 219.492697c14.587046 15.673485 32.848812 23.518216 51.094602 23.518216s36.49158-7.828754 51.094602-23.518216c29.206045-31.362947 29.206045-78.383402 3.642767-109.762325l-186.132618-207.717612c149.641039-117.591079 237.243198-231.251805 237.243198-231.251805z" p-id="1126"></path></svg>
                    <svg t="1609838835118" class="icon" v-else id="eye2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1255" width="20" height="20"><path d="M548.18816 394.52672a61.44 61.44 0 1 0 81.28512 81.3056 122.88 122.88 0 1 1-81.28512-81.28512zM512 184.32c245.76 0 450.56 204.8 450.56 327.68S757.76 839.68 512 839.68 61.44 634.88 61.44 512 266.24 184.32 512 184.32z m0 532.48c113.11104 0 204.8-91.68896 204.8-204.8s-91.68896-204.8-204.8-204.8-204.8 91.68896-204.8 204.8 91.68896 204.8 204.8 204.8z" p-id="1256"></path></svg>
                </div>
            </div>
            <input type="submit" value="注册"  style="text-align: center; background-color:#ff6700
               ;border-radius: 10px;height: 40px;border-bottom: 0;color: white;font-size: 15px">
        </form>
        <div class="reverse">
            <a href="">立即注册</a><span>|</span><a href="">忘记密码？</a>
        </div>
        <div class="bottom">
            <ul>
                <li><a href="">简体</a>|</li>
                <li><a href="">繁体</a>|</li>
                <li><a href="">English</a>|</li>
                <li><a href="">常见问题</a>|</li>
                <li><a href="">隐私政策</a></li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                num:"password",
                accounts:{
                    email:"",
                    password:"",
                },
                errors:{
                    email:"",
                    password: "",
                }
            }
        },
        methods:{
            isshow(){
                if(this.num=="text"){
                    this.num="password"
                    return
                }
                this.num="text"
                console.log(this.num)
            },
            Register(){
                this.axios.post(`http://localhost:8000/api/register`,this.accounts).then(res=>{
                    console.log(111,res)
                    alert("注册成功")
                    this.$router.push({name:"login"})
                }).catch(error=>{
                    console.log(error.response)
                    this.errors.email=error.response.data.errors.email?"邮箱错误":""
                    this.errors.password=error.response.data.errors.password?"密码错误":""
                })
            }
        }
    }
</script>
<style scoped>
    .register{
        box-sizing: border-box;
    }
    .register form{
        padding: 0 40px;
    }
    h1{
        font-size: 20px;
    }
    .logo{
        padding: 25px 0  ;
    }
    .logo img{
        width: 48px;
        margin-bottom: 20px;
    }
    .eye{
        position: relative;
    }
    .eye .icon{
        /*display: none;*/
        position: absolute;
        right: 0;
        top: 0;
    }
    input{
        height: 22px;
        width: 100%;
        line-height: 22px;
        box-sizing: border-box;
        padding: 13px 16px 13px 14px;
        margin-bottom: 20px;
        border: 0 ;
        border-bottom: 1px solid black;
    }
    .reverse span{
        margin: 0 10px;
    }
    .bottom{
        position: absolute;
        bottom: 20px;
        left: 130px;
    }
    .bottom li{
        display: inline-block;
    }
</style>