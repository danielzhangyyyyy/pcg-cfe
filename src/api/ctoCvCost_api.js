import {axios} from '@/utils/request'

const api = {
    list: 'ctoCvCost/list',
    show: 'ctoCvCost/show',
    add: 'ctoCvCost/add',
    update: 'ctoCvCost/update',
    delete: 'ctoCvCost/delete',
    commonList: 'common/getCommonList',
    findDetail: 'ctoCvCost/findDetail',

    brandList: 'modelList/getBrandList',
    brandListByAssembly: 'modelList/getBrandByItem',
    prdFamilyListByBrand: 'modelList/getFamilyByBrand',
    prdFamilyListByAssembly: 'modelList/getFamilyByItem',
    getItemByBrandFamily: 'modelList/getItemByBrandFamily',
    plantList: 'modelList/getPlantByItem',
    countryList: 'modelList/getCountryByItem',
    getDescription: 'itemEOL/show',
    executeReportWorkflow: 'common/commonExecute'
}

export default api

export function findDetail(parameter) {
    return axios({
        url: api.findDetail,
        method: 'get',
        params: parameter
    })
}

export function executeReportWorkflow(parameter) {
    return axios({
        url: api.executeReportWorkflow,
        method: 'post',
        data: parameter
    })
}

export function getDescription(parameter) {
    return axios({
        url: api.getDescription,
        method: 'get',
        params: parameter
    })
}

export function getBrandByAssembly(parameter) {
    return axios({
        url: api.brandListByAssembly,
        method: 'get',
        params: parameter
    })
}

export function getBrand(parameter) {
    return axios({
        url: api.brandList,
        method: 'get',
        params: parameter
    })
}

export function getPrdFamilyByAssembly(parameter) {
    return axios({
        url: api.prdFamilyListByAssembly,
        method: 'get',
        params: parameter
    })
}

export function getPrdFamilyByBrand(parameter) {
    return axios({
        url: api.prdFamilyListByBrand,
        method: 'get',
        params: parameter
    })
}

export function getItemByBrandFamily(parameter) {
    return axios({
        url: api.getItemByBrandFamily,
        method: 'get',
        params: parameter
    })
}

export function getPlantListByAssembly(parameter) {
    return axios({
        url: api.plantList,
        method: 'get',
        params: parameter
    })
}

export function getCountryListByPlant(parameter) {
    return axios({
        url: api.countryList,
        method: 'get',
        params: parameter
    })
}

export function getDropDownList(parameter) {
    return axios({
        url: api.commonList,
        method: 'post',
        data: parameter
    })
}

export function list(parameter) {
    return axios({
        url: api.list,
        method: 'get',
        params: parameter
    })
}

export function show(parameter) {
    return axios({
        url: api.show,
        method: 'get',
        params: parameter
    })
}

export function add(parameter) {
    return axios({
        url: api.add,
        method: 'post',
        params: parameter
    })
}

export function update(parameter) {
    return axios({
        url: api.update,
        method: 'put',
        params: parameter
    })
}

export function del(parameter) {
    return axios({
        url: api.delete,
        method: 'delete',
        data: parameter
    })
}
