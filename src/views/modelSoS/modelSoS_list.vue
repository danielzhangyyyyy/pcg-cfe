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
                                    @change="inputChange($event, item.decorator)"
                                    v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"/>
                            <a-select
                                    showSearch
                                    :getPopupContainer="getPopupContainer"
                                    :filterOption="filterOption"
                                    optionFilterProp="children"
                                    v-if="item.inputType=='dropDown'"
                                    :placeholder="item.placeHolder"
                                    :allowClear="item.allowClear"
                                    v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                                    @change="handleDropDownChange($event, item.decorator)">
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
                                        v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"/>
                                <a-select
                                        showSearch
                                        :getPopupContainer="getPopupContainer"
                                        :filterOption="filterOption"
                                        optionFilterProp="children"
                                        v-if="item.inputType=='dropDown'"
                                        :placeholder="item.placeHolder"
                                        :allowClear="item.allowClear"
                                        v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                                        @change="handleDropDownChange($event, item.decorator)">
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
                        <span class="table-page-search-submitButtons"
                              :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                            <a-button type="primary" icon="search" :loading="searchLoading" @click="searchOnClick">
                                {{ $t('lang.tabComSearchButtonName') }}</a-button>
                            <a-button style="margin-left: 8px" icon="undo" @click="resetSearchForm">
                                {{ $t('lang.tabComResetButtonName') }}</a-button>
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
                uploadId="UPLOAD_MODEL_SOS"
                @addNewTable="addNewTable"
                @editSelectOne="editSelectOne"
                @deleteSeclectAll="deleteSeclectAll"
        ></tableBtns>

        <s-table
                ref="table"
                :columns="columns"
                :loading="loading"
                :scroll="{ x: 1550 }"
                size="small"
                :rowKey="(record) => record.rid"
                :data="loadData"
                :alert="options.alert"
                :rowSelection="options.rowSelection">
        </s-table>
    </a-card>
</template>

<script>
    import Vue from 'vue'
    import {isNullOrUndefined} from "util";
    import {STable, tableBtns} from '@/components'
    import {del, getBrandList, getDropDownList, getMotList, list} from '@api/modelSoS_api'
    import langZh from '../../locales/zh-CN/modelSoS_lang.js'
    import langEn from '../../locales/en-US/modelSoS_lang.js'

    export default {
        name: 'TableList',
        components: {
            STable,
            tableBtns
        },
        data() {
            return {
                prodFaimlyDataList: [],
                brandDataList: [],
                plantDataList: [],
                subgeoDataList: [],
                countryDataList: [],
                motDataList: [],
                filterList: langEn.filter_langEn,
                form: this.$form.createForm(this),
                currentPageManipulationAuth: ["Add", "Delete", "View", "Upload"],
                searchLoading: false,
                loading: false, // 页面是否加载中
                advanced: false, // 高级搜索 展开/关闭
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
                {moduleName: "getProdFamilyMS"},
                this.prodFaimlyDataList,
                "PRODFAMILY",
                getDropDownList
            );
            this.getDropDown(
                {},
                this.brandDataList,
                "brand",
                getBrandList
            );
            this.getDropDown(
                {moduleName: "getPlantByBrand"},
                this.plantDataList,
                "PLANT",
                getDropDownList
            );
            this.getDropDown(
                {moduleName: "getSubgeoList"},
                this.subgeoDataList,
                "SUBGEO",
                getDropDownList
            );
            this.getDropDown(
                {},
                this.motDataList,
                "mot",
                getMotList
            );
            this.setDropDownLists();
        },
        watch: {
            prodFaimlyDataList() {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "prodfamily") {
                        element["dropDownList"] = [].concat(this.prodFaimlyDataList);
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
            plantDataList() {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "plant") {
                        element["dropDownList"] = [].concat(this.plantDataList);
                    }
                });
            },
            subgeoDataList() {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "subgeo") {
                        element["dropDownList"] = ['ALL'].concat(this.subgeoDataList);
                    }
                });
            },
            countryDataList() {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "country") {
                        element["dropDownList"] = ['ALL'].concat(this.countryDataList);
                    }
                });
            },
            motDataList() {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "mot") {
                        element["dropDownList"] = [].concat(this.motDataList);
                    }
                });
            },
            language() {
                this.changeLanguage()
            },
            $route: {
                handler(route) {
                    if (route.path === '/modelSoS/modelSoS_list') {
                        this.resetSearchForm();
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
                    if (!err) {
                        this.queryParam = {};
                        for (let key in values) values[key] ? this.queryParam[key] = values[key] : ""
                        this.$refs.table.refresh(true);
                    } else {
                        this.$notification.open({
                            message: "Search condition error:",
                            description: "Please choose 'productFamily' or 'model' before proceeding",
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
            getDropDown(param, dropdownList, key, api) {
                api(Object.assign({}, param)).then(res => {
                    dropdownList.splice(0);
                    res.result.forEach(el => {
                        dropdownList.push(el[key]);
                    });
                });
            },
            handleDropDownChange(value, decorator) {
                if (decorator === 'subgeo') {
                    this.form.resetFields('country')
                    this.countryDataList = []
                    this.getDropDown(
                        {moduleName: "getCountryBySubgeo", subgeo: value},
                        this.countryDataList,
                        "COUNTRY",
                        getDropDownList
                    );
                } else if (decorator === 'prodfamily') {
                    this.changeRequrie(value, decorator);
                }
            },
            inputChange(ev, decorator) {
                let value = ev.target.value;
                this.changeRequrie(value, decorator);
            },
            /* 下拉框校验*/
            changeRequrie(value, decoratorC) {
                let requiredArray = ["prodfamily", "model"];
                let existedValue = false;
                let existedkeys = [];
                let fieldsValues = this.form.getFieldsValue(["prodfamily", "model"]);
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
                const that = this
                that.loadData = parameter => {
                    if (Object.keys(that.queryParam).length > 0) {
                        that.searchLoading = true;
                        return list(Object.assign(parameter, that.queryParam)).then(res => {
                            that.searchLoading = false;
                            that.$refs.table.clearSelected();
                            return res.result
                        })
                    } else {
                        const promise = new Promise((resolve, reject) => {
                            if (true) {
                                resolve({
                                    code: "0",
                                    msg: "ok",
                                    result: {
                                        total: 0,
                                        list: [],
                                        pageNum: 1,
                                        pageSize: 10
                                    }
                                });
                            } else {
                                reject("something error");
                            }
                        });
                        return promise.then(res => {
                            that.searchLoading = false;
                            return res.result;
                        });
                    }
                }
            },
            addNewTable() { // 新建列表
                this.$router.replace('/modelSoS/modelSoS_add')
            },
            editSelectOne() { // 修改选中行
                const selectedRowKeyslen = this.selectedRowKeys.length
                if (selectedRowKeyslen == 1) {
                    const editSelectKey = this.selectedRowKeys[0]
                    Vue.ls.set('modelSoS_editSelectKey', editSelectKey)
                    this.$router.replace(`/modelSoS/modelSoS_edit`)
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
                this.form.resetFields()
                this.queryParam = {
                    model: '',
                    prodfamily: '',
                    plant: '',
                    subgeo: '',
                    country: '',
                    mot: ''
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
