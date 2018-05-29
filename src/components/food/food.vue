<template>
  <transition name="move">
    <div v-show="showFood" class="food-wrapper" ref="food">
      <div class="img-header">
        <img :src="food.image" class="head-img">
        <div class="back" @click="hide()">
        <i class="fa fa-angle-left" aria-hidden="true"></i>
        </div>
      </div>
      <div class="content">
        <h2 class="name">{{food.name}}</h2>
        <p class="desc"><span v-if="food.sellCount" class="count">月售{{food.sellCount}}</span><span v-if="food.rating" class="rating">好评率{{food.rating}}%</span></p>
        <span class="price">¥{{food.price}}</span><span v-if="food.oldPrice" class="old-price">¥{{food.oldPrice}}</span>
        <a @click.stop.prevent="addFirst(food,$event)" class="join-car" v-show="!food.count||food.count === 0">加入购物车</a>
        <carcontrol :food="food" v-show="food.count&&food.count!==0" class="car-control"></carcontrol>
      </div>
      <split></split>
      <div class="info-wrapper">
        <h2 class="title">商品介绍</h2>
        <p class="info-detial">{{food.info}}</p>
      </div>
      <split></split>
      <div class="ratings">
        <h2 class="title">商品评价</h2>
        <ratingslect :ratings="food.ratings" :catology="['全部','推荐', '吐槽']" :selectType="selectType" :onlyContent="onlyContent"></ratingslect>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import carcontrol from '../carcontrol/carcontrol.vue';
  import Vue from 'vue';
  import split from '../split/split.vue';
  import ratingslect from '../ratingslect/ratingselect.vue';

export default {
  components: {
    carcontrol: carcontrol,
    split: split,
    ratingslect: ratingslect
  },
  props: {
    food: {
      type: Object
    }
  },
  data: function () {
    return {
      showFood: false,
      onlyContent: true,
      selectType: 0
    };
  },
  methods: {
    show() {
      this.showFood = true;
      this.onlyContent = true;
      this.selectType = 0;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {click: true});
        } else {
          this.scroll.refresh();
        }
      });
    },
    hide() {
      this.showFood = false;
    },
    addFirst(food, event) {
      if (!event._constructed) {
        return;
      }
    Vue.set(this.food, 'count', 1);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.food-wrapper
  position fixed
  top 0
  left 0
  bottom 48px
  z-index: 30
  width 100%
  background-color white
  &.move-enter-active, &.move-leave-active
    transition  all 0.2s linear
  &.move-enter, &.move-leave-to
    transform: translate3d(100%, 0, 0)
  .img-header
    position relative
    height 0
    width 100%
    padding-top 100%
    .head-img
      position absolute
      left 0
      top 0
      height 100%
      width 100%
    .back
      position absolute
      top 10px
      left 10px
      z-index 35
      .fa-angle-left
        display block
        color white
        font-size 20px
  .content
    position relative
    padding 18px
    .name
      font-size 14px
      font-weight 700
      color rgb(7,17,28)
      line-height 14px
      margin-bottom 8px
    .desc
      font-size 10px
      color rgb(147,153,159)
      line-height 10px
      margin-bottom 18px
      .count
        margin-right 12px
    .price
      font-size 14px
      font-weight 700
      color rgb(240,20,20)
      line-height 24px
    .old-price
      font-size 10px
      font-weight 700
      color rgb(147,153,159)
      line-height 24px
      text-decoration underline
    .join-car
      position absolute
      right 18px
      bottom 18px
      display inline-block
      width 74px
      height 24px
      border-radius 12px
      background-color rgb(0,160,220)
      text-align center
      line-height: 24px
      font-size 10px
      color: rgb(255,255,255)
    .car-control
      position absolute
      right 12px
      bottom 12px
  .info-wrapper
    padding 18px
    .title
      font-size 14px
      color rgb(7,17,27)
      line-height 14px
      margin-bottom 0 8px 6px
    .info-detial
      font-size 12px
      font-weight 200
      color rgb(77,85,93)
      line-height 24px
  .ratings
    padding 18px
    .title
      font-size 14px
      font-weight 700
      color rgb(77,85,93)
      padding-bottom 6px
      margin-bottom 12px
</style>
