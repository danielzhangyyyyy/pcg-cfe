import {axios} from '@/utils/request'

const api = {
    list: 'user/listUser',
    getUserType:'user/getUserType',
    show: 'user/getUser',
    add: 'user/addUser',
    update: 'user/updateUser',
    delete: 'user/deleteUser',
    changePassword: '/user/changePassword'
}

export default api

export function changePassword(parameter) {
    return axios({
        url: api.changePassword,
        method: 'post',
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

export function getUserType(parameter) {
    return axios({
        url: api.getUserType,
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

