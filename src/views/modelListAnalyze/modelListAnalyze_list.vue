<template>
    <a-card :bordered="false" class="content">
        <div class="table-page-search-wrapper">
            <a-form layout="inline" :form="form">
                <a-row :gutter="48">
                    <a-col :md="8" :sm="24" v-for="item in filterList.slice(0,2)" :key="item.index">
                        <a-form-item :label="item.label">
                            <a-input
                                    :placeholder="item.placeHolder"
                                    v-if="item.inputType=='input'"
                                    :disabled="item.editDisabled"
                                    v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"/>
                        </a-form-item>
                    </a-col>
                    <template v-if="advanced">
                        <a-col :md="8" :sm="24" v-for="item in filterList.slice(2)" :key="item.index">
                            <a-form-item :label="item.label">
                                <a-input
                                        :placeholder="item.placeHolder"
                                        v-if="item.inputType=='input'"
                                        :disabled="item.editDisabled"
                                        v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"/>
                            </a-form-item>
                        </a-col>
                    </template>
                    <a-col :md="!advanced && 8 || 24" :sm="24">
                        <span class="table-page-search-submitButtons"
                              :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                            <a-button type="primary" :loading="searchLoading" @click="searchOnClick">
                                Check Model List
                            </a-button>
                            <a-button style="margin-left: 8px" icon="undo" @click="resetSearchForm">
                                {{ $t('lang.tabComResetButtonName') }}
                            </a-button>
                            <a @click="toggleAdvanced" style="margin-left: 8px">
                                {{ advanced ? $t('lang.tabComToggleCloseName') : $t('lang.tabComToggleShowName') }}
                                <a-icon :type="advanced ? 'up' : 'down'"/>
                            </a>
                        </span>
                    </a-col>
                </a-row>
            </a-form>
        </div>

        <tableBtns
                :currentPageManipulationAuth="currentPageManipulationAuth"
                :queryParamemter="queryParam"
                exportId="UPLOAD_MODEL_LIST_ANALYZE"
        ></tableBtns>
        <a-alert type="info" showIcon style="margin-bottom: 16px">
            <template slot="message">
                <span style="margin-right: 12px">
                Search Results (
                 total <a style="font-weight: 600">{{this.dataSource.length}}</a> rows)
                </span>
            </template>
        </a-alert>

        <a-table
                :columns="columns"
                :dataSource="dataSource"
                :loading="loading"
                :scroll="scrollSize"
                size="small"
                :rowKey="(record) => record.rid"
                :pagination="false"
                @change="handleTableChange">
        </a-table>

        <a-alert type="info" showIcon style="margin: 30px 0 16px 0">
            <template slot="message">
                <span style="margin-right: 12px">
                Search Results (
                 total <a style="font-weight: 600">{{this.dataSource1.length}}</a> rows)
                </span>
            </template>
        </a-alert>

        <a-table
                :columns="columns1"
                :dataSource="dataSource1"
                :loading="loading"
                :scroll="scrollSize1"
                size="small"
                :rowKey="(record) => record.rid"
                :pagination="false"
                @change="handleTableChange">
        </a-table>
    </a-card>
</template>

