import {axios} from '@/utils/request'

const api = {
    list: 'unitCostRpt/list',
    show: 'unitCostRpt/show',
    add: 'unitCostRpt/add',
    update: 'unitCostRpt/update',
    delete: 'unitCostRpt/delete',
    commonList: 'common/getCommonList',
    executeReportWorkflow: 'workflow/executeReportWorkflow',
    batchExport: 'unitCostRpt/batchExport'
}

export default api
export function batchExport(parameter) {
    return axios({
        url: api.batchExport,
        method: 'get',
        params: parameter
    })
}

export function executeReportWorkflow(parameter){
    return axios({
        url: api.executeReportWorkflow,
        method: 'post',
        data: parameter
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
