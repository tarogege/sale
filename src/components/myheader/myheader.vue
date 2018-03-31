<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          <p>{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="support-detail">{{seller.supports[0].description}}</span>
        </div>
        <div class="support-more" v-if="seller.supports">
          <span>{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div><!--content-->
    </div><!--content-w-->
    <div class="bulletin-wrapper"></div><!--bulletin-w-->
  </div>
</template>

<script>
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    created: function () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    }
  };
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .header
    color: white
    background-color: #000000
  .content-wrapper
    position relative
    padding: 24px 12px 18px 24px;
    font-size 0
    .avatar
      display inline-block
      vertical-align top
      border-radius 2px
    .content
      display inline-block
      font-size 14px
      margin-left: 16px
      .title
        margin: 2px 0 4px
        .brand
          display inline-block
          vertical-align top
          width 30px
          height 18px
          bg-image("brand")
          background-size :30px 18px
        .name
          margin-left 6px
          font-size 16px
          font-weight: bold
          line-height: 18px
      .description
          margin-bottom 5px
          font-size 12px
          font-weight 200
          line-height 24px
      .support
        .icon
          display inline-block
          width 12px
          height 12px
          vertical-align top
          margin-right 4px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            background-image :url('decrease_1@2x.png')
          &.discount
            bg-image("./discount_1")
          &.guarantee
            bg-image("./guarantee_1")
          &.invoice
            bg-image("./invoice_1")
          &.special
            bg-image("./special_1")
        .support-detail
          vertical-align top
          font-size 10px
          line-height :12px
        .support-more
          position absolute
          right :12px
          bottom :18px
          height 24px
          padding 0 8px
          line-height: 24px
          font-size :10px
          background-color :rgba(0,0,0,0.2)
          border-radius 7px
          text-align center

</style>
