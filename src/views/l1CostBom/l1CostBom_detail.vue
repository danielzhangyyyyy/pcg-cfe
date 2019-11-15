<template>
    <a-card :bordered="false" class="content">
        <a-alert style="margin-bottom: 16px">
            <template slot="message">
                <span :style="{'font-weight': 'bold', 'margin-right': '5px'}">Cost Tape For Part: </span>{{description}}&nbsp;&nbsp;
                <span :style="{'font-weight': 'bold', 'margin-right': '5px'}">Plant: </span>{{plant}}
                <a-button
                        type="primary"
                        icon="rollback"
                        @click="goBack"
                        :style="{'float': 'right', 'bottom': '6px'}"
                >Return</a-button>
            </template>
        </a-alert>
        <a-table
                ref="table"
                size="small"
                :scroll="scrollSize"
                :columns="columns"
                :dataSource="dataSource"
                :pagination="false"
                :loading="loading"
                @change="handleTableChange"
                :style="{'padding-top': '1px'}"
                :rowClassName="rowClassName"
        ></a-table>
    </a-card>
</template>

<script>
    import {STable} from "@/components";
    import {detail, getDropDownList} from "@api/costBom_api";
    import {getXScrollSize} from "@api/publicFunc_api";
    import langZh from "../../locales/zh-CN/costBomDetail_lang.js";
    import langEn from "../../locales/en-US/costBomDetail_lang.js";

    export default {
        name: "TableList",
        components: {
            STable
        },
        data() {
            return {
                form: this.$form.createForm(this),
                dataSource: [],
                loading: false, // 页面是否加载中
                queryParam: {}, // 查询参数
                columns: [], // 表头
                pagination: { showSizeChanger: true },
                description: "",
                plant: '',
                scrollSize: {}
            };
        },
        computed: {
            language() {
                return this.$store.getters.language;
            }
        },
        created() {
            this.changeLanguage();
            this.scrollSize.x = getXScrollSize(this.columns,0);
            this.loadData({});
            this.getMonths();
        },
        watch: {
            language(val) {
                this.changeLanguage();
            },
            $route: {
                handler(route) {
                    if (route.path === "/l1CostBom/l1CostBom_detail") {
                        this.loadData({});
                    }
                },
                deep: true
            }
        },
        methods: {
            getMonths() {
                getDropDownList({
                    moduleName: "getMonthListByCycle",
                    cycle: this.$route.query.cycle
                }).then(res => {
                    for (let key in res.result[0]) {
                        for (let item of this.columns) {
                            if (
                                item.dataIndex &&
                                item.dataIndex.toUpperCase() === key.toUpperCase()
                            ) {
                                item.title = res.result[0][key];
                            }
                        }
                    }
                });
            },
            handleTableChange(pagination, filters, sorter) {
                const pager = { ...this.pagination };
                pager.current = pagination.current;
                this.pagination = pager;
                this.loadData({
                    /*   pageSize: pagination.pageSize,
                    pageNum: pagination.current, */
                    sortField: sorter.field,
                    sortOrder: sorter.order === "descend" ? "desc" : "",
                    ...filters
                });
            },
            loadData(params) {
                this.loading = true;
                this.searchLoading = true;
                this.description = "";
                this.plant = "";
                this.dataSource = [];
                let parameter = {
                    /*  pageNum: params.pageNum || this.pagination.current || 1,
                    pageSize: params.pageSize || this.pagination.pageSize || 10 */
                };
                if (params.sortField) {
                    parameter.sortField = params.sortField;
                }
                if (params.sortOrder) {
                    parameter.sortOrder = params.sortOrder;
                }
                this.queryParam.uiName = 'costBom';
                this.queryParam.cycle = this.$route.query.cycle;
                this.queryParam.partNumber = this.$route.query.partNumber;
                this.queryParam.plant = this.$route.query.plant;
                this.queryParam.requestId = this.$route.query.requestId;
                let self = this;
                detail(Object.assign(parameter, self.queryParam)).then(res => {
                    if(res.code==0){
                        self.description = self.$route.query.partNumber;
                        self.plant = self.$route.query.plant;
                        for (let i = 0; i < res.result.breakDown.length; i++) {
                            res.result.breakDown[i].key = i + 1;
                        }
                        self.dataSource = res.result.breakDown;
                    } else{
                        self.$notification.open({
                            message: "Error",
                            description: res.msg,
                            duration: 6,
                            style: {'background': '#F5222D'}
                        });
                    }
                    self.loading = false;
                    self.searchLoading = false;
                });
            },
            goBack() {
                this.$store.dispatch("ToggleCloseTab", "");
                setTimeout(() => {
                    this.$store.dispatch("ToggleCloseTab", this.$route.fullPath);
                    this.$router.replace(`/l1CostBOM/l1CostBom_list`);
                }, 500);
            },
            rowClassName(record, index) {
                return record.costElem == "BOME" || record.costElem == "BOML"
                    ? "yellowRows"
                    : "noColor";
            },
            // 更改列表数组
            changeLanguage() {
                if (this.language == "zh-CN") {
                    this.columns = langZh.tableTitle_langZh;
                } else if (this.language == "en-US") {
                    this.columns = langEn.tableTitle_langEn;
                }
            }
        }
    };
</script>
<style>
    .totalDesc{
        text-align: right;
        margin: 10px 0 40px 0;
    }
    .yellowRows {
        background-color: #faad14 !important;
    }
    .noColor {
        background-color: #ffffff !important;
    }
</style>
