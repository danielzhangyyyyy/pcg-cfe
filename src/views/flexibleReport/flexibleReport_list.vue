<template>
    <a-card :bordered="false" class="content">
        <div class="table-page-search-wrapper">
            <a-form layout="inline" @submit="handleSubmit" :form="form">
                <a-row :gutter="48">
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
                                        :mode="item.mode"
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
            <a-button
                    v-if="searchStatus"
                    type="primary"
                    @click="searchOnClick"
                    :loading="searchLoading"
                    icon="search"
            >{{ $t('lang.tabComSearchButtonName') }}
            </a-button>
            <a-button
                    v-if="executeStatus"
                    type="primary"
                    @click="executeOnClick"
                    :loading="executeLoading"
                    icon="form"
            >{{$t('lang.tabComExecuteBtn')}}
            </a-button>
            <a-button
                    v-if="exportStatus"
                    type="primary"
                    icon="download"
                    @click="exportOnClick"
                    :loading="exportLoading"
            >Export
            </a-button>
            <a @click="toggleAdvanced" style="margin-left: 8px" v-if="hasQuery">
                {{ advanced ? $t('lang.tabComToggleCloseName') : $t('lang.tabComToggleShowName') }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
            </a>
        </div>
        <a-table
                ref="table"
                size="small"
                :scroll="scroll"
                :columns="columns"
                :dataSource="dataSource"
                :rowKey="(record) => record.RID"
                :pagination="pagination"
                :loading="loading"
                @change="handleTableChange"
        ></a-table>
    </a-card>
</template>
<script>
    import moment from "moment";
    import {executeApi, getCommonList, getReportData, getReportFilter} from "@api/flexibleQuery_api";
    import {isArray} from "util";
    import {exportByURL} from "@api/exportFunction_api";

    export default {
        name: "TableList",
        data() {
            return {
                searchStatus: false,
                executeStatus: false,
                exportStatus: false,
                filterList: [],
                form: this.$form.createForm(this),
                categoryReports: [],
                scroll: {x: true},
                defaultPagination: {
                    defaultCurrent: 1,
                    showSizeChanger: true,
                    hideOnSinglePage: true,
                    showTotal: total =>
                        total < 1000
                            ? total == 1
                            ? `${total} row totally`
                            : `${total} row(s) totally`
                            : this.$t("lang.messageFor2000Records"),
                    pageSizeOptions: ["10", "50", "100", "150"]
                },
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
        created() {
            const temp = this.$route.path
                .split("/flexibleReport_list")[0]
                .replace("/", "");
            const flexibleReportId = JSON.parse(
                localStorage.getItem("flexibleReportId")
            );
            this.queryParam.rptId = flexibleReportId[temp];
            this.getFilter({rptId: flexibleReportId[temp]});
        },
        watch: {
            $route: {
                handler(route) {
                    if (route.path.indexOf("flexibleReport_list") > 0) {
                        const temp = this.$route.path
                            .split("/flexibleReport_list")[0]
                            .replace("/", "");
                        const flexibleReportId = JSON.parse(
                            localStorage.getItem("flexibleReportId")
                        );
                        this.queryParam.rptId = flexibleReportId[temp];
                        this.getFilter({rptId: flexibleReportId[temp]});
                    }
                },
                deep: true
            }
        },
        methods: {
            toggleCascader(value, item) {
                if (item.cascader) {
                    item.cascader.forEach(el => {
                        this.form.resetFields([el.field]);
                        this.filterList.forEach(element => {
                            if (element.decorator == el.field) {
                                element.dropDownList.splice(0);
                                let fieldsValue = this.form.getFieldsValue(el.father);
                                fieldsValue[item.decorator] = value;
                                getCommonList({moduleName: el.moduleName, ...fieldsValue}).then(
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
                        });
                    });
                }
                this.countLoadData++;
            },
            handleQueryDropDownChange(value, item) {
                !isArray(value) ? this.toggleCascader(value, item) : "";
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
                        for (let key in values) {
                            if (values[key] && values[key].constructor.name == "Moment") {
                                values[key] = values[key].format("YYYY-MM-DD");
                            }
                        }
                        values.rptId = this.queryParam.rptId;
                        for (let key in values) {
                            values[key] != undefined
                                ? (values[key] = values[key].toString())
                                : "";
                        }
                        exportByURL(values, "flexibleQuery/exportExcel").then(res => {
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
            executeOnClick() {
                let self = this;
                self.executeLoading = true;
                self.form.validateFields((err, values) => {
                    if (!err) {
                        for (let key in values) {
                            if (values[key] && values[key].constructor.name == "Moment") {
                                values[key] = values[key].format("YYYY-MM-DD");
                            }
                        }
                        values.rptId = self.queryParam.rptId;
                        for (let key in values) {
                            values[key] != undefined
                                ? (values[key] = values[key].toString())
                                : "";
                        }
                        this.$confirm({
                            title: self.$t("lang.messageConfirmTitle"),
                            content: self.$t("lang.messageExecuteConfirmation"),
                            onOk() {
                                executeApi(values)
                                    .then(res => {
                                        self.executeLoading = false;
                                        if (res.code == 0) {
                                            self.$notification.open({
                                                message: "Success",
                                                description: res.msg,
                                                duration: 6,
                                                style: {background: "#52C41A"}
                                            });
                                        } else if (res.code == 1) {
                                            self.$notification.open({
                                                message: "Info",
                                                description: res.msg,
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
                this.countLoadData++;
                this.pagination = Object.assign({}, this.defaultPagination);
                this.form.validateFields((err, values) => {
                    if (!err) {
                        for (let key in values) {
                            if (values[key] && values[key].constructor.name == "Moment") {
                                values[key] = values[key].format("YYYY-MM-DD");
                            }
                        }
                        for (let key in values) {
                            values[key] != undefined
                                ? (values[key] = values[key].toString())
                                : "";
                        }
                        this.queryParam = {...this.queryParam, ...values};
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
            getFilter(params) {
                this.searchStatus = false
                this.exportStatus = false
                this.executeStatus = false
                let self = this
                getReportFilter(params).then(res => {
                    if (res.code == 0) {
                        this.columns.splice(0);
                        let arr = (res.result.buttonCtrlList[0]).split(',')
                        if(arr.length>0){
                            if(arr.includes('search')&&arr.length==1){
                                self.searchStatus = true
                            } else if(arr.includes('export')&&arr.length==1){
                                self.exportStatus = true
                            } else if(arr.includes('execute')&&arr.length==1){
                                self.executeStatus = true
                            } else if((arr.includes('search')&&arr.includes('export'))&&arr.length==2){
                                self.searchStatus = true
                                self.exportStatus = true
                            } else if((arr.includes('search')&&arr.includes('execute'))&&arr.length==2){
                                self.searchStatus = true
                                self.executeStatus = true
                            } else if((arr.includes('execute')&&arr.includes('export'))&&arr.length==2){
                                self.exportStatus = true
                                self.executeStatus = true
                            } else if((arr.includes('search')&&arr.includes('execute')&&arr.includes('export'))&&arr.length==3){
                                self.searchStatus = true
                                self.exportStatus = true
                                self.executeStatus = true
                            }
                        }
                        this.scroll.x = res.result.headerList.length * 200;
                        res.result.headerList.forEach(el => {
                            this.columns.push({
                                title: el.displayName,
                                dataIndex: el.dataIndex,
                                width: 200,
                                align: "center"
                                // sorter: true
                            });
                        });
                        this.queryArray.splice(0);
                        this.filterList.splice(0);
                        res.result.reportFilterList.forEach((el, index) => {
                            this.queryArray.push(el.decorator);
                            this.filterList.push({
                                index: index,
                                label: el.label,
                                decorator: el.decorator,
                                required: el.required,
                                allowClear: true,
                                mode: !el.mode ? "default" : "multiple",
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
                                dropDownList: el.dropDownList ? JSON.parse(el.dropDownList) : "",
                                text: el.text,
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

