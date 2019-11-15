<template>
    <a-card :bordered="false" class="content">
        <div class="title">
            <a-row>
                <a-col :md="12">
                    <span class="label">Cycle Name: {{cycleMap.cycleName}}</span>
                </a-col>
                <a-col :md="12">
                    <span class="label">Cycle Type: {{cycleMap.cycleType}}</span>
                </a-col>
            </a-row>
            <a-row>
                <a-col :md="12">
                    <span class="label">Cycle Current Month: {{cycleMap.cycleCurMonth}}</span>
                </a-col>
                <a-col :md="12">
                    <span class="label">Cycle Fcst Month: {{cycleMap.cycleFcstMonth}}</span>
                </a-col>
            </a-row>
        </div>
        <div class="title">
            <a-button v-if="cutoffModelList" @click="cutoffBOMRefreshEvent({controlPoint:'Cutoff Model List'})"
                      type="primary">Cutoff Model List
            </a-button>
            <span v-else class="font-red">Note:  Cost model list is cutoff!</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button v-if="cutoffBOMRefresh" @click="cutoffBOMRefreshEvent({controlPoint:'Cutoff BOM Refresh'})"
                      type="primary">Cutoff BOM Refresh
            </a-button>
            <span v-else class="font-red">Note:  Cost bom refresh is cutoff!</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button type="primary" @click="executeReport">Execute Report</a-button>
        </div>
        <a-table
                style="margin-bottom: 30px"
                ref="table"
                :columns="columns1"
                :loading="loading"
                size="small"
                :pagination="false"
                :dataSource="dataSource1">
            <a slot="operation" slot-scope="text, record"
                ><span>
                    <a-button style="width: 110px" v-if="record.controlPoint ==='Calculate'" type="primary" :disabled="CalculateSubmitDIS" @click="calculateSubmit">Calculate</a-button>
                    <a-button style="width: 110px" v-if="record.controlPoint ==='Bake'" type="primary" :disabled="BakeSubmitDIS" @click="bakeSubmit">Bake</a-button>
                    <a-button style="width: 110px" v-if="record.controlPoint ==='Partial Bake'" type="primary" :disabled="PartialBakeDIS" @click="partialBake">Partial Bake</a-button>
                    <a-button style="width: 110px;padding: 0 6px; margin-bottom: 10px" v-if="record.controlPoint ==='Write Back'" type="primary" :disabled="PrewritebackDIS" @click="preWriteBack">Pre write back</a-button><br/>
                    <a-button style="width: 110px" v-if="record.controlPoint ==='Write Back'" type="primary" :disabled="WriteBackDIS" @click="writeBack">Write Back</a-button>
                </span></a>
        </a-table>
        <div class="title">
            <div class="table-page-search-wrapper">
                <a-form layout="inline" :form="form">
                    <a-row :gutter="48">
                        <a-col :md="8" :sm="24" v-for="item in filterList.slice(0,2)" :key="item.index">
                            <a-form-item :label="item.label">
                                <a-input
                                        :placeholder="item.placeHolder"
                                        v-if="item.inputType=='input'"
                                        :disabled="item.editDisabled"
                                        v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"/>
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
                                            :value="element">
                                        {{ element }}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="48">
                        <a-col :md="8" :sm="24" v-for="item in filterList.slice(2)" :key="item.index">
                            <a-form-item :label="item.label">
                                <a-date-picker
                                        :getCalendarContainer="getPopupContainer"
                                        v-if="item.inputType=='date'"
                                        :disabled="item.editDisabled"
                                        :placeholder="item.placeHolder"
                                        :allowClear="item.allowClear"
                                        v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"/>
                            </a-form-item>
                        </a-col>
                        <a-col :md="8" :sm="24">
                            <span>
                                <a-button type="primary" @click="newCycle">New Cycle</a-button>
                            </span>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
            <a-table
                    ref="table"
                    :columns="columns5"
                    :loading="loading"
                    size="small"
                    :pagination="false"
                    :dataSource="dataSource5">
            </a-table>
        </div>
    </a-card>
