<template>
    <a-card :bordered="false" class="content">
        <tableBtns
                :currentPageManipulationAuth="currentPageManipulationAuth"
                :queryParamemter="queryParam"
                uploadId="UPLOAD_STDCOST_NEW_MODEL"
        >
            <a-button type="primary" icon="delete" @click="deleteSeclect">Delete</a-button>
            <a-button type="primary" icon="delete" @click="deleteSeclectAlls">DeleteAll</a-button>
            <a-button type="primary" icon="search" :loading="searchLoading" @click="searchOnClick">
                {{ $t('lang.tabComSearchButtonName') }}
            </a-button>
            <a-button type="primary" icon="rollback" @click="eventPush">Return</a-button>
        </tableBtns>

        <s-table
                ref="table"
                :columns="columns"
                :loading="loading"
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
    import {del, deleteAll, getDropDownList, list} from '@api/dailyStandardModel_api'
    import {getXScrollSize} from "@api/publicFunc_api";
    import langZh from '../../locales/zh-CN/dailyStandardModel_lang.js'
    import langEn from '../../locales/en-US/dailyStandardModel_lang.js'

    export default {
        name: 'TableList',
        components: {
            STable,
            tableBtns
        },
        data() {
            return {
                form: this.$form.createForm(this),
                currentPageManipulationAuth: ["Delete", "ViewEnforced", "UploadEnforced"],
                searchLoading: false,
                tableList: [],
                loading: false, // 页面是否加载中
                queryParam: {
                    noData: '1'
                }, // 查询参数
                optionAlertShow: true, // 是否显示选择框
                selectedRowKeys: [], // 选中的行的keys数组
                selectedRows: [], // 选中的行的全部数组
                // 表头
                columns: [],
                loadData: '',
                scrollSize: {},
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
            this.scrollSize.x = getXScrollSize(this.columns, langEn.deltaSize);
            this.getListFun()
        },
        watch: {
            language(val) {
                this.changeLanguage()
            },
            $route: {
                handler(route) {
                    console.log(route.path)
                    if (route.path === '/dailyStandardModel/dailyStandardModel_list') {
                        this.queryParam.noData = '1'
                        this.handleOk()
                    }
                },
                deep: true
            }
        },
        methods: {
            eventPush() {
                this.$store.dispatch("ToggleCloseTab", '');
                setTimeout(() => {
                    this.$store.dispatch("ToggleCloseTab", this.$route.fullPath);
                    this.$router.push({path: "/dailyStandardCost/dailyStandardCost_list"});
                }, 500);
            },
            searchOnClick() {
                this.queryParam.noData = '2'
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.$refs.table.refresh(true);
                    } else {
                        this.$notification.open({
                            message: "Search condition error:",
                            description: "please input search conditions.",
                            duration: 6,
                            style: {'background': '#F5222D'}
                        });
                    }
                });
            },
            getListFun() {
                const that = this
                that.loadData = parameter => {
                    if(this.queryParam.noData === '2'){
                        that.searchLoading = true;
                        return list(Object.assign(parameter, that.queryParam)).then(res => {
                            that.searchLoading = false;
                            that.$refs.table.clearSelected();
                            that.tableList = res.result
                            return res.result
                        })
                    } else {
                        that.searchLoading = false;
                        return new Promise((resolve, reject) => {
                            resolve({
                                list: [],
                                total: 0,
                                pageNum: 0,
                                pageSize: 0
                            })
                        }).then(res =>{
                            return res
                        })
                    }

                }
            },
            // 选择列表
            onSelectChange(selectedRowKeys, selectedRows) {
                //console.log('selectedRowKeys changed: ', selectedRowKeys)
                this.selectedRowKeys = selectedRowKeys
                // this.selectedRows = selectedRows
            },
            // 删除选中列表
            deleteSeclect() {
                if (this.selectedRowKeys.length == 0) {
                       this.$notification.open({
                        message: "Warn",
                        description: this.$t("lang.messagePleaseSelectDeleteRow"),
                        duration: 6,
                        style: {background: "#FAAD14"}
                    });
                    return;
                }
                const rowKeys = [];
                this.selectedRowKeys.forEach(element => {
                    rowKeys.push({
                        rid: element.split("@")[0]
                    });
                });
                this.delfun(rowKeys,this.$t("lang.messageDeleteSelectedConfirm"),del);
            },
            deleteSeclectAlls() {
                this.delfun({},this.$t("lang.messageDeleteAllConfirm"),deleteAll);
            },
            delfun(rowKeys,content,api) {
                let self = this;
                this.$confirm({
                    title: self.$t("lang.messageDeleteConfirmTitle"),
                    content: content,
                    onOk() {
                        return api(rowKeys).then(res => {
                            if (res.code == "0") {
                                self.$notification.open({
                                    message: "Success",
                                    description: res.msg,
                                    duration: 6,
                                    style: { background: "#52C41A" }
                                });
                                self.selectedRowKeys = [];
                                self.handleOk(); // 删除后刷新列表
                            } else {
                                self.$notification.open({
                                    message: "Error",
                                    description: res.msg,
                                    duration: 6,
                                    style: { background: "#F5222D" }
                                });
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                    },
                    onCancel() {}
                });
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
            }
        }

    }
</script>
