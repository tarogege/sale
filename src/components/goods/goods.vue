<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul class="menu-list">
        <li v-for="(good,index) in goods" :key="index" class="good-li" :class = "{activeMenuItem: currentIndex== index}" @click="selectMenu($event,index)">
          <span v-show="good.type !== -1" class="icon" :class="classMap[good.type]" ref="mymy"></span>
          <span class="text">{{good.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods" ref="foodWrapper">
      <ul>
        <li v-for="(good,index) in goods" :key="index" ref="goodList" class="food-list">
          <h1 class="menu-title">{{good.name}}</h1>
          <ul class="food-list">
            <li @click="selectFood(food,$event)" v-for="(food,index) in good.foods" :key="index" class="food-item border-1px">
              <div class="avatar">
                <img :src="food.icon" width="57" height="57"/>
              </div>
              <div class="text">
                <div class="food-title">{{food.name}}</div>
                <div class="food-detail">
                  <div class="description">{{food.description}}</div>
                  <div class="support">
                    <span>月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}</span>
                  </div>
                </div>
                <div class="price">
                  <span class="now-price">¥{{food.price}}</span>
                  <span v-if="food.oldPrice" class="old-price">¥{{food.oldPrice}}</span>
                </div>
                <div class="carcontrol-wrapper">
                  <carcontrol :food="food"></carcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcar :selectFoods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcar>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import shopcar from '../shopcar/shopcar.vue';
  import carcontrol from '../carcontrol/carcontrol.vue';
  import food from '../food/food.vue';

  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data: function () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    components: {
      shopcar: shopcar,
      carcontrol: carcontrol,
      food: food
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let selectFoods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              selectFoods.push(food);
            }
          });
        });
        return selectFoods;
      }
    },
    created: function () {
      this.$http.get('./api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
      _initScroll: function () {
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodWrapper, {
          click: true,
          probeType: 3
        });
        this.foodsScroll.on('scroll', (pos) => {
          // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
          if (pos.y <= 0) {
            this.scrollY = Math.abs(Math.round(pos.y));
          }
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.goodList;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      _followScroll(index) {
        let menuList = this.$refs.menuList;
        let el = menuList[index];
        this.meunScroll.scrollToElement(el, 300, 0, -100);
      },
      selectMenu(event, index) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.goodList;
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
        return 0;
      },
      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      }
    }
  };
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    display flex
    width 100%
    position absolute
    top 177px
    bottom 46px
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      .menu-list
        .activeMenuItem
        .good-li
          //display block
          display table
          width 100%
          height 54px
          padding auto 12px
          //vertical-align middle
          font-size 14px
          line-height 14px
          text-align center
          background-color rgba(7, 17, 27, 0.1)
          &.activeMenuItem
            background-color white
            font-weight 700
          .icon
            display inline-block
            margin-top 15px
            width 12px
            height 12px
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
            &.special
              bg-image('special_3')
          .text
            display table-cell
            vertical-align middle
            color black
            font-weight 200
            font-size 12px
            border-bottom 1px solid rgba(7, 17, 27, 0.1)
    .foods
      flex 1
      .menu-title
        height 26px
        background-color #f3f5f7
        border-left 2px solid #d0dde1
        font-size 12px
        color rgb(147, 153, 159)
        line-height 26px
        padding-left 14px
      .food-list
        //ul
        .food-item
          //li
          margin 18px 18px 0
          padding-bottom 18px
          display flex
          border-1px(rgba(7, 17, 27, 0.1))
          &:lastchild
            border-none()
          .avatar
            flex 0 0 57
            margin-right 10px
          .text
            flex 1
            .food-title
              margin-top 2px
              font-size 14px
              color rgb(7, 17, 27)
              line-height 14px
            .food-detail
              & > div
                margin-top 8px
                font-size 10px
                color rgb(147, 153, 159)
                line-height 10px
              .support
                span
                  margin-right 12px
            .price
              display inline-block
              font-weight 700
              line-height 24px
              .now-price
                margin 8px 8px 0 0
                color red
                font-size 14px
              .old-price
                font-size 10px
                color rgb(147, 153, 159)
            .carcontrol-wrapper
              position absolute
              display inline-block
              right 0
              bottom 18px
</style>
