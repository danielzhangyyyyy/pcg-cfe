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
                            <a-select
                                    showSearch
                                    :getPopupContainer="getPopupContainer"
                                    :filterOption="filterOption"
                                    optionFilterProp="children"
                                    v-if="item.inputType=='dropDown'"
                                    :placeholder="item.placeHolder"
                                    :allowClear="item.allowClear"
                                    v-decorator="[item.decorator, {initialValue: item.text,rules: [{required: item.required, message: item.message }]}]"
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
                        <a-col :md="8" :sm="24" v-for="item in filterList.slice(2)" :key="item.index">
                            <a-form-item :label="item.label">
                                <a-input
                                        :placeholder="item.placeHolder"
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
                                <select-input
                                        v-if="item.inputType=='selectInput'"
                                        v-decorator="[item.decorator,{initialValue: { number: item.text, currency: '=' },rules: [{ validator: checkPrice }],}]"/>
                            </a-form-item>
                        </a-col>
                    </template>
                    <a-col :md="!advanced && 8 || 24" :sm="24">
                        <span class="table-page-search-submitButtons"
                              :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
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
                exportId="RPT_PROACTIVE_VK_COST"
        >
            <a-button type="primary" @click="eventExecute">Execute</a-button>
        </tableBtns>

        <m-table
                :columns="columns"
                :dataSource="loadData"
                :scroll="scrollSize"
                :loading="loading"
                :showPagination="true"
        ></m-table>

        <!--<s-table-->
        <!--ref="table"-->
        <!--:columns="columns"-->
        <!--:loading="loading"-->
        <!--:scroll="scrollSize"-->
        <!--size="small"-->
        <!--:rowKey="(record) => record.rid"-->
        <!--:data="loadData"-->
        <!--:alert="options.alert"-->
        <!--:rowSelection="options.rowSelection">-->
        <!--</s-table>-->
    </a-card>
</template>

