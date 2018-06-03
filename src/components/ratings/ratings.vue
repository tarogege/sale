<template>
  <div class="rating" ref="rating">
    <div>
      <div class="total-rating">
        <div class="left">
          <p class="left-score">{{seller.score}}</p>
          <h1 class="left-title">综合评分</h1>
          <p class="left-rating">高于周边商家{{seller.rankRate}}%</p>
        </div>
        <div class="right">
          <P class="right-line"><span class="right-label">服务态度</span>
            <star :size=36 :score="seller.score" class="star"></star>
            <span class="right-score">{{seller.score}}</span></P>
          <P class="right-line"><span class="right-label">服务态度</span>
            <star :size=36 :score="seller.serviceScore" class="star"></star>
            <span class="right-score">{{seller.serviceScore}}</span></P>
          <P class="right-line"><span class="right-label">送达时间</span><span class="delivery-time">{{seller.deliveryTime}}分钟</span>
          </P>
        </div>
      </div>
      <split></split>
      <div class="rating-wrapper">
        <ratingselect :ratings="ratings" @select="selectRatings" @contentToggle="toggleContent"
                      :catology="['全部','满意', '不满意']" :selectType="selectType" :onlyContent="onlyContent"></ratingselect>
        <ul class="rating-list">
          <li class="rating-item" v-for="(rating,index) in ratings" :key="index"
              v-show="needShow(rating.rateType,rating.text)">
            <div class="user">
              <img src="rating.avatar" class="avatar"/>
              <div class="user-right">
                <span class="username">{{rating.username}}</span>
                <div class="overview">
                  <star :size=24 :score="rating.score" class="rating-star"></star>
                  <span class="delivery-time">{{rating.deliveryTime}}分钟送达</span>
                </div>
              </div>
            </div>
            <div class="text">{{rating.text}}</div>
            <div class="recommend" v-show="rating.recommend && rating.recommend.length">
              <i class="fa fa-thumbs-up" aria-hidden="true"></i>
              <span class="recommend-item" v-for="(recommend,reindex) in rating.recommend"
                    :key="reindex">{{recommend}}</span>
            </div>
            <div class="rating-date">{{rating.rateTime | formatDate}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import split from '../split/split.vue';
  import star from '../star/star.vue';
  import ratingselect from '../ratingslect/ratingselect';
  import {formatDate} from '../../common/js/date.js';
  import BScorll from 'better-scroll';

  export default {
    components: {
      ratingselect: ratingselect,
      star: star,
      split: split
    },
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        selectType: 0,
        onlyContent: true
      };
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    created() {
      this.$http.get('api/ratings').then((response) => {
        response = response.body;
        if (response.errno === 0) {
          this.ratings = response.data;
          this.$nextTick(() => {
            this.scroll = new BScorll(this.$refs.rating, {click: true});
          });
        }
      });
    },
    methods: {
      selectRatings(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent(content) {
        this.onlyContent = content;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === 0) {
          return true;
        } else {
          type += 1;
          return this.selectType === type;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .total-rating
    padding: 18px 0
    display: flex
    .left
      flex: 0 0 137px
      text-align: center
      //padding-right 24px
      border-right: 1px solid rgba(147, 153, 159, 0.1)
      @media only screen and (max-width: 320px)
        flex: 0 0 12px
      .left-score
        font-size: 24px
        color: rgb(255, 153, 0)
        line-height: 28px
        margin-bottom: 6px
      .left-title
        font-size: 12px
        color: rgb(7, 17, 27)
        line-height: 12px
        margin-bottom: 8px
      .left-rating
        text-align: center
        font-size: 10px
        color: rgb(147, 153, 159)
        line-height: 10px
        margin-bottom: 6px
    .right
      felx: 1
      padding-left: 24px
      .right-line
        margin-bottom: 8px
        .right-label
          display: inline-block
          vertical-align: top
          line-height: 18px
          font-size: 12px
          color: rgb(7, 17, 27)
          margin-right: 12px
        .star
          display: inline-block
          vertical-align: top
          line-height: 18px
          font-size: 12px
          margin-right: 12px
        .right-score
          display: inline-block
          vertical-align: top
          line-height: 18px
          font-size: 12px
          color: rgb(255, 153, 0)
        .delivery-time
          font-size: 12px
          color: rgb(147, 153, 159)

  .rating-wrapper
    padding: 18px
    .rating-list
      .rating-item
        position: relative
        padding: 18px
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .user
          .avatar
            display: inline-block
            vertical-align: top
            width: 28px
            height: 28px
            border-radius: 50%
            margin-right: 12px
          .user-right
            display: inline-block
            vertical-align: top
            .username
              font-size: 10px
              color: rgb(7, 17, 27)
              line-height: 12px
              margin-bottom: 4px
            .overview
              margin-bottom: 6px
              .rating-star
                display: inline-block
                vertical-align: top
                font-size: 0
                margin-right: 6px
              .delivery-time
                display: inline-block
                vertical-align: top
                font-size: 10px
                font-weight: 200
                color: rgb(147, 153, 159)
                line-height: 12px
        .text
          margin-left: 40px
          font-size: 12px
          color: rgb(7, 17, 27)
          line-height: 18px
          margin-bottom: 8px
        .recommend
          margin-left: 40px
          .fa
            font-size: 12px
            line-height: 16px
            margin-left: 8px
            &.fa-thumbs-up
              color: rgb(0, 160, 220)
          .recommend-item
            display: inline-block
            vertical-align: top
            border: 1px solid rgba(7, 17, 27, 0.1)
            font-size: 9px
            color: rgb(147, 153, 159)
            line-height: 16px
            padding: 0 6px
            margin-right: 8px
            width: 30px
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
            &:last-child
              margin-right: 0
        .rating-date
          position: absolute
          right: 18px
          top: 18px
          font-size: 10px
          font-weight: 200
          color: rgb(147, 153, 159)
          line-height: 12px

  .rating
    position: absolute
    top: 172px
    bottom: 0
    left: 0
    width: 100%
</style>
