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
                                    @change="inputChange"
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
                                <a-date-picker
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
                uploadId="GET_FILTERED_SBB_BOM"
        >
            <a-button type="primary" @click="eventExecute">Execute</a-button>
            <a-button type="primary" @click="eventPush">BasicNameEdit</a-button>
        </tableBtns>

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
    import moment from 'moment'
    import {STable, tableBtns} from '@/components'
    import {
        del,
        filteredByBasicName,
        getDropDownList,
        getPlantBySbbSel,
        getSbbTypeSel,
        list
    } from '@api/filteredSBBBomStructure_api'
    import { getXScrollSize } from "@api/publicFunc_api";
    import langZh from '../../locales/zh-CN/filteredSBBBomStructure_lang.js'
    import langEn from '../../locales/en-US/filteredSBBBomStructure_lang.js'

    export default {
        name: 'TableList',
        components: {
            STable,
            tableBtns
        },
        data() {
            return {
                getSbbTypeSelDataList: [],
                getPlantBySbbSelDataList: [],
                filterList: langEn.filter_langEn,
                form: this.$form.createForm(this),
                currentPageManipulationAuth: ["View"],
                mdl: {},
                searchLoading: false,
                loading: false, // 页面是否加载中
                advanced: false, // 高级搜索 展开/关闭
                queryParam: {
                    sbbType: '',
                    sbb: '',
                    plant: ''
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
                {},
                this.getSbbTypeSelDataList,
                "sbbType",
                getSbbTypeSel
            );

            this.setDropDownLists();
        },
        watch: {
            getSbbTypeSelDataList(val) {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "sbbType") {
                        element["dropDownList"] = [].concat(this.getSbbTypeSelDataList);
                    }
                });
            },
            getPlantBySbbSelDataList() {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "plant") {
                        element["dropDownList"] = [].concat(this.getPlantBySbbSelDataList);
                    }
                });
            },
            language(val) {
                this.changeLanguage()
            },
            $route: {
                handler(route) {
                    console.log(route.path)
                    if (route.path === '/filteredSBBBomStructure/filteredSBBBomStructure_list') {
                        this.handleOk()
                    }
                },
                deep: true
            }
        },
        methods: {
            eventExecute() {
                let self = this
                this.$confirm({
                    title: self.$t("lang.messageConfirmTitle"),
                    content: 'Are you sure to execute?',
                    onOk() {
                        self.executeLoading = true;
                        filteredByBasicName({uiAction:"PRC_FILTERED_BY_BASICNAME"}).then(res=>{
                            console.log('res:',res)
                            if(res.code === '0'){
                                self.$notification.open({
                                    message: "Success",
                                    description: res.msg,
                                    duration: 6,
                                    style: {background: "#52C41A"}
                                });
                            } else{
                                self.$notification.open({
                                    message: "Error",
                                    description: "Invoke workflow failed! " + res.msg,
                                    duration: 6,
                                    style: {background: "#F5222D"}
                                });
                            }
                            self.executeLoading = false;
                        })
                    },
                    onCancel() {
                    }
                });
            },
            eventPush() {
                this.$router.push('/filteredSBBBOMStructure/basicNameMaintain_list')
            },
            inputChange(val) {
                this.form.resetFields(["plant"]);
                this.getPlantBySbbSelDataList = [];
                let params = {sbb: val.target.value.trim()}
                this.getDropDown(
                    params,
                    this.getPlantBySbbSelDataList,
                    "plant",
                    getPlantBySbbSel
                );
            },
            searchOnClick() {
                // this.$refs.table.refresh(true);
                this.form.validateFields((err, values) => {
                    console.log("err", err);
                    console.log("values", values);
                    if (!err) {
                        values.sbb != undefined ? this.queryParam.sbb = values.sbb.trim() : ''
                        for (let key in values) {
                            this.queryParam[key] = values[key]
                        }
                        this.$refs.table.refresh(true);
                    } else {
                        self.$notification.open({
                            message: "Search condition error:",
                            description: 'please input search conditions.',
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
            getDropDown(params, dropdownList, key, api) {
                api(Object.assign({}, params)).then(res => {
                    dropdownList.splice(0);
                    res.result.forEach(el => {
                        dropdownList.push(el[key]);
                    });
                });
            },
            handleDropDownChange(value, decorator) {
            },
            onSelectChange(selectedRowKeys, selectedRows) {
                //console.log('selectedRowKeys changed: ', selectedRowKeys)
                this.selectedRowKeys = selectedRowKeys;
                this.selectedRows = selectedRows;
            },
            getListFun() {
                const that = this
                // const value = this.queryParam
                that.loadData = parameter => {
                    that.searchLoading = true;
                    if (that.queryParam.sbb !== "" || that.queryParam.plant !== '' || that.queryParam.sbbType !== '') {
                        return list(Object.assign(parameter, that.queryParam)).then(res => {
                            that.searchLoading = false;
                            that.$refs.table.clearSelected();
                            return res.result
                        })
                    } else {
                        return new Promise((resolve, reject) => {
                            if (true) {
                                resolve({result: {total: 0, list: [], pageNum: 1, pageSize: 10}});
                            } else {
                                reject("something error");
                            }
                        }).then(res => {
                            that.searchLoading = false;
                            return res.result;
                        });
                    }
                }
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
        }

    }
</script>
