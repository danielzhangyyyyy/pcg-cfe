<template>
    <a-card :bordered="false" class="content">
        <div class="table-page-search-wrapper">
            <a-form layout="inline" @submit="handleSubmit" :form="form">
                <a-row :gutter="48">
                    <a-col :md="8" :sm="24" v-for="item in filterList.slice(0,2)" :key="item.index">
                        <a-form-item :label="item.label">
                            <a-input
                                    :placeholder="item.placeHolder"
                                    v-if="item.inputType=='input'"
                                    :disabled="item.editDisabled"
                                    @change="inputChange($event, item.decorator)"
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
                            <a-date-picker
                                    :getCalendarContainer="getPopupContainer"
                                    v-if="item.inputType=='date'"
                                    :disabled="item.editDisabled"
                                    :placeholder="item.placeHolder"
                                    :allowClear="item.allowClear"
                                    @change="dateChange($event, item.decorator)"
                                    v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                            />
                        </a-form-item>
                    </a-col>
                    <template v-if="advanced">
                        <a-col :md="8" :sm="24" v-for="item in filterList.slice(2)" :key="item.index">
                            <a-form-item :label="item.label">
                                <a-input
                                        :placeholder="item.placeHolder"
                                        v-if="item.inputType=='input'"
                                        :disabled="item.editDisabled"
                                        @change="inputChange($event, item.decorator)"
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
                                <a-date-picker
                                        :getCalendarContainer="getPopupContainer"
                                        v-if="item.inputType=='date'"
                                        :disabled="item.editDisabled"
                                        :placeholder="item.placeHolder"
                                        :allowClear="item.allowClear"
                                        @change="dateChange($event, item.decorator)"
                                        v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                                />
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
        >
            <a-button type="primary" icon="form" @click="saveData">Save</a-button>
            <a-button type="primary" icon="form" @click="doExecute">Selected Import</a-button>
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
                :customRow="(record) => { return {
                    on:{
                      dblclick:(record)=>{
                       // this.doubleClickOnRow(record,true)
                      }
                    }
                  }}"
                :rowSelection="options.rowSelection"
        ></s-table>
    </a-card>
</template>

