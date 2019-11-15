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
                                    @change="inputChange($event,item.decorator)"
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
                    <template v-if="advanced">
                        <a-col :md="8" :sm="24" v-for="item in filterList.slice(2)" :key="item.index">
                            <a-form-item :label="item.label">
                                <a-input
                                        :placeholder="item.placeHolder"
                                        v-if="item.inputType=='input'"
                                        @change="inputChange($event,item.decorator)"
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
        <a-alert type="info" style="margin-bottom: 16px">
            <template slot="message">
                <span v-if="!description" :style="{'font-weight': 'bold'}">
                  SBB BOM Structure
                </span>
                <span v-else>
                  <span :style="{'font-weight': 'bold'}">Product Description: </span>{{description}}
                  <span :style="{'font-weight': 'bold'}">CostLife: </span>{{CostLife}}
                </span>
            </template>
        </a-alert>
        <a-table
                :columns="columns"
                :dataSource="loadData"
                :loading="loading"
                :scroll="scrollSize"
                size="small"
                :pagination="false"
        >
            <div slot="part" slot-scope="text, record">
                <p v-if="text==='LEVEL0_ALL_COST'">
                    <strong>{{text}}</strong>
                </p>
                <p v-else>{{text}}</p>
            </div>
            <div slot="partDesc" slot-scope="text, record">
                <p v-if="text==='BOME'">
                    <strong>{{text}}</strong>
                </p>
                <p v-else>{{text}}</p>
            </div>
        </a-table>
    </a-card>
</template>

<script>
    import moment from "moment";
    import {STable, tableBtns} from "@/components";
    import {del, getDropDownList, getPlantList, getShow, list} from "@api/sBBBomStructure_api";
    import {getXScrollSize} from "@api/publicFunc_api";
    import langZh from "../../locales/zh-CN/sBBBomStructure_lang.js";
    import langEn from "../../locales/en-US/sBBBomStructure_lang.js";

    export default {
        name: "TableList",
        components: {
            STable
        },
        data() {
            return {
                scrollSize: {y: false},
                cycleDataList: [],
                plantDataList: [],
                filterList: langEn.filter_langEn,
                description: "",
                CostLife: '',
                form: this.$form.createForm(this),
                mdl: {},
                searchLoading: false,
                loading: false, // 页面是否加载中
                advanced: true, // 高级搜索 展开/关闭
                queryParam: {
                    cycle: "CURRENT"
                }, // 查询参数
                optionAlertShow: true, // 是否显示选择框
                selectedRowKeys: [], // 选中的行的keys数组
                selectedRows: [], // 选中的行的全部数组
                // 表头
                columns: [],
                loadData: []
            };
        },
        computed: {
            language() {
                return this.$store.getters.language;
            }
        },
        created() {
            this.changeLanguage();
            this.scrollSize.x = getXScrollSize(this.columns, 0);
            this.getDropDown(
                {moduleName: "getCycleList"},
                this.cycleDataList,
                "CYCLE",
                getDropDownList
            );
        },
        watch: {
            cycleDataList(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "cycle") {
                        element["dropDownList"] = [].concat(this.cycleDataList);
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
            language(val) {
                this.changeLanguage();
            },
            $route: {
                handler(route) {
                    console.log(route.path);
                    if (route.path === "/sBBBomStructure/sBBBomStructure_list") {
                        this.handleOk();
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
                        for (let key in values)
                            key === "model" && values[key] !== undefined
                                ? (this.queryParam[key] = values[key].trim())
                                : (this.queryParam[key] = values[key]);
                        this.getListFun();
                        this.getShows(values.model);
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
            getShows(value) {
                getShow({item: value,itemType:"SBB"}).then(res => {
                    this.description = res.result.itemDesc;
                    this.CostLife = res.result.eolStatus;
                });
            },
            filterOption(input, option) {
                return (
                    option.componentOptions.children[0].text
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                );
            },
            getDropDown(param, dropdownList, key, api) {
                api(Object.assign({}, param)).then(res => {
                    dropdownList.splice(0);
                    res.result.forEach(el => {
                        dropdownList.push(el[key]);
                    });
                });
            },
            inputChange(e, dec) {
                if (dec === "model") {
                    this.form.resetFields(["plant"]);
                    this.plantDataList = [];
                    this.getDropDown(
                        {model: e.target.value},
                        this.plantDataList,
                        "plant",
                        getPlantList
                    );
                }
            },
            handleDropDownChange(value, decorator) {
            },
            getListFun() {
                const self = this;
                list(Object.assign({}, self.queryParam)).then(res => {
                    self.searchLoading = false;
                    let totalCount = 0;
                    for (let i = 0; i < res.result.length; i++) {
                        res.result[i].key = i + 1;
                        if (
                            res.result[i].altgrup &&
                            res.result[i].altgrup.indexOf("-") != -1 &&
                            res.result[i].altgrup.split("-")[1].length >= 5
                        ) {
                            res.result[i].altgrup = res.result[i].altgrup.replace("-", "-\n");
                        }
                        totalCount += res.result[i].m1;
                    }
                    if (res.result.length > 0) {
                        res.result.push({
                            key: res.result.length + 1,
                            itemDesc: "BOME",
                            part: "LEVEL0_ALL_COST",
                            m1: totalCount.toFixed(4)
                        });
                    }
                    self.loadData = res.result;
                    res.result.length > 10 ? (self.scrollSize.y = 450) : (self.scrollSize.y = false);
                });
            },
            // 更改列表数组
            changeLanguage() {
                if (this.language == "zh-CN") {
                    this.columns = langZh.tableTitle_langZh;
                } else if (this.language == "en-US") {
                    this.columns = langEn.tableTitle_langEn;
                }
            },
            // 刷新列表
            handleOk() {
                this.getListFun();
            },
            // 收起展开
            toggleAdvanced() {
                this.advanced = !this.advanced;
            },
            // 重置
            resetSearchForm() {
                this.queryParam = {
                    date: moment(new Date())
                };
            }
        }
    };
</script>
<style>
    .ant-table-content .ant-table-body .ant-table-tbody {
        word-break: keep-all;
    }
</style>