</template>

<script>
    import moment from "moment";
    import {STable, tableBtns} from '@/components'
    import {
        BakeSubmit,
        CalculateSubmit,
        CutoffBOMRefresh,
        ExecuteReport,
        list,
        NewCycle,
        PartialBake,
        PreWriteBack,
        WriteBack
    } from '@api/controlPoint_api'
    import {getXScrollSize} from "@api/publicFunc_api";
    import langZh from '../../locales/zh-CN/controlPoint_lang.js'
    import langEn from '../../locales/en-US/controlPoint_lang.js'

    export default {
        name: 'TableList',
        components: {
            STable,
            tableBtns
        },
        data() {
            return {
                cycleDataList: ['FINAL', 'B', 'ON', 'DEMAND'],
                filterList: langEn.filter_langEn,
                form: this.$form.createForm(this),
                searchLoading: false,
                cycleMap: {},
                loading: false, // 页面是否加载中
                advanced: true, // 高级搜索 展开/关闭
                queryParam: {
                    cycleType: 'FINAL'
                }, // 查询参数
                optionAlertShow: true, // 是否显示选择框
                selectedRowKeys: [], // 选中的行的keys数组
                selectedRows: [], // 选中的行的全部数组
                //按钮状态
                cutoffModelList: true,
                cutoffBOMRefresh: true,
                //  按钮disable
                CalculateSubmitDIS: false,
                BakeSubmitDIS: false,
                PartialBakeDIS: false,
                PrewritebackDIS: false,
                WriteBackDIS: false,
                NewCycleDIS: false,
                scrollSize1: {},
                scrollSize5: {},
                // 表头
                columns1: [],
                columns5: [],
                dataSource1: [],
                dataSource5: [],
                rowSelection: {
                    onChange: this.onSelectChange
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
            this.setDropDownLists();
            this.scrollSize1.x = getXScrollSize(this.columns1,0);
            this.scrollSize5.x = getXScrollSize(this.columns5,0);
        },
        watch: {
            cycleDataList() {
                this.filterList.forEach(element => {
                    if (element["decorator"] == "cycle") {
                        element["dropDownList"] = [].concat(this.cycleDataList);
                    }
                });
            },
            language(val) {
                this.changeLanguage()
            },
            $route: {
                handler(route) {
                    if (route.path === '/controlPoint/controlPoint_list') {
                        this.resetSearchForm();
                        this.handleOk()
                    }
                },
                deep: true
            }
        },
        methods: {
            cutoffBOMRefreshEvent(params) {
                const self = this;
                CutoffBOMRefresh(params).then(res => {
                    self.initData(res)
                })
            },
            initData(res){
                const self = this;
                if(res.code == 0){
                    self.getListFun()
                    self.$notification.open({
                        message: "Success",
                        description: res.msg,
                        style: { background: "#52C41A" }
                    });
                } else {
                    self.$notification.open({
                        message: "Error:",
                        description: res.msg,
                        duration: 6,
                        style: {background: "#F5222D"}
                    })
                }
            },
            calculateSubmit(){
                CalculateSubmit({}).then(res=>{
                    this.initData(res)
                })
            },
            bakeSubmit(){
                BakeSubmit({}).then(res=>{
                    this.initData(res)
                })
            },
            partialBake(){
                PartialBake({}).then(res=>{
                    this.initData(res)
                })
            },
            preWriteBack(){
                PreWriteBack({}).then(res=>{
                    this.initData(res)
                })
            },
            writeBack(){
                WriteBack({}).then(res=>{
                    this.initData(res)
                })
            },
            executeReport(){
                ExecuteReport({}).then(res=>{
                    this.initData(res)
                })
            },
            newCycle(){
                this.form.validateFields((err, values) => {
                    if (!err) {
                        for (let key in values) this.queryParam[key] = values[key];
                        this.queryParam.cycleMonth = moment(values.cycleMonth).format('MM/DD/YYYY')
                        this.queryParam.forecastMonth = moment(values.forecastMonth).format('MM/DD/YYYY')
                        NewCycle(this.queryParam).then(res=>{
                            this.initData(res)
                        })
                    }
                })
            },
            getPopupContainer(trigger) {
                return trigger.parentElement;
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
                    if (element["decorator"] == "cycleType") {
                        element["dropDownList"] = [].concat(this.cycleDataList);
                    }
                });
            },
            handleDropDownChange(value, decorator) {},
            getListFun() {
                const that = this
                that.dataSource1 = []
                that.dataSource5 = []
                that.selectedRowKeys = []
                return list(Object.assign({}, that.queryParam)).then(res => {
                    that.searchLoading = false;
                    if (res.code == 0) {
                        that.cycleMap = res.result.cycleMap
                        res.result.controlPointEntityList.forEach((element,index)=>{
                            element.key = index
                            if (element.controlPoint === 'Calculate') {
                                that.dataSource1.unshift(element)
                                element.controlPointStatus === 'RUNNING' ? that.CalculateSubmitDIS = true: that.CalculateSubmitDIS = false
                            } else if (element.controlPoint === 'Bake') {
                                that.dataSource1.splice(1, 0, element)
                                element.controlPointStatus === 'NEW CYCLE' ? that.BakeSubmitDIS = false: that.BakeSubmitDIS = true
                            } else if (element.controlPoint === 'Partial Bake') {
                                that.dataSource1.splice(2,0,element)
                                element.controlPointStatus === 'NEW CYCLE' ? that.PartialBakeDIS = false: that.PartialBakeDIS = true
                                element.controlPointStatus === 'NEW CYCLE' ? that.PrewritebackDIS = false: that.PrewritebackDIS = true
                            } else if (element.controlPoint === 'Write Back') {
                                that.dataSource1.splice(3,0,element)
                                element.controlPointStatus === 'NEW CYCLE' ? that.WriteBackDIS = false: that.WriteBackDIS = true
                            } else if (element.controlPoint === 'Generate New Cycle') {
                                that.dataSource5.push(element)
                                element.controlPointStatus === 'NEW CYCLE' ? that.NewCycleDIS = false: that.NewCycleDIS = true
                            } else if (element.controlPoint === 'Cutoff Model List') {
                                element.controlPointStatus === 'COMPLETED' ? that.cutoffModelList = false : that.cutoffModelList = true
                            } else if (element.controlPoint === 'Cutoff BOM Refresh') {
                                element.controlPointStatus === 'COMPLETED' ? that.cutoffBOMRefresh = false : that.cutoffBOMRefresh = true
                            }
                        })
                    } else {
                        that.$notification.open({
                            message: "Error:",
                            description: res.msg,
                            duration: 6,
                            style: {background: "#F5222D"}
                        });
                    }
                })
            },
            // 选择列表
            onSelectChange(selectedRowKeys, selectedRows) {
                console.log('selectedRowKeys: ', selectedRowKeys);
                console.log('selectedRows: ', selectedRows);
                this.selectedRowKeys = selectedRowKeys
                this.selectedRows = selectedRows
            },
            // 更改列表数组
            changeLanguage() {
                if (this.language == 'zh-CN') {
                    this.columns = langZh.tableTitle_langZh
                } else if (this.language == 'en-US') {
                    this.columns1 = langEn.tableTitle_langEn1
                    this.columns5 = langEn.tableTitle_langEn5
                }
            },
            // 刷新列表
            handleOk() {
                this.getListFun();
                // this.$refs.table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页，true刷新到第一页
            },
            // 收起展开
            toggleAdvanced() {
                this.advanced = !this.advanced
            },
            // 重置
            resetSearchForm() {
                this.form.resetFields()
                this.queryParam = {}
            }
        }

    }
</script>

<style scoped lang="less">
    .title {
        border: 1px solid #eeeeee;
        border-radius: 5px;
        margin: 0 0 20px 0;
        padding: 10px;
        .label {
            line-height: 30px;
            display: inline-block;
        }
    }

    .but {
        margin: 10px 0 60px;
        clear: both;
    }

    .font-red {
        color: red;
    }
</style>
