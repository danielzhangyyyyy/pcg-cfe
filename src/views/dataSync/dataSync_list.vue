<template>
    <a-card :bordered="false" class="content">
        <div class="table-page-search-wrapper">
            <a-form layout="inline" :form="form">
                <a-row :gutter="48">
                    <a-col :md="8" :sm="24" v-for="item in filterList.slice(0,2)" :key="item.index">
                        <a-form-item :label="item.label">
                            <a-select
                                    :getPopupContainer="getPopupContainer"
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
                        </a-form-item>
                    </a-col>
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
                        </span>
                    </a-col>
                </a-row>
            </a-form>
        </div>



        <a-table
                ref="table"
                :columns="columns1"
                :loading="loading"
                :scroll="scrollSize1"
                :pagination="false"
                :rowKey="(record) => `${record.rid}`"
                size="small"
                :dataSource="loadData1">
            <template slot="tableName" slot-scope="text, record">
                <a href="javascript:;" @click="detailSelectOne(record)">{{record.tableName}}</a>
            </template>
        </a-table>
    </a-card>
</template>

<script>
    import Vue from 'vue';
    import {STable} from "@/components";
    import {list, getConfigInfo} from "@api/dataSync_api";
    import {getXScrollSize} from "@api/publicFunc_api";
    import langZh from "../../locales/zh-CN/dataSync_lang.js";
    import langEn from "../../locales/en-US/dataSync_lang.js";

    export default {
        name: "userGroup_list",
        components: {
            STable,
        },
        data() {
            return {
                initial: true,
                productGroupDataList: ['TPG', 'IPG'],
                filterList: langEn.filter_langEn,
                columnList: langEn.tableTitle_langEn,
                form: this.$form.createForm(this),
                searchLoading: false,
                loading: false, // 页面是否加载中
                advanced: false, // 高级搜索 展开/关闭
                queryParam: {}, // 查询参数
                optionAlertShow: true, // 是否显示选择框
                selectedRowKeys: [], // 选中的行的keys数组
                selectedRows: [], // 选中的行的全部数组
                // 表头
                columns1: [],
                loadData1: [],
                scrollSize1: {},
            };
        },
        computed: {
            language() {
                return this.$store.getters.language;
            }
        },
        created() {
            this.changeLanguage();
            this.scrollSize1.x = getXScrollSize(this.columns1, langEn.deltaSize);
            this.setDropDownLists();
        },
        watch: {
            language(val) {
                this.changeLanguage();
            },
            $route: {
                handler(route) {
                    if (route.path === "/dataSync/dataSync_list") {
                        this.handleOk()
                    }
                },
                deep: true
            }
        },
        methods: {
            filterOption(input, option) {
                return (
                    option.componentOptions.children[0].text
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                );
            },
            setDropDownLists() {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "productGroup") {
                        element["dropDownList"] = [].concat(this.productGroupDataList);
                    }
                });
            },
            handleDropDownChange(value, decorator) {
            },
            getPopupContainer(trigger) {
                return trigger.parentElement;
            },
            detailSelectOne(obj) {
                Vue.ls.set('dataSync_editSelectKey', obj)
                this.$router.replace(`/dataSync/dataSync_edit`)
            },
            searchOnClick() {
                this.initial = false;
                this.form.validateFields((err, values) => {
                    console.log("values", values);
                    if (!err) {
                        this.queryParam.productGroup = values.productGroup
                        this.getInfo()
                    } else {
                        this.$notification.open({
                            message: "Search condition error:",
                            description: "Please fill in the required options",
                            duration: 6,
                            style: {background: "#F5222D"}
                        });
                    }
                });
            },
            getInfo(){
                let that = this;
                getConfigInfo(Object.assign({},this.queryParam)).then(res => {
                    that.loadData1 = res.result
                    that.loadData1.length > 5 ? (that.scrollSize1.y = 450) : (that.scrollSize1.y = false);
                })
            },
            // 选择列表
            onSelectChange(selectedRowKeys, selectedRows) {
                this.selectedRowKeys = selectedRowKeys;
                this.selectedRows = selectedRows;
            },


            // 更改列表数组
            changeLanguage() {
                if (this.language == "zh-CN") {
                    this.columns1 = langZh.tableTitle_langZh1;
                } else if (this.language == "en-US") {
                    this.columns1 = langEn.tableTitle_langEn1;
                }
            },
            // 刷新列表
            handleOk() {
                // this.getListFun({})
                this.getInfo();
            },

            // 收起展开
            toggleAdvanced() {
                this.advanced = !this.advanced;
            },
            // 重置
            resetSearchForm() {
                this.form.resetFields()
                this.queryParam = {
                    productGroup: '',
                };
            }
        }
    };
</script>
<style scoped>

</style>
