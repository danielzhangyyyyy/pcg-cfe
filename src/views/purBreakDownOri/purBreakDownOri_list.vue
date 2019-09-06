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
                                    @change="inputChange($event,item.decorator)"
                                    v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                            />
                            <a-select
                                    showSearch
                                    :getPopupContainer="getPopupContainer"
                                    :filterOption="filterOption"
                                    optionFilterProp="children"
                                    v-if="item.inputType=='dropDown'"
                                    :placeholder="item.placeHolder"
                                    :allowClear="item.allowClear"
                                    v-decorator="[item.decorator, {initialValue: item.text, rules: [{required: item.required, message: item.message }]}]"
                                    @change="handleDropDownChange($event, item.decorator)"
                            >
                                <a-select-option
                                        v-for="(element, i) in item.dropDownList"
                                        :key="i"
                                        :value="element"
                                >{{ element }}
                                </a-select-option>
                            </a-select>
                            <a-date-picker
                                    :getPopupContainer="getPopupContainer"
                                    v-if="item.inputType=='date'"
                                    :disabled="item.editDisabled"
                                    :placeholder="item.placeHolder"
                                    :allowClear="item.allowClear"
                                    @change="dateChange($event,item.decorator)"
                                    v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                            />
                        </a-form-item>
                    </a-col>
                    <template v-if="advanced">
                        <a-col :md="8" :sm="24" v-for="item in filterList.slice(2,11)" :key="item.index">
                            <a-form-item :label="item.label">
                                <a-input
                                        :placeholder="item.placeHolder"
                                        v-if="item.inputType=='input'"
                                        :disabled="item.editDisabled"
                                        @change="inputChange($event,item.decorator)"
                                        v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                                />
                                <a-select
                                        showSearch
                                        :getPopupContainer="getPopupContainer"
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
                                <a-date-picker
                                        :getPopupContainer="getPopupContainer"
                                        v-if="item.inputType=='date'"
                                        :disabled="item.editDisabled"
                                        :placeholder="item.placeHolder"
                                        :allowClear="item.allowClear"
                                        @change="dateChange($event,item.decorator)"
                                        v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span="16" v-for="item in filterList.slice(11)" :key="item.index">
                            <a-form-item :label="item.label">
                                <a-input
                                        :disabled="item.editDisabled"
                                        :placeholder="item.placeHolder"
                                        :allowClear="item.allowClear"
                                        @change="inputChange($event, item.decorator)"
                                        v-decorator="[item.decorator,{rules: [{required: item.required, message: item.message }]}]"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span="8" class="message">
                            <span>eg:73040611;73040612;73040613</span>
                        </a-col>
                    </template>
                    <a-col :md="!advanced && 8 || 24" :sm="24">
                        <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                              <a-button
                                      type="primary"
                                      icon="search"
                                      :loading="searchLoading"
                                      @click="searchOnClick"
                              >{{ $t('lang.tabComSearchButtonName') }}</a-button>
                              <a-button
                                      style="margin-left: 8px"
                                      icon="undo"
                                      @click="() => {form.resetFields()}"
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
                uploadId="Z_UI_PUR_BREAK_DOWN_ORI_UPLOAD"
                @deleteSeclectAll="deleteSeclectAll">
            <a-button type="primary" @click="eventPush">Comm-Elem</a-button>
        </tableBtns>
        <a-alert type="info" showIcon style="margin-bottom: 16px">
            <template slot="message">
                <span style="margin-right: 12px">
                Selected:
                 <a style="font-weight: 600">{{this.selectedRows.length}}</a>
                </span>
            </template>
        </a-alert>
        <a-table
                :columns="columns"
                :dataSource="loadData"
                :loading="loading"
                :scroll="scrollSize"
                size="small"
                :defaultExpandAllRows="defaultExpandAllRows"
                :expandedRowKeys="expandedRowKeys"
                rowKey="rid"
                :pagination="pagination"
                @expand="expandedRowsChange"
                @change="handleTableChange"
                :indentSize="indentSize"
                :customRow="(record) => { return {
                    on:{
                      click:()=>{
                        this.clickOnRow(record)
                      }
                    }
                  }}"
        >
            <span slot="checkTitle">
                <a-checkbox @change="onCheckAllChange" :class="{padding:isPadding}" :checked="allChecked"></a-checkbox>
            </span>
            <a slot="check" slot-scope="text, record">
                <span v-if="record.hasOwnProperty('children')">
                  <a-checkbox :checked="text" @change="onChange"/>
                </span>
            </a>
        </a-table>
    </a-card>
