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
                                <a-date-picker
                                        v-if="item.inputType=='date'"
                                        :getCalendarContainer="getPopupContainer"
                                        :disabled="item.editDisabled"
                                        :placeholder="item.placeHolder"
                                        :allowClear="item.allowClear"
                                        v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                                />
                            </a-form-item>
                        </a-col>
                    </template>
                    <a-col :md="!advanced && 8 || 24" :sm="24">
                        <span class="table-page-search-submitButtons"
                              :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
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
                uploadId="UPLOAD_Z_UI_ONDEMAND_PUBLISH"
        >
            <a-button type="primary"
                      :loading="executeFamilyLoading"
                      @click="publishWorkFlowEvent">Publish
            </a-button>
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
                :rowSelection="options.rowSelection">
        </s-table>
    </a-card>
</template>

<script>
    // import moment from "moment";
    import {isNullOrUndefined} from "util";
    import {getXScrollSize} from "@api/publicFunc_api";
    import {STable, tableBtns} from '@/components'
    import {del, getDropDownList, list, publishWorkFlow} from '@api/onDemandPublish_api'
    import langZh from '../../locales/zh-CN/onDemandPublish_lang.js'
    import langEn from '../../locales/en-US/onDemandPublish_lang.js'

    export default {
        name: 'TableList',
        components: {
            STable,
            tableBtns
        },
        data() {
            return {
                statusList: ['NEW', 'COMPLETED'],
                itemTypeList: ['MTM', 'SBB', 'VK'],
                filterList: langEn.filter_langEn,
                form: this.$form.createForm(this),
                currentPageManipulationAuth: ["View", 'UploadEnforced'],
                searchLoading: false,
                loading: false, // 页面是否加载中
                advanced: false, // 高级搜索 展开/关闭
                queryParam: {}, // 查询参数
                optionAlertShow: true, // 是否显示选择框
                selectedRowKeys: [], // 选中的行的keys数组
                selectedRows: [], // 选中的行的全部数组
                executeFamilyLoading: false,
                scrollSize: {
                    x: 0
                },
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
            this.scrollSize.x = getXScrollSize(this.columns, langEn.deltaSize);
            this.setDropDownLists();
        },
        watch: {
            language(val) {
                this.changeLanguage()
            },
            $route: {
                handler(route) {
                    if (route.path === '/onDemandPublish/onDemandPublish_list') {
                        this.resetSearchForm()
                        this.handleOk()
                    }
                },
                deep: true
            }
        },
        methods: {
            publishWorkFlowEvent() {
                let self = this;
                this.$confirm({
                    title: self.$t("lang.messageConfirmTitle"),
                    content: self.$t("lang.messageExecuteConfirmation"),
                    onOk() {
                        self.executeFamilyLoading = true;
                        publishWorkFlow({uiName: "onDemandPublish", uiAction: "publish"}).then(res => {
                            self.executeFamilyLoading = false;
                            if (res.code == 0) {
                                self.$notification.open({
                                    message: "Success",
                                    description: res.msg,
                                    duration: 6,
                                    style: {background: "#52C41A"}
                                });
                                self.loadData({});
                            } else if (res.code == 2) {
                                self.$notification.open({
                                    message: "Warning",
                                    description: res.msg,
                                    duration: 6,
                                    style: {background: "#faad14"}
                                });
                            } else {
                                self.$notification.open({
                                    message: "Error",
                                    description: res.msg,
                                    duration: 6,
                                    style: {background: "#F5222D"}
                                });
                            }
                        }).catch(err => {
                            self.executeFamilyLoading = false;
                            self.$notification.open({
                                message: "Error",
                                description: self.$t("lang.messageExecuteFailed"),
                                duration: 6,
                                style: {background: "#F5222D"}
                            });
                        });
                    },
                    onCancel() {}
                });

            },
            getPopupContainer(trigger) {
                return trigger.parentElement;
            },
            searchOnClick() {
                this.form.validateFields((err, values) => {
                    console.log("values", values);
                    if (!err) {
                        for (let key in values) {
                            if (key === "sysCreatedBy" && values[key] !== undefined) {
                                let val = values.sysCreatedBy.trim();
                                val !== "" ? (this.queryParam[key] = `%${val}%`) : (this.queryParam[key] = values.sysCreatedBy);
                            } else if (key === 'startDate' && !isNullOrUndefined(values[key])) {
                                this.queryParam[key] = values[key].format("YYYY-MM-DD")
                            } else if (key === 'endDate' && !isNullOrUndefined(values[key])) {
                                this.queryParam[key] = values[key].format("YYYY-MM-DD")
                            } else {
                                this.queryParam[key] = values[key]
                            }
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
                    if (element["decorator"] == "itemType") {
                        element["dropDownList"] = [].concat(this.itemTypeList);
                    } else if (element["decorator"] == "status") {
                        element["dropDownList"] = [].concat(this.statusList);
                    }
                });
            },
            handleDropDownChange(value, decorator) {
            },
            getListFun() {
                const that = this
                that.loadData = parameter => {
                    if (that.queryParam.status || that.queryParam.itemType || that.queryParam.item || that.queryParam.owner || that.queryParam.startDate || that.queryParam.endDate) {
                        that.searchLoading = true;
                        return list(Object.assign(parameter, that.queryParam)).then(res => {
                            that.searchLoading = false;
                            that.$refs.table.clearSelected();
                            res.result.list.forEach((ele, index) => {
                                console.log(ele, 'ele')
                                ele.rid = Number(index) + 1
                            })
                            return res.result
                        })
                    } else {
                        that.searchLoading = false;
                        return new Promise((resolve, reject) => {
                            resolve({list: [], total: 0, pageNum: 0, pageSize: 0})
                        }).then(res => {
                            return res
                        })
                    }

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
                    status: '',
                    itemType: '',
                    item: '',
                    owner: '',
                    startDate: '',
                    endDate: ''
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
