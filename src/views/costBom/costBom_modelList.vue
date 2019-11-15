<template>
    <a-card :bordered="false" class="content">
        <div>
            <a-row type="flex" justify="end" :gutter="{ xs: 2, sm: 4, md: 6, lg: 8, xl: 12 }">
                <a-col>
                    <tableBtns
                            :currentPageManipulationAuth="currentPageManipulationAuth"
                            :queryParamemter="queryParam"
                            uploadId="UPLOAD_UI_COST_BOM"
                    ></tableBtns>
                </a-col>
                <a-col>
                    <a-button type="primary" icon="rollback" @click="goBack">Return</a-button>
                </a-col>
            </a-row>
        </div>
        <a-table
                ref="table"
                size="small"
                :scroll="scrollSize"
                :columns="columns"
                :dataSource="dataSource"
                :pagination="pagination"
                :loading="loading"
                @change="handleTableChange"
                :style="{'padding-top': '5px'}"
        ></a-table>
    </a-card>
</template>

<script>
    import {STable, tableBtns} from '@/components'
    import {modelList} from "@api/costBom_api";
    import { getXScrollSize } from "@api/publicFunc_api";
    import langZh from "../../locales/zh-CN/costBomDetail_lang.js";
    import langEn from "../../locales/en-US/costBomDetail_lang.js";

    export default {
        name: "TableList",
        components: {
            STable,
            tableBtns
        },
        data() {
            return {
                uploadId: "UPLOAD_UI_COST_BOM_NET",
                dataSource: [],
                loading: false, // 页面是否加载中
                queryParam: {}, // 查询参数
                columns: [], // 表头
                currentPageManipulationAuth: ["UploadEnforced"],
                pagination: {
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "50", "100", "150"],
                    onShowSizeChange: this.showSizeChange,
                    showTotal: total =>
                        total < 2000
                            ? total == 1
                            ? `total ${total} row`
                            : `total ${total} rows`
                            : this.$t("lang.messageFor2000Records"),
                },
                description: "",
                scrollSize: {y:false},
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
        },
        watch: {
            $route: {
                handler(route) {
                    if (route.path == "/costBom/costBom_modelList") {
                        this.loadData({});
                    }
                },
                deep: true
            },
            language(val) {
                this.changeLanguage();
            }
        },
        methods: {
            handleTableChange(pagination, filters, sorter) {
                const pager = {...this.pagination};
                pager.current = pagination.current;
                this.pagination = pager;
                this.loadData({
                    pageSize: pagination.pageSize,
                    pageNum: pagination.current,
                    sortField: sorter.field,
                    sortOrder: sorter.order === "descend" ? "desc" : "",
                    ...filters
                });
            },
            showSizeChange(current, pageSize) {
                this.queryParam.pageSize = pageSize;
                this.pagination.pageSize = pageSize;
                console.log(current, pageSize, "current, pageSize");
                this.loadData({});
            },
            loadData(params) {
                this.loading = true;
                this.searchLoading = true;
                this.dataSource = [];
                let parameter = {
                    pageNum: params.pageNum || this.pagination.current || 1,
                    pageSize: params.pageSize || this.pagination.pageSize || 10
                };
                if (params.sortField) {
                    parameter.sortField = params.sortField;
                }
                if (params.sortOrder) {
                    parameter.sortOrder = params.sortOrder;
                }
                this.queryParam.uiAction = 'RPT_BATCH_BOM_DOWNLOAD';
                this.queryParam.uiName = 'costBom';
                let self = this;
                modelList(Object.assign(parameter, self.queryParam)).then(res => {
                    if(res.code === '0'){
                        let pagination = {...self.pagination}
                        pagination.total = res.result.total;
                        pagination.pageSize = res.result.pageSize;
                        pagination.current = res.result.pageNum;
                        res.result.list.forEach((item,index)=>{
                            item.key = index
                        })
                        self.dataSource = res.result.list;
                        self.dataSource.length > 10 ? self.scrollSize.y = 450 : self.scrollSize.y = false;
                        self.loading = false;
                        self.searchLoading = false;
                        self.pagination = pagination;
                    }else {
                        self.$notification.open({
                            message: "Error:",
                            description: res.msg,
                            duration: 6,
                            style: { background: "#F5222D" }
                        });
                    }

                });
            },
            // UploadOnClick() {
            //     this.$router.push(
            //         `/upload/upload_list/${this.uploadId}/origin/${this.$route.name}`
            //     );
            // },
            goBack() {
                this.$store.dispatch("ToggleCloseTab", "");
                setTimeout(() => {
                    this.$store.dispatch("ToggleCloseTab", this.$route.fullPath);
                    this.$router.replace(`/costBom/costBom_list`);
                }, 500);
            },
            // 更改列表数组
            changeLanguage() {
                if (this.language == "zh-CN") {
                    this.columns = langZh.netCostBomModelList_langZh;
                } else if (this.language == "en-US") {
                    this.columns = langEn.netCostBomModelList_langEn;
                }
            }
        }
    };
</script>