</template>

<script>
    import moment from "moment";
    import {STable, tableBtns} from "@/components";
    import {isNullOrUndefined} from "util";
    import {del, getDropDownList, getPartNumList, list} from "@api/purBreakDownOri_api";
    import { getXScrollSize } from "@api/publicFunc_api";
    import langZh from "../../locales/zh-CN/purBreakDownOri_lang.js";
    import langEn from "../../locales/en-US/purBreakDownOri_lang.js";

    export default {
        name: "TableList",
        components: {
            STable,
            tableBtns
        },
        data() {
            return {
                isPadding: false,
                scrollSize: {y:false},
                expandedRowKeys: [],
                defaultExpandAllRows: false,
                indentSize: 0,
                pagination: {
                    showSizeChanger: true,
                    // current: 1,
                    // total: 0,
                    // pageSize: 10,
                    pageSizeOptions: ["10", "50", "100", "150"],
                    onShowSizeChange: this.showSizeChange,
                    // onChange: this.changePage
                },
                allChecked: false,
                cycleDataList: [],
                mfgPlantDataList: [],
                // costElemDataList:[],
                pgDataList: [],
                statusDataList: [],
                commodityDataList: [],
                // specDataList:[],
                isValidateDataList: ["INVALIDATE", "VALIDATE"],
                filterList: langEn.filter_langEn,
                form: this.$form.createForm(this),
                currentPageManipulationAuth: ["Delete", "View", "Upload"],
                mdl: {},
                searchLoading: false,
                loading: false, // 页面是否加载中
                advanced: false, // 高级搜索 展开/关闭
                queryParam: {
                    cycle: "CURRENT"
                }, // 查询参数
                optionAlertShow: true, // 是否显示选择框
                selectedRowKeys: [], // 选中的行的keys数组
                selectedRows: [], // 选中的行的全部数组
                tableChildrenList: [],
                // 表头
                columns: [],
                loadData: []
            };
        },
        computed: {
            language() {
                return this.$store.getters.language;
            }
        },
        created() {
            this.changeLanguage()
            this.scrollSize.x = getXScrollSize(this.columns, langEn.deltaSize);
            this.getListFun({});
            this.getDropDown(
                {moduleName: "getCycleList"},
                this.cycleDataList,
                "CYCLE",
                getDropDownList
            );
            this.getDropDown(
                {moduleName: "getMfgPlantList"},
                this.mfgPlantDataList,
                "MFG_PLANT",
                getDropDownList
            );
            this.getDropDown(
                {moduleName: "getCommodityList"},
                this.commodityDataList,
                "COMMODITY",
                getDropDownList
            );
            this.getDropDown(
                {moduleName: "getPgList"},
                this.pgDataList,
                "PG",
                getDropDownList
            );
            this.getDropDown(
                {moduleName: "getStatusList"},
                this.statusDataList,
                "STATUS",
                getDropDownList
            );
            this.getMonths();
            this.setDropDownLists();
        },
        watch: {
            cycleDataList(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "cycle") {
                        element["dropDownList"] = [].concat(this.cycleDataList);
                    }
                });
            },
            mfgPlantDataList(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "mfgPlant") {
                        element["dropDownList"] = [].concat(this.mfgPlantDataList);
                    }
                });
            },
            pgDataList(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "pg") {
                        element["dropDownList"] = [].concat(this.pgDataList);
                    }
                });
            },
            statusDataList(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "status") {
                        element["dropDownList"] = [].concat(this.statusDataList);
                    }
                });
            },
            commodityDataList(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "commodity") {
                        element["dropDownList"] = [].concat(this.commodityDataList);
                    }
                });
            },
            language(val) {
                this.changeLanguage();
            },
            $route: {
                handler(route) {
                    console.log(route.path);
                    if (route.path === "/purBreakDownOri/purBreakDownOri_list") {
                        this.handleOk();
                    }
                },
                deep: true
            }
        },
        methods: {
            getPopupContainer(trigger) {
                return trigger.parentElement;
            },
            expandedRowsChange(expanded, record) {
                /* this.expandedRowKeys 控制分页数据 初始化都为加号*/
                let param = {
                    cycle: record.cycle,
                    mfgPlant: record.mfgPlant,
                    partNumber: record.partNumber
                }, index = this.expandedRowKeys.indexOf(record.rid);
                expanded ? this.expandedRowKeys.push(record.rid) : this.expandedRowKeys.splice(index, 1);
                getPartNumList(Object.assign({}, param)).then(res => {
                    if (res.code === '0') {
                        record.children.splice(0);
                        for (let item of res.result) {
                            item.rid = record.rid + "@" + item.rid;
                            delete item.partNumber;
                        }
                        record.children = res.result;
                    } else {
                        this.$notification.open({
                            message: "Search condition error:",
                            description: res.msg,
                            duration: 6,
                            style: {background: "#F5222D"}
                        });
                    }

                });
            },
            searchOnClick() {
                this.form.validateFields((err, values) => {
                    if (!err) {
                        for (let key in values) {
                            if (key === "sysLastModifiedDateStart" && !isNullOrUndefined(values[key])) {
                                this.queryParam[key] = values[key].format("YYYY-MM-DD");
                            } else if (key === "sysLastModifiedDateEnd" && !isNullOrUndefined(values[key])) {
                                this.queryParam[key] = values[key].format("YYYY-MM-DD");
                            } else {
                                this.queryParam[key] = values[key];
                            }
                        }
                        this.expandedRowKeys.splice(0);
                        this.getListFun({});
                    } else {
                        this.$notification.open({
                            message: "Search condition error:",
                            description: "Please fill in 'Part Number' or select 'Mfg Plant' or fill in 'Owner' or select 'Last Modified Date' before proceeding!",
                            duration: 6,
                            style: {background: "#F5222D"}
                        });
                    }
                });
            },
            eventPush() {
                this.$router.push("/pur/breakCommodity");
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
                    if (element["decorator"] == "isValidate") {
                        element["dropDownList"] = [].concat(this.isValidateDataList);
                    }
                });
            },
            getDropDown(param, dropdownList, key, api) {
                api(Object.assign({}, param)).then(res => {
                    dropdownList.splice(0);
                    res.result.forEach(el => {
                        dropdownList.push(el[key]);
                    });
                });
            },
            handleDropDownChange(value, decorator) {
                if (decorator === "mfgPlant") {
                    this.changeRequrie(value, decorator);
                }
            },
            inputChange(ev, decorator) {
                let value = ev.target.value;
                this.changeRequrie(value, decorator);
            },
            dateChange(ev, decorator) {
                let value = "";
                if (ev !== null) {
                    value = ev.format("YYYY-MM-DD");
                }
                this.changeRequrie(value, decorator);
            },
            /*
             *  下拉框校验
             * */
            changeRequrie(value, decoratorC) {
                let requiredArray = [
                    "mfgPlant",
                    "ownerCosttape",
                    "sysLastModifiedDateStart",
                    "sysLastModifiedDateEnd",
                    "partNumber"
                ];
                let existedValue = false;
                let existedkeys = [];
                let fieldsValues = this.form.getFieldsValue([
                    "mfgPlant",
                    "ownerCosttape",
                    "sysLastModifiedDateStart",
                    "sysLastModifiedDateEnd",
                    "partNumber"
                ]);
                if (fieldsValues.sysLastModifiedDateStart != undefined) {
                    fieldsValues.sysLastModifiedDateStart = fieldsValues.sysLastModifiedDateStart.format(
                        "YYYY-MM-DD"
                    );
                }
                if (fieldsValues.sysLastModifiedDateEnd != undefined) {
                    fieldsValues.sysLastModifiedDateEnd = fieldsValues.sysLastModifiedDateEnd.format(
                        "YYYY-MM-DD"
                    );
                }
                if (value == "" || isNullOrUndefined(value)) {
                    for (let key in fieldsValues) {
                        if (
                            key !== decoratorC &&
                            !isNullOrUndefined(fieldsValues[key]) &&
                            fieldsValues[key] !== ""
                        ) {
                            existedValue = true;
                            existedkeys.push(key);
                        }
                    }
                } else if (value != "" && !isNullOrUndefined(value)) {
                    existedkeys.push(decoratorC);
                    existedValue = true;
                    for (let key in fieldsValues) {
                        if (key !== decoratorC && fieldsValues[key]) {
                            existedkeys.push(key);
                        }
                    }
                }
                if (existedValue) {
                    requiredArray.forEach(item => {
                        this.filterList.forEach(el => {
                            if (el.decorator == item) {
                                if (existedkeys.includes(item)) {
                                    el.required = true;
                                    this.form.getFieldDecorator(el.decorator, {
                                        rules: [{required: true, message: el.message}]
                                    });
                                } else {
                                    el.required = false;
                                    this.form.resetFields([el.decorator]);
                                    this.form.getFieldDecorator(el.decorator, {
                                        rules: [{required: false, message: el.message}]
                                    });
                                }
                            }
                        });
                    });
                } else {
                    requiredArray.forEach(item => {
                        this.filterList.forEach(el => {
                            if (el.decorator == item) {
                                el.required = true;
                            }
                        });
                    });
                }
            },
            getMonths() {
                getDropDownList({moduleName: "getMonthListByCycle", cycle: "CURRENT"}).then(res => {
                    for (let key in res.result[0]) {
                        for (let item of this.columns) {
                            if (
                                item.dataIndex &&
                                item.dataIndex.toUpperCase() === key.toUpperCase()
                            ) {
                                item.title = res.result[0][key];
                            }
                        }
                    }
                });
            },
            showSizeChange(current, pageSize) {
                this.queryParam.pageSize = pageSize;
                this.pagination.pageSize = pageSize;
                this.expandedRowKeys.splice(0);
                console.log(current, pageSize, "current, pageSize");
                this.getListFun({});
            },
            // changePage(page) {
            //     this.pagination.current = page;
            //     this.queryParam.pageNum = page;
            //     this.selectedRows = [];
            //     this.getListFun({});
            // },
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
                params.sortField ? parameter.sortField = params.sortField: '';
                params.sortOrder?parameter.sortOrder = params.sortOrder:'';
                this.expandedRowKeys.splice(0);
                list(Object.assign(parameter, self.queryParam)).then(res => {
                    const pagination = {...self.pagination}
                    self.searchLoading = false;
                    pagination.total = res.result.total;
                    pagination.pageSize = res.result.pageSize;
                    pagination.current = res.result.pageNum;
                    if(res.code === '0'){
                        for (let item of res.result.list) {
                            item.check = false;
                            item.children = this.tableChildrenList;
                        }
                        self.loadData = res.result.list;
                        if (self.loadData.length > 10) {
                            self.isPadding = true;
                            self.scrollSize.y = 450;
                        } else {
                            self.scrollSize.y = false;
                            self.isPadding = false;
                        }
                        self.pagination = pagination
                    } else {
                        self.$notification.open({
                            message: "Error",
                            description: res.msg,
                            duration: 6,
                            style: {background: "#F5222D"}
                        });
                    }

                });
            },
            //点击行的时候保存当前行数据
            clickOnRow(record) {
                this.selectedRows = record;
            },
            // 选择列表
            onChange(e) {
                let arr = [],bool = e.target.checked;
                if (bool) {
                    for (let item of this.loadData) {
                        if (this.selectedRows.rid === item.rid) {
                            item.check = true;
                            this.selectedRowKeys.push(item.rid);
                        }
                        arr.push(item.check);
                    }
                    arr.includes(false) ? (this.allChecked = false) : (this.allChecked = true);
                } else {
                    for (let item of this.loadData) {
                        this.selectedRows.rid === item.rid ? (item.check = false) : "";
                        arr.push(item.check);
                    }
                    arr.includes(false) ? (this.allChecked = false) : "";
                }
            },
            onCheckAllChange(e) {
                let bool = e.target.checked;
                if (!bool) {
                    this.allChecked = false;
                    for (let item of this.loadData) item.check = false;
                } else {
                    this.allChecked = true;
                    for (let item of this.loadData) {
                        item.check = true;
                        this.selectedRowKeys.push(item.rid);
                    }
                }
            },
            // 修改用户
            editListFun(rowKey, disab) {
                console.log(rowKey);
                console.log(disab);
                this.$refs.editForm.edit(rowKey, disab);
            },
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
                this.selectedRowKeys.forEach(element => {
                    rowKeys.push({
                        rid: element.split("@")[0]
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
                            // this.requestFailed(err)
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
                this.getListFun({});
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
    }

    .padding {
        padding-left: 25px;
    }
</style>
