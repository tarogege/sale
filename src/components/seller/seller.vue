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
          <div class="collect" @click="toggleCollect($event)">
            <i class="fa fa-heart" aria-hidden="true" :class="{'active':isCollect}"></i>
            <div class="collect-label">{{collectText}}</div>
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
        <div class="seller-photos" ref="pics">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="(pic,index) in seller.pics" :key="index">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="infos">
        <h1 class="title">商家信息</h1>
        <ul class="info-list">
          <li v-for="(info, index) in seller.infos" :key="index" class="info-item">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import split from '../split/split';
  import star from '../star/star';
  import carcontrol from '../carcontrol/carcontrol';
  import {saveToLocal, loadFromLocal} from '../../common/js/store';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        isCollect: (() => {
          return loadFromLocal(this.seller.id, 'favourite', false);
        })()
      };
    },
    computed: {
      collectText() {
        return this.isCollect ? '已收藏' : '收藏';
      }
    },
    components: {
      carcontrol: carcontrol,
      split: split,
      star: star
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
      toggleCollect(event) {
        if (!event._constructed) {
          return;
        }
        this.isCollect = !this.isCollect;
        saveToLocal(this.seller.id, 'favourite', this.isCollect);
      },
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      _initPics() {
        if (this.seller.pics) {
          var margin = 6;
          var wid = 120;
          var width = (wid + margin) * this.seller.pics.length - margin;
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.pics, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      }
    },
    watch: {
      'seller'() {
        this.$nextTick(() => {
          this._initScroll();
          this._initPics();
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll();
        this._initPics();
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .seller
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      padding: 18px
      .top
        position: relative
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        padding-bottom: 18px
        .name
          font-size: 14px
          color: rgb(7, 17, 27)
          line-height: 14px
          margin-bottom: 8px
        .detail
          .star
            display: inline-block
            vertical-align: top
            margin-right: 8px
          .count
            display: inline-block
            vertical-align: top
            font-size: 10px
            color: rgb(77, 85, 93)
            line-height: 18px
          .rate-count
            display: inline-block
            vertical-align: top
            margin-right: 12px
        .collect
          position: absolute
          top: 0
          right: -7px
          width: 50px
          .fa-heart
            display: block
            text-align: center
            font-size: 24px
            line-height: 24px
            margin-bottom: 4px
            color: #d4d6d9
            &.active
              color: rgb(240, 20, 20)
          .collect-label
            text-align: center
            font-size: 10px
            color: rgb(77, 85, 93)
            line-height: 10px
      .bottom
        display: flex
        padding-top: 18px
      .bottom > div
        flex 1
        text-align: center
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        &:last-child
          border-right: none
      .bottom > div h2
        font-size: 10px
        color: rgb(47, 135, 159)
        line-height: 10px
        margin-bottom: 4px
      .bottom > div p
        font-size: 24px
        font-weight: 200
        color: rgb(7, 17, 27,)
        line-height: 24px
        span
          font-size: 10px
    .supports
      padding: 18px
      .title
        font-size: 14px
        color: rgb(7, 17, 27)
        line-height 14px
        margin-bottom: 8px
      .bulletin
        font-size: 12px
        font-weight: 200
        color: rgb(240, 20, 20)
        line-height: 24px
        padding-left: 12px
        padding-bottom: 16px
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      .discount-list
        .discount-item
          padding: 16px 12px
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border-bottom: none
            padding-bottom: 0
          .icon
            display: inline-block
            width: 16px
            height: 16px
            vertical-align: top
            margin-right: 6px
            background-size: 16px 16px
            background-repeat: no-repeat
            &.decrease
              bg-image("./decrease_4")
            &.discount
              bg-image("./discount_4")
            &.guarantee
              bg-image("./guarantee_4")
            &.invoice
              bg-image("./invoice_4")
            &.special
              bg-image("./special_4")
          .text
            font-size: 12px
            font-weight: 200
            color: rgb(7, 17, 27)
            line-height: 16px
    .pics
      padding: 18px
      h1
        font-size: 14px
        color: rgb(7, 17, 27)
        line-height: 14px
        margin-bottom: 12px
      .seller-photos
        width: 100%
        overflow: hidden
        white-space: nowrap
        .pic-list
          font-size: 0
          .pic-item
            display: inline-block
            margin-right: 6px
            &:last-child
              margin-right: 0
    .infos
      padding: 18px
      .title
        font-size: 14px
        color: rgb(7, 17, 27)
        line-height: 14px
        padding-bottom: 12px
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      .info-list
        display: block
        .info-item
          padding: 16px 12px
          font-size: 12px
          font-weight: 200
          color: rgb(7, 17, 27)
          line-height: 16px
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border-bottom: none
            padding-bottom: 0
</style>
