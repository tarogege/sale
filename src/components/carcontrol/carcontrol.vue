<template>
<div class="car-control">
  <transition name="move">
  <div class="reduce" v-show="food.count" @click="reduceFood($event)">
    <div class="reduce-icon">
      <i class="inner fa fa-minus-circle" aria-hidden="true"></i>
    </div>
  </div>
  </transition>
  <label v-show="food.count" class="label">{{food.count}}</label>
  <div class="add" @click="addFood($event)"><i class="fa fa-plus-circle" aria-hidden="true"></i></div>
</div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    reduceFood: function (event) {
      if (!event._constructed) {
        return;
      }
      if (this.food.count) {
        return --this.food.count;
      }
    },
    addFood: function (event) {
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
      return this.food.count;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.car-control
  display inline-block
  .move-enter-active,.move-leave-active
  .move-enter,.move-leave-active
  .add
    //background-color blue
    display inline-block
    color rgb(0,160,220)
    background-color white
    padding 6px
    font-size 24px
  .reduce
    display inline-block
    //border-color rgb(0,160,220)
    padding 6px 3px
    .reduce-icon
      //border 1px solid rgb(0, 160, 220)
      font-size 21px
      color white
      background-color rgb(0, 160, 220)
      padding 1px 2px
      border-radius 55%
  .hidden-div
    min-width 50px
    line-height 24px
  .label
    display inline-block
    width 24px
    font-size 10
    line-height 24px
    color rgb(147,153,159)
    text-align center
</style>
