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
                                    v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                            />
                        </a-form-item>
                    </a-col>

                    <a-col :md="!advanced && 8 || 24" :sm="24">
                        <span class="table-page-search-submitButtons"
                              :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                          <a-button
                                  type="primary"
                                  icon="search"
                                  :loading="searchLoading"
                                  @click="searchOnClick"
                          >{{ $t('lang.tabComSearchButtonName') }}</a-button>
                          <a-button
                                  style="margin-left: 8px"
                                  icon="undo"
                                  @click="resetSearchForm"
                          >{{ $t('lang.tabComResetButtonName') }}</a-button>
                        </span>
                    </a-col>
                </a-row>
            </a-form>
        </div>

        <tableBtns
                :currentPageManipulationAuth="currentPageManipulationAuth"
                :queryParamemter="queryParam"
                exportId="UPLOAD_MODEL_LIST"
        ></tableBtns>

        <s-table
                ref="table"
                :columns="columns"
                :loading="loading"
                :scroll="scrollSize"
                size="small"
                :rowKey="(record) => record.rid"
                :data="loadData"
                :alert="options.alert"
                :rowSelection="options.rowSelection">
        </s-table>
    </a-card>
</template>

<script>
    import {STable, tableBtns} from '@/components'
    import {getXScrollSize} from "@api/publicFunc_api";
    import {del, getDropDownList, list} from '@api/modelList_api'
    import langZh from '../../locales/zh-CN/modelList_lang.js'
    import langEn from '../../locales/en-US/modelList_lang.js'

    export default {
        name: 'TableList',
        components: {
            STable,
            tableBtns
        },
        data() {
            return {
                brandDataList: [],
                filterList: langEn.filter_langEn,
                form: this.$form.createForm(this),
                currentPageManipulationAuth: ["View","Export"],
                searchLoading: false,
                scrollSize: {y:false},
                loading: false, // 页面是否加载中
                advanced: false, // 高级搜索 展开/关闭
                queryParam: {}, // 查询参数
                optionAlertShow: true, // 是否显示选择框
                selectedRowKeys: [], // 选中的行的keys数组
                selectedRows: [], // 选中的行的全部数组
                // 表头
                columns: [],
                loadData: '',
                options: {
                    alert: {
                        show: true, clear: () => {
                            this.selectedRowKeys = []
                        }
                    },
                    rowSelection: {
                        selectedRowKeys: this.selectedRowKeys,
                        onChange: this.onSelectChange
                    },
                    customRow: {
                        click: this.aaaa
                    }
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
            this.getListFun()
            this.scrollSize.x = getXScrollSize(this.columns,langEn.deltaSize);
        },
        watch: {
            language(val) {
                this.changeLanguage()
            },
            $route: {
                handler(route) {
                    if (route.path === '/modelList/modelList_list') {
                        this.resetSearchForm();
                        this.handleOk()
                    }
                },
                deep: true
            }
        },
        methods: {
            searchOnClick() {
                this.form.validateFields((err, values) => {
                    console.log("values", values);
                    if (!err) {
                        this.queryParam.item = values.item;
                        this.$refs.table.refresh(true);
                    } else {
                        this.$notification.open({
                            message: "Search condition error:",
                            description: "Please choose 'item' before proceeding",
                            duration: 6,
                            style: {background: "#F5222D"}
                        });
                    }
                });
            },
            getListFun() {
                const that = this
                that.loadData = parameter => {
                    if(this.queryParam.item){
                        that.searchLoading = true;
                        return list(Object.assign(parameter, that.queryParam)).then(res => {
                            that.searchLoading = false;
                            that.$refs.table.clearSelected();
                            return res.result
                        })
                    } else {
                        return new Promise((resolve, reject) => {
                            resolve({
                                result: {
                                    list: [],
                                    total:0,
                                    pageSize: 1,
                                    pageNum: 1
                                }
                            })
                        }).then(res=>{
                            that.searchLoading = false;
                            return res.result
                        })
                    }
                }
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
                }
            },
            // 刷新列表
            handleOk() {
                this.$refs.table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页，true刷新到第一页
            },

            // 收起展开
            toggleAdvanced() {
                this.advanced = !this.advanced
            },
            // 重置
            resetSearchForm() {
                this.form.resetFields()
                this.queryParam = {
                    item: ''
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
