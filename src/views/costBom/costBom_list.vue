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
                            <a-auto-complete
                                    v-if="item.inputType=='autoComplete'"
                                    :disabled="item.editDisabled"
                                    :placeholder="item.message"
                                    :allowClear="item.allowClear"
                                    :dataSource="item.dropDownList"
                                    :filterOption="filterOption"
                                    v-decorator="[item.decorator, { rules: [{required: item.required, message: item.message }]}]"
                                    @change="handleDropDownChange($event, item.decorator)"
                            />
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
                                <a-auto-complete
                                        v-if="item.inputType=='autoComplete'"
                                        :disabled="item.editDisabled"
                                        :placeholder="item.message"
                                        :allowClear="item.allowClear"
                                        :dataSource="item.dropDownList"
                                        :filterOption="filterOption"
                                        v-decorator="[item.decorator, { rules: [{required: item.required, message: item.message }]}]"
                                />
                            </a-form-item>
                        </a-col>
                    </template>
                    <a-col :md="!advanced && 8 || 24" :sm="24">
            <span
                    class="table-page-search-submitButtons"
                    :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
            >
              <a-checkbox @change="expandAllOnChange">Expand All</a-checkbox>
              <a-button
                      type="primary"
                      icon="search"
                      :loading="searchLoading"
                      @click="searchOnClick"
              >{{ $t('lang.tabComSearchButtonName') }}</a-button>&nbsp;&nbsp;
              <a-button type="primary" icon="download" @click="exportExcelOnClick">Export Excel</a-button>&nbsp;&nbsp;
              <a-button type="primary" icon="plus-circle" @click="modelListOnClick">Model List</a-button>&nbsp;&nbsp;
              <a-button type="primary" icon="form" @click="executeModelListOnClick">Execute Model List</a-button>
              <a-button
                      style="margin-left: 8px"
                      icon="undo"
                      @click="reset"
              >{{ $t('lang.tabComResetButtonName') }}</a-button>
                <!--<a @click="toggleAdvanced" style="margin-left: 8px">-->
                <!--{{ advanced ? $t('lang.tabComToggleCloseName') : $t('lang.tabComToggleShowName') }}-->
                <!--<a-icon :type="advanced ? 'up' : 'down'" />-->
                <!--</a>-->
            </span>
                    </a-col>
                </a-row>
            </a-form>
        </div>

        <a-alert style="margin-bottom: 16px">
            <template slot="message">
                <div style="margin-right: 12px">
                    <span v-if="!title.family" :style="{'font-weight': 'bold'}">Cost BOM</span>
                    <span v-else>
            <span :style="{'font-weight': 'bold'}">Product Description: &nbsp;</span>
            {{title.description}}&nbsp;&nbsp;
            <span
                    :style="{'font-weight': 'bold'}"
            >Brand: &nbsp;</span>
            {{title.brand}}&nbsp;&nbsp;
            <span
                    :style="{'font-weight': 'bold'}"
            >Product Family: &nbsp;</span>
            {{title.family}}&nbsp;&nbsp;
            <span
                    :style="{'font-weight': 'bold'}"
            >MTM: &nbsp;</span>
            {{title.mtm}}&nbsp;&nbsp;
            <span
                    :style="{'font-weight': 'bold'}"
            >Cost Life: &nbsp;</span>
            {{title.life}}&nbsp;&nbsp;
          </span>
                </div>
            </template>
        </a-alert>

        <a-table
                ref="table"
                size="small"
                :scroll="scrollSize1"
                :columns="columns1"
                :dataSource="dataSource"
                :pagination="false"
                :loading="loading"
                :expandedRowKeys="expandedRowKeys"
                @change="handleTableChange"
                @expand="handleExpand"
                :rowClassName="rowClassNameFirstTable"
                :style="{'padding-top': '1px'}"
        >
            <span slot="convert" slot-scope="text">{{text|convert}}</span>
            <span slot="part" slot-scope="text, record">
        <a
                v-if="record.isCosttape=='Y'&&record.isChild&&(record.costType == 'OPTION'||record.costType == 'DUMMY'||record.costType == 'COMP-COST'||record.costType == 'VISUAL')"
                @click="subPartOnClick(record)"
                :style="{'font-weight': 'bold'}"
                :class="{visitedPart: visitedKey.indexOf(record.part) != -1}"
        >{{ text }}</a>
        <a
                v-else-if="(record.costType == 'OPTION'||record.costType == 'DUMMY'||record.costType == 'COMP-COST'||record.costType == 'VISUAL')&&record.isChild"
                @click="subPartOnClick(record)"
                :class="{visitedPart: visitedKey.indexOf(record.part) != -1}"
        >{{ text }}</a>
        <a
                v-else-if="(record.costType == 'OPTION'||record.costType == 'DUMMY'||record.costType == 'COMP-COST'||record.costType == 'VISUAL')&&record.lvl==1&&record.connectByIsLeaf==1"
                @click="subPartOnClick(record)"
                :class="{visitedPart: visitedKey.indexOf(record.part) != -1}"
        >{{text}}</a>
        <span v-else>{{ text }}</span>
      </span>
        </a-table>

        <a-table
                ref="table2"
                size="small"
                :scroll="scrollSize2"
                :columns="columns2"
                :dataSource="dataSource2"
                :pagination="false"
                :loading="loading"
                :style="{'padding-top': '10px'}"
                :rowClassName="rowClassName"
        >
            <span slot="convert" slot-scope="text">{{text|convert}}</span>
        </a-table>
    </a-card>
