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
                                    :allowClear="item.allowClear"
                                    :disabled="item.editDisabled"
                                    v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                            />
                            <a-select
                                    :getPopupContainer="getPopupContainer"
                                    showSearch
                                    :filterOption="filterOption"
                                    optionFilterProp="children"
                                    v-if="item.inputType=='dropDown'"
                                    :allowClear="item.allowClear"
                                    :placeholder="item.placeHolder"
                                    v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }] }]"
                                    @change="handleDropDownChange($event, item.decorator)"
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
                                        :allowClear="item.allowClear"
                                        v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                                />
                                <a-select
                                        :getPopupContainer="getPopupContainer"
                                        showSearch
                                        :filterOption="filterOption"
                                        optionFilterProp="children"
                                        v-if="item.inputType=='dropDown'"
                                        :allowClear="item.allowClear"
                                        :placeholder="item.placeHolder"
                                        v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                                        @change="handleDropDownChange($event, item.decorator)"
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
              <!-- <a-button type="primary" @click="$refs.table.refresh(true)">{{ $t('lang.tabComSearchButtonName') }}</a-button> -->
              <a-button
                      type="primary"
                      :loading="searchLoading"
                      @click="searchOnClick"
                      icon="search"
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
                uploadId="UPLOAD_UI_MACHTYPEPRODF"
                v-on:editSelectOne="editSelectOne"
        ></tableBtns>

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
        del,
        getDropDownList,
        getProductFamilyDropDownList,
        getProductTypeDropDownList,
        list
    } from "@api/machineTypeFamily_api";
    import {getXScrollSize} from "@api/publicFunc_api";
    import langZh from "../../locales/zh-CN/machineTypeFamily_lang.js";
    import langEn from "../../locales/en-US/machineTypeFamily_lang.js";
    import {isNullOrUndefined} from "util";

    export default {
        name: "TableList",
        components: {
            STable,
            tableBtns
        },
        data() {
            return {
                currentPageManipulationAuth: ["Update", "View", "Upload"],
                ProductFamilyDropdownList: [],
                ProductTypeDropdownList: [],
                eolStatus: ["EOL", "OL", "TEMP"],
                filterList: langEn.filter_langEn,
                form: this.$form.createForm(this),
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
            this.setDropDownLists();
            this.getDropDown(
                {},
                this.ProductFamilyDropdownList,
                "prodFamily",
                getProductFamilyDropDownList
            );
            this.getDropDown(
                {},
                this.ProductTypeDropdownList,
                "pvalue",
                getProductTypeDropDownList
            );
        },
        watch: {
            ProductTypeDropdownList(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "productType") {
                        element["dropDownList"] = [].concat(this.ProductTypeDropdownList);
                    }
                });
            },
            ProductFamilyDropdownList(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "prodFamily") {
                        element["dropDownList"] = [].concat(this.ProductFamilyDropdownList);
                    }
                });
            },
            language(val) {
                this.changeLanguage();
            },
            $route: {
                handler(route) {
                    console.log(route.path);
                    if (route.path === "/machineTypeFamily/machineTypeFamily_list") {
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
            filterOption(input, option) {
                return (
                    option.componentOptions.children[0].text
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                );
            },
            searchOnClick() {
                this.form.validateFields((err, values) => {
                    console.log("err", err);
                    console.log("values", values);
                    const {
                        machinetype,
                        prodFamily,
                        productType = "",
                        eolStatus = ""
                    } = values;
                    if (
                        (machinetype != "" && !isNullOrUndefined(machinetype)) ||
                        (prodFamily != "" && !isNullOrUndefined(prodFamily))
                    ) {
                        this.queryParam = {
                            machinetype,
                            prodFamily,
                            productType,
                            eolStatus
                        };
                        this.$refs.table.refresh(true);
                    } else {
                        this.$notification.open({
                            message: "Search condition error:",
                            description: "please input search conditions.",
                            duration: 6,
                            style: {background: "#F5222D"}
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
                            description: "please input search conditions.",
                            duration: 6,
                            style: {background: "#F5222D"}
                        });
                    }
                });
            },
            setDropDownLists() {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "eolStatus") {
                        element["dropDownList"] = [].concat(this.eolStatus);
                    }
                });
            },
            handleDropDownChange(value, decorator) {
            },
            getDropDown(param, dropdownList, key, api) {
                api(Object.assign({}, param)).then(res => {
                    dropdownList.length = 0;
                    res.result.forEach(el => {
                        el ? dropdownList.push(el[key]) : ''
                    });
                });
            },
            getListFun() {
                this.searchLoading = true;
                const that = this;
                // const value = this.queryParam
                that.loadData = parameter => {
                    console.log("loadData.parameter", parameter);
                    return list(Object.assign(parameter, that.queryParam)).then(res => {
                        console.log(res.result);
                        this.searchLoading = false;
                        that.$refs.table.clearSelected();
                        return res.result;
                    });
                };
            },
            addNewTable() {
                // 新建列表
                this.$router.replace("/machineTypeFamily/machineTypeFamily_add");
            },
            editSelectOne() {
                // 修改选中行
                const selectedRowKeyslen = this.selectedRowKeys.length;
                console.log(selectedRowKeyslen);
                if (selectedRowKeyslen == 1) {
                    const editSelectKey = this.selectedRowKeys[0];
                    Vue.ls.set("machineTypeFamily_editSelectKey", editSelectKey);
                    this.$router.replace(`/machineTypeFamily/machineTypeFamily_edit`);
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
                console.log("selectedRowKeys changed: ", selectedRowKeys);
                this.selectedRowKeys = selectedRowKeys;
                // this.selectedRows = selectedRows
            },
            // 修改用户
            editListFun(rowKey, disab) {
                console.log(rowKey);
                console.log(disab);
                this.$refs.editForm.edit(rowKey, disab);
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
