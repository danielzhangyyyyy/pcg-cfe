import {axios} from '@/utils/request'

const api = {
    list: 'user/getRoleList',
    show: 'user/getRoleList',
    add: 'user/addRole',
    menuList: 'menu/list',
    update: 'user/updateUserRole',
    delete: 'user/deleteRole',

}

export default api

export function menuList(parameter) {
    return axios({
        url: api.menuList,
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
        data: parameter
    })
}

export function update (parameter) {
    return axios({
        url: api.update,
        method: 'put',
        data: parameter
    })
}

export function del (parameter) {
    return axios({
        url: api.delete,
        method: 'delete',
        params: parameter
    })
}

