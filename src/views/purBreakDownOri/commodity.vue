<template>
    <a-card>
        <a-form :form="form" layout="inline" class="margin_b-20">
            <a-form-item label="Commodity" has-feedback>
                <a-select
                        style="width: 200px;"
                        :getPopupContainer="getPopupContainer"
                        v-decorator="['commodity']"
                        @focus="searchCommodity"
                        @change="handleChange"
                        :allowClear="true"
                >
                    <a-select-option
                            v-for="(item,index) in commodityDataList"
                            :value="item.COMMODITY"
                            :key="index"
                    >{{item.COMMODITY}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item style="float: right;">
                <a-button type="primary" @click="eventSearch"><a-icon type="search"/>Search</a-button>
            </a-form-item>
        </a-form>
        <tableBtns
                :currentPageManipulationAuth="currentPageManipulationAuth"
                style="margin-bottom: 20px;"
        >
            <a-button type="primary" @click="exportExcelOnClick"><a-icon type="download"/>Export</a-button>
            <a-button style="margin-left: 10px;" type="primary" @click="eventPush"><a-icon type="rollback"/>Return</a-button>
        </tableBtns>
        <a-table
                :pagination="pagination"
                :scroll="{y:scrollY}"
                :columns="columns"
                :dataSource="dataSource"
                :rowKey="(record) => record.rid"
                bordered>
        </a-table>
    </a-card>
</template>

<script>
    import {del, getCommElemList, getDropDownList, getPartNumList, list} from "@api/purBreakDownOri_api";
    import {tableBtns} from "@/components";
    import {exportByURL} from "@api/exportFunction_api";
    import AFormItem from "ant-design-vue/es/form/FormItem";

    const columns = [
        {
            title: "Commodity",
            dataIndex: "commodity",
            width: 250
        },
        {
            title: "Key Commodity",
            dataIndex: "keyComm",
            width: 250
        },
        {
            title: "Cost Element",
            dataIndex: "costElement",
            width: 250
        }
    ];
    export default {
        name: "commodity",
        components: {
            AFormItem,
            tableBtns
        },
        data() {
            return {
                currentPageManipulationAuth: [],
                commodityDataList: [],
                pagination: {
                    showSizeChanger: true,
                    current: 1,
                    total: 0,
                    pageSize: 10,
                    pageSizeOptions: ["10", "50", "100", "150"],
                    onShowSizeChange: this.showSizeChange,
                    onChange: this.changePage
                },
                queryParam: {
                    pageSize: 10,
                    pageNum: 1,
                    commodity: ''
                },
                columns,
                dataSource: [],
                selectValue: "",
                scrollY: false,
                form: this.$form.createForm(this)
            };
        },
        created() {
            this.getDropDown(
                {moduleName: "getCommodityList"},
                this.commodityDataList,
                "COMMODITY",
                getDropDownList
            );
        },
        watch: {},
        methods: {
            exportExcelOnClick() {
                exportByURL(
                    { commodity:this.selectValue, eventName: "CONF_COMMODITY_COSTELEM_MAP_EXPORT" },
                    '/common/exportExcel'
                );
            },
            showSizeChange(current, pageSize) {
                this.queryParam.pageSize = pageSize;
                this.pagination.pageSize = pageSize;
                console.log(current, pageSize, "current, pageSize");
                this.eventSearch();
            },
            changePage(page) {
                this.pagination.current = page;
                this.queryParam.pageNum = page;
                this.selectedRows = [];
                this.eventSearch();
            },
            getPopupContainer(trigger) {
                return trigger.parentElement;
            },
            eventSearch() {
                let self = this
                this.form.validateFields((err, values) => {
                    values.commodity === undefined ? this.selectValue = '' : this.selectValue
                    if (!err) {
                        this.queryParam.commodity = this.selectValue
                        getCommElemList(this.queryParam).then(res => {
                            this.dataSource = res.result.list;
                            self.pagination.total = res.result.total;
                            res.result.list.length > 10 ? this.scrollY = 450 : this.scrollY = false
                        });
                    }
                });
            },
            eventPush() {
                this.$store.dispatch('ToggleCloseTab', '');
                setTimeout(() => {
                    this.form.resetFields()
                    this.dataSource = []
                    this.pagination.total = 0
                    this.$store.dispatch("ToggleCloseTab", this.$route.fullPath);
                    this.$router.push({path: "/purBreakDownOri/purBreakDownOri_list"});
                }, 500);
            },
            searchCommodity() {
            },
            getDropDown(param, dropdownList, key, api) {
                api(Object.assign({}, param)).then(res => {
                    dropdownList.splice(0);
                    res.result.forEach(el => {
                        dropdownList.push(el);
                    });
                });
            },
            handleChange(value) {
                this.selectValue = value;
            }
        }
    };
</script>

<style scoped>
    .margin_b-20 {
        margin-bottom: 20px;
    }
</style>
