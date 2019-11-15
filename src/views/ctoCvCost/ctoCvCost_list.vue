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
                                    @change="handleDropDownChange($event, item.decorator)">
                                <a-select-option
                                        v-for="(element, i) in item.dropDownList"
                                        :key="i"
                                        :value="element"
                                >{{ element }}
                                </a-select-option>
                            </a-select>
                            <a-auto-complete
                                    v-if="item.inputType=='autoComplete'"
                                    :disabled="item.editDisabled"
                                    :placeholder="item.message"
                                    :allowClear="item.allowClear"
                                    :dataSource="item.dropDownList"
                                    :filterOption="filterOption"
                                    @change="handleDropDownChange($event, item.decorator)"
                                    v-decorator="[item.decorator, { rules: [{required: item.required, message: item.message }]}]"
                            />
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
                          <!--<a-checkbox @change="expandAllOnChange">Expand All</a-checkbox>-->
                          <a-button type="primary" icon="search" :loading="searchLoading" @click="searchOnClick">
                              {{ $t('lang.tabComSearchButtonName') }}</a-button>
                          <a-button style="margin-left: 8px" icon="undo" @click="() => {form.resetFields()}">
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
                exportId="EXPORT_CTO_CV_COST"
        >
            <a-button type="primary" icon="form" @click="executeModelListOnClick">Execute</a-button>
        </tableBtns>

        <a-alert style="margin-bottom: 16px">
            <template slot="message">
                <div style="margin-right: 12px">
                    <span v-if="!title.description" :style="{'font-weight': 'bold'}">CTO CV Cost Report </span>
                    <span v-else>
                      <span :style="{'font-weight': 'bold'}">Product Description: &nbsp;</span>{{title.description}}&nbsp;&nbsp;&nbsp;
                      <span :style="{'font-weight': 'bold'}">Cost Life: &nbsp;</span>{{title.life}}&nbsp;&nbsp;
                  </span>
                </div>
            </template>
        </a-alert>

        <a-table
                ref="table"
                :columns="columns"
                :loading="loading"
                :scroll="scrollSize"
                size="small"
                @expand="handleExpand"
                @change="handleTableChange"
                :pagination="pagination"
                :expandedRowKeys="expandedRowKeys"
                :dataSource="loadData">
        </a-table>
    </a-card>
</template>