</template>

<script>
    import moment from "moment";
    import {STable, tableBtns} from "@/components";
    import {
        del,
        executeReportWorkflow,
        getBrand,
        getBrandByAssembly,
        getCountryListByPlant,
        getDescription,
        getDropDownList,
        getItemByBrandFamily,
        getPlantListByAssembly,
        getPrdFamilyByAssembly,
        getPrdFamilyByBrand,
        list
    } from "@api/costBom_api";
    import {exportByURL} from "@api/exportFunction_api";
    import {getXScrollSize} from "@api/publicFunc_api";
    import langZh from "../../locales/zh-CN/costBom_lang.js";
    import langEn from "../../locales/en-US/costBom_lang.js";

    export default {
        name: "TableList",
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
                filterList: langEn.filter_langEn,
                form: this.$form.createForm(this),
                timer: null,
                expandedRowKeys: [],
                defaultExpandAllRows: false,
                dataSource: [],
                searchLoading: false,
                loading: false, // 页面是否加载中
                advanced: true, // 高级搜索 展开/关闭
                queryParam: {cycle: "CURRENT"}, // 查询参数
                optionAlertShow: true, // 是否显示选择框
                selectedRowKeys: [], // 选中的行的keys数组
                selectedRows: [], // 选中的行的全部数组
                columns1: [], // 表头
                pagination: {showSizeChanger: true},
                dataSource2: [],
                columns2: [],
                pagination2: {showSizeChanger: true},
                loading2: false,
                description: "",
                title: {
                    description: "",
                    brand: "",
                    mtm: "",
                    family: "",
                    life: ""
                },
                scrollSize1: {y: 350},
                scrollSize2: {y: 350},
                visitedKey: [],
                lastQuery: ""
            };
        },
        computed: {
            language() {
                return this.$store.getters.language;
            }
        },
        created() {
            this.visitedKey.length = 0;
            this.changeLanguage();
            this.scrollSize1.x = getXScrollSize(this.columns1, 0);
            this.scrollSize2.x = getXScrollSize(this.columns2, 0);
            this.getDropDown(
                {moduleName: "getCycleList"},
                this.cycleDataList,
                "CYCLE"
            );
            let cycleParam;
            this.form.getFieldValue("cycle") === 'Last Run Copy' ? cycleParam = 'PREVIOUS' : cycleParam = this.form.getFieldValue("cycle");
            this.getDropDown(
                {CYCLE: cycleParam},
                this.brandDataList,
                "brand",
                getBrand
            );
            this.getMonths();
        },
        watch: {
            cycleDataList(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "cycle") {
                        element["dropDownList"] = ['Last Run Copy'].concat(this.cycleDataList);
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
            prdFamilyDataList(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "aspPrdFamily") {
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
                    if (element["decorator"] == "assembly") {
                        element["dropDownList"] = [].concat(this.assemblyDataList);
                    }
                });
            },
            language(val) {
                this.changeLanguage();
            }
            // $route: {
            //     handler(route) {
            //         if (route.path === "/costBom/costBom_list") {
            //             this.loadData({});
            //         }
            //     },
            //     deep: true
            // }
        },
        methods: {
            reset() {
                this.form.resetFields();
                this.cycleDataList.splice(0);
                this.assemblyDataList.splice(0); // do not loaded in created
                this.plantDataList.splice(0); // do not loaded in created
                this.countryDataList.splice(0); // do not loaded in created
                this.brandDataList.splice(0);
                this.prdFamilyDataList.splice(0); // do not loaded in created
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
            },
            getMonths() {
                let cycleParam;
                this.form.getFieldValue("cycle") === 'Last Run Copy' ? cycleParam = 'CURRENT' : cycleParam = this.form.getFieldValue("cycle");
                getDropDownList({
                    moduleName: "getMonthListByCycle",
                    cycle: cycleParam
                }).then(res => {
                    for (let key in res.result[0]) {
                        for (let item of this.columns1) {
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
                        for (let item of this.columns2) {
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
            modelListOnClick() {
                this.$router.push({
                    path: "/costBom/costBom_modelList"
                });
            },
            executeModelListOnClick() {
                let params = {
                        uiName: "costBom",
                        uiAction: "RPT_BATCH_BOM_DOWNLOAD"
                    },
                    self = this;
                this.$confirm({
                    title: self.$t("lang.messageConfirmTitle"),
                    content: "Are you sure to execute?",
                    onOk() {
                        self.executeLoading = true;
                        executeReportWorkflow(params)
                            .then(res => {
                                if (res.code == 0) {
                                    self.$notification.open({
                                        message: "Success",
                                        description: self.$t("lang.messageExecuteSuccess"),
                                        duration: 6,
                                        style: {background: "#52C41A"}
                                    });
                                } else if (res.code == 1) {
                                    self.$notification.open({
                                        message: "Info",
                                        duration: 6,
                                        description: self.$t("lang.messageExecuting"),
                                        style: {background: "#52C41A"}
                                    });
                                } else {
                                    self.$notification.open({
                                        message: "Error",
                                        description: self.$t("lang.messageExecuteFailed"),
                                        duration: 6,
                                        style: {background: "#F5222D"}
                                    });
                                }
                                self.executeLoading = false;
                            })
                            .catch(err => {
                                self.executeLoading = false;
                                // self.$notification.open({
                                //   message: "Error",
                                //   description: self.$t("lang.messageExecuteFailed"),
                                //   duration: 6,
                                //   style: { background: "#F5222D" }
                                // });
                            });
                    },
                    onCancel() {
                    }
                });
            },
            exportExcelOnClick() {
                if (this.queryParam.requestId) {
                    delete this.queryParam.uiName;
                    exportByURL(
                        {...this.queryParam, eventName: "EXPORT_UI_COSTBOM"},
                        "costBom/exportExcel"
                    );
                } else {
                    this.$notification.open({
                        message: "Warn:",
                        description: "Please search first before export！",
                        duration: 6,
                        style: {background: "#FAAD14"}
                    });
                }
            },
            searchOnClick() {
                this.queryParam.requestId = new moment().format(
                    "YYYY-MM-DD HH:mm:ss.SSS"
                );
                this.form.validateFields((err, values) => {
                    console.log("values", values);
                    if (!err) {
                        this.getShow(values.assembly);
                        this.visitedKey = [];
                        this.queryParam.uiName = "costBom";
                        values.cycle === 'Last Run Copy' ? this.queryParam.cycle = 'PREVIOUS' : this.queryParam.cycle = values.cycle;
                        this.queryParam.model = values.assembly;
                        this.queryParam.father = values.assembly;
                        this.queryParam.plant = values.plant;
                        this.queryParam.country = values.country;
                        values.brand ? (this.queryParam.brand = values.brand) : "";
                        values.aspPrdFamily
                            ? (this.queryParam.prodfamily = values.aspPrdFamily)
                            : "";
                        this.loadData({});
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
            handleExpand(expanded, record) {
                console.log(expanded, record);
                if (this.expandedRowKeys.includes(record.key)) {
                    const index = this.expandedRowKeys.indexOf(record.key);
                    this.expandedRowKeys.splice(index, 1);
                } else {
                    this.expandedRowKeys.push(record.key);
                }
            },
            getDropDown(param, dropdownList, key, api = getDropDownList) {
                return new Promise((resolve, reject) => {
                    api(Object.assign({}, param)).then(res => {
                        dropdownList.splice(0);
                        if (res.code == 0) {
                            if (res.result.lenth != 0) {
                                res.result.forEach(el => {
                                    dropdownList.push(el[key]);
                                });
                            }
                            resolve(res);
                        } else {
                            reject(res);
                        }
                    });
                });
            },
            getShow(value) {
                for (let item in this.title) item = "";
                getDescription({item: value}).then(res => {
                    if (res.code == 0) {
                        this.title.description = res.result.itemDesc;
                        this.title.brand = res.result.brand;
                        this.title.family = res.result.aspPrdFamily;
                        this.title.mtm = res.result.item;
                        this.title.life = res.result.eolStatus;
                    } else {
                        this.$notification.open({
                            message: "Error:",
                            description: res.msg,
                            duration: 6,
                            style: {background: "#F5222D"}
                        });
                    }
                });
            },
            handleDropDownChange(value, decorator) {
                let cycleParam;
                this.form.getFieldValue("cycle") === 'Last Run Copy' ? cycleParam = 'PREVIOUS' : cycleParam = this.form.getFieldValue("cycle");
                if (decorator == "assembly" && value != "" && value) {
                    if (this.timer != null) {
                        clearTimeout(this.timer);
                    }
                    this.timer = setTimeout(() => {
                        this.form.resetFields(["plant"]);
                        this.form.resetFields(["country"]);
                        this.plantDataList = [];
                        this.countryDataList.splice(0);
                        this.getDropDown(
                            {cycle: cycleParam, item: value},
                            this.plantDataList,
                            "plant",
                            getPlantListByAssembly
                        );
                        if (!this.assemblyDataList.includes(value)) {
                            this.form.resetFields(["brand"]);
                            this.form.resetFields(["aspPrdFamily"]);
                            this.prdFamilyDataList.splice(0);
                            this.getDropDown(
                                {cycle: cycleParam, item: value},
                                this.brandDataList,
                                "brand",
                                getBrandByAssembly
                            ).then(res => {
                                if (res.result.length != 0)
                                    this.form.setFieldsValue({["brand"]: res.result[0]["brand"]});
                            });
                            this.getDropDown(
                                {
                                    cycle: cycleParam,
                                    brand: this.form.getFieldValue("brand"),
                                    item: this.form.getFieldValue("assembly")
                                },
                                this.prdFamilyDataList,
                                "aspPrdFamily",
                                getPrdFamilyByAssembly
                            ).then(re => {
                                if (re.result.length != 0)
                                    this.form.setFieldsValue({
                                        ["aspPrdFamily"]: re.result[0]["aspPrdFamily"]
                                    });
                            });
                        }
                    }, 1500);
                } else if (decorator == "assembly" && (value == "" || !value)) {
                    if (this.timer != null) {
                        clearTimeout(this.timer);
                    }
                    this.form.resetFields(["brand"]);
                    this.form.resetFields(["aspPrdFamily"]);
                    this.assemblyDataList = [];
                    this.getDropDown(
                        {CYCLE: cycleParam},
                        this.brandDataList,
                        "brand",
                        getBrand
                    );
                } else if (decorator == "plant") {
                    this.form.resetFields(["country"]);
                    this.getDropDown(
                        {
                            plant: value,
                            item: this.form.getFieldValue("assembly"),
                            cycle: cycleParam
                        },
                        this.countryDataList,
                        "country",
                        getCountryListByPlant
                    );
                } else if (decorator == "brand") {
                    this.form.resetFields(["aspPrdFamily"]);
                    this.getDropDown(
                        {cycle: cycleParam, brand: value},
                        this.prdFamilyDataList,
                        "aspPrdFamily",
                        getPrdFamilyByBrand
                    );
                } else if (decorator == "aspPrdFamily") {
                    this.form.resetFields(["assembly"]);
                    this.form.resetFields(["plant"]);
                    this.form.resetFields(["country"]);
                    this.plantDataList.splice(0);
                    this.countryDataList.splice(0);
                    this.getDropDown(
                        {
                            cycle: cycleParam,
                            brand: this.form.getFieldValue("brand"),
                            aspPrdFamily: value
                        },
                        this.assemblyDataList,
                        "item",
                        getItemByBrandFamily
                    );
                }
            },
            handleTableChange(pagination, filters, sorter) {
                const pager = {...this.pagination};
                pager.current = pagination.current;
                this.pagination = pager;
                this.loadData({
                    pageSize: pagination.pageSize,
                    pageNum: pagination.current,
                    sortField: sorter.field,
                    sortOrder: sorter.order === "descend" ? "desc" : "",
                    ...filters
                });
            },
            loadData(params) {
                this.loading = true;
                this.searchLoading = true;
                this.dataSource = [];
                this.dataSource2 = [];
                let parameter = {
                    pageNum: params.pageNum || this.pagination.current || 1,
                    pageSize: params.pageSize || this.pagination.pageSize || 10
                };
                if (params.sortField) {
                    parameter.sortField = params.sortField;
                }
                if (params.sortOrder) {
                    parameter.sortOrder = params.sortOrder;
                }
                let self = this;
                list(Object.assign(parameter, self.queryParam)).then(res => {
                    if (res.code != 0) {
                        self.loading = false;
                        self.searchLoading = false;
                        self.dataSource = [];
                        self.dataSource2 = [];
                        self.pagination = false;
                        self.pagination2 = false;
                        this.$notification.open({
                            message: "Error:",
                            description: res.msg,
                            duration: 6,
                            style: {background: "#F5222D"}
                        });
                        return;
                    } else if (res.msg != "NO_DATA_FOUND") {
                        self.expandedRowKeys = [];
                        const pagination = {...self.pagination};
                        /*   pagination.total = res.result.bom.length;
                                                                pagination.pageSize = res.result.bom.length; */
                        pagination.total = 300;
                        pagination.pageSize = 300;
                        pagination.current = 1;
                        for (let i = 0; i < res.result.bom.length; i++) {
                            res.result.bom[i]["entityDto"].key = i + 1;
                            res.result.bom[i]["subItems"] && self.defaultExpandAllRows
                                ? self.expandedRowKeys.push(res.result.bom[i]["entityDto"].key)
                                : "";
                            if (res.result.bom[i]["subItems"]) {
                                for (let j = 0; j < res.result.bom[i]["subItems"].length; j++) {
                                    res.result.bom[i]["subItems"][j].isChild = true;
                                    res.result.bom[i]["subItems"][j].key =
                                        res.result.bom[i]["entityDto"].key +
                                        "00" +
                                        (j + 1).toString();
                                }
                                res.result.bom[i]["entityDto"].children =
                                    res.result.bom[i]["subItems"];
                            }
                            self.dataSource.push(res.result.bom[i]["entityDto"]);
                        }
                        self.loading = false;
                        self.searchLoading = false;
                        self.pagination = pagination;
                        //second table
                        // self.pagination2.total = res.result.adder.length;
                        // self.pagination2.pageSize = res.result.adder.length;
                        self.pagination2 = pagination;
                        for (let i = 0; i < res.result.adder.length; i++) {
                            res.result.adder[i].key = i + 1;
                        }
                        self.dataSource2 = res.result.adder;
                    } else {
                        self.loading = false;
                        self.searchLoading = false;
                    }
                });
            },
            subPartOnClick(record) {
                console.log(record, "record 222222");
                this.$store.dispatch("ToggleCloseTab", "");
                this.visitedKey.push(record.part);
                setTimeout(() => {
                    this.$store.dispatch(
                        "ToggleCloseTab",
                        "/costBom/costBom_detail" + this.lastQuery
                    );
                    this.lastQuery = encodeURI(
                        "?cycle=" +
                        record.cycle +
                        "&partNumber=" +
                        record.part +
                        "&plant=" +
                        record.plant +
                        "&requestId=" +
                        this.queryParam.requestId
                    ).replace(new RegExp(/(:)/g), "%3A");
                    this.$router.replace({
                        path: "/costBom/costBom_detail",
                        query: {
                            cycle: record.cycle,
                            partNumber: record.part,
                            plant: record.plant,
                            requestId: this.queryParam.requestId
                        }
                    });
                }, 500);
            },
            rowClassName(record, index) {
                return record.costType == "COST-OUTPUT" ? "darkRows" : "noColor";
            },
            rowClassNameFirstTable(record, index) {
                return "noColor";
            },
            expandAllOnChange(e) {
                e.target.checked
                    ? (this.defaultExpandAllRows = true)
                    : (this.defaultExpandAllRows = false);
                this.defaultExpandAllRows
                    ? (this.queryParam.isExpandAll = 1)
                    : (this.queryParam.isExpandAll = 0);
            },
            filterOption(input, option) {
                return (
                    option.componentOptions.children[0].text
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                );
            },
            // 更改列表数组
            changeLanguage() {
                if (this.language == "zh-CN") {
                    this.columns1 = langZh.tableTitle_langZh;
                } else if (this.language == "en-US") {
                    this.columns1 = langEn.tableTitle_langEn;
                    this.columns2 = langEn.secondTableTitle_langEn;
                }
            },
            // 收起展开
            toggleAdvanced() {
                this.advanced = !this.advanced;
            }
        }
    };
</script>
<style>
    .darkRows {
        background-color: #dee5ec !important;
    }

    .noColor {
        background-color: #ffffff !important;
    }

    .ant-table-content
    .ant-table-body
    .ant-table-tbody
    > tr
    > td
    > span
    > a:visited {
        color: #9f5fc5 !important;
    }

    .visitedPart {
        color: #9f5fc5 !important;
    }
</style>
