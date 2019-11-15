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
                    <template v-if="advanced">
                        <a-col :md="8" :sm="24" v-for="item in filterList.slice(2)" :key="item.index">
                            <a-form-item :label="item.label">
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
                    </template>
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
                                  @click="() => {form.resetFields();setRequiredDefault();}"
                          >{{ $t('lang.tabComResetButtonName') }}</a-button>
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
                @addNewTable="addNewTable"
                @editSelectOne="editSelectOne"
                @deleteSeclectAll="deleteSeclectAll"
                exportId="EXPORT_ACCOUNT_INFO"
        >
            <a-button type="primary" @click="eventLock">Lock</a-button>
            <a-button type="primary" @click="eventUnLock">UnLock</a-button>
        </tableBtns>

        <s-table
                ref="table"
                :columns="columns"
                :loading="loading"
                :scroll="scrollSize"
                size="small"
                :rowKey="(record) => record.rid"
                :data="loadData"
                :alert="options.alert"
                :rowSelection="options.rowSelection"
        ></s-table>
    </a-card>
</template>

<script>
    import Vue from "vue";
    import moment from "moment";
    import {STable, tableBtns} from "@/components";
    import {list, del, getUserGroup, unlockAccount, lockAccount} from "@api/userAccount_api";
    import {getXScrollSize} from "@api/publicFunc_api";
    import langZh from "../../locales/zh-CN/userAccount_lang.js";
    import langEn from "../../locales/en-US/userAccount_lang.js";

    export default {
        name: "TableList",
        components: {
            STable,
            tableBtns
        },
        data() {
            return {
                initial: true,
                userTypeDataList: [],
                filterList: langEn.filter_langEn,
                columnList: langEn.tableTitle_langEn,
                form: this.$form.createForm(this),
                currentPageManipulationAuth: ["View", 'Add', 'Update', 'Delete'],
                searchLoading: false,
                loading: false, // 页面是否加载中
                advanced: false, // 高级搜索 展开/关闭
                queryParam: {}, // 查询参数
                optionAlertShow: true, // 是否显示选择框
                selectedRowKeys: [], // 选中的行的keys数组
                selectedRows: [], // 选中的行的全部数组
                // 表头
                columns: [],
                loadData: "",
                scrollSize: {},
                options: {
                    alert: {
                        show: true,
                        clear: () => {
                            this.selectedRowKeys = [];
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
            this.getListFun();
            this.getDropDown(
                {},
                this.userTypeDataList,
                "groupId",
                getUserGroup
            );
        },
        watch: {
            userTypeDataList() {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "userGrpId") {
                        element["dropDownList"] = [].concat(this.userTypeDataList);
                    }
                });
            },
            language(val) {
                this.changeLanguage();
            },
            $route: {
                handler(route) {
                    if (route.path === "/userAccount/userAccount_list") {
                        this.handleOk()
                    }
                },
                deep: true
            }
        },
        methods: {
            getPopupContainer(trigger) {
                return trigger.parentElement;
            },
            searchOnClick() {
                this.initial = false;
                this.form.validateFields((err, values) => {
                    console.log("values", values);
                    if (!err) {
                        values.itcode ? this.queryParam.itcode = `%${values.itcode.trim()}%`:this.queryParam.itcode = values.itcode
                        this.queryParam.status = values.status
                        this.queryParam.userGrpId = values.userGrpId
                        this.$refs.table.refresh(true);
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
            filterOption(input, option) {
                return (
                    option.componentOptions.children[0].text
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                );
            },
            getDropDown(param, dropdownList, key, api = getDropDownList) {
                api(Object.assign({}, param)).then(res => {
                    dropdownList.splice(0);
                    res.result.list.forEach(el => {
                        dropdownList.push(el[key]);
                    });
                });
            },
            handleDropDownChange(value, decorator) {},
            getListFun() {
                const that = this
                that.loadData = parameter => {
                    that.searchLoading = true;
                    return list(Object.assign(parameter, that.queryParam)).then(res => {
                        that.searchLoading = false;
                        that.$refs.table.clearSelected();
                        for (let [index, item] of res.result.list.entries()) item.rid = index
                        return res.result
                    })
                }
            },
            addNewTable() {
                // 新建列表
                this.$router.replace("/userAccount/userAccount_add");
            },
            selectLines(){
                if (this.selectedRowKeys.length == 0) {
                    this.$notification.open({
                        message: "Warn",
                        description: this.$t("lang.messagePleaseSelectDeleteRow"),
                        duration: 6,
                        style: {background: "#FAAD14"}
                    });
                    return;
                }
            },
            lockUpdate(params,api){
                const self = this;
                api(params).then(res=>{
                    if (res.code == "0") {
                        self.$notification.open({
                            message: "Success",
                            description: res.msg,
                            duration: 6,
                            style: {background: "#52C41A"}
                        });
                        self.selectedRows = [];
                        self.handleOk(); // 删除后刷新列表
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
            eventLock(){
                let params = [];
                this.selectLines();
                for(let element of this.selectedRows){
                    params.push({
                        loginName: element.loginName
                    })
                }
                this.lockUpdate(params,lockAccount);
            },
            eventUnLock(){
                let params = [];
                this.selectLines();
                for(let element of this.selectedRows){
                    params.push({
                        loginName: element.loginName
                    })
                }
                this.lockUpdate(params,unlockAccount);
            },
            editSelectOne() {
                // 修改选中行
                const selectedRowKeyslen = this.selectedRowKeys.length;
                if (selectedRowKeyslen == 1) {
                    const editSelectKey = this.selectedRows[0].loginName;
                    Vue.ls.set("userAccount_editSelectKey", editSelectKey);
                    this.$router.replace(`/userAccount/userAccount_edit`);
                } else if (selectedRowKeyslen < 1) {
                    this.$notification.open({
                        message: "Warn",
                        description: this.$t("lang.messagePleaseSelectEditRow"),
                        duration: 6,
                        style: {background: "#FAAD14"}
                    });
                } else {
                    this.$notification.open({
                        message: "Warn",
                        description: this.$t("lang.messageEditMultiRow"),
                        duration: 6,
                        style: {background: "#FAAD14"}
                    });
                }
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
                        loginName: element.loginName
                    });
                });
                this.delfun(rowKeys);
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
                this.$refs.table.refresh(); // refresh() 不传参默认值 false 不刷新到分页第一页，true刷新到第一页
            },

            // 收起展开
            toggleAdvanced() {
                this.advanced = !this.advanced;
            },
            // 重置
            resetSearchForm() {
                this.queryParam = {
                    date: moment(new Date())
                };
            }
        }
    };
</script>
<style scoped>
    .message {
        color: red;
        padding-left: 0;
        display: inline-block;
        line-height: 25px;
    }
</style>