<script>
    import Vue from 'vue'
    import moment from 'moment'
    import {STable, tableBtns} from '@/components'
    import {getXScrollSize} from "@api/publicFunc_api";
    import {
        list, del, getDropDownList, getBrand,
        executeReportWorkflow,
        getBrandByAssembly,
        getCountryListByPlant,
        getItemByBrandFamily,
        getPlantListByAssembly,
        getPrdFamilyByAssembly,
        getPrdFamilyByBrand,
        findDetail,
        getDescription
    } from '@api/ctoCvCost_api'
    import langZh from '../../locales/zh-CN/ctoCvCost_lang.js'
    import langEn from '../../locales/en-US/ctoCvCost_lang.js'

    export default {
        name: 'TableList',
        components: {
            STable,
            tableBtns
        },
        data() {
            return {
                cycleDataList: [],
                assemblyDataList: [], // do not loaded in created
                plantDataList: [], // do not loaded in created
                countryDataList: [], // do not loaded in created
                brandDataList: [],
                prdFamilyDataList: [], // do not loaded in created
                costTypeDataList: ['Economic', 'Commissionable'],
                atanmDataList: [],
                atwrtDataList: [], // value
                filterList: langEn.filter_langEn,
                form: this.$form.createForm(this),
                currentPageManipulationAuth: ["View", "Export"],
                searchLoading: false,
                expandedRowKeys: [],
                defaultExpandAllRows: false,
                title:{
                    description: '',
                    life: ''
                },
                loading: false, // 页面是否加载中
                advanced: true, // 高级搜索 展开/关闭
                queryParam: {}, // 查询参数
                optionAlertShow: true, // 是否显示选择框
                selectedRowKeys: [], // 选中的行的keys数组
                selectedRows: [], // 选中的行的全部数组
                // 表头
                columns: [],
                loadData: [],
                scrollSize: {y:false},
                pagination: {
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "50", "100", "150"],
                    onShowSizeChange: this.showSizeChange,
                    showTotal: total =>
                        total < 2000
                            ? total == 1
                            ? `total ${total} row`
                            : `total ${total} rows`
                            : this.$t("lang.messageFor2000Records"),
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
            // this.getListFun()
            this.getDropDown(
                {moduleName: "getCycleList"},
                this.cycleDataList,
                "CYCLE"
            );
            this.getDropDown(
                {CYCLE: this.form.getFieldValue("cycle")},
                this.brandDataList,
                "brand",
                getBrand
            );
            this.getDropDown(
                {moduleName:"getCountryList"},
                this.countryDataList,
                "COUNTRY",
            );
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
            brandDataList(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "modelBrand") {
                        element["dropDownList"] = [].concat(this.brandDataList);
                    }
                });
            },
            prdFamilyDataList(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "modelFamily") {
                        element["dropDownList"] = [].concat(this.prdFamilyDataList);
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
            countryDataList(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "country") {
                        element["dropDownList"] = [].concat(this.countryDataList);
                    }
                });
            },
            assemblyDataList(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "model") {
                        element["dropDownList"] = [].concat(this.assemblyDataList);
                    }
                });
            },
            atanmDataList() {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "atanm") {
                        element["dropDownList"] = [].concat(this.atanmDataList);
                    }
                });
            },
            atwrtDataList() {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "atwrt") {
                        element["dropDownList"] = [].concat(this.atwrtDataList);
                    }
                });
            },
            language(val) {
                this.changeLanguage()
            },
            $route: {
                handler(route) {
                    if (route.path === '/ctoCvCost/ctoCvCost_list') {
                        // this.handleOk()
                    }
                },
                deep: true
            }
        },
        methods: {
            getPopupContainer(trigger) {
                return trigger.parentElement;
            },
            executeModelListOnClick() {
                    self = this;
                    self.executeLoading = true;
                    self.form.validateFields((err, values) => {
                    let params = {
                        uiName: "ctoCvCost",
                        uiAction: "execute",
                        cycle: values.cycle,
                        model: values.model,
                        country: values.country
                    };
                    if (!err) {
                    this.$confirm({
                    title: self.$t("lang.messageConfirmTitle"),
                    content: "Are you sure to execute?",
                    onOk() {
                        self.executeLoading = true;
                        executeReportWorkflow(params)
                            .then(res => {
                                if (res.code == "0") {
                                    self.$notification.open({
                                        message: "Success",
                                        description: self.$t("lang.messageExecuteSuccess"),
                                        duration: 6,
                                        style: { background: "#52C41A" }
                                    });
                                } else if (res.code == "1") {
                                    self.$notification.open({
                                        message: "Info",
                                        description: self.$t("lang.messageExecuting"),
                                        style: { background: "#52C41A" }
                                    });
                                } else {
                                    self.$notification.open({
                                        message: "Error",
                                        description: self.$t("lang.messageExecuteFailed"),
                                        duration: 6,
                                        style: { background: "#F5222D" }
                                    });
                                }
                                self.executeLoading = false;
                            })
                            .catch(err => {
                                self.executeLoading = false;
                                self.$notification.open({
                                    message: "Error",
                                    description: self.$t("lang.messageExecuteFailed"),
                                    duration: 6,
                                    style: { background: "#F5222D" }
                                });
                            });
                    },
                    onCancel() {}
                });

                    }else {
                        self.executeLoading = false;
                        self.$notification.open({
                            message: "Search condition error:",
                            description:
                                "please input execute conditions.",
                            duration: 6,
                            style: {background: "#F5222D"}
                        });
                    }
                });
            },
            getMonths() {
                getDropDownList({moduleName: "getMonthListByCycle", cycle: this.queryParam.cycle}).then(res => {
                    for (let key in res.result[0]) {
                        for (let item of this.columns) {
                            if (
                                item.dataIndex &&
                                item.dataIndex.toUpperCase() === key.toUpperCase()
                            ) {
                                item.title = res.result[0][key] + "E";
                            } else if (
                                item.dataIndex &&
                                item.dataIndex.toUpperCase() === "L" + key.toUpperCase()
                            ) {
                                item.title = res.result[0][key] + "L";
                            }
                        }
                    }
                });
            },
            handleExpand(expanded, record) {
                if (this.expandedRowKeys.includes(record.key)) {
                    const index = this.expandedRowKeys.indexOf(record.key);
                    this.expandedRowKeys.splice(index, 1);
                } else {
                    this.expandedRowKeys.push(record.key);
                }
                let params = {
                    cycle: record.cycle,
                    model: record.model,
                    atnam: record.atnam,
                    atwrt: record.atwrt,
                    varcond: record.varcond,
                    costLvl: record.costLvl
                }
                findDetail(params).then(res=>{
                    if (res.code === '0') {
                        record.children.splice(0);
                        for (let [index,item] of res.result.entries()) {
                            item.key = record.key + "@" + index;
                        }
                        record.children = res.result;
                    } else {
                        this.$notification.open({
                            message: "Search condition error:",
                            description: res.msg,
                            duration: 6,
                            style: {background: "#F5222D"}
                        });
                    }
                })
            },
            expandAllOnChange(e) {
                e.target.checked
                    ? (this.defaultExpandAllRows = true)
                    : (this.defaultExpandAllRows = false);
                this.defaultExpandAllRows
                    ? (this.queryParam.isExpandAll = 1)
                    : (this.queryParam.isExpandAll = 0);
            },
            searchOnClick() {
                this.form.validateFields((err, values) => {
                    console.log("values", values);
                    if (!err) {
                        this.getShow(values.model)
                        for(let key in values) this.queryParam[key] = values[key]
                        this.getListFun({})
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
            getShow(value){
                for(let item in this.title) item = ''
                getDescription({ item: value, itemType:'CTO' }).then(res => {
                    if(res.code == 0){
                        this.title.description = res.result.itemDesc
                        this.title.life = res.result.eolStatus
                    } else {
                        this.$notification.open({
                            message: 'Error:',
                            description: res.msg,
                            duration: 6,
                            style: { background: "#F5222D" }
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
                    if (element["decorator"] == "costType") {
                        element["dropDownList"] = [].concat(this.costTypeDataList);
                    }
                });
            },
            getDropDown(param, dropdownList, key, api = getDropDownList) {
                return new Promise((resolve, reject) => {
                    api(Object.assign({}, param)).then(res => {
                        dropdownList.splice(0);
                        if (res.code == 0) {
                            res.result.forEach(el => {dropdownList.push(el[key]);});
                            resolve(res);
                        } else {
                            reject(res);
                        }
                    });
                });
            },
            handleDropDownChange(value, decorator) {
                if (decorator == "model" && value != "" && value) {
                    if (this.timer != null) {
                        clearTimeout(this.timer);
                    }
                    this.timer = setTimeout(() => {
                        this.form.resetFields(["plant"]);
                        this.plantDataList = []
                        this.form.resetFields(['atanm']);//Characteristic
                        this.atanmDataList = []

                        this.getDropDown(
                            {cycle: this.form.getFieldValue("cycle"), item: value,itemType:'CTO'},
                            this.plantDataList,
                            "plant",
                            getPlantListByAssembly
                        );
                        this.getDropDown(
                            {moduleName: 'getCharacByItem', matnr: this.form.getFieldValue("model")},
                            this.atanmDataList,
                            "ATNAM"
                        );
                        if (!this.assemblyDataList.includes(value)) {
                            this.form.resetFields(["modelBrand"]);
                            this.form.resetFields(["modelFamily"]);
                            this.prdFamilyDataList.splice(0);
                            this.getDropDown(
                                {cycle: this.form.getFieldValue("cycle"), item: value,itemType:"CTO"},
                                this.brandDataList,
                                "brand",
                                getBrandByAssembly
                            ).then(res => {
                                if (res.result.length != 0)
                                    this.form.setFieldsValue({["modelBrand"]: res.result[0]["brand"]});
                            });
                            this.getDropDown(
                                {
                                    cycle: this.form.getFieldValue("cycle"),
                                    brand: this.form.getFieldValue("modelBrand"),
                                    item: this.form.getFieldValue("model"),
                                    itemType:'CTO'
                                },
                                this.prdFamilyDataList,
                                "aspPrdFamily",
                                getPrdFamilyByAssembly
                            ).then(re => {
                                if (re.result.length != 0)
                                    this.form.setFieldsValue({
                                        ["modelFamily"]: re.result[0]["modelFamily"]
                                    });
                            });
                        }
                    }, 1500);
                } else if (decorator == "model" && (value == "" || !value)) {
                    this.form.resetFields(["modelBrand"]);
                    this.form.resetFields(["modelFamily"]);
                    this.assemblyDataList = []
                    this.getDropDown(
                        {CYCLE: this.form.getFieldValue("cycle")},
                        this.brandDataList,
                        "brand",
                        getBrand
                    );
                } else if(decorator == "atanm"){
                    this.form.resetFields(['atwrt']);//value
                    this.atwrtDataList = []
                    this.getDropDown(
                        {moduleName: 'getValueByItem', matnr: this.form.getFieldValue("model"), atnam:this.form.getFieldValue("atanm") },
                        this.atwrtDataList,
                        "ATWRT"
                    );
                }else if (decorator == "modelBrand") {
                    this.form.resetFields(["modelFamily"]);
                    this.getDropDown(
                        {cycle: this.form.getFieldValue("cycle"), brand: value},
                        this.prdFamilyDataList,
                        "aspPrdFamily",
                        getPrdFamilyByBrand
                    );
                } else if (decorator == "modelFamily") {
                    this.form.resetFields(["model"]);
                    this.getDropDown(
                        {
                            cycle: this.form.getFieldValue("cycle"),
                            brand: this.form.getFieldValue("modelBrand"),
                            aspPrdFamily: value,
                            itemType:'CTO'
                        },
                        this.assemblyDataList,
                        "item",
                        getItemByBrandFamily
                    );
                }
            },
            showSizeChange(current, pageSize) {
                this.queryParam.pageSize = pageSize;
                this.pagination.pageSize = pageSize;
                this.expandedRowKeys.splice(0);
                console.log(current, pageSize, "current, pageSize");
                this.getListFun({});
            },
            handleTableChange(pagination, filters, sorter) {
                const pager = { ...this.pagination };
                pager.current = pagination.current;
                this.pagination = pager;
                this.getListFun({
                    pageSize: pagination.pageSize,
                    pageNum: pagination.current,
                    sortField: sorter.field,
                    sortOrder: sorter.order === "descend" ? "desc" : "",
                    ...filters
                });
            },
            getListFun(params) {
                const self = this
                let parameter = {
                    pageNum: params.pageNum || this.pagination.current || 1,
                    pageSize: params.pageSize || this.pagination.pageSize || 10
                };
                params.sortField ? parameter.sortField = params.sortField: '';
                params.sortOrder?parameter.sortOrder = params.sortOrder:'';
                self.searchLoading = true;
                list(Object.assign(parameter, self.queryParam)).then(res => {
                    self.loadData = [];
                    if (res.code != 0) {
                        self.loading = false;
                        self.searchLoading = false;
                        this.$notification.open({
                            message: "Error:",
                            description: res.msg,
                            duration: 6,
                            style: { background: "#F5222D" }
                        });
                        return;
                    } else {
                        self.expandedRowKeys = [];
                        const pagination = {...self.pagination}
                        pagination.total = res.result.total;
                        pagination.pageSize = res.result.pageSize;
                        pagination.current = res.result.pageNum;
                        for (let i = 0; i < res.result.list.length; i++) {
                            res.result.list[i].key = i + 1;
                            if(res.result.list[i].isDetail === 'Y'){
                                console.log(33333)
                                res.result.list[i].children = []
                            }
                        }
                        self.loadData = res.result.list
                        self.loading = false;
                        self.pagination = pagination
                        self.searchLoading = false;
                    }
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
                this.getListFun({})
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
<style scoped>
.mPagination {
  text-align: right;
  margin-top: 20px;
}
</style>
