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
                                    v-decorator="[item.decorator, {initialValue: item.text,rules: [{required: item.required, message: item.message }]}]"
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
                            <a-date-picker
                                    :getCalendarContainer="getPopupContainer"
                                    v-if="item.inputType=='date'"
                                    :disabled="item.editDisabled"
                                    :placeholder="item.placeHolder"
                                    :allowClear="item.allowClear"
                                    v-decorator="[item.decorator,{rules: [{required: item.required, message: item.message }]}]"
                            />
                        </a-form-item>
                    </a-col>

                    <template v-if="advanced">
                        <a-col :md="8" :sm="24" v-for="item in filterList.slice(2, 11)" :key="item.index">
                            <a-form-item :label="item.label">
                                <a-input
                                        :placeholder="item.placeHolder"
                                        v-if="item.inputType=='input'"
                                        :disabled="item.editDisabled"
                                        @change="inputChange($event, item.decorator)"
                                        v-decorator="[item.decorator, {initialValue: item.text,rules: [{required: item.required, message: item.message }]}]"
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
                                <a-date-picker
                                        :getCalendarContainer="getPopupContainer"
                                        v-if="item.inputType=='date'"
                                        :disabled="item.editDisabled"
                                        :placeholder="item.placeHolder"
                                        :allowClear="item.allowClear"
                                        @change="dateChange($event, item.decorator)"
                                        v-decorator="[item.decorator,{rules: [{required: item.required, message: item.message }]}]"
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
                uploadId="UPLOAD_ORI_COSTTAPE_DATA"
                @addNewTable="addNewTable"
                @editSelectOne="editSelectOne"
                @deleteSeclectAll="deleteSeclectAll"
        ></tableBtns>

        <s-table
                ref="table"
                :columns="columns"
                :loading="loading"
                :scroll="scrollSize"
                size="small"
                :rowKey="(record) => `${record.rid}`"
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
    import {isNullOrUndefined} from "util";
    import {del, getCommodity, getDropDownList, getSpecByCommodity, list} from "@api/costTapeUpload_api";
    import {getXScrollSize} from "@api/publicFunc_api";
    import langZh from "../../locales/zh-CN/costTapeUpload_lang.js";
    import langEn from "../../locales/en-US/costTapeUpload_lang.js";

    export default {
        name: "TableList",
        components: {
            STable,
            tableBtns
        },
        data() {
            return {
                specParams: {
                    cycle: "",
                    commodity: ""
                },
                cycleDataList: [],
                mfgPlantDataList: [],
                costElemDataList: [],
                pgDataList: [],
                statusDataList: [],
                commodityDataList: [],
                specDataList: [],
                isValidateDataList: ["INVALIDATE", "VALIDATE"],
                filterList: langEn.filter_langEn,
                form: this.$form.createForm(this),
                currentPageManipulationAuth: ["Delete", "Update", "View", "Upload"],
                searchLoading: false,
                loading: false, // 页面是否加载中
                advanced: false, // 高级搜索 展开/关闭
                queryParam: {
                    cycle: "CURRENT"
                }, // 查询参数
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
                {moduleName: "getMfgPlantList"},
                this.mfgPlantDataList,
                "MFG_PLANT",
                getDropDownList
            );
            this.getDropDown(
                {moduleName: "getCostElemList"},
                this.costElemDataList,
                "COST_ELEM",
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
            this.getDropDown(
                {moduleName: "getStatusList"},
                this.statusDataList,
                "STATUS",
                getDropDownList
            );
            this.getCommoditySelect({cycle: this.queryParam.cycle});
            this.getSpecByCommoditySelect({
                cycle: this.queryParam.cycle,
                commodity: this.specParams.commodity
            });
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
            language(val) {
                this.changeLanguage();
            },
            $route: {
                handler(route) {
                    console.log(route.path);
                    if (route.path === "/costTapeUpload/costTapeUpload_list") {
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
            searchOnClick() {
                this.form.validateFields((err, values) => {
                    console.log("values", values);
                    if (!err) {
                        for (let key in values) {
                            if (
                                (key === "ownerCosttape" || key === "partNumber") &&
                                (values[key] != undefined && values[key] !== "")
                            ) {
                                this.queryParam[key] = "%" + values[key] + "%";
                            } else if (
                                key === "sysLastModifiedDateStart" &&
                                !isNullOrUndefined(values[key])
                            ) {
                                this.queryParam[key] = values[key].format("YYYY-MM-DD");
                            } else if (
                                key === "sysLastModifiedDateEnd" &&
                                !isNullOrUndefined(values[key])
                            ) {
                                this.queryParam[key] = values[key].format("YYYY-MM-DD");
                            } else {
                                this.queryParam[key] = values[key];
                            }
                        }
                        this.$refs.table.refresh(true);
                    } else {
                        this.$notification.open({
                            message: "Search condition error:",
                            description: "Please fill in 'Part Number' or select 'Mfg Plant' or fill in 'Owner' or select 'Last Modified Date' before proceeding!",
                            duration: 6,
                            style: {'background': '#F5222D'}
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
            getMonths() {
                getDropDownList({
                    moduleName: "getMonthListByCycle",
                    cycle: "CURRENT"
                }).then(res => {
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
            // 获取commodity的selcet 及联cycle
            getCommoditySelect(params) {
                this.form.resetFields(["commodity"]);
                this.specDataList = [];
                this.getDropDown(
                    params,
                    this.commodityDataList,
                    "commodity",
                    getCommodity
                );
            },
            // 获取spec 的selct 及联cycle与commodity
            getSpecByCommoditySelect(params) {
                this.form.resetFields(["spec"]);
                this.specDataList = [];
                this.getDropDown(params, this.specDataList, "spec", getSpecByCommodity);
            },
            handleDropDownChange(value, decorator) {
                console.log(value, "vale333333");
                if (decorator === "cycle") {
                    this.specParams.cycle = value;
                    this.getSpecByCommoditySelect({
                        cycle: this.specParams.cycle,
                        commodity: this.specParams.commodity
                    });
                    this.getCommoditySelect({cycle: this.specParams.cycle});
                } else if (decorator === "commodity") {
                    this.specParams.commodity = value;
                    if (this.specParams.cycle !== "") {
                        this.getSpecByCommoditySelect({
                            cycle: this.specParams.cycle,
                            commodity: this.specParams.commodity
                        });
                    } else {
                        this.getSpecByCommoditySelect({
                            cycle: this.queryParam.cycle,
                            commodity: this.specParams.commodity
                        });
                    }
                }
                if (decorator === "mfgPlant") {
                    this.requiredParams[decorator] = value;
                    this.changeRequrie(value, decorator);
                }
            },
            /*
             *  下拉框校验
             * */
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
            getListFun() {
                const that = this;
                that.loadData = parameter => {
                    if (that.queryParam.mfgPlant || that.queryParam.ownerCosttape || that.queryParam.sysLastModifiedDateStart || that.queryParam.sysLastModifiedDateEnd || that.queryParam.partNumber) {
                        that.searchLoading = true;
                        return list(Object.assign(parameter, that.queryParam)).then(res => {
                            that.searchLoading = false;
                            that.$refs.table.clearSelected();
                            return res.result;
                        });
                    } else {
                        that.searchLoading = false;
                        return new Promise((resolve, reject) => {
                            resolve({list: [], pageNum: 0, pageSize: 0, total: 0})
                        }).then(res => {
                            return res
                        })
                    }

                };
            },
            addNewTable() {
                // 新建列表
                this.$router.replace("/costTapeUpload/costTapeUpload_add");
            },
            editSelectOne() {
                // 修改选中行
                const selectedRowKeyslen = this.selectedRowKeys.length;
                console.log(selectedRowKeyslen);
                if (selectedRowKeyslen == 1) {
                    for (let item of this.selectedRows) {
                        console.log(item.cycle, "item11111");
                        if (item.cycle != "CURRENT") {
                            this.$message.error("Only the data of CURRENT cycle can be delete");
                            return;
                        } else {
                            console.log(this.selectedRowKeys[0], 11111);
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

            // 选择列表
            onSelectChange(selectedRowKeys, selectedRows) {
                //console.log('selectedRowKeys changed: ', selectedRowKeys)
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
                    onCancel() {}
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
