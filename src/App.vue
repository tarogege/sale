<template>
  <div class="all">
    <myheader :seller="seller"></myheader>
    <div class="tab border-1px">
      <div class="tab-item"><router-link to="/goods">商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings">评价</router-link></div>
      <div class="tab-item"><router-link to="/seller">卖家</router-link></div>
    </div>

    <keep-alive>
    <router-view :seller="seller" class="router-view"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import myheader from './components/myheader/myheader.vue';
  import {urlParse} from './common/js/util';

  export default {
    name: 'App',
    components: {
      myheader: myheader
    },
    data: function () {
      return {
        seller: {
          type: Object,
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      };
    },
    created: function () {
      this.$http.get('api/seller?id=' + this.seller.id).then(response => {
        response = response.body;
        if (response.errno === 0) {
          this.seller = Object.assign({}, this.seller, response.data);
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
