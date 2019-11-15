import {axios} from '@/utils/request'

const api = {
    list: 'user/listAccount',
    show: 'user/getAccount',
    getUser: 'user/getUser',
    add: 'user/addAccount',
    update: 'user/updateAccount',
    delete: 'user/deleteAccount',
    getUserGroup: '/user/getUserGroup',
    lockAccount: 'user/lockAccount',
    unlockAccount: 'user/unlockAccount',
    getUserType:'user/getUserType',
    getUserGroupNoPage:'user/getUserGroupNoPage'
}

export default api

export function getUserGroupNoPage(parameter) {
    return axios({
        url: api.getUserGroupNoPage,
        method: 'get',
        params: parameter
    })
}


export function getUserType(parameter) {
    return axios({
        url: api.getUserType,
        method: 'get',
        params: parameter
    })
}

export function unlockAccount (parameter) {
    return axios({
        url: api.unlockAccount,
        method: 'post',
        data: parameter
    })
}

export function lockAccount (parameter) {
    return axios({
        url: api.lockAccount,
        method: 'post',
        data: parameter
    })
}

export function getUser (parameter) {
    return axios({
        url: api.getUser,
        method: 'get',
        params: parameter
    })
}

export function getUserGroup(parameter) {
    return axios({
        url: api.getUserGroup,
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


export function show (parameter) {
    return axios({
        url: api.show,
        method: 'get',
        params: parameter
    })
}

export function add (parameter) {
    return axios({
        url: api.add,
        method: 'post',
        params: parameter
    })
}

export function update (parameter) {
    return axios({
        url: api.update,
        method: 'put',
        params: parameter
    })
}

export function del (parameter) {
    return axios({
        url: api.delete,
        method: 'delete',
        data: parameter
    })
}

