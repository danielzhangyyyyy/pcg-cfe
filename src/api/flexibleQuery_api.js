import { axios, CancelToken } from '@/utils/request'


const api = {
  getCategory: 'flexibleQuery/getCategoryList',
  getReport: 'flexibleQuery/getReportList',
  getFilter: 'flexibleQuery/getReportFilter',
  getData: 'flexibleQuery/search',
  commonList: 'common/getCommonList',
  execute: 'flexibleQuery/execute'
}

export default api

export function cancelFns() {
  let cancelgetReportFilter;
}

export function executeApi(url = 'flexibleQuery/execute', parameter) {
  return axios({
    url: url,
    method: 'post',
    data: parameter
  })
}

export function getCommonList(parameter) {
  return axios({
    url: api.commonList,
    method: 'post',
    data: parameter
  })
}


export function getCategoryList(parameter) {
  return axios({
    url: api.getCategory,
    method: 'get',
    params: parameter
  })
}

export function getReportList(parameter) {
  return axios({
    url: api.getReport,
    method: 'get',
    params: parameter
  })
}

export function getReportFilter(parameter) {
  return axios({
    url: api.getFilter,
    method: 'post',
    data: parameter,
    cancelToken: new CancelToken(function (c) {
      cancelFns.cancelgetReportFilter = c;
    })
  })
}

export function getReportData(parameter) {
  return axios({
    url: api.getData,
    method: 'post',
    data: parameter
  })
}

