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
                                    :getPopupContainer="getPopupContainer"
                                    showSearch
                                    :filterOption="filterOption"
                                    optionFilterProp="children"
                                    v-if="item.inputType=='dropDown'"
                                    :placeholder="item.placeHolder"
                                    :allowClear="item.allowClear"
                                    v-decorator="[item.decorator, {initialValue: item.text}, {rules: [{required: item.required, message: item.message }]}]"
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
                                        v-decorator="[item.decorator, {initialValue: item.text},{rules: [{required: item.required, message: item.message }]}]"
                                />
                                <a-select
                                        :getPopupContainer="getPopupContainer"
                                        showSearch
                                        :filterOption="filterOption"
                                        optionFilterProp="children"
                                        v-if="item.inputType=='dropDown'"
                                        :placeholder="item.placeHolder"
                                        :allowClear="item.allowClear"
                                        v-decorator="[item.decorator, {initialValue: item.text},{rules: [{required: item.required, message: item.message }]}]"
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
                uploadId="UPLOAD_MODEL_COST_DATA"
                @deleteSeclectAll="deleteSeclectAll"
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
                :rowSelection="options.rowSelection">
        </s-table>
    </a-card>
</template>

<script>
    import moment from 'moment'
    import {STable, tableBtns} from '@/components'
    import {del, getDropDownList, list} from '@api/serviceCost_api'
    import {getXScrollSize} from "@api/publicFunc_api";
    import langZh from '../../locales/zh-CN/serviceCost_lang.js'
    import langEn from '../../locales/en-US/serviceCost_lang.js'

    export default {
        name: 'TableList',
        components: {
            STable,
            tableBtns
        },
        data() {
            return {
                cycleDataList: [],
                brandDataList: [],
                countryDataList: [],
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
                // 表头
                columns: [],
                loadData: '',
                scrollSize: {},
                options: {
                    alert: {
                        show: true, clear: () => {
                            this.selectedRowKeys = []
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
            this.getListFun()
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
                {moduleName: "getCountryList"},
                this.countryDataList,
                "COUNTRY"
            );
            this.getMonths()
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
            brandDataList(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "brand") {
                        element["dropDownList"] = [].concat(this.brandDataList);
                    }
                });
            },
            countryDataList(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "country") {
                        element["dropDownList"] = [].concat(this.countryDataList);
                    }
                });
            },
            language(val) {
                this.changeLanguage()
            },
            $route: {
                handler(route) {
                    if (route.path === '/serviceCost/serviceCost_list') {
                        this.handleOk()
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
                            this.queryParam[key] = values[key]
                        }
                        this.$refs.table.refresh(true);
                        this.getMonths();
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
                    if (element["decorator"] == "plantType") {
                        element["dropDownList"] = [].concat(this.plantTypeListData);
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
            getMonths() {
                getDropDownList({moduleName: 'getMonthListByCycle', cycle: this.queryParam.cycle}).then(res => {
                    for (let key in res.result[0]) {
                        for (let item of this.columns) {
                            if (item.dataIndex && item.dataIndex.toUpperCase() === key.toUpperCase()) {
                                item.title = res.result[0][key]
                            }
                        }
                    }
                });
            },
            handleDropDownChange(value, decorator) {
            },
            getListFun() {
                const that = this
                that.loadData = parameter => {
                    that.searchLoading = true;
                    return list(Object.assign(parameter, that.queryParam)).then(res => {
                        that.searchLoading = false;
                        that.$refs.table.clearSelected();
                        return res.result
                    })
                }
            },
            // 选择列表
            onSelectChange(selectedRowKeys, selectedRows) {
                this.selectedRowKeys = selectedRowKeys
                this.selectedRows = selectedRows
            },
            // 删除单个列表
            deleteListFun(id) {
                console.log(id)
                const datas = {
                    id: id
                }
                this.delfun(datas)
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
                    this.$notification.open({
                        message: "Warn:",
                        description: "Only the data of CURRENT cycle can be Delete",
                        duration: 6,
                        style: {'background': '#FAAD14'}
                    });
                    return;
                }
                const rowKeys = [];
                this.selectedRows.forEach(item => {
                    rowKeys.push({
                        rid: item.rid,
                        model: item.model
                    });
                })
                this.delfun(rowKeys);
            },

            delfun(datas) {
                let self = this;
                this.$confirm({
                    title: self.$t("lang.messageDeleteConfirmTitle"),
                    content: self.$t("lang.messageDeleteSelectedConfirm"),
                    onOk() {
                        return del(datas).then(res => {
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
                if (this.language == 'zh-CN') {
                    this.columns = langZh.tableTitle_langZh
                } else if (this.language == 'en-US') {
                    this.columns = langEn.tableTitle_langEn
                }
            },
            // 刷新列表
            handleOk() {
                this.$refs.table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页，true刷新到第一页
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
