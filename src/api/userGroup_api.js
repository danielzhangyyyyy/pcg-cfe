import {axios} from '@/utils/request'

const api = {
    list: 'user/getUserGroup',
    show: 'user/getUserGroup',

    getUser: 'user/getUser',

    add: 'user/addGroup',
    update: 'user/updateUserGroup',
    delete: 'user/deleteGroup',
    getUserGroup: '/user/getUserGroup',
    getRoleList:'/user/listAllRoles',
    getRoleByGroup:'user/getRoleByGroup',
    commonList: 'common/getCommonList',
}

export default api

export function getDropDownList (parameter) {
    return axios({
        url: api.commonList,
        method: 'post',
        data: parameter
    })
}

export function getRoleByGroup(parameter) {
    return axios({
        url: api.getRoleByGroup,
        method: 'get',
        params: parameter
    })
}

export function getRoleList(parameter) {
    return axios({
        url: api.getRoleList,
        method: 'get',
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
        params: parameter
    })
}

