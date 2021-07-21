import Vue from 'vue'
import Router from 'vue-router'
import MyMap from '@/views/Map.vue'
import Header from '@/components/Header.vue'
// import UserInfo from '@/views/UserInfo.vue'

import Login from '@/views/Login.vue'
// import Blog from '@/views/Blog.vue'
import Blog from '@/views/Blog.vue'
import Planning_edit from '@/views/Planning_edit.vue'

// import Friend from '@/views/Friend.vue'
// import Edit from '@/views/Blog_edit.vue'





Vue.use(Router)

const original = Router.prototype.push;

Router.prototype.push = function push(location) {
  return original.call(this, location).catch(err => err)
}



export default new Router({
 
  routes: [
    {
      path: '/map',
      name: 'MyMap',
      components: {
        default: MyMap,
        nav: Header
      }
    },
    {
      path: "/",
      name: "login",
      components: { default: Login, nav: Header }
      // () => import("../views/Login.vue")
      //  箭頭函式就不能nav?
    },
   
    {
      path: '/planning_edit',
      name: 'Planning_edit',
      components: {
        default: Planning_edit,
        nav: Header
      }
    },
 
    {
      path: "/blog",
      name: "blog",
      components: {
        default: Blog,
        nav: Header
      },
      // children: [
      //   {
      //     path: "blog_edit",
      //     name: "blog_edit",
      //     component: Edit,
      //   }
      // ],
    },
    {
      path: '*',
      redirect: '/',
    }
  ]
})
