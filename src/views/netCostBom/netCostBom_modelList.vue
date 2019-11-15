<template>
    <a-card :bordered="false" class="content">
        <div>
            <a-row type="flex" justify="end" :gutter="{ xs: 2, sm: 4, md: 6, lg: 8, xl: 12 }">
                <a-col>
                    <a-button type="primary" icon="upload" @click="UploadOnClick">Upload</a-button>
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
    import {STable} from "@/components";
    import {modelList} from "@api/netCostBom_api";
    import { getXScrollSize } from "@api/publicFunc_api";
    import langZh from "../../locales/zh-CN/netCostBomDetail_lang.js";
    import langEn from "../../locales/en-US/netCostBomDetail_lang.js";

    export default {
        name: "TableList",
        components: {
            STable
        },
        data() {
            return {
                uploadId: "UPLOAD_UI_COST_BOM_NET",
                dataSource: [],
                loading: false, // 页面是否加载中
                queryParam: {}, // 查询参数
                columns: [], // 表头
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
                scrollSize: {y:false}
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
                handler(to, from) {
                    console.log(to);
                    if (to.path == "/netCostBom/netCostBom_modelList") {
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
                        self.pagination = pagination
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
            UploadOnClick() {
                this.$router.push(
                    `/upload/upload_list/${this.uploadId}/origin/${this.$route.name}`
                );
            },
            goBack() {
                this.$store.dispatch("ToggleCloseTab", "");
                setTimeout(() => {
                    this.$store.dispatch("ToggleCloseTab", this.$route.path);
                    this.$router.replace(`/netCostBOM/netCostBom_list`);
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
