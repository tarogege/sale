import Vue from 'vue';
import VueRouter from 'vue-router';
import goods from '../components/goods/goods';
import ratings from '../components/ratings/ratings';
import seller from '../components/seller/seller';
import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [{
  path: '/',
  redirect: '/goods'
}, {
  path: '/goods',
  component: goods
}, {
  path: '/ratings',
  component: ratings
}, {
  path: '/seller',
  component: seller
}];
export default new VueRouter({
  linkActiveClass: 'active',
  routes
});
