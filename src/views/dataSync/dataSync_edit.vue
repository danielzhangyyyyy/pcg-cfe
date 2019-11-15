<template>
    <div>
        <a-card :bordered="false" class="content">
            <a-table
                    ref="table"
                    :columns="columns"
                    :loading="loading"
                    :scroll="scrollSize"
                    :pagination="pagination"
                    @change="handleTableChange"
                    :rowKey="(record) => `${record.rid}`"
                    size="small"
                    :dataSource="loadData">
                <template slot="operation" slot-scope="text, record">
                    <a href="javascript:;" @click="detailSelectOne(record)">Detail&nbsp;&nbsp;</a>
                </template>
            </a-table>
        </a-card>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {detail, list} from "@api/dataSync_api";
    import {getXScrollSize} from "@api/publicFunc_api";
    import langZh from "../../locales/zh-CN/dataSync_lang.js";
    import langEn from "../../locales/en-US/dataSync_lang.js";


    export default {
        name: "dataSync_edit",
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
            this.editSelectKey = Vue.ls.get('dataSync_editSelectKey')
            this.getListFun(this.editSelectKey);
        },
        watch: {
            language(val) {
                this.changeLanguage();
            },
            $route: {
                handler(route) {
                    if (route.name === 'dataSync_edit') {
                        this.editSelectKey = Vue.ls.get('dataSync_editSelectKey')
                        this.getListFun(this.editSelectKey)
                    }
                },
                deep: true
            }
        },
        methods: {
            detailSelectOne(obj) {
                Vue.ls.set('dataSync_detailSelectKey', obj)
                this.$router.replace(`/dataSync/dataSync_detail`)
            },
            showSizeChange(current, pageSize) {
                // this.queryParam.pageSize = pageSize;
                this.pagination.pageSize = pageSize;
                const params = Vue.ls.get('dataSync_editSelectKey')
                const data = {
                    productGroup: params.productGroup,
                    tableName: params.tableName
                }
                console.log(current, pageSize, "current, pageSize");
                this.getListFun(data);
            },
            handleTableChange(pagination, filters, sorter) {
                const pager = {...this.pagination};
                const params = Vue.ls.get('dataSync_editSelectKey')
                const data = {
                    productGroup: params.productGroup,
                    tableName: params.tableName
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
                const obj = {
                    productGroup: params.productGroup,
                    tableName: params.tableName
                }
                self.searchLoading = true;
                list(Object.assign(parameter, obj)).then(res => {
                    const pagination = {...self.pagination}
                    if(res.code == '0'){
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
                    // self.loadData.length > 5 ? (self.scrollSize.y = 450) : (self.scrollSize.y = false);
                })
            },
            // 更改列表数组
            changeLanguage() {
                if (this.language == "zh-CN") {
                    this.columns = langZh.tableTitle_langEn;
                } else if (this.language == "en-US") {
                    this.columns = langEn.tableTitle_langEn;
                }
            },
        }
    }
</script>

<style scoped>

</style>
