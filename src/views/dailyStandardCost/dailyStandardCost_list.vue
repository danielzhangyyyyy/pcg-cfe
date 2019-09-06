<template>
    <a-card :bordered="false" class="content">
        <div class="table-page-search-wrapper">
            <a-form layout="inline" :form="form">
                <a-row :gutter="48">
                    <a-col :md="8" :sm="24" v-for="item in filterList.slice(0,2)" :key="item.index">
                        <a-form-item :label="item.label">
                            <a-select
                                    showSearch
                                    :getPopupContainer="getPopupContainer"
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
                        <a-col :md="8" :sm="24" v-for="item in filterList.slice(2)" :key="item.index">
                            <a-form-item :label="item.label">
                                <a-select
                                        showSearch
                                        :getPopupContainer="getPopupContainer"
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
                uploadId="UPLOAD_STANDARD_COST_PRODUCT"
                exportId="EXPORT_STDCOST_NEW_MODEL"
                @deleteSeclectAll="deleteSeclectAll"
        >
            <a-button type="primary" @click="eventPush">Model Upload</a-button>
            <a-button type="primary" @click="eventCalculation">Calculation</a-button>
            <a-button type="primary" @click="eventPublish">Publish</a-button>
        </tableBtns>

        <s-table
                ref="table"
                :columns="columns"
                :loading="loading"
                :scroll="{ x: 1400 }"
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
    import {
        del,
        execDailyStdCost,
        getDropDownList,
        getProdFamilyByBrand,
        list,
        publishDailyStdCost
    } from '@api/dailyStandardCost_api'
    import langZh from '../../locales/zh-CN/dailyStandardCost_lang.js'
    import langEn from '../../locales/en-US/dailyStandardCost_lang.js'

    export default {
        name: 'TableList',
        components: {
            STable,
            tableBtns
        },
        data() {
            return {
                brandDataList: [],
                prodFamilyDataList: [],
                plantDataList: [],
                categoryDataList: ['BOTH', 'PART', 'MODEL'],
                filterList: langEn.filter_langEn,
                form: this.$form.createForm(this),
                currentPageManipulationAuth: ["View", "Upload"],
                mdl: {},
                searchLoading: false,
                loading: false, // 页面是否加载中
                advanced: true, // 高级搜索 展开/关闭
                queryParam: {}, // 查询参数
                optionAlertShow: true, // 是否显示选择框
                selectedRowKeys: [], // 选中的行的keys数组
                selectedRows: [], // 选中的行的全部数组
                // 表头
                columns: [],
                loadData: '',
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
            this.getListFun()
            this.getDropDown(
                {moduleName: "getBrandList"},
                this.brandDataList,
                "BRAND",
                getDropDownList
            );
            this.getDropDown(
                {moduleName: "getPlantList"},
                this.plantDataList,
                "PLANT",
                getDropDownList
            );

            this.setDropDownLists();
        },
        watch: {
            brandDataList(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "brand") {
                        element["dropDownList"] = [].concat(this.brandDataList);
                    }
                });
            },
            prodFamilyDataList(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "prodFamily") {
                        element["dropDownList"] = [].concat(this.prodFamilyDataList);
                    }
                });
            },
            plantDataList() {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "plant") {
                        element["dropDownList"] = [].concat(this.plantDataList);
                    }
                });
            },
            language(val) {
                this.changeLanguage()
            },
            '$route': {
                handler(route) {
                    console.log(route.path)
                    if (route.path === '/dailyStandardCost/dailyStandardCost_list') {
                        this.handleOk()
                    }
                },
                deep: true
            }
        },
        methods: {
            eventCalculation() {
                const self = this;
                this.$confirm({
                    title: self.$t("lang.messageConfirmTitle"),
                    content: 'Are you sure to execute?',
                    onOk() {
                        execDailyStdCost({uiAction: "PRD.NETCHANGE_ALL_TPG"}).then(res => {
                            if (res.code == '0') {
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
                                    style: {background: "#F5222D"}
                                });
                            }
                        }).catch(err => {
                            self.$notification.open({
                                message: "Error",
                                description: res.msg,
                                duration: 6,
                                style: {background: "#F5222D"}
                            });
                        })
                    },
                    onCancel() {
                    }
                });
            },
            eventPublish() {
                let self = this
                this.$confirm({
                    title: self.$t("lang.messageConfirmTitle"),
                    content: 'Are you sure to execute?',
                    onOk() {
                        publishDailyStdCost({uiAction: "RPT_STDCOST_PUBLISH"}).then(res => {
                            if (res.code == '0') {
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
                                    style: {background: "#F5222D"}
                                });
                            }
                        }).catch(err => {
                            self.$notification.open({
                                message: "Error",
                                description: res.msg,
                                duration: 6,
                                style: {background: "#F5222D"}
                            });
                        })
                    },
                    onCancel() {
                    }
                });
            },
            getPopupContainer(trigger) {
                return trigger.parentElement;
            },
            eventPush() {
                this.$router.push('/dailyStandardModel/dailyStandardModel_list')
            },
            searchOnClick() {
                this.form.validateFields((err, values) => {
                    if (!err) {
                        for (let key in values) {
                            this.queryParam[key] = values[key]
                        }
                        this.$refs.table.refresh(true);
                    } else {
                        this.$notification.open({
                            message: "Search condition error:",
                            description: "please input search conditions.",
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
                    if (element["decorator"] == "category") {
                        element["dropDownList"] = [].concat(this.categoryDataList);
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
                if (decorator == "brand") {
                    this.form.resetFields(["prodFamily"]);
                    this.prodFamilyDataList = [];
                    this.getDropDown(
                        {brand: value},
                        this.prodFamilyDataList,
                        "prodFamily",
                        getProdFamilyByBrand
                    );
                }
            },
            getListFun() {
                const that = this
                // const value = this.queryParam
                that.loadData = parameter => {
                    if(this.queryParam.brand||this.queryParam.prodFamily||this.queryParam.plant||this.queryParam.category){
                        that.searchLoading = true;
                        console.log('loadData.parameter', parameter)
                        return list(Object.assign(parameter, that.queryParam)).then(res => {
                            console.log(res.result)
                            that.searchLoading = false;
                            that.$refs.table.clearSelected();
                            return res.result
                        })
                    } else {
                        return new Promise((resolve, reject) => {
                            resolve({
                                list: [],
                                total: 0,
                                pageNum: 0,
                                pageSize: 0
                            })
                        }).then(res=>{
                            return res
                        })
                    }

                }
            },
            // 选择列表
            onSelectChange(selectedRowKeys, selectedRows) {
                //console.log('selectedRowKeys changed: ', selectedRowKeys)
                this.selectedRowKeys = selectedRowKeys
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
                                    self.$message.success(self.$t("lang.messageDeleteSuccess"), 6);
                                    self.selectedRowKeys = [];
                                    self.handleOk(); // 删除后刷新列表
                                } else {
                                    self.$message.error(res.msg, 6);
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
