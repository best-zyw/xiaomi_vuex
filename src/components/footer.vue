<template>
  <div class="footer">
    <ul>
      <li>
        <router-link to="/"  >
          <div class="nav">
            <div class="ih ispr"></div>
            <p>商城</p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/category" >
          <div class="nav">
            <div class="ic ispr"></div>
            <p>分类</p>
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/cart">
          <div class="nav">
            <div class="is ispr"></div>
            <p>购物车</p>
          </div>
        </router-link>
      </li>
      <li>
        <a href="/1/#/user/index">
          <div class="nav">
            <div class="if ispr"></div>
            <p>服务</p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
