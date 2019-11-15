<template>
    <a-card :bordered="false" class="content">
        <div class="table-page-search-wrapper">
            <a-form layout="inline" @submit="handleSubmit" :form="form">
                <a-row :gutter="48">
                    <a-col :md="12" :sm="24" v-for="(item,index) in categoryReportFormList" :key="index">
                        <a-form-item :label="item.label" :style="{'font-weight': 'bold'}">
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
                                        v-bind:key="i"
                                        :value="JSON.stringify(element)"
                                >{{ element.name }}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <template v-if="advanced">
                        <a-col :md="8" :sm="24" v-for="item in filterList" :key="item.decorator">
                            <a-form-item :label="item.label">
                                <a-input
                                        :placeholder="item.placeHolder"
                                        v-if="item.inputType=='input'"
                                        :disabled="item.editDisabled"
                                        :allowClear="item.allowClear"
                                        @change="inputChange($event, item)"
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
                                        @change="handleQueryDropDownChange($event, item)"
                                >
                                    <a-select-option
                                            v-for="(element, i) in item.dropDownList"
                                            v-bind:key="i"
                                            :value="element"
                                    >{{ element }}
                                    </a-select-option>
                                </a-select>
                                <a-date-picker
                                        :getCalendarContainer="getPopupContainer"
                                        v-if="item.inputType=='date'"
                                        :disabled="item.editDisabled"
                                        :placeholder="item.placeHolder"
                                        :allowClear="item.allowClear"
                                        @change="dateChange($event, item)"
                                        v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                                />
                            </a-form-item>
                        </a-col>
                    </template>
                </a-row>
            </a-form>
        </div>

        <div class="table-operator">
            <span v-for="item in buttonList">
                 <a-button
                         v-if="item.name === 'Search'"
                         type="primary"
                         @click="searchOnClick"
                         :loading="searchLoading"
                         icon="search"
                 >{{ $t('lang.tabComSearchButtonName') }}
            </a-button>
            <a-button
                    v-if="(item.name !== 'Search')&&(item.name !== 'Export')"
                    type="primary"
                    @click="executeOnClick(item.url,item.name)"
                    :loading="executeLoading"
                    :disabled="executeDisabled"
                    icon="form"
            >{{item.name}}
            </a-button>
            <a-button
                    v-if="item.name === 'Export'"
                    type="primary"
                    icon="download"
                    @click="exportOnClick"
                    :loading="exportLoading"
            >Export
            </a-button>
            </span>
            <a @click="toggleAdvanced" style="margin-left: 8px" v-if="hasQuery">
                {{ advanced ? $t('lang.tabComToggleCloseName') : $t('lang.tabComToggleShowName') }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
            </a>
        </div>
        <!-- <a-table
                ref="table"
                size="small"
                :scroll="scroll"
                :columns="columns"
                :dataSource="dataSource"
                :rowKey="(record) => record.RID"
                :pagination="pagination"
                :loading="loading"
                @change="handleTableChange"
        ></a-table> -->
        <m-table
                :columns="columns"
                :dataSource="dataSource"
                :scroll="scroll"
                :loading="loading"
                :showPagination="true"
        ></m-table>
    </a-card>
</template>
<script>
    import moment from "moment";
    import {mTable} from "@/components";
    import {
        executeApi,
        getCategoryList,
        getCommonList,
        getReportData,
        getReportFilter,
        getReportList
    } from "@api/flexibleQuery_api";
    import langZh from "../../locales/zh-CN/flexibleQuery_lang.js";
    import langEn from "../../locales/en-US/flexibleQuery_lang.js";
    import {exportByURL} from "@api/exportFunction_api";

    export default {
        name: "TableList",
        components: {
            mTable
        },
        data() {
            return {
                buttonList: [],
                filterList: langEn.filter_langEn,
                categoryReportFormList: langEn.categoryReports_langEn,
                form: this.$form.createForm(this),
                categoryReports: [],
                scroll: {x: true},
                // defaultPagination: {
                //     defaultCurrent: 1,
                //     showSizeChanger: true,
                //     showTotal: total =>
                //         total < 2000
                //             ? total == 1
                //             ? `total ${total} row`
                //             : `total ${total} rows`
                //             : this.$t("lang.messageFor2000Records"),
                //     pageSizeOptions: ["10", "50", "100", "150"]
                // },
                pagination: {},
                searchLoading: false,
                loading: false, // 页面是否加载中
                executeLoading: false,
                exportLoading: false,
                executeDisabled: true,
                advanced: true, // 高级搜索 展开/关闭
                queryParam: {}, // 查询参数
                queryArray: [],
                hasQuery: false,
                columns: [],
                dataSource: [],
                countLoadData: 0
            };
        },
        computed: {
            language() {
                return this.$store.getters.language;
            }
        },
        created() {
            this.changeLanguage();
            this.getCategory();
        },
        watch: {
            language(val) {
                this.changeLanguage();
            },
            $route: {
                handler(route) {
                    console.log(route.path);
                    if (route.path === "/flexibleQuery/flexibleQuery_list") {
                        // this.loadData({});
                    }
                },
                deep: true
            }
        },
        methods: {
            count() {
                this.countLoadData++;
                this.loading = false;
                this.searchLoading = false;
            },
            handleDropDownChange(val, decorator) {
                this.filterList.splice(0);
                this.hasQuery = false;
                this.queryParam = {};
                this.dataSource.splice(0);
                const value = JSON.parse(val);
                if (decorator == "category") {
                    this.form.resetFields(["report"]);
                    this.getReport({category: value.name});
                    this.buttonList = []
                } else if (decorator == "report") {
                    this.pagination = Object.assign({}, this.defaultPagination);
                    this.pagination.current = 1;
                    this.getFilter({rptId: value.id});
                    this.queryParam.rptId = value.id;
                    value.proc
                        ? (this.executeDisabled = false)
                        : (this.executeDisabled = true);
                }
                this.count();
            },
            toggleCascader(value, item) {
                if (item.cascader) {
                    item.cascader.forEach(el => {
                        this.form.resetFields([el.field]);
                        this.filterList.forEach(element => {
                            if (element.decorator == el.field) {
                                element.dropDownList.splice(0);
                                let fieldsValue = this.form.getFieldsValue(el.father);
                                fieldsValue[item.decorator] = value;
                                if (value) {
                                    getCommonList({
                                        moduleName: el.moduleName,
                                        eventName: "flexibleQuery", ...fieldsValue
                                    }).then(
                                        res => {
                                            if (res.code == 0) {
                                                element.dropDownList = res.result;
                                            } else {
                                                this.$notification.open({
                                                    message: "Error:",
                                                    description: `Something wrong with query parameter ${el.field}`,
                                                    duration: 6,
                                                    style: {background: "#F5222D"}
                                                });
                                            }
                                        }
                                    );
                                }
                            }
                        });
                    });
                }
                this.count();
            },
            handleQueryDropDownChange(value, item) {
                this.toggleCascader(value, item);
            },
            inputChange(e, item) {
                let value = e.target.value;
                this.toggleCascader(value, item);
            },
            dateChange(e, item) {
                let value = "";
                e ? (value = e.format("YYYY-MM-DD")) : "";
                this.toggleCascader(value, item);
            },
            exportOnClick() {
                let data = new Date();
                this.exportLoading = true;
                this.form.validateFields((err, values) => {
                    if (!err) {
                        delete values.category;
                        delete values.report;
                        for (let key in values) {
                            if (values[key] && typeof values[key] === 'object') {
                                this.queryParam[key] = values[key].format("YYYY-MM-DD");
                            } else if (values[key] && typeof values[key] === 'string') {
                                values[key] ? this.queryParam[key] = values[key].trim() : this.queryParam[key] = values[key]
                            } else if (values[key] == undefined || values[key] == '') {
                                delete this.queryParam[key]
                            }
                        }
                        // values.rptId = this.queryParam.rptId;
                        exportByURL(this.queryParam, "flexibleQuery/exportExcel").then(res => {
                            this.exportLoading = false;
                        });
                    } else {
                        this.$notification.open({
                            message: "Search condition error:",
                            description: "Please fill in query parameters.",
                            duration: 6,
                            style: {background: "#F5222D"} //red
                        });
                        this.exportLoading = false;
                    }
                });
            },
            executeOnClick(url, name) {
                let self = this;
                self.executeLoading = true;
                self.form.validateFields((err, values) => {
                    if (!err) {
                        delete values.category;
                        delete values.report;
                        for (let key in values) {
                            if (values[key] && typeof values[key] === 'object') {
                                values[key] = values[key].format("YYYY-MM-DD");
                            }
                        }
                        values.rptId = self.queryParam.rptId;
                        values.name = name
                        this.$confirm({
                            title: self.$t("lang.messageConfirmTitle"),
                            content: self.$t("lang.messageExecuteConfirmation"),
                            onOk() {
                                executeApi(url, values).then(res => {
                                    self.executeLoading = false;
                                    if (res.code == 0) {
                                        self.$notification.open({
                                            message: "Success",
                                            description: self.$t("lang.messageExecuteSuccess"),
                                            duration: 6,
                                            style: {background: "#52C41A"}
                                        });
                                    } else if (res.code == 1) {
                                        self.$notification.open({
                                            message: "Info",
                                            description: self.$t("lang.messageExecuting"),
                                            duration: 6,
                                            style: {background: "#52C41A"}
                                        });
                                    } else {
                                        self.$notification.open({
                                            message: "Error",
                                            description: res.msg,
                                            duration: 6,
                                            style: {background: "#F5222D"}
                                        });
                                    }
                                })
                                    .catch(err => {
                                        self.executeLoading = false;
                                        self.$notification.open({
                                            message: "Error",
                                            description: self.$t("lang.messageExecuteFailed"),
                                            duration: 6,
                                            style: {background: "#F5222D"}
                                        });
                                    });
                            },
                            onCancel() {
                                self.executeLoading = false;
                            }
                        });
                    } else {
                        self.executeLoading = false;
                        self.$notification.open({
                            message: "Search condition error:",
                            description:
                                "Please fill in available conditions before proceeding!",
                            duration: 6,
                            style: {background: "#F5222D"}
                        });
                    }
                });
            },
            searchOnClick() {
                this.count();
                this.pagination = Object.assign({}, this.defaultPagination);
                this.form.validateFields((err, values) => {
                    if (!err) {
                        let obj = {}
                        for (let key in values) {
                            if (values[key] && typeof values[key] === 'object') {
                                obj[key] = values[key].format("YYYY-MM-DD");
                            } else if (values[key] && typeof values[key] === 'string') {
                                values[key] ? obj[key] = values[key].trim() : obj[key] = values[key]
                            } else if (values[key] == undefined || values[key] == '') {
                                delete this.queryParam[key]
                            }
                        }
                        // this.queryParam = {...this.queryParam, ...values};
                        this.queryParam = {...this.queryParam, ...obj};
                        delete this.queryParam.category;
                        delete this.queryParam.report;
                        this.loadData({});
                    } else if (!values.category || !values.report) {
                        this.$notification.open({
                            message: "Search condition error:",
                            description: "Please select a report first",
                            duration: 6,
                            style: {background: "#F5222D"} //red
                        });
                    } else {
                        this.$notification.open({
                            message: "Search condition error:",
                            description: "please fill the mandatory field",
                            duration: 6,
                            style: {background: "#F5222D"} //red
                        });
                    }
                });
            },
            loadData(params) {
                this.loading = true;
                this.searchLoading = true;
                this.dataSource = [];
                let parameter = {};
                if (params.sortField) {
                    parameter.sortField = params.sortField;
                }
                if (params.sortOrder) {
                    parameter.sortOrder = params.sortOrder;
                }
                var countLoad = this.countLoadData;
                let self = this;
                getReportData(Object.assign(parameter, self.queryParam)).then(res => {
                    if (res.result) {
                        // res.result.rptData.forEach((item, index) => {
                        //   item.key = index;
                        // });
                        countLoad == self.countLoadData
                            ? (self.dataSource = res.result.rptData)
                            : "";
                        self.dataSource.length > 10
                            ? (self.scroll.y = 450)
                            : (self.scroll.y = false);
                    }
                    self.loading = false;
                    self.searchLoading = false;
                });
            },
            handleTableChange(pagination, filters, sorter) {
                this.loadData({
                    sortField: sorter.field,
                    sortOrder: sorter.order === "descend" ? "desc" : "",
                    ...filters
                });
            },
            getCategory() {
                getCategoryList().then(res => {
                    if (res.code == 0) {
                        this.categoryReportFormList[0].dropDownList.splice(0);
                        res.result.forEach((el, index) => {
                            this.categoryReportFormList[0].dropDownList.push({
                                name: el.CATEGORY,
                                id: index
                            });
                        });
                    } else {
                        this.$notification.open({
                            message: "Error:",
                            description: "Failed to load category.",
                            duration: 6,
                            style: {background: "#F5222D"} //red
                        });
                    }
                });
            },
            getReport(params) {
                getReportList(params).then(res => {
                    this.categoryReportFormList[1].dropDownList.splice(0);
                    if (res.code == 0) {
                        res.result.forEach((el, index) => {
                            this.categoryReportFormList[1].dropDownList.push({
                                name: el.rptName,
                                id: el.rptId,
                                proc: el.postProc,
                                buttonCtrl: el.buttonCtrl
                            });
                        });
                    } else {
                        this.$notification.open({
                            message: "Error:",
                            description: "Failed to load report.",
                            duration: 6,
                            style: {background: "#F5222D"} //red
                        });
                    }
                });
            },
            getFilter(params) {

                getReportFilter(params).then(res => {
                    if (res.code == 0) {
                        this.buttonList = JSON.parse(res.result.buttonCtrlList[0])
                        this.columns.splice(0);
                        this.scroll.x = res.result.headerList.length * 200
                        res.result.headerList.forEach(el => {
                            this.columns.push({
                                title: el.displayName,
                                dataIndex: el.dataIndex,
                                width: 200,
                                align: "center"
                            });
                        });
                        this.queryArray.splice(0);
                        res.result.reportFilterList.forEach((el, index) => {
                            this.queryArray.push(el.decorator);
                            this.filterList.push({
                                index: index,
                                label: el.label,
                                decorator: el.decorator,
                                required: el.required,
                                allowClear: true,
                                message:
                                    el.inputType == "input"
                                        ? "Please input " + el.label
                                        : "Please select " + el.label,
                                placeHolder: !el.placeHolder
                                    ? el.inputType == "input"
                                        ? "Please input " + el.label
                                        : "Please select " + el.label
                                    : el.placeHolder,
                                inputType: el.inputType,
                                text: el.defaultValue,
                                dropDownList: el.dropDownList ? JSON.parse(el.dropDownList) : "",
                                cascader: el.linkCol ? JSON.parse(el.linkCol) : ""
                            });
                        });
                        this.hasQuery = this.filterList.length == 0 ? false : true;
                    } else {
                        this.$notification.open({
                            message: "Error:",
                            description: "Failed to load query fields.",
                            duration: 6,
                            style: {background: "#F5222D"} //red
                        });
                    }
                });
            },
            changeLanguage() {
                console.log(this.language);
                if (this.language == "zh-CN") {
                    this.columns = langZh.tableTitle_langZh;
                    this.filterlList = langZh.filter_langZh;
                    this.categoryReportFormList = langZh.categoryReports_langZh;
                } else if (this.language == "en-US") {
                    this.columns = langEn.tableTitle_langEn;
                    this.filterlList = langEn.filter_langEn;
                    this.categoryReportFormList = langEn.categoryReports_langEn;
                }
                console.log(this.categoryReportFormList);
            },
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    console.log("err", err);
                    console.log("values", values);
                    if (!err) {
                        this.$notification.open({
                            message: "Search condition error:",
                            description: "Please fill in query parameters.",
                            duration: 6,
                            style: {background: "#F5222D"} //red
                        });
                    }
                });
            },
            getDropDown(param, dropdownList, key) {
                getDropDownList(Object.assign({}, param)).then(res => {
                    dropdownList.length = 0;
                    res.result.forEach(el => {
                        dropdownList.push(el[key]);
                    });
                });
            },
            getPopupContainer(trigger) {
                return trigger.parentElement;
            },
            filterOption(input, option) {
                return (
                    option.componentOptions.children[0].text
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                );
            },
            moment,
            // 收起展开
            toggleAdvanced() {
                this.advanced = !this.advanced;
            }
        }
    };
</script>

