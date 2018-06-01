<template>
  <div class="all">
    <myheader :seller="seller"></myheader>
    <div class="tab border-1px">
      <div class="tab-item"><router-link to="/goods">商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings">评价</router-link></div>
      <div class="tab-item"><router-link to="/seller">卖家</router-link></div>
    </div>

    <router-view :seller="seller" class="router-view"></router-view>
  </div>
</template>

<script>
  import myheader from './components/myheader/myheader.vue';

  export default {
    name: 'App',
    components: {
      myheader: myheader
    },
    data: function () {
      return {
        seller: {}
      };
    },
    created: function () {
      this.$http.get('api/seller').then(response => {
        response = response.body;
        if (response.errno === 0) {
          this.seller = response.data;
        }
      });
    }
  };
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "./common/stylus/mixin.styl"
  .all
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px;
      .tab-item
        flex: 1
        text-align: center
        font-size: 14px
        color: rgb(77, 85, 93)
        border-1px(rgba(7,17,27,0.1))
        a
          display: block
          &.active
            color: rgb(240, 20, 20)
    .router-view
      overflow hidden
</style>
