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
    <transition name="fade">
    <div class="detail" v-show="detailShow">
      <div class="detail-wrapper clearfix">
        <div class="detail-content">
          <div class="detail-header">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-warpper">
              <star :size="48" :score="seller.score"></star>
            </div>
          </div><!--d-header-->
          <div class="detail-main">
            <div class="discount-info">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
              <!--youhuiliebiao-->
            </div>
            <div class="discount-detail">
            <ul v-if="seller.supports">
              <li class="discount-item" v-for="(supportItem,index) in seller.supports" :key="index">
                <span class="icon" :class="classMap[supportItem.type]"></span>
                <span class="text">{{supportItem.description}}</span>
              </li>
            </ul>
            </div>
            <div class="bulletin">
              <div class="bulletin-info">
                <div class="line"></div>
                <div class="text">商家公告</div>
                <div class="line"></div>
              </div>
              <p class="bulletin-text">{{seller.bulletin}}</p>
            </div>
          </div><!--main-->
        </div><!--detailcontent-->
      </div>
      <div class="detail-close" @click="hideDetail()"><i class="fa fa-times"></i></div>
    </div><!--detial-->
    </transition>
  </div>
</template>

<script>
  import star from '../star/star.vue';
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
      },
      hideDetail: function () {
        this.detailShow = false;
      }
    },
    created: function () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      star: star
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
      backdrop-filter: blur(5px)
      &.fade-enter-active,&.fade-leave-active
        transition all 0.5s
      &.fade-enter,&.fade-leave-active
        opacity 0
        background-color rgba(7,17,27,0)
      overflow hidden
      .detail-wrapper
        min-height 100%
        width 100%
        overflow-y scroll
        //父样式宽度100%，保证水平居中
        .detail-content
          margin-top 64px
          padding-bottom 64px
          .detail-header
            .name
              font-size 16px
              font-weight 700
              color rgb(255,255,255)
              text-align center
              line-height 16px
            .star-warpper
              text-align center
              margin 16px 0 28px 0
              height 24px
          .discount-info
            display flex
            width 80%
            margin 36px auto 24px auto
            .line
              flex 1
              position relative
              top: -6px
              border-bottom  1px solid rgba(255,255,255,0.2)
            .text
              margin 0 12px
              font-size 14px
              font-weight: 700
          .discount-detail
            //ul
            width 80%
            margin 0 auto 28px auto
            .discount-item
              padding-left 12px
              margin-bottom 12px
              //font-size 0
              &: last-child
                margin-bottom 0
              .icon
                display inline-block
                width 16px
                height 16px
                vertical-align top
                margin-right 6px
                background-size: 16px 16px
                background-repeat: no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                vertical-align top
                font-size 13px
                line-height 13p
          .bulletin
            //width 80%
            .bulletin-info
              display flex
              width 80%
              margin 36px auto 24px auto
              .line
                flex 1
                position relative
                top: -6px
                border-bottom 1px solid rgba(255, 255, 255, 0.2)
              .text
                margin 0 12px
                font-size 14px
                font-weight: 700
            .bulletin-text
              width 80%
              margin 24px auto 0 auto
              font-size 13px
              line-height 24px
      .detail-close
        position relative
        margin -64px auto 0 auto
        width 32px
        height 32px
        font-size 28px
        color rgba(255,255,255,0.5)
        clear both
</style>
