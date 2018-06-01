<template>
  <div class="seller" ref="seller">
    <div class="seller-wrapper">
      <div class="overview">
        <div class="top">
          <div class="name">{{seller.name}}</div>
          <div class="detail">
            <star :size="36" :score="seller.score" class="star"></star>
            <span class="count rate-count">({{seller.ratingCount}})</span>
            <span class="count sell-count">月售{{seller.sellCount}}单</span>
          </div>
          <div class="collect">
            <i class="fa fa-heart" aria-hidden="true"></i>
            <div class="collect-label">已收藏</div>
          </div>
        </div>
        <div class="bottom">
          <div class="min-price">
            <h2>起送价</h2>
            <p>{{seller.minPrice}}<span>元</span></p>
          </div>
          <div class="delivery-price">
            <h2>商家配送</h2>
            <p>{{seller.deliveryPrice}}<span>元</span></p>
          </div>
          <div class="delivery-time">
            <h2>平均配送时间</h2>
            <p>{{seller.deliveryTime}}<span>分钟</span></p>
          </div>
        </div>
      </div>
      <split></split>
      <div class="supports">
        <h1 class="title">公告与活动</h1>
        <p class="bulletin">{{seller.bulletin}}</p>
        <ul v-if="seller.supports" class="discount-list">
          <li class="discount-item" v-for="(supportItem,index) in seller.supports" :key="index">
            <span class="icon" :class="classMap[supportItem.type]"></span>
            <span class="text">{{supportItem.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1>商家实景</h1>
        <div class="seller-photos">
          <img v-for="(pic,index) in seller.pics" :key="index" src="./sellpic01.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScorll from 'better-scroll';
  import split from '../split/split';
  import star from '../star/star';
export default {
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    split: split,
    star: star
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this.$nextTick(() => {
      this.scroll = new BScorll(this.$refs.seller, {click: true});
    });
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
.seller
  .overview
    padding 18px
    .top
      position relative
      border-bottom 1px solid rgba(7,17,27,0.1)
      padding-bottom 18px
      .name
        font-size 14px
        color rgb(7,17,27)
        line-height 14px
        margin-bottom 8px
      .detail
        .star
          display inline-block
          vertical-align top
          margin-right 8px
        .count
          display inline-block
          vertical-align top
          font-size 10px
          color rgb(77,85,93)
          line-height 18px
        .rate-count
          display inline-block
          vertical-align top
          margin-right 12px
      .collect
        position absolute
        top 0
        right 0
        display table-cell
        vertical-align top
        .fa-heart
          display table-row
          vertical-align top
          font-size 24px
          color rgb(240,20,20)
          line-height 24px
          margin-bottom 4px
        .collect-label
          display table-row
          vertical-align top
          text-align center
          font-size 10px
          color rgb(77,85,93)
          line-height 10
    .bottom
      display flex
      padding-top 18px
    .bottom >div
      flex 1
      text-align center
      border-right 1px solid rgba(7,17,27,0.1)
      &:last-child
        border-right: none
    .bottom > div h2
      font-size 10px
      color rgb(47,135,159)
      line-height 10px
      margin-bottom 4px
    .bottom > div p
      font-size 24px
      font-weight 200
      color rgb(7,17,27,)
      line-height 24px
      span
        font-size 10px
  .supports
    padding 18px
    .title
      font-size 14px
      color rgb(7,17,27)
      line-height 14px
      margin-bottom 8px
    .bulletin
      font-size 12px
      font-weight 200
      color rgb(240,20,20)
      line-height 24px
      padding-left 12px
      padding-bottom 16px
      border-bottom 1px solid rgba(7,17,27,0.1)
    .discount-list
      .discount-item
        padding 16px 12px
        border-bottom 1px solid rgba(7,17,27,0.1)
        .icon
          display inline-block
          width 16px
          height 16px
          vertical-align top
          margin-right 6px
          background-size 16px 16px
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
        .text
          font-size 12px
          font-weight 200
          color rgb(7,17,27)
          line-height 16px
  .pics
    padding 18px
    h1
      font-size 14px
      color rgb(7,17,27)
      line-height 14px
      margin-bottom 12px
    .seller-photos
      img
        width 120px
        height: 90px
        margin-right 6px
        white-space nowrap
        overflow-x scroll
</style>
