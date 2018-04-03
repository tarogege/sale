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
        <div class="support-more" v-if="seller.supports" @click="showDetail()">
          <span>{{seller.supports.length}}个</span>
          <i class="fa fa-angle-right"></i>
        </div>
      </div><!--content-->
    </div><!--content-w-->
    <div class="bulletin-wrapper" @click="showDetail()">
      <span class="bulletin-title"></span><!--title--><span class="bulletin-text">{{seller.bulletin}}</span><!--text-->
      <i class="fa fa-angle-right"></i>
    </div><!--bulletin-w-->
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%"/>
    </div>
    <div class="detail" v-show="detailShow">
      <div class="detail-wrapper clearfix">
        <div class="detail-content"></div>
      </div>
      <div class="detail-close"><i class="fa fa-times"></i></div>
    </div><!--detial-->
  </div>
</template>

<script>
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data: function() {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail: function () {
        this.detailShow = true;
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
    position relative
    color: white
    overflow hidden

    .content-wrapper
      padding: 24px 12px 18px 24px;
      font-size 0
      .avatar
        display inline-block
        vertical-align top
        border-radius 2px
      .content
        position relative
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
            background-size: 30px 18px
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
              background-image: url('decrease_1@2x.png')
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
            line-height: 12px
        .support-more
          position absolute
          right: 12px
          bottom: 3px
          height 24px
          padding 0 8px
          line-height: 24px
          font-size: 10px
          background-color: rgba(0, 0, 0, 0.2)
          border-radius 7px
          text-align center

    .bulletin-wrapper
      position relative
      height 28px
      line-height 28px
      padding 0 22px 0 12px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      background-color rgba(7, 17, 27, 0.2)
      .bulletin-title
        vertical-align top
        display inline-block
        width 22px
        height 12px
        bg-image("./bulletin")
        background-size 22px 12px
        background-repeat no-repeat
        margin 8px 4px 0 0
      .bulletin-text
        vertical-align top
        font-size 10px
        color rgb(255, 255, 255)
      .fa
        position absolute
        font-size 10px
        right 12px
        top: 8px
    .background
      position absolute
      top 0
      right 0
      width 100%
      height 100%
      z-index -1
      background-color rgba(7,17,27,0.5)
      filter blur(10px)
    .detail
      position fixed
      left 0
      top 0
      width 100%
      height 100%
      z-index 100
      background-color rgba(7,17,27,0.8)
      //filter blur(10px)
      overflow hidden
      .detail-wrapper
        min-height 100%
        .detial-content
          margin-top 64px
          padding-bottom 64px
      .detail-close
        position relative
        margin -64px auto 0 auto
        width 32px
        height 32px
        font-size 28px
        color rgba(255,255,255,0.5)
        clear both
</style>
