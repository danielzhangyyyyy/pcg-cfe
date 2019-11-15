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
                        </a-form-item>
                    </a-col>
                    <template v-if="advanced">
                        <a-col :md="8" :sm="24" v-for="item in filterList.slice(2,9)" :key="item.index">
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
                            </a-form-item>
                        </a-col>
                        <a-col :span="16" v-for="item in filterList.slice(9)" :key="item.index">
                            <a-form-item :label="item.label">
                                <a-input
                                        v-if="item.inputType=='partNumber'"
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
                uploadId="EXP_COSTTAPE">
            <a-button v-if="importCostStatus" type="primary" icon="form" @click="doExecute">Import Cost Tape</a-button>
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
    import {
        list,
        getDropDownList,
        getPlantList,
        getCostElemList,
        getPGList,
        getStatusList,
        getCommodityList,
        getSpecList,
        getSourceList,
        executeImport
    } from "@api/costTape_api";
    import {isNullOrUndefined} from "util";
    import {getXScrollSize} from "@api/publicFunc_api";
    import langZh from "../../locales/zh-CN/costTape_lang.js";
    import langEn from "../../locales/en-US/costTape_lang.js";

    export default {
        name: "TableList",
        components: {
            STable,
            tableBtns
        },
        data() {
            return {
                importCostStatus: false,
                initial: true,
                cycleParam: {cycle: "CURRENT"},
                cycleDataList: [],
                plantDataList: [],
                costElemDataList: [],
                pgDataList: [],
                statusDataList: [],
                commodityDataList: [],
                specDataList: [],
                sourceDataList: [],
                usedDataList: ["TRUE", "FALSE"],
                filterList: langEn.filter_langEn,
                columnList: langEn.tableTitle_langEn,
                form: this.$form.createForm(this),
                currentPageManipulationAuth: ["View"],
                mdl: {},
                searchLoading: false,
                loading: false, // 页面是否加载中
                advanced: false, // 高级搜索 展开/关闭
                queryParam: {cycle: "CURRENT"}, // 查询参数
                optionAlertShow: true, // 是否显示选择框
                selectedRowKeys: [], // 选中的行的keys数组
                selectedRows: [], // 选中的行的全部数组
                // 表头
                columns: [],
                loadData: "",
                scrollSize: {},
                requiredParams: {},
                requiredArray: ["plant", "commodity", "partNumber"],
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
                {moduleName: "getCycleList"},
                this.cycleDataList,
                "CYCLE",
                getDropDownList
            );
            this.getDropDown(
                this.cycleParam,
                this.plantDataList,
                "plant",
                getPlantList
            );
            this.getDropDown(
                this.cycleParam,
                this.costElemDataList,
                "costElem",
                getCostElemList
            );
            this.getDropDown(this.cycleParam, this.pgDataList, "pg", getPGList);
            this.getDropDown(
                this.cycleParam,
                this.statusDataList,
                "status",
                getStatusList
            );
            this.getDropDown(
                this.cycleParam,
                this.commodityDataList,
                "commodity",
                getCommodityList
            );
            this.getDropDown(
                this.cycleParam,
                this.sourceDataList,
                "source",
                getSourceList
            );
            this.setDropDownLists();
            this.getMonths();
            this.getPermissions();
        },
        watch: {
            cycleDataList(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "cycle") {
                        element["dropDownList"] = [].concat(this.cycleDataList);
                    }
                });
            },
            plantDataList(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "plant") {
                        element["dropDownList"] = [].concat(this.plantDataList);
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
            specDataList(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "spec") {
                        element["dropDownList"] = [].concat(this.specDataList);
                    }
                });
            },
            sourceDataList(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "source") {
                        element["dropDownList"] = [].concat(this.sourceDataList);
                    }
                });
            },
            language(val) {
                this.changeLanguage();
            },
            $route: {
                handler(route) {
                    console.log(route.path);
                    if (route.path === "/costTape/costTape_list") {
                        this.handleOk()
                    }
                },
                deep: true
            }
        },
        methods: {
            getPermissions() {
                const localRouter = JSON.parse(localStorage.getItem('pcg__GET_MENU'))
                console.log(localRouter, 'localRouter')
                let path = this.$route.path
                for (let item of localRouter.value) {
                    for (let element of item.childMenuList) {
                        if (element.frontRouter === path.substring(1, path.length)) {
                            element.accessLevel && element.accessLevel.includes('Upload') ? this.importCostStatus = true : this.importCostStatus = false
                        }
                    }
                }
            },
            getMonths() {
                getDropDownList({
                    moduleName: "getMonthListByCycle",
                    cycle: "CURRENT"
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
            doExecute() {
                let self = this;
                this.$confirm({
                    title: self.$t("lang.messageConfirmTitle"),
                    content: self.$t("lang.messageImportConfirmation"),
                    onOk() {
                        self.executeLoading = true;
                        const param = {
                            ...self.queryParam,
                            uiAction: "UI_COSTTAPE_FULL_IMPORT"
                        };
                        executeImport(Object.assign({}, param)).then(res => {
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
                this.initial = false;
                // this.$refs.table.refresh(true);
                this.form.validateFields((err, values) => {
                    console.log("err", err);
                    console.log("values", values);
                    if (!err) {
                        this.queryParam.cycle = values.cycle;
                        this.queryParam.plant = values.plant;
                        this.queryParam.costElem = values.costElem;
                        this.queryParam.pg = values.pg;
                        this.queryParam.status = values.status;
                        this.queryParam.commodity = values.commodity;
                        this.queryParam.spec = values.spec;
                        this.queryParam.source = values.source;
                        this.queryParam.used = values.used;
                        this.queryParam.partNumber = values.partNumber
                            ? "%" + values.partNumber.trim() + "%"
                            : values.partNumber;
                        this.$refs.table.refresh(true);
                    } else {
                        this.$notification.open({
                            message: "Search condition error:",
                            description:
                                "Please fill in 'Part Number' or  select 'Plant' or select 'Commodity' before proceeding!",
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
                    if (element["decorator"] == "used") {
                        element["dropDownList"] = [].concat(this.usedDataList);
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
                if (decorator == "cycle") {
                    //change cycleParam value
                    this.cycleParam.cycle = value;
                    //plant
                    this.form.resetFields(["plant"]);
                    this.plantDataList = [];
                    this.getDropDown(
                        this.cycleParam,
                        this.plantDataList,
                        "plant",
                        getPlantList
                    );
                    //costElem
                    this.form.resetFields(["costElem"]);
                    this.costElemDataList = [];
                    this.getDropDown(
                        this.cycleParam,
                        this.costElemDataList,
                        "costElem",
                        getCostElemList
                    );
                    //pg
                    this.form.resetFields(["pg"]);
                    this.pgDataList = [];
                    this.getDropDown(this.cycleParam, this.pgDataList, "pg", getPGList);
                    //status
                    this.form.resetFields(["status"]);
                    this.statusDataList = [];
                    this.getDropDown(
                        this.cycleParam,
                        this.statusDataList,
                        "status",
                        getStatusList
                    );
                    //commodity
                    this.form.resetFields(["commodity"]);
                    this.commodityDataList = [];
                    this.getDropDown(
                        this.cycleParam,
                        this.commodityDataList,
                        "commodity",
                        getCommodityList
                    );
                    //source
                    this.form.resetFields(["source"]);
                    this.sourceDataList = [];
                    this.getDropDown(
                        this.cycleParam,
                        this.sourceDataList,
                        "source",
                        getSourceList
                    );
                    //clear spec since cycle changed
                    this.form.resetFields(["spec"]);
                    this.specDataList = [];
                    //reset required
                    if (!isNullOrUndefined(this.form.getFieldValue("partNumber"))) {
                        this.changeRequrie("", "plant");
                        this.changeRequrie("", "commodity");
                    } else {
                        this.setRequiredDefault();
                    }
                }
                if (decorator == "plant" || decorator == "commodity") {
                    //for dynamic required filter
                    this.requiredParams[decorator] = value;
                    this.changeRequrie(value, decorator);
                    //for dropdown on change
                    if (decorator == "commodity") {
                        //spec
                        this.form.resetFields(["spec"]);
                        this.specDataList = [];
                        this.getDropDown(
                            {cycle: this.cycleParam.cycle, commodity: value},
                            this.specDataList,
                            "spec",
                            getSpecList
                        );
                    }
                } else if(decorator === 'costElem'){
                    this.changeRequrie(value, decorator);
                }
            },
            inputChange(ev, decorator) {
                let value = ev.target.value;
                if (decorator == "partNumber") {
                    this.requiredParams[decorator] = value;
                    this.changeRequrie(value, decorator);
                }
            },
            /*
            *  下拉框校验
            * */
            changeRequrie(value, decoratorC) {
                let requiredArray = [
                    "plant",
                    "costElem",
                    "commodity",
                    "partNumber"
                ];
                let existedValue = false;
                let existedkeys = [];
                let fieldsValues = this.form.getFieldsValue([
                    "plant",
                    "costElem",
                    "commodity",
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
                    if (this.initial) {
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
                            return res.result;
                        });
                    }
                };
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
                this.$router.replace("/costTape/costTape_add");
            },
            editSelectOne() {
                // 修改选中行
                const selectedRowKeyslen = this.selectedRowKeys.length;
                console.log(selectedRowKeyslen);
                if (selectedRowKeyslen == 1) {
                    for (let item of this.selectedRows) {
                        if (item.cycle != "CURRENT") {
                            this.$message.error("Only the data of CURRENT cycle can be delete");
                            return;
                        } else {
                            const editSelectKey = this.selectedRowKeys[0];
                            Vue.ls.set("costTapeUpload_editSelectKey", editSelectKey);
                            this.$router.replace(`/costTapeUpload/costTapeUpload_edit`);
                        }
                    }
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
                Vue.ls.set("costTape_dblclickRowKey", rowKey);
                this.$router.replace("/costTape/costTape_detail");
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
                if (this.selectedRows[0].cycle != "CURRENT") {
                    this.$message.error("Only the data of CURRENT cycle can be delete");
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
<style scoped>
    .message {
        color: red;
        padding-left: 0;
        display: inline-block;
        line-height: 25px;
    }
</style>
