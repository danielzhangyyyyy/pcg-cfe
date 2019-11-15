import { axios } from '@/utils/request'

const api = {
    show: 'sysUIMessage/showNews',
    update: 'sysUIMessage/issueNews',
    hide: 'sysUIMessage/hideNews'
}

export default api

export function getNews(parameter) {
    return axios({
        url: api.show,
        method: 'get',
        params: parameter
    })
}

export function updateNews(parameter) {
    return axios({
        url: api.update,
        method: 'post',
        data: parameter
    })
}

export function hidenNews(parameter) {
    return axios({
        url: api.hide,
        method: 'put',
        data: parameter
    })
}
