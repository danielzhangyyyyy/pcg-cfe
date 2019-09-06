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
                      @click="resetSearchForm"
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
                uploadId="UPLOAD_UI_PRODUCT_DESC"
                @editSelectOne="editSelectOne"
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
    import {del, getDropDownList, list} from '@api/productDescription_api'
    import { getXScrollSize } from "@api/publicFunc_api";
    import langZh from '../../locales/zh-CN/productDescription_lang.js'
    import langEn from '../../locales/en-US/productDescription_lang.js'

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
                filterList: langEn.filter_langEn,
                form: this.$form.createForm(this),
                currentPageManipulationAuth: [ "Update", "View", "Upload"],
                mdl: {},
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
                {moduleName: "getBrandList"},
                this.brandDataList,
                "BRAND"
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
                    if (element["decorator"] == "eccProdFamily") {
                        element["dropDownList"] = ['N/A'].concat(this.prodFamilyDataList);
                    }
                });
            },
            language(val) {
                this.changeLanguage()
            },
            $route: {
                handler(route) {
                    if (route.path === '/productDescription/productDescription_list') {
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
                        let item = ''
                        values.item!==undefined?item = values.item.trim(): ''
                        item !==''? this.queryParam.item = `%${item}%` : this.queryParam.item = values.item
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
                return (option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0);
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
            handleDropDownChange(value, decorator) {
                if(decorator === 'brand'){
                    this.form.resetFields(["eccProdFamily"]);
                    this.prodFamilyDataList = [];
                    this.getDropDown(
                        {moduleName: "getBizProdFByBrand",brand: value},
                        this.prodFamilyDataList,
                        "PROD_FAMILY"
                    );
                }
            },
            getListFun() {
                const that = this
                that.loadData = parameter => {
                    if(this.queryParam.item!==undefined){
                        that.searchLoading = true;
                        return list(Object.assign(parameter, that.queryParam)).then(res => {
                            that.searchLoading = false;
                            that.$refs.table.clearSelected();
                            return res.result
                        })
                    } else {
                        const promise = new Promise((resolve, reject) => {
                            let listData = {
                                result:{total: 0, pageNum: 1, pageSize: 10, list: []}
                            }
                            resolve(listData)
                        })
                        return promise.then(res => {
                            that.searchLoading = false;
                            return res.result;
                        });
                    }

                }
            },
            editSelectOne() { // 修改选中行
                const selectedRowKeyslen = this.selectedRowKeys.length
                console.log(selectedRowKeyslen)
                if (selectedRowKeyslen == 1) {
                    const editSelectKey = this.selectedRowKeys[0]
                    Vue.ls.set('productDescription_editSelectKey', editSelectKey)
                    this.$router.replace(`/productDescription/productDescription_edit`)
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
                    item: ''
                }
            }
        }

    }
</script>
