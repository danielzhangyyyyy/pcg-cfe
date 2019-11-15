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
                                    v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                            />
                            <a-select
                                    showSearch
                                    :filterOption="filterOption"
                                    optionFilterProp="children"
                                    v-if="item.inputType=='dropDown'"
                                    :placeholder="item.placeHolder"
                                    :allowClear="item.allowClear"
                                    :getCalendarContainer="getPopupContainer"
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
                                        v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                                />
                                <a-select
                                        :getCalendarContainer="getPopupContainer"
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
                uploadId="UPLOAD_MVA"
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
                :customRow="(record) => { return {
                    on:{
                      dblclick:(record)=>{
                        // this.doubleClickOnRow(record,true)
                      }
                    }
                  }}"
                :rowSelection="options.rowSelection">
        </s-table>
    </a-card>
</template>

<script>
    import Vue from 'vue'
    import moment from 'moment'
    import {STable, tableBtns} from '@/components'
    import {del, getDropDownList, list} from '@api/mva_api'
    import {getXScrollSize} from "@api/publicFunc_api";
    import langZh from '../../locales/zh-CN/mva_lang.js'
    import langEn from '../../locales/en-US/mva_lang.js'

    export default {
        name: 'TableList',
        components: {
            STable,
            tableBtns
        },
        data() {
            return {
                brandDataList: [],
                cycleDataList: [],
                plantDataList: [],
                bizProdDataList: [],
                tabTypeList: ['PERCENTAGE', 'US_DOLLAR'],
                historyStatus: 'CURRENT',
                filterList: langEn.filter_langEn,
                form: this.$form.createForm(this),
                currentPageManipulationAuth: ["Add", "Delete", "Update", "View", "Upload"],
                mdl: {},
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
                loadData: '',
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
                "CYCLE",
                getDropDownList
            );
            this.getDropDown(
                {moduleName: "getBrandList"},
                this.brandDataList,
                "BRAND"
            );

            this.getMonths();
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
            cycleDataList(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "cycle") {
                        element["dropDownList"] = [].concat(this.cycleDataList);
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
            bizProdDataList() {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "prodfamily") {
                        element["dropDownList"] = ['ALL'].concat(this.bizProdDataList);
                    }
                });
            },
            language(val) {
                this.changeLanguage()
            },
            '$route': {
                handler(route) {
                    console.log(route.path)
                    if (route.path === '/mva/mva_list') {
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
                    this.historyStatus = values.cycle
                    if (!err) {
                        for (let key in values) {
                            this.queryParam[key] = values[key]
                        }
                        this.$refs.table.refresh(true);
                        this.getMonths()
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
            setDropDownLists() {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "tbaType") {
                        element["dropDownList"] = [].concat(this.tabTypeList);
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
            handleDropDownChange(value, decorator) {
                if (decorator === "brand") {
                    this.form.resetFields(["prodfamily"]);
                    this.bizProdDataList = [];
                    if (value) {
                        this.getDropDown(
                            {moduleName: "getProductFamilyByBrand", brand: value},
                            this.bizProdDataList,
                            "COST_PROD_FAMILY"
                        );
                    }
                    this.form.resetFields(["plant"]);
                    this.plantDataList = [];
                    this.getDropDown(
                        {moduleName: "getPlantByBrand", brand: value},
                        this.plantDataList,
                        "PLANT"
                    );
                }
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
            addNewTable() { // 新建列表
                this.form.validateFields((err, values) => {
                    if (this.historyStatus != "CURRENT") {
                        this.$notification.open({
                            message: "Warn:",
                            description: "Only the data of CURRENT cycle can be New",
                            duration: 6,
                            style: {'background': '#FAAD14'}
                        });
                        return;
                    } else {
                        this.$router.replace('/mva/mva_add')
                    }
                })
            },
            editSelectOne() { // 修改选中行
                const selectedRowKeyslen = this.selectedRowKeys.length
                if (selectedRowKeyslen == 1) {
                    if (this.historyStatus != "CURRENT") {
                        this.$notification.open({
                            message: "Warn:",
                            description: "Only the data of CURRENT cycle can be Edit",
                            duration: 6,
                            style: {'background': '#FAAD14'}
                        });
                        return;
                    } else {
                        const editSelectKey = this.selectedRowKeys[0]
                        Vue.ls.set('mva_editSelectKey', editSelectKey)
                        this.$router.replace(`/mva/mva_edit`)
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
                this.selectedRowKeys = selectedRowKeys
                this.selectedRows = selectedRows
            },
            // 修改用户
            editListFun(rowKey, disab) {
                console.log(rowKey)
                console.log(disab)
                this.$refs.editForm.edit(rowKey, disab)
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
                if (this.historyStatus != "CURRENT") {
                    this.$notification.open({
                        message: "Warn:",
                        description: "Only the data of CURRENT cycle can be Delete",
                        duration: 6,
                        style: {'background': '#FAAD14'}
                    });
                    return;
                } else {
                    this.delfun(rowKeys);
                }
            },

            delfun(rowKeys) {
                let self = this;
                this.$confirm({
                    title: self.$t("lang.messageDeleteConfirmTitle"),
                    content: self.$t("lang.messageDeleteSelectedConfirm"),
                    onOk() {
                        return del(rowKeys).then(res => {
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

    }
</script>
