import { axios } from '@/utils/request'

// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'
import { async } from 'q';

const api = {
  //getMenu: '/sys/login/getMenu', // 查询当前用户的菜单(蜻蜓权限)
  getMenu: '/login/getMenuList', // 查询当前用户的菜单
}
export function getRouterByUser (parameter) {
  return axios({
    url: api.getMenu,
    method: 'get',
    headers:parameter
  })
}

export function generatorDynamicRouter (parameter) {
  return new Promise((resolve, reject) => {
    // ajax
    getRouterByUser(parameter).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//从后台获取的列表数据添加到children数组中
const localRouter= JSON.parse(localStorage.getItem('pcg__GET_MENU'))
console.log(localRouter)
// 定义最后生成的路由数组，路由最后添加到children中
let lastasyncRouterMap = [{
  path: '/',
  name: 'index',
  component: BasicLayout,
  meta: { title: 'Home' },
  redirect: '/plantMaintenance/plantMaintenance_list',
  children: [],
}];

//需要增加的增改查的隐藏页面
let hiddenPage={
  path: '/country_add',
  name: '隐藏列表',
  redirect: '/country/country_add',
  component: RouteView,
  hidden:true,
  meta: { title: '隐藏列表', icon: 'slack' },
  children: []
}


//需要增加的增改查的隐藏页面
let firstPush,secPushAdd,secPushEdit,secPushDet,secondPush,thirdPush;
let thirdPushAdd,thirdPushEdit,thirdPushDet;
if(localRouter){
  let newRouterMap = localRouter.value; //后台获取的模拟数据
  for (let i = 0; i < newRouterMap.length; i++) {
    // 生成一级菜单
    // 生成一级菜单前要判断该一级菜单下的二级菜单是否含有三级菜单
    for (let j = 0; j < newRouterMap[i].childMenuList.length; j++) {
      // 如果第一个二级菜单没有三级菜单，则它有frontRouter，取第一个二级菜单的frontRouter
      //如果第一个二级菜单有三级菜单，无frontRouter，则直接去其第一个元素的frontRouter
      //如果全部二级菜单都有三级菜单，则取第一个二级菜单的第一个三级菜单的frontRouter
      if(newRouterMap[i].childMenuList[0].childMenuList==undefined){//如果第一个二级菜单没有三级菜单,有frontRouter
        let frontR  = newRouterMap[i].childMenuList[0].frontRouter
        let ind = frontR.lastIndexOf("\/");
        let firstr = frontR.substring(0,ind);
        firstPush={
          path: `${firstr}`,
          name: `${newRouterMap[i].name}`,
          redirect: `${newRouterMap[i].childMenuList[0].frontRouter}`,
          component: RouteView,
          meta: { title: newRouterMap[i].name, keepAlive: false, icon: newRouterMap[i].icon},
          children: []
        }
       
      }else if(newRouterMap[i].childMenuList[0].childMenuList!=undefined){//如果第一个二级菜单有三级菜单,无frontRouter
        // console.log(newRouterMap[i].childMenuList[0].childMenuList[0].frontRouter)
        let frontR  = newRouterMap[i].childMenuList[0].childMenuList[0].frontRouter
        let ind = frontR.lastIndexOf("\/");
        let firstring = frontR.substring(0,ind);
        firstPush={
          path: `${firstring}`,
          name: `${newRouterMap[i].name}`,
          redirect: `${newRouterMap[i].childMenuList[0].childMenuList[0].frontRouter}`,
          component: RouteView,
          meta: { title: newRouterMap[i].name, keepAlive: false, icon: newRouterMap[i].icon },
          children: []
        }
      }
    }
    // console.log(firstPush)
    //追加一级菜单
    lastasyncRouterMap[0].children.push(firstPush)

    for (let j = 0; j < newRouterMap[i].childMenuList.length; j++) {
      // 二级菜单
      // console.log(newRouterMap[i].childMenuList[j].frontRouter);
      // console.log(newRouterMap[i].childMenuList[j].childMenuList);
      if(newRouterMap[i].childMenuList[j].childMenuList==undefined){//没有三级级菜单
        // console.log(newRouterMap[i].childMenuList[j].frontRouter)
        let secfrontR=newRouterMap[i].childMenuList[j].frontRouter
        let sec = secfrontR.lastIndexOf("\/");
        let firstName = secfrontR.substring(0,sec);
        let firstNamenog=firstName.replace('/','');
        secondPush={
          path: `${newRouterMap[i].childMenuList[j].frontRouter}`,
          name: newRouterMap[i].childMenuList[j].name,
          component: () => import(`@/views${newRouterMap[i].childMenuList[j].frontRouter}`),
          meta: { title: newRouterMap[i].childMenuList[j].name, icon: newRouterMap[i].childMenuList[j].icon }
        },
        secPushAdd={
          path: `${firstName}${firstName}_add`,
          name: `${firstNamenog}_add`,//该name值不可更改
          hidden:true,
          component: () => import(`@/views/${firstNamenog}/${firstNamenog}_add`),
          meta: { title: `新建${newRouterMap[i].childMenuList[j].name}列表`, icon: 'tool', keepAlive: false}
        },
        secPushEdit={
          path: `${firstName}${firstName}_edit`,
          name: `${firstNamenog}_edit`,//该name值不可更改
          hidden:true,
          component: () => import(`@/views/${firstNamenog}/${firstNamenog}_edit`),
          meta: { title: `编辑${newRouterMap[i].childMenuList[j].name}列表`, icon: 'tool', keepAlive: false}
        },
        secPushDet={
          path: `${firstName}${firstName}_detail`,
          name: `${firstNamenog}_detail`,//该name值不可更改
          hidden:true,
          component: () => import(`@/views/${firstNamenog}/${firstNamenog}_detail`),
          meta: { title: `${newRouterMap[i].childMenuList[j].name}列表详情`, icon: 'tool', keepAlive: false}
        }
        //追加二级菜单
        hiddenPage.children.push(secPushAdd)
        hiddenPage.children.push(secPushEdit)
        hiddenPage.children.push(secPushDet)
      }else{//有三级菜单
        let url = newRouterMap[i].childMenuList[j].childMenuList[0].frontRouter
        let index = url.lastIndexOf("\/");
        let firstrouter = url.substring(0,index+1);
        let secrouter = url.substring(index + 1,url.length);
        secondPush={
          path: `${firstrouter}list`,
          component: RouteView,
          name: newRouterMap[i].childMenuList[j].name,
          meta: { title: newRouterMap[i].childMenuList[j].name, icon: newRouterMap[i].childMenuList[j].icon,  },
          redirect: `${firstrouter}list/${secrouter}`,
          // 三级目录
          children: []
        }
      }
      //追加二级菜单
      lastasyncRouterMap[0].children[i].children.push(secondPush)

      if(newRouterMap[i].childMenuList[j].childMenuList !=undefined){
        lastasyncRouterMap[0].children[i].children[j].children = [];
        for(let s = 0; s < newRouterMap[i].childMenuList[j].childMenuList.length; s++){
          // console.log(newRouterMap[i].childMenuList[j].childMenuList[s].frontRouter)
          let thirdfrontR=newRouterMap[i].childMenuList[j].childMenuList[s].frontRouter
          let thir = thirdfrontR.lastIndexOf("\/");
          let thirfirstName = thirdfrontR.substring(0,thir);
          let thirfirstNamenog=thirfirstName.replace('/','');
          // 三级菜单
          thirdPush={
            path: `${newRouterMap[i].childMenuList[j].childMenuList[s].frontRouter}`,
            name: newRouterMap[i].childMenuList[j].childMenuList[s].name,
            component: () => import(`@/views${newRouterMap[i].childMenuList[j].childMenuList[s].frontRouter}`),
            meta: { title: newRouterMap[i].childMenuList[j].childMenuList[s].name, icon: newRouterMap[i].childMenuList[j].childMenuList[s].icon, keepAlive: false }
          },
          // thirdPushAdd,thirdPushEdit,thirdPushDet;
          thirdPushAdd={
            path: `${thirfirstName}${thirfirstName}_add`,
            name: `${thirfirstNamenog}_add`,//该name值不可更改
            hidden:true,
            component: () => import(`@/views/${thirfirstNamenog}/${thirfirstNamenog}_add`),
            meta: { title: `新建${newRouterMap[i].childMenuList[j].childMenuList[s].name}列表`, icon: 'tool', keepAlive: false}
          },
          thirdPushEdit={
            path: `${thirfirstName}${thirfirstName}_edit`,
            name: `${thirfirstNamenog}_edit`,//该name值不可更改
            hidden:true,
            component: () => import(`@/views/${thirfirstNamenog}/${thirfirstNamenog}_edit`),
            meta: { title: `编辑${newRouterMap[i].childMenuList[j].childMenuList[s].name}列表`, icon: 'tool', keepAlive: false}
          },
          thirdPushDet={
            path: `${thirfirstName}${thirfirstName}_detail`,
            name: `${thirfirstNamenog}_detail`,//该name值不可更改
            hidden:true,
            component: () => import(`@/views/${thirfirstNamenog}/${thirfirstNamenog}_detail`),
            meta: { title: `${newRouterMap[i].childMenuList[j].childMenuList[s].name}列表详情`, icon: 'tool', keepAlive: false}
          }
          //追加三级菜单
          lastasyncRouterMap[0].children[i].children[j].children.push(thirdPush)
          hiddenPage.children.push(thirdPushAdd)
          hiddenPage.children.push(thirdPushEdit)
          hiddenPage.children.push(thirdPushDet)
        }
      }
    }
  }
  console.log(hiddenPage)
  lastasyncRouterMap[0].children.push(hiddenPage)    

}
console.log(lastasyncRouterMap)//最后生成的路由，赋值给asyncRouterMap
export const asyncRouterMap = lastasyncRouterMap

/**
 * 基础路由
 * @type { *[] }
 */

export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      }
    ]
  },
  
  {
    path: '/404',
    component: () => import('@/views/exception/404')
  }

]
