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
                                    v-decorator="[item.decorator, {initialValue: item.text,rules: [{required: item.required, message: item.message }]}]"
                                    @change="handleDropDownChange($event, item.decorator)">
                                <a-select-option v-for="(element, i) in item.dropDownList" :key="i" :value="element">
                                    {{ element }}
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
                                        v-decorator="[item.decorator, {initialValue: item.text,rules: [{required: item.required, message: item.message }]}]"
                                        @change="handleDropDownChange($event, item.decorator)">
                                    <a-select-option v-for="(element, i) in item.dropDownList" :key="i" :value="element">
                                        {{ element }}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </template>
                    <a-col :md="!advanced && 8 || 24" :sm="24">
                        <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                            <a-button type="primary" icon="search" :loading="searchLoading" @click="searchOnClick">
                              {{ $t('lang.tabComSearchButtonName') }}
                            </a-button>
                            <a-button style="margin-left: 8px" icon="undo" @click="resetSearchForm">
                              {{ $t('lang.tabComResetButtonName') }}
                            </a-button>
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
                exportId="UPLOAD_OUTBOUND_UNITFREIGHT_GL"
        >
            <a-button type="primary" @click="$router.replace('/outboundFRTRate/outboundFRTRate_list')">Rate Upload</a-button>
            <a-button type="primary" @click="$router.replace('/outboundFRTMot/outboundFRTMot_list')">MOT Upload</a-button>
            <a-button type="primary" @click="$router.replace('/outboundFRTWeight/outboundFRTWeight_list')">Weight Upload</a-button>
        </tableBtns>

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
    import {STable, tableBtns} from '@/components'
    import {del, getDropDownList, getGeoCode, list} from '@api/gLOutboundFRTByUnit_api'
    import { getXScrollSize } from "@api/publicFunc_api";
    import langZh from '../../locales/zh-CN/gLOutboundFRTByUnit_lang.js'
    import langEn from '../../locales/en-US/gLOutboundFRTByUnit_lang.js'

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
                machineTypeDataList: [],
                plantDataList: [],
                prodFamilyDataList:[],
                geoType:['SUBGEO','COUNTRY/REGION'],
                geoCodeDataList:[],
                filterList: langEn.filter_langEn,
                form: this.$form.createForm(this),
                currentPageManipulationAuth: [ "View", "Export"],
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
                "BRAND",
                getDropDownList
            );
            this.getDropDown(
                {moduleName: "getPlantByBrand",brand: ''},
                this.plantDataList,
                "PLANT",
                getDropDownList
            );
            this.setDropDownLists();
        },
        watch: {
            cycleDataList(){
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
            machineTypeDataList(){
                this.filterList.forEach(element => {
                    if (element["decorator"] == "machineType") {
                        element["dropDownList"] = ['ALL'].concat(this.machineTypeDataList);
                    }
                });
            },
            plantDataList(){
                this.filterList.forEach(element => {
                    if (element["decorator"] == "plant") {
                        element["dropDownList"] = [].concat(this.plantDataList);
                    }
                });
            },
            geoCodeDataList(){
                this.filterList.forEach(element => {
                    if (element["decorator"] == "geo") {
                        element["dropDownList"] = [].concat(this.geoCodeDataList);
                    }
                });
            },
            prodFamilyDataList(){
                this.filterList.forEach(element => {
                    if (element["decorator"] == "prodFamily") {
                        element["dropDownList"] = ['ALL'].concat(this.prodFamilyDataList);
                    }
                });
            },
            language(val) {
                this.changeLanguage()
            },
            $route: {
                handler(route) {
                    if (route.path === '/gLOutboundFRTByUnit_list/gLOutboundFRTByUnit') {
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
                    console.log("values", values);
                    if (!err) {
                        for(let key in values){
                            key === 'geoType' && values[key]==='COUNTRY/REGION'?this.queryParam[key] = 'COUNTRY' : this.queryParam[key] = values[key]
                        }
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
            filterOption(input, option) {
                return (
                    option.componentOptions.children[0].text
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                );
            },
            setDropDownLists() {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "geoType") {
                        element["dropDownList"] = [].concat(this.geoType);
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
                if(decorator === 'brand'){
                    this.form.resetFields(["plant"]);
                    this.plantDataList = [];
                    this.getDropDown(
                        {moduleName: "getPlantByBrand",brand: value},
                        this.plantDataList,
                        "PLANT",
                        getDropDownList
                    );
                    this.form.resetFields(["machineType"]);
                    this.machineTypeDataList = [];
                    this.form.resetFields(["prodFamily"]);
                    this.prodFamilyDataList = [];
                    if(value!==undefined){
                        this.getDropDown(
                            {moduleName: "getBizProdFByBrand",brand: value},
                            this.prodFamilyDataList,
                            "PROD_FAMILY",
                            getDropDownList
                        );
                    }
                } else if (decorator === 'geoType'){
                    this.form.resetFields(["geo"]);
                    this.geoCodeDataList = [];
                    value === 'COUNTRY/REGION'? value = 'COUNTRY' : value
                    this.getDropDown(
                        {geoType: value},
                        this.geoCodeDataList,
                        "geo",
                        getGeoCode
                    );
                } else if (decorator === 'prodFamily'){
                    this.form.resetFields(["machineType"]);
                    this.machineTypeDataList = [];
                    this.getDropDown(
                        {moduleName: "getMachineTypeList",prodFamily: value},
                        this.machineTypeDataList,
                        "MACHINETYPE",
                        getDropDownList
                    );
                }
            },
            getListFun() {
                const that = this
                that.loadData = parameter => {
                    that.searchLoading = true;
                    return list(Object.assign(parameter, that.queryParam)).then(res => {
                        if(res.code==='0'){
                            that.searchLoading = false;
                            that.$refs.table.clearSelected();
                            return res.result
                        }else {
                            that.$notification.open({
                                message: "Error:",
                                description: res.msg,
                                duration: 6,
                                style: {background: "#F5222D"}
                            });
                        }
                    })
                }
            },
            // 选择列表
            onSelectChange(selectedRowKeys, selectedRows) {
                //console.log('selectedRowKeys changed: ', selectedRowKeys)
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
                    cycle: 'CURRENT',
                    brand: '',
                    plant: '',
                    geoType: '',
                    geo: '',
                    prodFamily: '',
                    machineType: ''
                }
            }
        }

    }
</script>
