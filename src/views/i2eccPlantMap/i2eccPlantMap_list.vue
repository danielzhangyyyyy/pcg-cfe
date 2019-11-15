<template>
    <a-card :bordered="false" class="content">
        <div class="table-page-search-wrapper">
            <a-form layout="inline" @submit="handleSubmit" :form="form">
                <a-row :gutter="48">
                    <a-col :md="8" :sm="24" v-for="item in filterList.slice(0,4)" :key="item.index">
                        <a-form-item :label="item.label">
                            <a-input
                                    :placeholder="item.placeHolder"
                                    v-if="item.inputType=='input'"
                                    :disabled="item.editDisabled"
                                    v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                            />
                            <a-select
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
                                    v-if="item.inputType=='date'"
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
                                        v-if="item.inputType=='input'"
                                        :disabled="item.editDisabled"
                                        v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                                />
                                <a-select
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
                                        v-if="item.inputType=='date'"
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
                uploadId="UPLOAD_I2ECC_PLANT"
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
                :customRow="(record) => { return {
                    on:{
                      dblclick:(record)=>{
//                        this.doubleClickOnRow(record,true)
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
    import {del, getDropDownList, list} from "@api/i2eccPlantMap_api";
    import {getXScrollSize} from "@api/publicFunc_api";
    import langZh from "../../locales/zh-CN/i2eccPlantMap_lang.js";
    import langEn from "../../locales/en-US/i2eccPlantMap_lang.js";

    export default {
        name: "TableList",
        components: {
            STable,
            tableBtns
        },
        data() {
            return {
                brandI2EccListData: [],
                i2PlantListData: [],
                eccPlantListData: [],
                currencyListData: [],
                filterList: langEn.filter_langEn,
                form: this.$form.createForm(this),
                currentPageManipulationAuth: ["View", "Delete", "Upload"],
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
            this.getDropDown(
                {moduleName: "getBrandI2ECCList"},
                this.brandI2EccListData,
                "BRAND"
            );
            this.getDropDown(
                {moduleName: "getI2PlantList"},
                this.i2PlantListData,
                "I2_PLANT"
            );
            this.getDropDown(
                {moduleName: "getCurrencyList"},
                this.currencyListData,
                "CURRENCY_NAME"
            );
        },
        watch: {
            brandI2EccListData(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "brand") {
                        element["dropDownList"] = [].concat(this.brandI2EccListData);
                    }
                });
            },
            i2PlantListData(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "i2Plant") {
                        element["dropDownList"] = [].concat(this.i2PlantListData);
                    }
                });
            },
            eccPlantListData(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "eccPlant") {
                        element["dropDownList"] = [].concat(this.eccPlantListData);
                    }
                });
            },
            currencyListData(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "currencyName") {
                        element["dropDownList"] = [].concat(this.currencyListData);
                    }
                });
            },
            language(val) {
                this.changeLanguage();
            },
            $route: {
                handler(route) {
                    console.log(route.path);
                    if (route.path === "/i2eccPlantMap/i2eccPlantMap_list") {
                        this.handleOk();
                    }
                },
                deep: true
            }
        },
        methods: {
            searchOnClick() {
                // this.$refs.table.refresh(true);
                this.form.validateFields((err, values) => {
                    console.log("err", err);
                    console.log("values", values);
                    if (!err) {
                        this.queryParam.brand = values.brand;
                        this.queryParam.i2Plant = values.i2Plant;
                        this.queryParam.eccPlant = values.eccPlant;
                        this.queryParam.currencyName = values.currencyName;
                        this.$refs.table.refresh(true);
                    } else {
                        this.$notification.config({
                            duration: 5
                        });
                        this.$notification["error"]({
                            message: "Search condition error:",
                            description: "please input search conditions."
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

            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    console.log("err", err);
                    console.log("values", values);
                    if (!err) {
                        this.$notification.config({
                            duration: 5
                        });
                        this.$notification["error"]({
                            message: "Search condition error:",
                            description: "please input search conditions."
                        });
                    }
                });
            },
            handleDropDownChange(value, decorator) {
                if (decorator === "i2Plant") {
                    this.form.resetFields(["eccPlant"]);
                    this.eccPlantListData.splice(0);
                    this.getDropDown(
                        {moduleName: "getEccPlantList", i2Plant: value},
                        this.eccPlantListData,
                        "ECC_PLANT"
                    );
                }
            },
            getDropDown(param, dropdownList, key) {
                getDropDownList(Object.assign({}, param)).then(res => {
                    dropdownList.splice(0);
                    res.result.forEach(el => {
                        dropdownList.push(el[key]);
                    });
                });
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
            doubleClickOnRow(record) {
                // 双击行查看详情
                const rowKey = record.target.parentNode.dataset.rowKey;
                console.log(rowKey);
                Vue.ls.set("i2eccPlantMap_dblclickRowKey", rowKey);
                this.$router.replace("/i2eccPlantMap/i2eccPlantMap_detail");
                // this.editListFun(rowKey, true)
            },

            // 选择列表
            onSelectChange(selectedRowKeys, selectedRows) {
                //console.log('selectedRowKeys changed: ', selectedRowKeys)
                this.selectedRowKeys = selectedRowKeys;
                // this.selectedRows = selectedRows
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
                                        style: {'background': '#F5222D'}
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
                this.form.resetFields()
                this.queryParam = {
                    brand: '',
                    i2Plant: '',
                    eccPlant: '',
                    currencyName: ''
                };
                this.brandI2EccListData = []
                this.i2PlantListData = []
                this.eccPlantListData = []
                this.currencyListData = []
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
