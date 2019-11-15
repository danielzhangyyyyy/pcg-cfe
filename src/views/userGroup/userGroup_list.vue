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
                            <a-select
                                    :getPopupContainer="getPopupContainer"
                                    showSearch
                                    :filterOption="filterOption"
                                    optionFilterProp="children"
                                    v-if="item.inputType=='dropDown'"
                                    :placeholder="item.placeHolder"
                                    :allowClear="item.allowClear"
                                    v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                                    @change="handleDropDownChange($event, item.decorator)"
                            >
                                <a-select-option
                                        v-for="(element, i) in item.dropDownList"
                                        :key="i"
                                        :value="element"
                                >{{ element }}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :md="!advanced && 8 || 24" :sm="24">
                        <span
                                class="table-page-search-submitButtons"
                                :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
                        >
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
                @addNewTable="addNewTable"
        >
        </tableBtns>

        <a-table
                ref="table"
                :columns="columns"
                :loading="loading"
                :scroll="scrollSize"
                :pagination="pagination"
                @change="handleTableChange"
                size="small"
                :dataSource="loadData"
        >
            <template slot="operation" slot-scope="text, record">
                <a href="javascript:;" @click="editSelectOne(record.groupName)">Edit&nbsp;&nbsp;</a>
                <a href="javascript:;" @click="onDelete(record.groupName)">Delete</a>
            </template>
        </a-table>
    </a-card>
</template>

<script>
    import Vue from "vue";
    import moment from "moment";
    import {STable, tableBtns} from "@/components";
    import {list, del, getUserGroup,getDropDownList} from "@api/userGroup_api";
    import {getXScrollSize} from "@api/publicFunc_api";
    import langZh from "../../locales/zh-CN/userGroup_lang.js";
    import langEn from "../../locales/en-US/userGroup_lang.js";

    export default {
        name: "userGroup_list",
        components: {
            STable,
            tableBtns
        },
        data() {
            return {
                initial: true,
                userTypeDataList: [],
                groupNameDataList: [],
                filterList: langEn.filter_langEn,
                columnList: langEn.tableTitle_langEn,
                form: this.$form.createForm(this),
                currentPageManipulationAuth: ['Add'],
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
                statusDataList: ['ACTIVE','INACTIVE'],
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
                }
            };
        },
        computed: {
            language() {
                return this.$store.getters.language;
            }
        },
        created() {
            this.changeLanguage();
            this.scrollSize.x = getXScrollSize(this.columns, langEn.deltaSize);
            this.getListFun({});
            this.getDropDown(
                {moduleName: "getGroupName"},
                this.groupNameDataList,
                "GROUP_NAME"
            );
            this.setDropDownLists();
        },
        watch: {
            groupNameDataList() {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "groupName") {
                        element["dropDownList"] = [].concat(this.groupNameDataList);
                    }
                });
            },
            language(val) {
                this.changeLanguage();
            },
            $route: {
                handler(route) {
                    if (route.path === "/userGroup/userGroup_list") {
                        this.handleOk()
                    }
                },
                deep: true
            }
        },
        methods: {
            getDropDown(param, dropdownList, key, api = getDropDownList) {
                api(Object.assign({}, param)).then(res => {
                    dropdownList.splice(0);
                    res.result.forEach(el => {
                        dropdownList.push(el[key]);
                    });
                });
            },
            filterOption(input, option) {
                return (
                    option.componentOptions.children[0].text
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                );
            },
            setDropDownLists() {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "status") {
                        element["dropDownList"] = [].concat(this.statusDataList);
                    }
                });
            },
            handleDropDownChange(value, decorator) {
            },
            getPopupContainer(trigger) {
                return trigger.parentElement;
            },
            searchOnClick() {
                this.initial = false;
                this.form.validateFields((err, values) => {
                    console.log("values", values);
                    if (!err) {
                        values.groupName?this.queryParam.groupName = `%${values.groupName.trim()}%`:this.queryParam.groupName = values.groupName
                        this.queryParam.status = values.status
                        this.getListFun({})
                    } else {
                        this.$notification.open({
                            message: "Search condition error:",
                            description: "Please fill in the required options",
                            duration: 6,
                            style: {background: "#F5222D"}
                        });
                    }
                });
            },
            showSizeChange(current, pageSize) {
                this.queryParam.pageSize = pageSize;
                this.pagination.pageSize = pageSize;
                this.getListFun({});
            },

            handleTableChange(pagination, filters, sorter) {
                const pager = {...this.pagination};
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
                const that = this
                let parameter = {
                    pageNum: params.pageNum || this.pagination.current || 1,
                    pageSize: params.pageSize || this.pagination.pageSize || 10
                };
                params.sortField ? parameter.sortField = params.sortField : '';
                params.sortOrder ? parameter.sortOrder = params.sortOrder : '';
                that.searchLoading = true;
                list(Object.assign(parameter, that.queryParam)).then(res => {
                    const pagination = {...that.pagination}
                    that.searchLoading = false;
                    for (let [index, item] of res.result.list.entries()) item.rid = index
                    that.loadData = res.result.list
                    pagination.total = res.result.total;
                    pagination.pageSize = res.result.pageSize;
                    pagination.current = res.result.pageNum;
                    that.pagination = pagination
                })
            },
            addNewTable() {
                // 新建列表
                this.$router.replace("/userGroup/userGroup_add");
            },
            editSelectOne(groupName) {
                Vue.ls.set("userGroup_editSelectKey", groupName);
                this.$router.replace(`/userGroup/userGroup_edit`);
            },
            // 选择列表
            onSelectChange(selectedRowKeys, selectedRows) {
                this.selectedRowKeys = selectedRowKeys;
                this.selectedRows = selectedRows;
            },
            // 删除选中列表
            deleteSeclectAll() {
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
                this.selectedRows.forEach(element => {
                    rowKeys.push({
                        groupName: element.groupName
                    });
                });
                this.delfun(rowKeys);
            },
            onDelete(groupName) {
                this.delfun({groupName: groupName});
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
                                    style: {background: "#F5222D"}
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
                if (this.language == "zh-CN") {
                    this.columns = langZh.tableTitle_langZh;
                } else if (this.language == "en-US") {
                    this.columns = langEn.tableTitle_langEn;
                }
            },
            // 刷新列表
            handleOk() {
                this.getListFun({})
            },

            // 收起展开
            toggleAdvanced() {
                this.advanced = !this.advanced;
            },
            // 重置
            resetSearchForm() {
                this.form.resetFields()
                this.queryParam = {
                    groupName:'',
                    status: ''
                };
            }
        }
    };
</script>
<style scoped>

</style>
