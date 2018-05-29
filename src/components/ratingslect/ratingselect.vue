<template>
<div class="ratingselect">
  <div class="items">
    <a class="all" :class="{'active':selectType === 0}"><span>{{catology[0]}}</span><span class="count">{{ratings.length}}</span></a><a class="positive" :class="{'active':selectType === 1}"><span>{{catology[1]}}</span><span class="count">{{myfilter(0)}}</span></a><a class="negative" :class="{'active':selectType === 2}">{{catology[2]}}<span class="count">{{myfilter(1)}}</span></a>
  </div>
  <div class="only-content">
    <i class="fa fa-check-circle" aria-hidden="true" :class="{'on':onlyContent}"></i>
    <span>只看有评价的内容</span>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return [
          {
            'username': 'admint',
            'rateTime': 1469281964000,
            'rateType': 0,
            'text': '很喜欢的粥',
            'avatar': 'http://static.galileo.xiao'
          }
        ];
      }
    },
    catology: {
      type: Array,
      default() {
        return ['全部', '满意', '不满意'];
      }
    },
    selectType: {
      type: Number,
      default: 0
    },
    onlyContent: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    myfilter(rateType) {
      let count = 0;
      for (var i = 0; i < this.ratings.length;i++) {
        if (this.ratings[i].rateType === rateType) {
          count++;
        }
      }
      return count;
    }
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.ratingselect
  .items
    padding-bottom 18px
    border-bottom 1px solid rgba(7,17,27,0.1)
    .all,.positive,.negative
      display inline-block
      border-radius 1px
      line-height 16px
      padding 8px 12px
      font-size 12px
      .count
        font-size 8px
       &.active
        color white
    .all
      background-color rgba(0,160,220,0.2)
      //color white
      margin-right 8px
      &.active
        background-color rgb(0,160,220)
    .positive
      background-color rgba(0,160,220,0.2)
      color rgb(77,85,93)
      margin-right 8px
      &.active
        background-color rgb(0,160,220)
    .negative
      background-color rgba(77,85,93,0.2)
      &.avtive
        background-color rgb(77,85,93)
  .only-content
    padding 12px 18px
    border-bottom 1px solid rgba(7,17,27,0.1)
    .fa-check-circle,span
      color rgb(147,153,159)
      line-height 24px
    .fa-check-circle
      font-size 24px
      margin-right 4px
      &.on
        color #00c850
    span
      font-size 12px
</style>
