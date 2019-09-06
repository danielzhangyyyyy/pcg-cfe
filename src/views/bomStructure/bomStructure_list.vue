<template>
    <a-card :bordered="false" class="content">
        <div class="table-page-search-wrapper">
            <a-form layout="inline" :form="form">
                <a-row :gutter="48">
                    <a-col :md="24" :sm="24" v-for="item in filterList.slice(0,1)" :key="item.index">
                        <a-form-item :label="item.label">
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
                </a-row>
                <a-row :gutter="48">
                    <a-col :md="8" :sm="24" v-for="item in filterList.slice(1,2)" :key="item.index">
                        <a-form-item :label="item.label">
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
                            <a-select
                                    showSearch
                                    :filterOption="filterOption"
                                    optionFilterProp="children"
                                    :getCalendarContainer="getPopupContainer"
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
                        </a-form-item>
                    </a-col>
                    <template v-if="advanced">
                        <a-col :md="8" :sm="24" v-for="item in filterList.slice(2)" :key="item.index">
                            <a-form-item :label="item.label">
                                <a-select
                                        showSearch
                                        :filterOption="filterOption"
                                        optionFilterProp="children"
                                        v-if="item.inputType=='dropDown'"
                                        :getCalendarContainer="getPopupContainer"
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
        <a-alert
                message="BOM Structure"
                :description="alterDescription"
                type="info"
                showIcon
        />
        <a-table
                ref="table"
                :columns="columns"
                :loading="loading"
                :scroll="scrollSize"
                size="small"
                @expand="handleExpand"
                :expandedRowKeys="expandedRowKeys"
                :dataSource="loadData"
                :pagination="false">
        </a-table>
    </a-card>
</template>

