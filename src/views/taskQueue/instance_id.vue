<template>
    <a-card :bordered="false" class="content">
        <a-row type="flex" justify="end" class="taskQueue_margin_bottom_20">
            <a-button type="primary" icon="redo" @click="searchClick">Refresh</a-button>&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button type="primary" icon="rollback" @click="eventBack">Return</a-button>
        </a-row>
        <a-row>
            <a-table
                    class="taskQueue"
                    :columns="columns"
                    :dataSource="dataSource"
                    bordered
                    size="small"
                    :pagination="false"
                    :scroll="{ x: 1600}"
                    :rowClassName="rowClassName"
            >
                <div slot="every" :class="{taskQueue_red: record.failed === true&&text,taskQueue_green:record.failed === false&&text,taskQueue_noColor: record.failed === ''&&text}" slot-scope="text, record">
                    <span>{{text}}</span>
                </div>
                <div slot="normal" slot-scope="text, record">
                    <span>{{text}}</span>
                </div>
            </a-table>
        </a-row>
    </a-card>
</template>

<script>
    import {getDetailInstance} from '@api/taskQueue_api'
    import langEn from '../../locales/en-US/taskQueue_lang.js'
    import langZh from '../../locales/zh-CN/taskQueue_lang.js'

    export default {
        name: "instance_id",
        data() {
            return {
                dataSource: [],
                columns: []
            }
        },
        computed: {
            language() {
                return this.$store.getters.language
            }
        },
        watch: {
            language(val) {
                this.changeLanguage(val)
            },
            $route: {
                handler(route) {
                    if (route.path === "/taskQueue/instance_id") {
                        this.dataSource = []
                        this.fetchData({instanceId: this.$route.query.id})
                    }
                },
                deep: true
            }
        },
        created() {
            console.log(this.$router, 11111, 'id')
            this.changeLanguage()
            this.fetchData({instanceId: this.$route.query.id})
        },
        methods: {
            fetchData(obj) {
                let dataSource = [];
                getDetailInstance(obj).then(res => {
                    for (let i = 0; i < res.result.length; i++) {
                        if (i == 0) {
                            dataSource.push({
                                workflowName: res.result[i].workflowName,
                                instanceId: res.result[i].instanceId,
                                wfLapseTime: res.result[i].wfLapseTime,
                                startDate: res.result[i].startDate,
                                failed: ''
                            });
                            dataSource.push({
                                nodeName: res.result[i].nodeName,
                                nodeType: res.result[i].nodeType,
                                startTime: res.result[i].startTime,
                                lapseTime: res.result[i].lapseTime,
                                status: res.result[i].status,
                                failed: res.result[i].failed
                            });
                        } else {
                            if (res.result[i].instanceId == res.result[i - 1].instanceId) {
                                dataSource.push({
                                    nodeName: res.result[i].nodeName,
                                    nodeType: res.result[i].nodeType,
                                    startTime: res.result[i].startTime,
                                    lapseTime: res.result[i].lapseTime,
                                    status: res.result[i].status,
                                    failed: res.result[i].failed
                                });
                            } else {
                                dataSource.push({
                                    workflowName: res.result[i].workflowName,
                                    instanceId: res.result[i].instanceId,
                                    wfLapseTime: res.result[i].wfLapseTime,
                                    startDate: res.result[i].startDate,
                                    failed: ''
                                });
                                dataSource.push({
                                    nodeName: res.result[i].nodeName,
                                    nodeType: res.result[i].nodeType,
                                    startTime: res.result[i].startTime,
                                    lapseTime: res.result[i].lapseTime,
                                    status: res.result[i].status,
                                    failed: res.result[i].failed
                                });
                            }
                        }
                    }
                    dataSource.forEach((element, index) => {
                        element.key = index
                    })
                    this.dataSource = dataSource
                });
            },
            searchClick() {
                this.fetchData({instanceId: this.$route.query.id})
            },
            changeLanguage() {
                if (this.language == 'zh-CN') {
                    this.columns = langZh.detailList_langEn
                } else if (this.language == 'en-US') {
                    this.columns = langEn.detailList_langEn
                }
            },
            rowClassName(record, index) {
                return "taskQueue_noColor"
            },
            eventBack() {
                this.$route.query.id = ''
                this.$store.dispatch('ToggleCloseTab', '')
                setTimeout(() => {
                    this.$store.dispatch('ToggleCloseTab', this.$route.fullPath);
                    this.$router.push({path: "/taskQueue/taskQueue_list"});
                }, 500);
            }
        }
    }
</script>

<style>
    .taskQueue .ant-table-tbody > tr >td {
        padding: 0 0 !important;
    }
    .taskQueue .ant-table-tbody > tr >td div {
        padding: 8px 8px !important;
    }
    .taskQueue_margin_bottom_20 {
        margin-bottom: 20px;
    }

    .taskQueue_green {
        background: #11FF11!important;
    }

    .taskQueue_red {
        background: red!important;
    }

    .taskQueue_noColor {
        background-color: #ffffff !important;
    }
</style>
