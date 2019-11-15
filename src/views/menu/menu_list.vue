<template>
    <a-card :bordered="false" class="content">
        <tableBtns
                :currentPageManipulationAuth="currentPageManipulationAuth"
                :queryParamemter="queryParam"
                @addNewTable="addNewTable"
        >
            <a-button :loading="searchLoading" type="primary" icon="redo" @click="getListFun">Refresh</a-button>
        </tableBtns>

        <a-table
                :columns="columns"
                :loading="loading"
                :scroll="scrollSize"
                size="small"
                :pagination="false"
                :dataSource="loadData">
            <template slot="operation" slot-scope="text, record, index">
                <div class='editable-row-operations'>
                    <span>
                        <a @click="editSelectOne(record.menuId)">Edit</a>
                        <a @click="deleteSeclectAll(record.menuId)">&nbsp;&nbsp;&nbsp;&nbsp;Delete</a>
                    </span>
                </div>
            </template>
        </a-table>
    </a-card>
</template>

<script>
    import Vue from 'vue'
    import moment from 'moment'
    import {getXScrollSize} from "@api/publicFunc_api";
    import {STable, tableBtns} from '@/components'
    import {list, del, update, getDropDownList} from '@api/menu_api'
    import langZh from '../../locales/zh-CN/menu_lang.js'
    import langEn from '../../locales/en-US/menu_lang.js'

    export default {
        name: 'TableList',
        components: {
            STable,
            tableBtns
        },
        data() {
            return {
                scrollSize: {y: false},
                filterList: langEn.filter_langEn,
                form: this.$form.createForm(this),
                currentPageManipulationAuth: ["Add"],
                searchLoading: false,
                loading: false, // 页面是否加载中
                advanced: false, // 高级搜索 展开/关闭
                queryParam: {}, // 查询参数
                optionAlertShow: true, // 是否显示选择框
                selectedRowKeys: [], // 选中的行的keys数组
                selectedRows: [], // 选中的行的全部数组
                // 表头
                columns: [],
                loadData: [],
                cacheData: [],
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
            this.scrollSize.x = getXScrollSize(this.columns, 10);
            this.getListFun()
        },
        watch: {
            language(val) {
                this.changeLanguage()
            },
            $route: {
                handler(route) {
                    if (route.path === '/menu/menu_list') {
                        this.handleOk()
                    }
                },
                deep: true
            }
        },
        methods: {
            getListFun() {
                const that = this
                that.searchLoading = true;
                list(Object.assign({}, that.queryParam)).then(res => {
                    that.searchLoading = false;
                    for (let [index, item] of res.result.entries()) {
                        item.key = item.menuId
                        item.children = item.childMenuList;
                        if(item.children){
                            for (let [i, e] of item.children.entries()) {
                                e.key = e.menuId
                            }
                        }
                        delete item.childMenuList;
                    }
                    that.loadData = res.result
                    that.loadData.length > 10 ? that.scrollSize.y = 450 : that.scrollSize.y = false;
                })
            },
            delete(key) {
                const newData = [...this.loadData]
                const target = newData.filter(item => key === item.key)[0]
                let childTarget;
                for (let item of newData) {
                    for (let element of item.children) {
                        if (key === element.key) childTarget = element
                    }
                }
                if (target) {
                    Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
                    delete target.editable
                    this.loadData = newData
                } else if (childTarget) {
                    Object.assign(childTarget, this.cacheData.filter(item => key === item.key)[0])
                    delete childTarget.editable
                    this.loadData = newData
                }
            },
            addNewTable() { // 新建列表
                this.$router.replace('/menu/menu_add')
            },
            editSelectOne(rid) { // 修改选中行
                Vue.ls.set('menu_editSelectKey', rid)
                this.$router.replace(`/menu/menu_edit`)
            },
            // 选择列表
            onSelectChange(selectedRowKeys, selectedRows) {
                this.selectedRowKeys = selectedRowKeys
                // this.selectedRows = selectedRows
            },
            // 删除选中列表
            deleteSeclectAll(menuId) {
                this.delfun({menuId: menuId});
            },

            delfun(rowKeys) {
                let self = this;
                this.$confirm({
                    title: self.$t("lang.messageDeleteConfirmTitle"),
                    content: self.$t("lang.messageDeleteSelectedConfirm"),
                    onOk() {
                        return del(rowKeys).then(res => {
                            if (res.code == "0") {
                                self.$notification.open({
                                    message: "Success",
                                    description: self.$t("lang.messageDeleteSuccess"),
                                    duration: 6,
                                    style: {background: "#52C41A"}
                                });
                                self.selectedRowKeys = [];
                                self.handleOk(); // 删除后刷新列表
                            } else {
                                self.$notification.open({
                                    message: "Error",
                                    description: res.msg,
                                    duration: 6,
                                    style: {'background': '#F5222D'}
                                });
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                    },
                    onCancel() {
                    }
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
                this.getListFun()
            },

            // 收起展开
            toggleAdvanced() {
                this.advanced = !this.advanced
            },
            // 重置
            resetSearchForm() {
                this.queryParam = {
                    date: moment(new Date())
                }
            }
        }

    }
</script>