<script>
    import moment from 'moment'
    import {STable} from '@/components'
    import {
        alterShow,
        getAssemblyList,
        getDropDownList,
        getPlantList,
        getProdFamilyList,
        list
    } from '@api/bomStructure_api'
    import { getXScrollSize } from "@api/publicFunc_api";
    import langZh from '../../locales/zh-CN/bomStructure_lang.js'
    import langEn from '../../locales/en-US/bomStructure_lang.js'

    export default {
        name: 'TableList',
        components: {
            STable
        },
        data() {
            return {
                brandDataList: [],
                prodFamilyDataList:[],
                modelDataList:[],
                plantDataList:[],
                alterDescription: '',
                scrollSize: {y:false},
                filterList: langEn.filter_langEn,
                form: this.$form.createForm(this),
                searchLoading: false,
                loading: false, // 页面是否加载中
                advanced: true, // 高级搜索 展开/关闭
                defaultExpandAllRows: false,
                expandedRowKeys: [],
                queryParam: {
                    model: ""
                }, // 查询参数
                assemblyListParams:{
                    brand: '',
                    aspPrdFamily: ''
                },
                assemble: '', // alterShow接口需要传递的参数
                optionAlertShow: true, // 是否显示选择框
                selectedRowKeys: [], // 选中的行的keys数组
                selectedRows: [], // 选中的行的全部数组
                // 表头
                columns: [],
                loadData: []
            }
        },
        computed: {
            language() {
                return this.$store.getters.language
            }
        },
        created() {
            this.changeLanguage()
            this.scrollSize.x = getXScrollSize(this.columns,0);
            this.getDropDown(
                {moduleName: "getBrandList"},
                this.brandDataList,
                "BRAND",
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
            prodFamilyDataList(){
                this.filterList.forEach(element => {
                    if (element["decorator"] == "aspPrdFamily") {
                        element["dropDownList"] = [].concat(this.prodFamilyDataList);
                    }
                });
            },
            modelDataList(){
                this.filterList.forEach(element => {
                    if (element["decorator"] == "model") {
                        element["dropDownList"] = [].concat(this.modelDataList);
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
            language(val) {
                this.changeLanguage()
            },
            '$route': {
                handler(route) {
                    console.log(route.path)
                    if (route.path === '/bomStructure/bomStructure_list') {
                        // this.handleOk()
                        this.getListFun()
                    }
                },
                deep: true
            }
        },
        methods: {
            getPopupContainer(trigger) {
                return trigger.parentElement;
            },
            getShow(){
                this.alterDescription = ''
                alterShow(Object.assign({}, {item:this.assemble})).then(res => {
                    this.alterDescription = `Product Description:${res.result.itemDesc}, cost Life:${res.result.eolStatus}`
                });
            },
            searchOnClick() {
                this.form.validateFields((err, values) => {
                    if (!err) {
                        for(let key in values){
                            this.queryParam[key] = values[key]
                        }
                        this.getListFun()
                        this.getShow()
                    } else {
                        this.$notification.open({
                            message: "Search condition error:",
                            description:'please input search conditions.',
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
                        .indexOf(input.toLowerCase()) == 0
                );
            },
            setDropDownLists() {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "plantType") {
                        element["dropDownList"] = [].concat(this.plantTypeListData);
                    }
                });
            },
            getDropDown(param, dropdownList, key,api) {
                api(Object.assign({}, param)).then(res => {
                    dropdownList.splice(0);
                    res.result.forEach(el => {
                        dropdownList.push(el[key]);
                    });
                });
            },
            handleExpand(expanded, record) {
                // console.log(expanded, record);
                if (this.expandedRowKeys.includes(record.key)) {
                    const index = this.expandedRowKeys.indexOf(record.key);
                    this.expandedRowKeys.splice(index, 1);
                } else {
                    this.expandedRowKeys.push(record.key);
                }
            },
            expandAllOnChange(e) {
                e.target.checked
                    ? (this.defaultExpandAllRows = true)
                    : (this.defaultExpandAllRows = false);
                this.defaultExpandAllRows
                    ? (this.queryParam.isExpandAll = 1)
                    : (this.queryParam.isExpandAll = 0);
            },
            handleDropDownChange(value, decorator) {
                if (decorator === "model") { //assemble 就是model
                    this.assemble = value
                    if (this.timer != null) {
                        clearTimeout(this.timer);
                    }
                    this.timer = setTimeout(() => {
                        this.form.resetFields(["plant"]);
                        this.plantDataList.splice(0);
                        this.getDropDown(
                            {model: value},
                            this.plantDataList,
                            "plant",
                            getPlantList
                        );
                    }, 500)
                }else if(decorator === 'brand'){
                    this.assemblyListParams.brand = value
                    this.form.resetFields(["aspPrdFamily"]);
                    this.prodFamilyDataList.splice(0);
                    this.getDropDown(
                        {brand: value},
                        this.prodFamilyDataList,
                        "aspPrdFamily",
                        getProdFamilyList
                    );
                } else if(decorator === 'aspPrdFamily'){
                    this.assemblyListParams.aspPrdFamily = value
                    this.form.resetFields(["model"]);
                    this.modelDataList.splice(0);
                    this.getDropDown(
                        this.assemblyListParams,
                        this.modelDataList,
                        "model",
                        getAssemblyList
                    );
                }
            },
            getListFun() {
                let self = this
                list(Object.assign({}, self.queryParam)).then(res => {
                    self.expandedRowKeys = [];
                    self.searchLoading = false;
                    let datasource = [];
                    for(let i = 0;i<res.result.bomStructure.length;i++){
                        res.result.bomStructure[i].entityDto.key = i+1
                        res.result.bomStructure[i].subItems && self.defaultExpandAllRows? self.expandedRowKeys.push(
                            res.result.bomStructure[i].entityDto.key ) : "";
                        if(res.result.bomStructure[i].subItems){
                            for(let j = 0;j<res.result.bomStructure[i].subItems.length;j++){
                                res.result.bomStructure[i].subItems[j].key = 100*(i+1)+(j+1).toString()
                            }
                        }
                        res.result.bomStructure[i].entityDto.children = res.result.bomStructure[i].subItems
                        datasource.push(res.result.bomStructure[i].entityDto);
                    }
                    self.loadData = datasource
                    if (self.loadData.length > 10) {
                        self.scrollSize.y = 450;
                    } else {
                        self.scrollSize.y = false;
                    }
                });
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
