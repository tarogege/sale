<template>
  <div class="shopcar">
    <div class="content">
      <div class="shopcar-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{highlight: totalCount> 0}"><i class="icon fa fa-shopping-cart"
                                                                   aria-hidden="true"></i></div>
          <div class="total-count" v-if="totalCount">{{totalCount}}</div>
        </div>
        <div class="total-price" :class="{highlightPrice:totalCount > 0}">¥{{totalPrice}}</div>
        <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
      </div>
      <div class="shopcar-right">
        <div class="pay" :class="{btnsuccess: totalPrice >= minPrice}" @click="showShopcar()">{{payDesc}}</div>
      </div>
    </div>
    <div class="shopcar-list" v-show="listShow">
      <div class="list-header">
        <span class="title">购物车</span>
        <span class="empty">清空</span>
      </div>
      <div class="list-content">
        <ul>
          <li v-for="(food,index) in selectFoods" :key="index">
            <span class="food-name">{{food.name}}</span>
            <div class="price">
              <span>¥{{food.price*food.count}}</span>
            </div>
            <div class="carcontrol-wrapper">
              <carcontrol :food="food"></carcontrol>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import carcontrol from '../carcontrol/carcontrol';

  export default {
    components: {carcontrol},
    data: function () {
      return {
        fold: true,
        listShow: false
      };
    },
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      selectFoods: {
        type: Array,
        default: function () {
          return [
            {
              name: 'haha',
              price: 10,
              count: 2
            }
          ];
        }
      }
    },
    computed: {
      totalPrice: function () {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.count * food.price;
        });
        return total;
      },
      totalCount: function () {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc: function () {
        if (this.totalPrice === 0) {
          return '¥' + this.minPrice + '起送';
        } else if (this.totalPrice > 0 && this.totalPrice < this.minPrice) {
          let leaving = this.minPrice - this.totalPrice;
          return '还差¥' + leaving + '起送';
        } else {
          return '结算';
        }
      }
    },
    watch: {
      listShow: function () {
        if (!this.totalCount()) {
          this.fold = true;
          return false;
        }
        let show = this.fold;
        return show;
      }
    },
    methods: {
      showShopcar: function () {
        if (this.totalCount() === 0) {
          return;
        }
        this.fold = !this.fold;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcar
    position: fixed
    left: 0
    bottom: 0
    width: 100%
    height: 48px
    z-index: 50
    .content
      display: flex
      background-color: #141d27
      height: 100%
      .shopcar-left
        flex: 1
        //font-size 0
        .logo-wrapper
          display: inline-block
          position: relative
          top: -10px
          margin: 0 18px
          padding: 6px 6px
          width: 58px
          height: 58px
          box-sizing: border-box
          vertical-align: top
          border-radius: 50%
          background-color: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background-color: #2b343c
            &.highlight
              background-color: rgb(0, 160, 220)
              .icon
                color: white
            .icon
              padding-left: 12px
              padding-top: 9px
              font-size: 24px
              line-height: 24px
              text-align: center
              color: gray
          .total-count
            background-color: red
            position: absolute
            right: 0px
            top: 0px
            width: 24px
            border-radius: 6pc
            color: white
            line-height: 16px
            font-size: 9px
            text-align: center
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
            &.hightlightPrice
              color: white
        .total-price
          display: inline-block
          color: gray
          vertical-align: top
          line-height: 24px
          margin-top: 12px
          padding-right: 12px
          border-right: 1px solid #2b323c
          box-sizing: border-box
          font-size: 16px
          font-weight: 700
          //white-spacing 1px
          &.highlightPrice
            color: white
        .desc
          display: inline-block
          vertical-align: top
          line-height: 24px
          font-size: 10px
          color: rgba(255, 255, 255, 0.4)
          font-weight: 400
          margin-top: 12px
      .shopcar-right
        flex: 0 0 105px
        width: 105px
        .pay
          font-size: 14px
          color: rgba(255, 255, 255, 0.4)
          font-weight: 700
          line-height: 48px
          text-align: center
          vertical-align: middle
          background-color: #2b333b
          &.btnsuccess
            background-color: #00b43c
            color: white
</style>