<script>
    import Vue from "vue";
    import moment from "moment";
    import {STable, tableBtns} from "@/components";
    import {
        del,
        getCommodity,
        getDropDownList,
        invokeWorkflowSelectedIm,
        list,
        save
    } from "@api/costTapeSelectedImport_api";
    import {isNullOrUndefined} from "util";
    import {getXScrollSize} from "@api/publicFunc_api";
    import langZh from "../../locales/zh-CN/costTapeSelectedImport_lang.js";
    import langEn from "../../locales/en-US/costTapeSelectedImport_lang.js";

    export default {
        name: "TableList",
        components: {
            STable,
            tableBtns
        },
        data() {
            return {
                width: 0,
                saveKeys: "",
                mfgPlantDataList: [],
                costElemDataList: [],
                commodityDataList: [],
                specDataList: [],
                isValidateDataList: ["INVALIDATE", "VALIDATE"],
                filterList: langEn.filter_langEn,
                columnList: langEn.tableTitle_langEn,
                form: this.$form.createForm(this),
                currentPageManipulationAuth: [],
                mdl: {},
                searchLoading: false,
                loading: false, // 页面是否加载中
                advanced: false, // 高级搜索 展开/关闭
                queryParam: {partNumber: ""}, // 查询参数
                optionAlertShow: true, // 是否显示选择框
                selectedRowKeys: [], // 选中的行的keys数组
                selectedRows: [], // 选中的行的全部数组
                // 表头
                columns: [],
                loadData: "",
                scrollSize: {},
                requiredParams: {},
                requiredArray: [
                    "mfgPlant",
                    "ownerCosttape",
                    "sysLastModifiedDateStart",
                    "sysLastModifiedDateEnd",
                    "partNumber"
                ],
                // 加载数据方法 必须为 Promise 对象
                // loadData: parameter => {
                //   console.log('loadData.parameter', parameter)
                //   return list(Object.assign(parameter, this.queryParam))
                //     .then(res => {
                //       console.log(res.result)
                //       return res.result
                //     })
                // },
                // custom table alert & rowSelection
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
                {moduleName: "getMfgPlantList"},
                this.mfgPlantDataList,
                "MFG_PLANT"
            );
            this.getDropDown(
                {moduleName: "getCostElemList"},
                this.costElemDataList,
                "COST_ELEM"
            );
            this.getCommodityList(this.commodityDataList, "commodity");
            this.setDropDownLists();
            this.getMonths();
        },
        watch: {
            mfgPlantDataList(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "mfgPlant") {
                        element["dropDownList"] = [].concat(this.mfgPlantDataList);
                    }
                });
            },
            costElemDataList(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "costElem") {
                        element["dropDownList"] = [].concat(this.costElemDataList);
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
            specDataList(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "spec") {
                        element["dropDownList"] = [].concat(this.specDataList);
                    }
                });
            },
            language(val) {
                this.changeLanguage();
            },
            $route: {
                handler(route) {
                    if (
                        route.path === "/costTapeSelectedImport/costTapeSelectedImport_list"
                    ) {
                        this.handleOk();
                    }
                },
                deep: true
            }
        },
        methods: {
            getMonths() {
                getDropDownList({
                    moduleName: "getMonthListByCycle",
                    cycle: 'CURRENT'
                }).then(res => {
                    let temp = res.result[0];
                    for (let key in temp) {
                        this.columns.forEach(el => {
                            if (
                                el["dataIndex"] &&
                                el["dataIndex"].toUpperCase() === key.toUpperCase()
                            ) {
                                el["title"] = temp[key];
                            }
                        });
                    }
                });
            },
            getPopupContainer(trigger) {
                return trigger.parentElement;
            },
            saveData() {
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
                        partNumber: element.partNumber,
                        mfgPlant: element.mfgPlant,
                        costElem: element.costElem
                    });
                });
                const saveKeys = rowKeys;
                let self = this;
                this.$confirm({
                    title: self.$t("lang.messageSaveConfirmTitle"),
                    content: self.$t("lang.messageSaveSelectedConfirm"),
                    onOk() {
                        return save(saveKeys).then(res => {
                            if (res.code == "0") {
                                self.$notification.open({
                                    message: "Success",
                                    description: self.$t("lang.messageSaveSuccess"),
                                    duration: 6,
                                    style: {background: "#52C41A"}
                                });
                                self.selectedRowKeys = [];
                                self.handleOk();
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
                    }
                });
            },
            doExecute() {
                let self = this;
                this.$confirm({
                    title: self.$t("lang.messageConfirmTitle"),
                    content: self.$t("lang.messageSelectedImportConfirmation"),
                    onOk() {
                        self.executeLoading = true;
                        const param = {
                            ...self.queryParam,
                            uiAction: "UI_COSTTAPE_SELECTED_IMPORT"
                        };
                        invokeWorkflowSelectedIm(Object.assign({}, param)).then(res => {
                            if (res.code == 0) {
                                self.$notification.open({
                                    message: "Success",
                                    description: res.msg,
                                    duration: 6,
                                    style: {background: "#52C41A"}
                                });
                            } else {
                                self.$notification.open({
                                    message: "Error",
                                    description: "Invoke workflow failed! " + res.msg,
                                    duration: 6,
                                    style: {background: "#F5222D"}
                                });
                            }
                            self.executeLoading = false;
                        });
                    },
                    onCancel() {
                    }
                });
            },
            searchOnClick() {
                this.form.validateFields((err, values) => {
                    console.log("values", values);
                    if (!err) {
                        this.queryParam.partNumber = values.partNumber ? `%${values.partNumber.trim()}%` : values.partNumber;
                        this.queryParam.lastModifiedBy = values.lastModifiedBy ? `%${values.lastModifiedBy.trim()}%` : values.lastModifiedBy;
                        this.queryParam.mfgPlant = values.mfgPlant;
                        this.queryParam.costElem = values.costElem;
                        this.queryParam.spec = values.spec;
                        this.queryParam.commodity = values.commodity;
                        this.queryParam.ownerCosttape = values.ownerCosttape ? "%" + values.ownerCosttape.trim() + "%" : values.ownerCosttape;
                        this.queryParam.isValidate = values.isValidate;
                        this.queryParam.sysLastModifiedDateStart = values.sysLastModifiedDateStart ? values.sysLastModifiedDateStart.format("YYYY-MM-DD") : "";
                        this.queryParam.sysLastModifiedDateEnd = values.sysLastModifiedDateEnd ? values.sysLastModifiedDateEnd.format("YYYY-MM-DD") : "";
                        this.$refs.table.refresh(true);
                        this.getMonths();
                    } else {
                        this.$notification.open({
                            message: "Search condition error:",
                            description:
                                "Please fill in 'Part Number' or select 'Mfg Plant' or fill in 'Owner' or select 'Last Modified Date' before proceeding!",
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
            setDropDownLists() {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "mfgPlant") {
                        element["dropDownList"] = [].concat(this.mfgPlantDataList);
                    }
                });
                this.filterList.forEach(element => {
                    if (element["decorator"] == "costElem") {
                        element["dropDownList"] = [].concat(this.costElemDataList);
                    }
                });
                this.filterList.forEach(element => {
                    if (element["decorator"] == "commodity") {
                        element["dropDownList"] = [].concat(this.commodityDataList);
                    }
                });
                this.filterList.forEach(element => {
                    if (element["decorator"] == "spec") {
                        element["dropDownList"] = [].concat(this.specDataList);
                    }
                });
                this.filterList.forEach(element => {
                    if (element["decorator"] == "isValidate") {
                        element["dropDownList"] = [].concat(this.isValidateDataList);
                    }
                });
            },
            getDropDown(param, dropdownList, key) {
                getDropDownList(Object.assign({}, param)).then(res => {
                    dropdownList.splice(0);
                    res.result.forEach(el => {
                        dropdownList.push(el[key]);
                    });
                });
            },
            getCommodityList(dropdownList, key) {
                getCommodity(Object.assign({})).then(res => {
                    dropdownList.splice(0);
                    res.result.forEach(el => {
                        dropdownList.push(el[key]);
                    });
                });
            },
            handleDropDownChange(value, decorator) {
                if (decorator == "commodity") {
                    this.form.resetFields(["spec"]);
                    this.specDataList = [];
                    this.getDropDown(
                        {moduleName: "getSpecByCommodity", commodity: value},
                        this.specDataList,
                        "SPEC"
                    );
                }
                if (decorator === "mfgPlant") {
                    this.requiredParams[decorator] = value;
                    this.changeRequrie(value, decorator);
                }
            },
            inputChange(ev, decorator) {
                let value = ev.target.value;
                this.requiredParams[decorator] = value;
                this.changeRequrie(value, decorator);
            },
            dateChange(ev, decorator) {
                let value = "";
                if (ev !== null) {
                    value = ev.format("YYYY-MM-DD");
                }
                this.requiredParams[decorator] = value;
                this.changeRequrie(value, decorator);
            },
            changeRequrie(value, decoratorC) {
                let existedValue = false;
                let existedkeys = [];
                let fieldsValues = this.form.getFieldsValue(this.requiredArray);
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
                    this.requiredArray.forEach(item => {
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
                    this.setRequiredDefault();
                }
            },
            setRequiredDefault() {
                this.requiredArray.forEach(item => {
                    this.filterList.forEach(el => {
                        if (el.decorator == item) {
                            el.required = true;
                        }
                    });
                });
            },
            getListFun() {
                const that = this;
                // const value = this.queryParam
                that.loadData = parameter => {
                    that.searchLoading = true;
                    console.log("loadData.parameter", parameter);
                    if (that.queryParam.partNumber == "") {
                        const promise = new Promise((resolve, reject) => {
                            if (true) {
                                resolve({
                                    code: "0",
                                    msg: "ok",
                                    result: {
                                        total: 0,
                                        list: [],
                                        pageNum: 1,
                                        pageSize: 10,
                                        size: 10,
                                        startRow: 1,
                                        endRow: 10,
                                        pages: 11,
                                        prePage: 0,
                                        nextPage: 2,
                                        isFirstPage: true,
                                        isLastPage: false,
                                        hasPreviousPage: false,
                                        hasNextPage: true,
                                        navigatePages: 1,
                                        navigatepageNums: [1],
                                        navigateFirstPage: 1,
                                        navigateLastPage: 8,
                                        firstPage: 1,
                                        lastPage: 8
                                    }
                                });
                            } else {
                                reject("something error");
                            }
                        });
                        return promise.then(res => {
                            console.log(res.result);
                            that.searchLoading = false;
                            return res.result;
                        });
                    } else {
                        return list(Object.assign(parameter, that.queryParam)).then(res => {
                            that.searchLoading = false;
                            that.$refs.table.clearSelected();
                            // that.setColumnSize(res.result);
                            return res.result;
                        });
                    }
                };
            },
            //根据列数据修改列宽
            setColumnSize(data) {
                this.columnList.forEach(element => {
                    element["width"] = element["defaultwidth"];
                });
                console.log("data", data.list);
                data.list.forEach(el => {
                    this.columnList.forEach(element => {
                        console.log("element[dataIndex]", element["dataIndex"]);
                        console.log("el[element[dataIndex]]", el[element["dataIndex"]]);
                        if (
                            !isNullOrUndefined(el[element["dataIndex"]]) &&
                            !isNullOrUndefined(element["width"]) &&
                            el[element["dataIndex"]].length * 7 > element["width"]
                        ) {
                            console.log("before", element["width"]);
                            element["width"] = el[element["dataIndex"]].length * 7 + 20;
                            console.log("after", element["width"]);
                        }
                    });
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
                            description: "please input search conditions.",
                            duration: 6,
                            style: {background: "#F5222D"}
                        });
                    }
                });
            },
            addNewTable() {
                // 新建列表
                this.$router.replace(
                    "/costTapeSelectedImport/costTapeSelectedImport_add"
                );
            },
            editSelectOne() {
                // 修改选中行
                const selectedRowKeyslen = this.selectedRowKeys.length;
                console.log(selectedRowKeyslen);
                if (selectedRowKeyslen == 1) {
                    const editSelectKey = this.selectedRowKeys[0];
                    Vue.ls.set("costTapeSelectedImport_editSelectKey", editSelectKey);
                    this.$router.replace(
                        `/costTapeSelectedImport/costTapeSelectedImport_edit`
                    );
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
            doubleClickOnRow(record) {
                // 双击行查看详情
                const rowKey = record.target.parentNode.dataset.rowKey;
                console.log(rowKey);
                Vue.ls.set("costTapeSelectedImport_dblclickRowKey", rowKey);
                this.$router.replace(
                    "/costTapeSelectedImport/costTapeSelectedImport_detail"
                );
                // this.editListFun(rowKey, true)
            },

            // 选择列表
            onSelectChange(selectedRowKeys, selectedRows) {
                //console.log('selectedRowKeys changed: ', selectedRowKeys)
                this.selectedRowKeys = selectedRowKeys;
                this.selectedRows = selectedRows;
            },
            // 修改用户
            editListFun(rowKey, disab) {
                console.log(rowKey);
                console.log(disab);
                this.$refs.editForm.edit(rowKey, disab);
            },
            // 删除单个列表
            // deleteListFun (id) {
            //     console.log(id)
            //     const datas = {
            //         id: id
            //     }
            //     this.delfun(datas)
            // },
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
                        return del(rowKeys)
                            .then(res => {
                                console.log(res);
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
                            })
                            .catch(err => {
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
    };
</script>
