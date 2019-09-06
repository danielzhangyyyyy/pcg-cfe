<template>
    <a-card :bordered="false" class="content">
        <div class="table-page-search-wrapper">
            <a-form layout="inline" :form="form">
                <a-row :gutter="48">
                    <a-col :md="8" :sm="24" v-for="item in filterList.slice(0,1)" :key="item.index">
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
                    <a-col :md="8" :sm="24" v-for="item in filterList.slice(1,2)" :key="item.index">
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
                        <span class="table-page-search-submitButtons"
                              :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                          <a-button type="primary" icon="search" :loading="searchLoading" @click="searchOnClick">
                              {{ $t('lang.tabComSearchButtonName') }}</a-button>
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
                uploadId="UPLOAD_OUTBOUND_FREIGHT_GL"
                @editSelectOne="editSelectOne"
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
    import Vue from 'vue'
    import {STable, tableBtns} from '@/components'
    import {del, getDropDownList, getGeoCode, list} from '@api/glOutboundFrt_api'
    import { getXScrollSize } from "@api/publicFunc_api";
    import langZh from '../../locales/zh-CN/glOutboundFrt_lang.js'
    import langEn from '../../locales/en-US/glOutboundFrt_lang.js'

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
                prodFamilyDataList: [],
                plantDataList: [],
                geoTypeDataList: ['SUBGEO','COUNTRY/REGION'],
                geoDataList: [],
                filterList: langEn.filter_langEn,
                form: this.$form.createForm(this),
                currentPageManipulationAuth: ["Delete", "Update", "View", "Upload"],
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
            brandDataList() {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "brand") {
                        element["dropDownList"] = [].concat(this.brandDataList);
                    }
                });
            },
            prodFamilyDataList(){
                this.filterList.forEach(element => {
                    if (element["decorator"] == "prodFamily") {
                        element["dropDownList"] = [].concat(this.prodFamilyDataList);
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
            geoDataList(){
                this.filterList.forEach(element => {
                    if (element["decorator"] == "geo") {
                        element["dropDownList"] = [].concat(this.geoDataList);
                    }
                });
            },
            language() {
                this.changeLanguage()
            },
            $route: {
                handler(route) {
                    if (route.path === '/glOutboundFrt/glOutboundFrt_list') {
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
                        for(let key in values) this.queryParam[key] = values[key];
                        values.geoType === 'COUNTRY/REGION'?this.queryParam.geoType = 'COUNTRY': ''
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
                        element["dropDownList"] = [].concat(this.geoTypeDataList);
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
                    this.form.resetFields('prodFamily')
                    this.prodFamilyDataList.splice(0)
                    if(value){
                        this.getDropDown(
                            {moduleName: "getBizProdFByBrand",brand: value},
                            this.prodFamilyDataList,
                            "PROD_FAMILY",
                            getDropDownList
                        );
                    }
                    this.form.resetFields('plant')
                    this.plantDataList.splice(0)
                    this.getDropDown(
                        {moduleName: "getPlantByBrand",brand: value},
                        this.plantDataList,
                        "PLANT",
                        getDropDownList
                    );
                } else if(decorator === 'geoType'){
                    this.form.resetFields('geo')
                    this.geoDataList.splice(0)
                    value === 'COUNTRY/REGION' ? value = 'COUNTRY':value;
                    this.getDropDown(
                        {geoType: value},
                        this.geoDataList,
                        "geo",
                        getGeoCode
                    );
                }
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
            editSelectOne() { // 修改选中行
                const selectedRowKeyslen = this.selectedRowKeys.length
                if (selectedRowKeyslen == 1) {
                    if (this.queryParam.cycle != "CURRENT") {
                        this.$notification.open({
                            message: "Warn:",
                            description: "Only the data of CURRENT cycle can be Edit",
                            duration: 6,
                            style: { background: "#FAAD14" }
                        });
                        return;
                    } else {
                        const editSelectKey = this.selectedRowKeys[0]
                        Vue.ls.set('glOutboundFrt_editSelectKey', editSelectKey)
                        this.$store.dispatch("ToggleCloseTab", "");
                        setTimeout(() => {
                            this.$store.dispatch(
                                "ToggleCloseTab",
                                "/glOutboundFrt/glOutboundFrt_edit" + this.lastQuery
                            );
                            this.lastQuery =encodeURI(
                                "?cycle=" +
                                this.selectedRows[0].cycle +
                                "&brand=" +
                                this.selectedRows[0].brand +
                                "&plant=" +
                                this.selectedRows[0].plant +
                                "&prodFamily=" +
                                this.selectedRows[0].prodFamily +
                                "&geo=" +
                                this.selectedRows[0].geo +
                                "&geoType=" +
                                this.selectedRows[0].geoType
                            )
                            this.$router.replace({
                                path:`/glOutboundFrt/glOutboundFrt_edit`,
                                query: {
                                    cycle: this.selectedRows[0].cycle,
                                    brand: this.selectedRows[0].brand,
                                    plant: this.selectedRows[0].plant,
                                    prodFamily: this.selectedRows[0].prodFamily,
                                    geo: this.selectedRows[0].geo,
                                    geoType: this.selectedRows[0].geoType
                                }
                            })
                        }, 500);
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
                this.selectedRowKeys = selectedRowKeys
                this.selectedRows = selectedRows
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
                this.selectedRows.forEach(element => {
                    rowKeys.push({
                        cycle: element.cycle,
                        brand: element.brand,
                        plant: element.plant,
                        prodFamily: element.prodFamily,
                        geo: element.geo
                    });
                });
                if (this.queryParam.cycle != "CURRENT") {
                    this.$notification.open({
                        message: "Warn:",
                        description: "Only the data of CURRENT cycle can be Delete",
                        duration: 6,
                        style: { background: "#FAAD14" }
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
                    cycle: 'CURRENT',
                    plant: '',
                    brand: '',
                    geoType: '',
                    geo: '',
                    prodFamily: ''
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