<script>
    import moment from 'moment'
    import {getXScrollSize} from "@api/publicFunc_api";
    import {STable, tableBtns} from '@/components'
    import {del, getDropDownList, list} from '@api/modelListAnalyze_api'
    import langZh from '../../locales/zh-CN/modelListAnalyze_lang.js'
    import langEn from '../../locales/en-US/modelListAnalyze_lang.js'

    export default {
        name: 'TableList',
        components: {
            STable,
            tableBtns
        },
        data() {
            return {
                brandDataList: [],
                scrollSize: {y:false},
                scrollSize1: {y:false},
                filterList: langEn.filter_langEn,
                form: this.$form.createForm(this),
                currentPageManipulationAuth: ["ViewEnforced","ExportEnforced"],
                searchLoading: false,
                loading: false, // 页面是否加载中
                advanced: false, // 高级搜索 展开/关闭
                queryParam: {
                    uiName:"modelListAnalyze",
                    uiAction:"checkModelList"
                }, // 查询参数
                optionAlertShow: true, // 是否显示选择框
                selectedRowKeys: [], // 选中的行的keys数组
                selectedRows: [], // 选中的行的全部数组
                // 表头
                columns: [],
                columns1: [],
                dataSource: [],
                dataSource1: [],
                pagination: {
                    showSizeChanger: true,
                    // current: 1,
                    // total: 0,
                    // pageSize: 10,
                    pageSizeOptions: ["10", "50", "100", "150"],
                    onShowSizeChange: this.showSizeChange,
                    // onChange: this.changePage
                }
            }
        },
        computed: {
            language() {
                return this.$store.getters.language
            }
        },
        created() {
            this.changeLanguage()
            this.scrollSize.x = getXScrollSize(this.columns,0);
            this.scrollSize1.x = getXScrollSize(this.columns1,0);
        },
        watch: {
            language() {
                this.changeLanguage()
            },
            // $route: {
            //     handler(route) {
            //         if (route.path === '/modelListAnalyze/modelListAnalyze_list') {
            //             this.resetSearchForm()
            //             this.handleOk()
            //         }
            //     },
            //     deep: true
            // }
        },
        methods: {
            getPopupContainer(trigger) {
                return trigger.parentElement;
            },
            searchOnClick() {
                this.queryParam.requestId = new moment().format("YYYYMMDDHHmmss")
                this.form.validateFields((err, values) => {
                    console.log("values", values);
                    if (!err) {
                        for (let key in values) this.queryParam[key] = values[key]
                        this.getListFun({});
                    } else {
                        this.$notification.open({
                            message: "Check condition error:",
                            description: "Please choose 'model' before proceeding",
                            duration: 6,
                            style: {background: "#F5222D"}
                        });
                    }
                });
            },
            showSizeChange(current, pageSize) {
                this.queryParam.pageSize = pageSize;
                this.pagination.pageSize = pageSize;
                console.log(current, pageSize, "current, pageSize");
                this.getListFun({});
            },
            handleTableChange(pagination, filters, sorter) {
                const pager = { ...this.pagination };
                pager.current = pagination.current;
                this.pagination = pager;
                this.getListFun({
                    pageSize: pagination.pageSize,
                    pageNum: pagination.current,
                    sortField: sorter.field,
                    sortOrder: sorter.order === "descend" ? "desc" : "",
                    ...filters
                });
            },
            getListFun(params) {
                let self = this;
                let parameter = {
                    pageNum: params.pageNum || this.pagination.current || 1,
                    pageSize: params.pageSize || this.pagination.pageSize || 10
                };
                self.searchLoading = true;
                params.sortField ? parameter.sortField = params.sortField: '';
                params.sortOrder?parameter.sortOrder = params.sortOrder:'';
                list(Object.assign(parameter, self.queryParam)).then(res => {
                    const pagination = {...self.pagination}
                    pagination.total = 10;
                    pagination.pageSize = 100;
                    pagination.current = 1;
                    if(res.code === '0'){
                        self.searchLoading = false;
                        self.dataSource = res.result.part1;
                        self.dataSource1 = res.result.part2;
                        if (self.dataSource1.length > 10) {
                            self.scrollSize1.y = 450;
                        } else {
                            self.scrollSize1.y = false;
                        }
                        self.pagination = pagination
                    } else {
                        self.searchLoading = false;
                        self.$notification.open({
                            message: "Error",
                            description: res.msg,
                            duration: 6,
                            style: {background: "#F5222D"}
                        });
                    }

                });
            },
            // 选择列表
            onSelectChange(selectedRowKeys, selectedRows) {
                this.selectedRowKeys = selectedRowKeys
                // this.selectedRows = selectedRows
            },
            // 更改列表数组
            changeLanguage() {
                if (this.language == 'zh-CN') {
                    this.columns = langZh.tableTitle_langZh
                } else if (this.language == 'en-US') {
                    this.columns = langEn.tableTitle_langEn
                    this.columns1 = langEn.tableTitle_langEn1
                }
            },
            // 刷新列表
            handleOk() {
                this.getListFun({});
            },
            // 收起展开
            toggleAdvanced() {
                this.advanced = !this.advanced
            },
            // 重置
            resetSearchForm() {
                this.form.resetFields()
                this.queryParam = {
                    model: '',
                    plant: '',
                    country: ''
                }
            }
            // 开启、关闭选择框
            // tableOption () {
            //   if (!this.optionAlertShow) {
            //     this.options = {
            //       alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
            //       rowSelection: {
            //         selectedRowKeys: this.selectedRowKeys,
            //         onChange: this.onSelectChange
            //       }
            //     }
            //     this.optionAlertShow = true
            //   } else {
            //     this.options = {
            //       alert: false,
            //       rowSelection: null
            //     }
            //     this.optionAlertShow = false
            //   }
            // }

        }

    }
</script>
