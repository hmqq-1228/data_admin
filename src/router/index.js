import Vue from 'vue'
import Router from 'vue-router'

// 登录
const Login = () => import('@/components/login');
// 导航页
const Index = () => import('@/components/index/index')
// pc首页
const Home = () => import('@/components/home/home')
// pc指挥部
const command = () => import('@/components/command/command')
//  pc标段
const section = () => import('@/components/Section/Section')
//  pc工区
const workArea = () => import('@/components/workArea/workArea')
// 手机首页
const MHome = () => import('@/components/m-home/m-home')
// 手机指挥部
const MCommand = () => import('@/components/m-command/m-command')
// 手机标段
const MSection = () => import('@/components/m-section/m-section')
// 手机工区
const MWorkArea = () => import('@/components/m-workArea/m-workArea')
// 手机项目
const MProject = () => import('@/components/m-project/m-project')
// pc项目
const Project = () => import('@/components/project/project')

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  routes: [
    {
      path: '/',
      name: '主页面',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/command',
      name: 'command',
      component: command
    },
    {
      path: '/section',
      name: 'section',
      component: section
    },
    {
      path: '/workArea',
      name: 'workArea',
      component: workArea
    },
    {
      path: '/m-home',
      name: 'MHome',
      component: MHome
    },
    {
      path: '/m-command',
      name: 'MCommand',
      component: MCommand
    },
    {
      path: '/m-section',
      name: 'MSection',
      component: MSection
    },
    {
      path: '/m-workArea',
      name: 'MWorkArea',
      component: MWorkArea
    },
    {
      path: '/m-project',
      name: 'MProject',
      component: MProject
    },
    {
      path: '/project',
      name: 'Project',
      component: Project
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    // {
    //   path: '/index',
    //   name: 'Index',
    //   component: Index,
    //   // children:[
    //   //   {
    //   //     path: '/home',
    //   //     name: 'Home',
    //   //     component: Home
    //   //   }
    //   // ]
    // }
  ]



})
