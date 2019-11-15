import {axios} from '@/utils/request'

const api = {
    list: 'kafka/getLog',
    detail: 'kafka/getLogDetail',
    resend: 'kafkaResend',
    batchResend: 'kafkaBatchResend',
    getConfigInfo: 'kafka/getConfigInfo'
}

export default api

export function getConfigInfo(parameter) {
    return axios({
        url: api.getConfigInfo,
        method: 'get',
        params: parameter
    })
}

export function batchResend(parameter) {
    return axios({
        url: api.batchResend,
        method: 'get',
        params: parameter
    })
}

export function resend(parameter) {
    return axios({
        url: api.resend,
        method: 'get',
        params: parameter
    })
}

export function list(parameter) {
    return axios({
        url: api.list,
        method: 'get',
        params: parameter
    })
}

export function detail(parameter) {
    return axios({
        url: api.detail,
        method: 'get',
        params: parameter
    })
}