<script>
    import Vue from 'vue'
    import moment from 'moment'
    import {STable, tableBtns, mTable, SelectInput} from '@/components'
    import {getXScrollSize} from "@api/publicFunc_api";
    import {list, del, getDropDownList, executeReportWorkflow} from '@api/proactiveVkCost_api'
    import langZh from '../../locales/zh-CN/proactiveVkCost_lang.js'
    import langEn from '../../locales/en-US/proactiveVkCost_lang.js'

    export default {
        name: 'TableList',
        components: {
            STable,
            tableBtns,
            SelectInput,
            mTable
        },
        data() {
            return {
                brandDataList: [],
                cycleDataList: [],
                familyDataList: [],
                salesOrgDataList: [],
                isWarrantyDataList: ['ALL', 'Y', 'N'],
                filterList: langEn.filter_langEn,
                form: this.$form.createForm(this),
                currentPageManipulationAuth: ["View"],
                scrollSize: {
                    y: false
                },
                searchLoading: false,
                loading: false, // 页面是否加载中
                advanced: false, // 高级搜索 展开/关闭
                queryParam: {
                    cycle: 'CURRENT'
                }, // 查询参数
                optionAlertShow: true, // 是否显示选择框
                selectedRowKeys: [], // 选中的行的keys数组
                selectedRows: [], // 选中的行的全部数组
                // 表头
                columns: [],
                loadData: [],
            }
        },
        computed: {
            language() {
                return this.$store.getters.language
            }
        },
        created() {
            this.changeLanguage()
            this.scrollSize.x = getXScrollSize(this.columns, langEn.deltaSize);
            this.getDropDown(
                {moduleName: "getCycleList"},
                this.cycleDataList,
                "CYCLE"
            );
            this.getDropDown(
                {moduleName: "getBrandList"},
                this.brandDataList,
                "BRAND"
            );
            this.getDropDown(
                {moduleName: "getSalesOrgVK"},
                this.salesOrgDataList,
                "SALES_ORG"
            );
            this.setDropDownLists();
        },
        watch: {
            cycleDataList() {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "cycle") {
                        element["dropDownList"] = [].concat(this.cycleDataList);
                    }
                });
            },
            brandDataList() {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "brand") {
                        element["dropDownList"] = [].concat(this.brandDataList);
                    }
                });
            },
            salesOrgDataList() {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "salesOrg") {
                        element["dropDownList"] = [].concat(this.salesOrgDataList);
                    }
                });
            },
            familyDataList() {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "family") {
                        element["dropDownList"] = [].concat(this.familyDataList);
                    }
                });
            },
            language(val) {
                this.changeLanguage()
            },
            $route: {
                handler(route) {
                    if (route.path === '/proactiveVkCost/proactiveVkCost_list') {
                        this.handleOk()
                    }
                },
                deep: true
            }
        },
        methods: {
            eventExecute() {
                let params = {
                    uiName: "proactiveVkCost",
                    uiAction: "PROACTIVE_VK_COST",
                    cycle: this.queryParam.cycle
                }, self = this;
                this.$confirm({
                    title: self.$t("lang.messageConfirmTitle"),
                    content: 'Are you sure to execute?',
                    onOk() {
                        self.executeLoading = true;
                        executeReportWorkflow(params).then(res => {
                            if (res.code === '0') {
                                self.$notification.open({
                                    message: "Success",
                                    description: res.msg,
                                    duration: 6,
                                    style: {background: "#52C41A"}
                                });
                            } else {
                                self.$notification.open({
                                    message: "Error",
                                    description: res.msg,
                                    duration: 6,
                                    style: {'background': '#F5222D'}
                                });
                            }
                        }).catch(err => {
                            console.log(err);
                        })
                    },
                    onCancel() {
                    }
                });

            },
            checkPrice(rule, value, callback) {
                let num = Number(value.number)
                let reg = /^[+-]?(\d|[1-9]\d+)(\.\d+)?$/;
                if (reg.test(num)) {
                    callback();
                    return;
                }
                callback('Please enter number!');
            },
            getPopupContainer(trigger) {
                return trigger.parentElement;
            },
            searchOnClick() {
                this.form.validateFields((err, values) => {
                    console.log("values", values);
                    if (!err) {
                        values.cto ? this.queryParam.cto = values.cto.trim() : '';
                        values.character ? this.queryParam.character = values.character.trim() : '';
                        values.value ? this.queryParam.value = values.value.trim() : '';
                        values.variant ? this.queryParam.variant = values.variant.trim() : '';
                        values.salesOrg ? this.queryParam.salesOrg = values.salesOrg.trim() : '';
                        values.currentSbbCost && values.currentSbbCost.number ? this.queryParam.currentSbbCost = values.currentSbbCost.currency + values.currentSbbCost.number : '';
                        values.currentVkCost && values.currentVkCost.number ? this.queryParam.currentVkCost = values.currentVkCost.currency + values.currentVkCost.number : '';
                        values.deltaSbbCost && values.deltaSbbCost.number ? this.queryParam.deltaSbbCost = values.deltaSbbCost.currency + values.deltaSbbCost.number : '';
                        values.deltaVkCost && values.deltaVkCost.number ? this.queryParam.deltaVkCost = values.deltaVkCost.currency + values.deltaVkCost.number : '';
                        values.latestSbbCost && values.latestSbbCost.number ? this.queryParam.latestSbbCost = values.latestSbbCost.currency + values.latestSbbCost.number : '';
                        values.latestVkCost && values.latestVkCost.number ? this.queryParam.latestVkCost = values.latestVkCost.currency + values.latestVkCost.number : '';
                        this.getListFun()
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
            filterOption(input, option) {
                return (
                    option.componentOptions.children[0].text
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                );
            },
            setDropDownLists() {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "isWarranty") {
                        element["dropDownList"] = [].concat(this.isWarrantyDataList);
                    }
                });
            },
            getDropDown(param, dropdownList, key, api = getDropDownList) {
                api(Object.assign({}, param)).then(res => {
                    dropdownList.splice(0);
                    res.result.forEach(el => {
                        dropdownList.push(el[key]);
                    });
                });
            },
            handleDropDownChange(value, decorator) {
                if (decorator === 'brand') {
                    this.form.resetFields(["family"]);
                    this.familyDataList = [];
                    this.getDropDown(
                        {moduleName: "getProductFamilyList", brand: value},
                        this.familyDataList,
                        "COST_PROD_FAMILY"
                    );
                }
            },
            getListFun() {
                const that = this
                that.searchLoading = true;
                return list(Object.assign({}, that.queryParam)).then(res => {
                    that.searchLoading = false;
                    that.loadData = res.result
                    that.loadData.length > 10 ? that.scrollSize.y = 450 : that.scrollSize.y = false
                })
            },

            // 选择列表
            onSelectChange(selectedRowKeys, selectedRows) {
                this.selectedRowKeys = selectedRowKeys
                // this.selectedRows = selectedRows
            },
            // 更改列表数组
            changeLanguage() {
                if (this.language == 'zh-CN') {
                    this.columns = langZh.tableTitle_langZh
                } else if (this.language == 'en-US') {
                    this.columns = langEn.tableTitle_langEn
                }
            },
            // 刷新列表
            handleOk() {
                this.getListFun();
                // this.$refs.table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页，true刷新到第一页
            },

            // 收起展开
            toggleAdvanced() {
                this.advanced = !this.advanced
            },
            // 重置
            resetSearchForm() {
                this.queryParam = {
                    date: moment(new Date())
                }
            }
        }

    }
</script>
