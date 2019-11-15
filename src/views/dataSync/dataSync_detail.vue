<template>
    <div>
        <a-card :bordered="false" class="content">
            <a-row style="margin-bottom: 20px">
                <a-button type="primary" @click="allResend">Batch Resend</a-button>
            </a-row>

            <a-table
                    ref="table"
                    :columns="columns"
                    :loading="loading"
                    :scroll="scrollSize"
                    :pagination="pagination"
                    :rowKey="(record) => `${record.rid}`"
                    size="small"
                    @change="handleTableChange"
                    :dataSource="loadData">
                <template slot="operation" slot-scope="text, record">
                    <a v-if="record.status === 'failure'" href="javascript:;" @click="resendSelectOne(record)">Resend&nbsp;&nbsp;</a>
                </template>
            </a-table>
        </a-card>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {detail, resend, batchResend} from "@api/dataSync_api";
    import {getXScrollSize} from "@api/publicFunc_api";
    import langZh from "../../locales/zh-CN/dataSync_lang.js";
    import langEn from "../../locales/en-US/dataSync_lang.js";


    export default {
        name: "dataSync_detail",
        data() {
            return {
                searchLoading: false,
                loading: false, // 页面是否加载中
                // 表头
                columns: [],
                loadData: [],
                scrollSize: {},
                pagination: {
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "50", "100", "150"],
                    onShowSizeChange: this.showSizeChange,
                    showTotal: total =>
                        total < 2000
                            ? total == 1
                            ? `total ${total} row`
                            : `total ${total} rows`
                            : this.$t("lang.messageFor2000Records"),
                },
            }
        },
        computed: {
            language() {
                return this.$store.getters.language;
            }
        },
        created() {
            this.changeLanguage();
            this.scrollSize.x = getXScrollSize(this.columns, langEn.deltaSize);
            this.editSelectKey = Vue.ls.get('dataSync_detailSelectKey')
            this.getListFun(this.editSelectKey);
        },
        watch: {
            language(val) {
                this.changeLanguage();
            },
            $route: {
                handler(route) {
                    if (route.name === 'dataSync_detail') {
                        this.editSelectKey = Vue.ls.get('dataSync_detailSelectKey')
                        this.getListFun(this.editSelectKey)
                    }
                },
                deep: true
            }
        },
        methods: {
            allResend() {
                let rid, that = this;
                for (let item of this.loadData) {
                    item.status == 'failure' ? rid = item.rid : ''
                }
                this.$store.dispatch("SaveBaseUrl", '/pcg/svc');
                batchResend(Object.assign({}, {rid: rid})).then(res => {
                    if (res.code == 0) {
                        that.editSelectKey = Vue.ls.get('dataSync_detailSelectKey')
                        that.getListFun(this.editSelectKey)
                        that.$notification.open({
                            message: "Success",
                            description: res.msg,
                            duration: 6,
                            style: {background: "#52C41A"}
                        });
                    } else {
                        that.$notification.open({
                            message: "Error",
                            description: res.msg,
                            duration: 6,
                            style: {'background': '#F5222D'}
                        });
                    }
                    this.$store.dispatch("SaveBaseUrl", '/pcg/api');
                })
            },
            resendSelectOne(obj) {
                this.$store.dispatch("SaveBaseUrl", '/pcg/svc');
                let params = {rid: obj.rid}, that = this
                resend(Object.assign({}, params)).then(res => {
                    that.searchLoading = false;
                    if (res.code == 0) {
                        that.editSelectKey = Vue.ls.get('dataSync_detailSelectKey')
                        that.getListFun(this.editSelectKey)
                        that.$notification.open({
                            message: "Success",
                            description: res.msg,
                            duration: 6,
                            style: {background: "#52C41A"}
                        });
                    } else {
                        that.$notification.open({
                            message: "Error",
                            description: res.msg,
                            duration: 6,
                            style: {'background': '#F5222D'}
                        });
                    }
                    this.$store.dispatch("SaveBaseUrl", '/pcg/api');
                })
            },
            showSizeChange(current, pageSize) {
                // this.queryParam.pageSize = pageSize;
                this.pagination.pageSize = pageSize;
                const params = Vue.ls.get('dataSync_detailSelectKey')
                const data = {
                    syncTimestamp: params.syncTimestamp,
                    tableName: params.tableName,
                    productGroup: params.productGroup,
                    pageSize: pageSize
                }
                console.log(current, pageSize, "current, pageSize");
                this.getListFun(data);
            },
            handleTableChange(pagination, filters, sorter) {
                const pager = {...this.pagination};
                const params = Vue.ls.get('dataSync_detailSelectKey')
                const data = {
                    syncTimestamp: params.syncTimestamp,
                    tableName: params.tableName,
                    productGroup: params.productGroup
                }
                pager.current = pagination.current;
                this.pagination = pager;
                this.getListFun({
                    pageSize: pagination.pageSize,
                    pageNum: pagination.current,
                    sortField: sorter.field,
                    sortOrder: sorter.order === "descend" ? "desc" : "",
                    ...filters,
                    ...data
                });
            },
            getListFun(params) {
                let self = this
                let parameter = {
                    pageNum: params.pageNum || this.pagination.current || 1,
                    pageSize: params.pageSize || this.pagination.pageSize || 10
                };
                params.sortField ? parameter.sortField = params.sortField : '';
                params.sortOrder ? parameter.sortOrder = params.sortOrder : '';
                let data = {
                    syncTimestamp: params.syncTimestamp,
                    tableName: params.tableName,
                    productGroup: params.productGroup
                }
                self.searchLoading = true;
                detail(Object.assign(parameter, data)).then(res => {
                    const pagination = {...self.pagination}
                    self.searchLoading = false;
                    if (res.code === '0') {
                        pagination.total = res.result.total;
                        pagination.pageSize = res.result.pageSize;
                        pagination.current = res.result.pageNum;
                        self.searchLoading = false;
                        self.loadData = res.result.list
                        self.pagination = pagination
                    } else {
                        self.$notification.open({
                            message: "Error",
                            description: res.msg,
                            duration: 6,
                            style: {background: "#F5222D"}
                        });
                    }
                })
            },
            // 更改列表数组
            changeLanguage() {
                if (this.language == "zh-CN") {
                    this.columns = langZh.detailTitle_langEn;
                } else if (this.language == "en-US") {
                    this.columns = langEn.detailTitle_langEn;
                }
            },
        }
    }
</script>

<style scoped>

</style>
