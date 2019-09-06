import { axios } from '@/utils/request'
// eslint-disable-next-line
import { BasicLayout, RouteView, UserLayout } from '@/layouts'

const api = {
    //getMenu: '/sys/login/getMenu', // 查询当前用户的菜单(蜻蜓权限)
    getMenu: '/login/getMenuList', // 查询当前用户的菜单
}

export function getRouterByUser(parameter) {
    return axios({
        url: api.getMenu,
        method: 'get',
        headers: parameter
    })
}

export function generatorDynamicRouter(parameter) {
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
const localRouter = JSON.parse(localStorage.getItem('pro__GET_MENU'))

export function constructRouter(localRouter) {
    let lastasyncRouterMap = [{
        path: '/',
        name: 'index',
        component: BasicLayout,
        meta: {
            title: 'Home'
        },
        redirect: '/tapePublishSchedule/tapePublishSchedule_list',
        children: [],
    }];

    let hideChildrenInMenu;
    let firstPush;
    let pushList, pushAdd, pushEdit, pushDetail
    let flexibleReportId = {};

    if (localRouter) {
        // let newRouterMap = JSON.parse(localRouter.value).result;
        let newRouterMap = JSON.parse(localStorage.getItem('pro__GET_MENU')).value;
        console.log('newRouter', newRouterMap);
        for (let i = 0; i < newRouterMap.length; i++) {
            // 一级菜单
            const mainPage = newRouterMap[i].childMenuList[0].frontRouter;
            firstPush = {
                // path: `/${newRouterMap[i].childMenuList[0].frontRouter}`,
                path: `/${newRouterMap[i].menuId}`,
                redirect: `/${newRouterMap[i].childMenuList[0].frontRouter}`,
                hideChildrenInMenu: hideChildrenInMenu ? true : false,
                name: newRouterMap[i].name.replace(' ', ''),
                component: RouteView,
                meta: {
                    title: newRouterMap[i].name,
                    hideHeader: false,
                    keepAlive: true,
                    icon: 'profile',
                    permission: ['form'],
                    id: newRouterMap[i].menuId
                },
                children: []
            }
            //追加一级菜单
            lastasyncRouterMap[0].children.push(firstPush)
            for (let j = 0; j < newRouterMap[i].childMenuList.length; j++) {
                const firstName = newRouterMap[i].childMenuList[j].frontRouter.split('/')[0]
                const childName = newRouterMap[i].childMenuList[j].frontRouter.split('/')[1].split('_list')[0];
                if (newRouterMap[i].childMenuList[j].frontRouter.split('list/').length > 1) {
                    flexibleReportId[firstName] = newRouterMap[i].childMenuList[j].frontRouter.split('list/')[1];
                };
                pushList = {
                    //path: '/' + childName + '/' + childName + '_list',
                    path: '/' + newRouterMap[i].childMenuList[j].frontRouter.split('list')[0] + 'list',
                    name: firstName + '_list',
                    component: () => import(`@/views/${childName}/${childName}_list`),
                    meta: {
                        title: newRouterMap[i].childMenuList[j].name,
                        icon: newRouterMap[i].childMenuList[j].icon,
                        keepAlive: true,
                        permission: ['form'],
                        id: newRouterMap[i].childMenuList[j].menuId
                    },
                }
                pushAdd = {
                    //path: '/' + childName + '/' + childName + '_add',
                    path: '/' + newRouterMap[i].childMenuList[j].frontRouter.replace('_list', '_add'),
                    name: firstName + '_add',
                    hidden: true,
                    component: () => import(`@/views/${childName}/${childName}_add`),
                    meta: {
                        title: 'Add ' + newRouterMap[i].childMenuList[j].name,
                        keepAlive: true,
                        icon: newRouterMap[i].childMenuList[j].icon,
                        id: newRouterMap[i].childMenuList[j].menuId
                    },
                }
                pushDetail = {
                    //path: '/' + childName + '/' + childName + '_detail',
                    path: '/' + newRouterMap[i].childMenuList[j].frontRouter.replace('_list', '_detail'),
                    name: firstName + '_detail',
                    hidden: true,
                    component: () => import(`@/views/${childName}/${childName}_detail`),
                    meta: {
                        title: newRouterMap[i].childMenuList[j].name + ' Detail',
                        keepAlive: true,
                        icon: newRouterMap[i].childMenuList[j].icon,
                        id: newRouterMap[i].childMenuList[j].menuId
                    },
                }
                pushEdit = {
                    //path: '/' + childName + '/' + childName + '_edit',
                    path: '/' + newRouterMap[i].childMenuList[j].frontRouter.replace('_list', '_edit'),
                    name: firstName + '_edit',
                    hidden: true,
                    component: () => import(`@/views/${childName}/${childName}_edit`),
                    meta: {
                        title: 'Edit ' + newRouterMap[i].childMenuList[j].name,
                        keepAlive: true,
                        icon: newRouterMap[i].childMenuList[j].icon,
                        id: newRouterMap[i].childMenuList[j].menuId
                    },
                }
                lastasyncRouterMap[0].children[i].children.push(pushList);
                lastasyncRouterMap[0].children[i].children.push(pushEdit);
                lastasyncRouterMap[0].children[i].children.push(pushDetail);
                lastasyncRouterMap[0].children[i].children.push(pushAdd);
            }

        }
        //需要增加的增改查的隐藏页面
        let hiddenPage = {
            path: '/hiddenPage',
            name: '国家新建列表',
            redirect: '/tapePublishSchedule/tapePublishSchedule_list',
            component: RouteView,
            hidden: true,
            meta: { title: '', icon: 'slack' },
            children: [
                {
                    path: '/whereUsedModel/whereUsedModel_list',
                    name: 'whereUsed_modelList',//该name值不可更改
                    component: () => import('@/views/whereUsedModel/whereUsedModel_list'),
                    meta: { title: 'whereUsed model list', icon: 'table', keepAlive: false }
                }, {
                    path: '/upload/upload_list/:id/origin/:origin',
                    name: 'upload_list',//该name值不可更改
                    component: () => import('@/views/upload/upload_list'),
                    meta: { title: 'Upload list', icon: 'table', keepAlive: false }
                },
                {
                    path: '/upload/upload_detail',
                    name: 'upload_detail',//该name值不可更改
                    component: () => import('@/views/upload/upload_detail'),
                    meta: { title: 'Upload detail', icon: 'table', keepAlive: false }
                },
                {
                    path: '/pur/breakCommodity',
                    name: 'purBreakCommodity',//该name值不可更改
                    component: () => import('@/views/purBreakDownOri/commodity'),
                    meta: { title: 'Commodity Cost Elem Mapping', icon: 'table', keepAlive: false }
                },
                //writeBackFilter
                {
                    path: '/wbFilterIn/wbFilterIn_list',
                    name: 'wbFilterIn_list',//该name值不可更改
                    component: () => import('@/views/wbFilterIn/wbFilterIn_list'),
                    meta: { title: 'Write Back Filter Include Model', icon: 'table', keepAlive: false }
                },
                {
                    path: '/wbFilterEx/wbFilterEx_list',
                    name: 'wbFilterEx_list',//该name值不可更改
                    component: () => import('@/views/wbFilterEx/wbFilterEx_list'),
                    meta: { title: 'Write Back Filter Exclude Model', icon: 'table', keepAlive: false }
                },

                // taskQueue 页面新增 zdl
                {
                    path: '/taskQueue/instance_id',
                    name: 'taskInstance_id',
                    component: () => import('@/views/taskQueue/instance_id'),
                    meta: { title: 'Show All Node Of Selected Workflow', icon: 'table', keepAlive: false }
                },
                {
                    path: '/sBBComponentFilter/BasicNameList',
                    name: 'BasicNameList',
                    component: () => import('@/views/basicNameEdit/basicNameEdit_list'),
                    meta: { title: 'Basic Name Edit', icon: 'table', keepAlive: false }
                },
                {
                    path: '/basicNameEdit/basicNameEdit_add',
                    name: 'BasicNameAdd',
                    component: () => import('@/views/basicNameEdit/basicNameEdit_add'),
                    meta: { title: 'Basic Name Add', icon: 'table', keepAlive: false }
                },
                {
                    path: '/filteredSBBBOMStructure/basicNameMaintain_list',
                    name: 'basicNameMaintainList',
                    component: () => import('@/views/basicNameMaintain/basicNameMaintain_list'),
                    meta: { title: 'Basic Name Maintain List', icon: 'table', keepAlive: false }
                },
                {
                    path: '/basicNameMaintain/basicNameMaintain_add',
                    name: 'basicNameMaintainAdd',
                    component: () => import('@/views/basicNameMaintain/basicNameMaintain_add'),
                    meta: { title: 'Basic Name Maintain Add', icon: 'table', keepAlive: false }
                },
                {
                    path: '/netCostBom/netCostBom_detail',
                    name: 'netCostBomDetail',
                    component: () => import('@/views/netCostBom/netCostBom_detail'),
                    meta: { title: 'netCostBom Detail', icon: 'table', keepAlive: false }
                },
                {
                    path: '/netCostBom/netCostBom_modelList',
                    name: 'netCostBomModelList',
                    component: () => import('@/views/netCostBom/netCostBom_modelList'),
                    meta: { title: 'netCostBom Model List', icon: 'table', keepAlive: false }
                },
                {
                    path: '/costBom/costBom_modelList',
                    name: 'costBomModelList',
                    component: () => import('@/views/costBom/costBom_modelList'),
                    meta: { title: 'CostBom Model List', icon: 'table', keepAlive: false }
                },
                {
                    path: '/dailyStandardModel/dailyStandardModel_list',
                    name: 'dailyStandardModelList',
                    component: () => import('@/views/dailyStandardModel/dailyStandardModel_list'),
                    meta: { title: 'Daily Standard Model List', icon: 'table', keepAlive: false }
                },
                {
                    path: '/outboundFRTRate/outboundFRTRate_list',
                    name: 'outboundFRTRateList',
                    component: () => import('@/views/outboundFRTRate/outboundFRTRate_list'),
                    meta: { title: 'Rate Upload', icon: 'table', keepAlive: false }
                },
                {
                    path: '/outboundFRTMot/outboundFRTMot_list',
                    name: 'outboundFRTMotList',
                    component: () => import('@/views/outboundFRTMot/outboundFRTMot_list'),
                    meta: { title: 'MOT Upload', icon: 'table', keepAlive: false }
                },
                {
                    path: '/outboundFRTWeight/outboundFRTWeight_list',
                    name: 'outboundFRTWeightList',
                    component: () => import('@/views/outboundFRTWeight/outboundFRTWeight_list'),
                    meta: { title: 'Weight List', icon: 'table', keepAlive: false }
                },
                {
                    path: '/outboundFamilyWeight/outboundFamilyWeight_list',
                    name: 'outboundFamilyWeightList',
                    component: () => import('@/views/outboundFamilyWeight/outboundFamilyWeight_list'),
                    meta: { title: 'Family Weight List', icon: 'table', keepAlive: false }
                },
                {
                    path: '/outboundMTWeight/outboundMTWeight_list',
                    name: 'outboundMTWeightList',
                    component: () => import('@/views/outboundMTWeight/outboundMTWeight_list'),
                    meta: { title: 'Machine Type Weight List', icon: 'table', keepAlive: false }
                },
                {
                    path: '/outboundItem/outboundItem_list',
                    name: 'outboundItemList',
                    component: () => import('@/views/outboundItem/outboundItem_list'),
                    meta: { title: 'Model Weight', icon: 'table', keepAlive: false }
                },
                {
                    path: '/outboundItem/outboundItem_add',
                    name: 'outboundItemAdd',
                    component: () => import('@/views/outboundItem/outboundItem_add'),
                    meta: { title: 'Model Weight Add', icon: 'table', keepAlive: false }
                },
                {
                    path: '/outboundItem/outboundItem_edit',
                    name: 'outboundItemEdit',
                    component: () => import('@/views/outboundItem/outboundItem_edit'),
                    meta: { title: 'Model Weight Edit', icon: 'table', keepAlive: false }
                },
                {
                    path: '/gLDomesticFRTFee/gLDomesticFRTFee_list',
                    name: 'gLDomesticFRTFee',
                    component: () => import('@/views/gLDomesticFRTFee/gLDomesticFRTFee_list'),
                    meta: { title: 'Domestic Freight For GL Fee Upload', icon: 'table', keepAlive: false }
                },
                {
                    path: '/gLDomesticFRTRate/gLDomesticFRTRate_list',
                    name: 'gLDomesticFRTRate',
                    component: () => import('@/views/gLDomesticFRTRate/gLDomesticFRTRate_list'),
                    meta: { title: 'Domestic Freight For GL Rate Upload', icon: 'table', keepAlive: false }
                },
                // 页面新增 zdl

                //stdcostReport
                {
                    path: '/stdcostInModelList/stdcostInModelList_list',
                    name: 'stdcostInModelList_list',//该name值不可更改
                    component: () => import('@/views/stdcostInModelList/stdcostInModelList_list'),
                    meta: { title: 'Standard Cost Report Include Model', icon: 'table', keepAlive: false }
                },
                {
                    path: '/stdcostExModelList/stdcostExModelList_list',
                    name: 'stdcostExModelList_list',//该name值不可更改
                    component: () => import('@/views/stdcostExModelList/stdcostExModelList_list'),
                    meta: { title: 'Standard Cost Report Exclude Model', icon: 'table', keepAlive: false }
                },
                {
                    path: '/sysUIMessage/sysUIMessage_list',
                    name: 'sysUIMessage_list',//该name值不可更改
                    component: () => import('@/views/sysUIMessage/sysUIMessage_list'),
                    meta: { title: 'Message Center', icon: 'table', keepAlive: false }
                },
                {
                    path: '/ctoCostBom/ctoCostBom_costTape', // CtoCostBom
                    name: 'ctoCostBomCostTape',
                    component: () => import('@/views/ctoCostBom/ctoCostBom_costTape'),
                    meta: { title: 'ctoCostBom Cost Tape', icon: 'table', keepAlive: false }
                },
                {
                    path: '/netCtoCostBom/netCtoCostBom_costTape', // CtoCostBom
                    name: 'netCtoCostBomCostTape',
                    component: () => import('@/views/netCtoCostBom/netCtoCostBom_costTape'),
                    meta: { title: 'net ctoCostBom Cost Tape', icon: 'table', keepAlive: false }
                },
                {
                    path: '/l1CostBom/l1CostBom_modelList',
                    name: 'l1CostBomModelList',
                    component: () => import('@/views/l1CostBom/l1CostBom_modelList'),
                    meta: { title: 'L1 CostBom Model List', icon: 'table', keepAlive: false }
                },
            ]
        }

        lastasyncRouterMap[0].children.push(hiddenPage)
        localStorage.setItem('flexibleReportId', JSON.stringify(flexibleReportId));
    }
    return lastasyncRouterMap;
}

console.log(constructRouter(localRouter));
export const asyncRouterMap = constructRouter(localRouter)

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
                component: () => import('@/views/user/Login')
            }
        ]
    }]
