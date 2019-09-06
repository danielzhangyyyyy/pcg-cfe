<template>
    <a-card :bordered="false" class="content">
        <div class="table-page-search-wrapper">
            <a-form layout="inline" :form="form">
                <a-row :gutter="48">
                    <a-col :md="8" :sm="24" v-for="item in filterList.slice(0,4)" :key="item.index">
                        <a-form-item :label="item.label">
                            <a-input
                                    :placeholder="item.placeHolder"
                                    v-if="item.inputType=='input'"
                                    :disabled="item.editDisabled"
                                    @change="inputChange($event, item.decorator)"
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
                                    v-if="item.inputType=='date'"
                                    :getCalendarContainer="getPopupContainer"
                                    :disabled="item.editDisabled"
                                    :placeholder="item.placeHolder"
                                    :allowClear="item.allowClear"
                                    v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                            />
                        </a-form-item>
                    </a-col>
                    <template v-if="advanced">
                        <a-col :md="8" :sm="24" v-for="item in filterList.slice(4)" :key="item.index">
                            <a-form-item :label="item.label">
                                <a-input
                                        :placeholder="item.placeHolder"
                                        @change="inputChange($event, item.decorator)"
                                        v-if="item.inputType=='input'"
                                        :disabled="item.editDisabled"
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
                                        v-if="item.inputType=='date'"
                                        :getCalendarContainer="getPopupContainer"
                                        :disabled="item.editDisabled"
                                        :placeholder="item.placeHolder"
                                        :allowClear="item.allowClear"
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
                      @click="() => {form.resetFields()}"
              >{{ $t('lang.tabComResetButtonName') }}</a-button>
            </span>
                    </a-col>
                </a-row>
            </a-form>
        </div>

        <tableBtns
                :currentPageManipulationAuth="currentPageManipulationAuth"
                :queryParamemter="queryParam"
                uploadId="UPLOAD_REAL_DUMMY_PART_MAP_DATA"
                @deleteSeclectAll="deleteSeclectAll"
        ></tableBtns>

        <s-table
                ref="table"
                :columns="columns"
                :loading="loading"
                :scroll="scrollSize"
                size="small"
                :rowKey="(record) => `${record.rid +'@'+record.productGroup +'@'+record.partNumber+'@'+record.dummyPart+'@'+record.commodity+'@'+record.owner}`"
                :data="loadData"
                :alert="options.alert"
                :rowSelection="options.rowSelection"
        ></s-table>
    </a-card>
</template>

<script>
    import moment from "moment";
    import {isNullOrUndefined} from "util";
    import {STable, tableBtns} from "@/components";
    import {del, getDropDownList, list} from "@api/realDummyMapping_api";
    import {getXScrollSize} from "@api/publicFunc_api";
    import langZh from "../../locales/zh-CN/realDummyMapping_lang.js";
    import langEn from "../../locales/en-US/realDummyMapping_lang.js";

    export default {
        name: "TableList",
        components: {
            STable,
            tableBtns
        },
        data() {
            return {
                commodityDataList: [],
                filterList: langEn.filter_langEn,
                form: this.$form.createForm(this),
                currentPageManipulationAuth: ["Delete", "View", "Upload"],
                mdl: {},
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
            //        getDropDownList({ moduleName: "getCommodityList" }).then(res => {
            //            this.commodityDataList.length = 0;
            //            res.result.forEach(item => {
            //                this.commodityDataList.push(item["COMMODITY"]);
            //            });
            //        });
            this.getDropDown({}, this.commodityDataList, "commodity");
            //        this.setDropDownLists();
        },
        watch: {
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
                    if (route.path === "/realDummyMapping/realDummyMapping_list") {
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
                // this.$refs.table.refresh(true);
                this.form.validateFields((err, values) => {
                    console.log("err", err);
                    console.log("values", values);
                    if (!err) {
                        for (let key in values) {
                            if (key === "commodity") {
                                this.queryParam[key] = values[key];
                            } else {
                                let val = "";
                                values[key] !== undefined
                                    ? (val = values[key].trim())
                                    : (val = values[key]);
                                val !== "" && val !== undefined
                                    ? (this.queryParam[key] = `%${val}%`)
                                    : (this.queryParam[key] = values[key]);
                            }
                        }
                        this.$refs.table.refresh(true);
                    } else {
                        this.$notification.open({
                            message: "Search condition error:",
                            description:
                                "Please fill in 'Real Part' or select 'Commodity' or fill in 'Owner' or fill in 'Dummy Part' before proceeding!",
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
            //        setDropDownLists() {
            //            this.filterList.forEach(element => {
            //                if (element["decorator"] == "plantType") {
            //                    element["dropDownList"] = [].concat(this.plantTypeListData);
            //                }
            //            });
            //        },
            getDropDown(param, dropdownList, key) {
                getDropDownList(Object.assign({}, param)).then(res => {
                    dropdownList.splice(0);
                    res.result.forEach(el => {
                        dropdownList.push(el[key]);
                    });
                });
            },
            handleDropDownChange(value, decorator) {
                if (decorator === "owner") {
                    this.changeRequrie(value, decorator);
                } else if (decorator === "commodity") {
                    this.changeRequrie(value, decorator);
                }
            },
            inputChange(ev, decorator) {
                let value = ev.target.value;
                this.changeRequrie(value, decorator);
            },
            /*
             *  下拉框校验
             * */
            changeRequrie(value, decoratorC) {
                let requiredArray = ["dummyPart", "commodity", "owner", "partNumber"];
                let existedValue = false;
                let existedkeys = [];
                let fieldsValues = this.form.getFieldsValue([
                    "dummyPart",
                    "commodity",
                    "owner",
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
            getListFun() {
                const that = this;
                // const value = this.queryParam
                that.loadData = parameter => {
                    that.searchLoading = true;
                    console.log("loadData.parameter", parameter);
                    return list(Object.assign(parameter, that.queryParam)).then(res => {
                        console.log(res.result);
                        that.searchLoading = false;
                        that.$refs.table.clearSelected();
                        return res.result;
                    });
                };
            },
            // 选择列表
            onSelectChange(selectedRowKeys, selectedRows) {
                //console.log('selectedRowKeys changed: ', selectedRowKeys)
                this.selectedRowKeys = selectedRowKeys;
                // this.selectedRows = selectedRows
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
                this.selectedRowKeys.forEach(element => {
                    rowKeys.push({
                        rid: element.split("@")[0],
                        productGroup: element.split("@")[1],
                        partNumber: element.split("@")[2],
                        dummyPart: element.split("@")[3],
                        commodity: element.split("@")[4],
                        owner: element.split("@")[5]
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
