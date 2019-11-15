<template>
    <a-form @submit="handleSubmit" :form="form" class="form">
        <a-row class="form-row" :gutter="48">
            <a-col :lg="8" :md="12" :sm="24" v-for="(item,index) in babelList" :key="item.index">
                <a-form-item :label="item.label">
                    <a-input
                            :placeholder="item.message"
                            v-if="item.inputType=='input'"
                            :disabled="item.decorator=='productGroup'"
                            :class="{ plantUpperCase: item.decorator=='plant' }"
                            v-decorator="[item.decorator, {initialValue: item.text, rules: [{required: item.required, message: item.message }]}]"
                    />
                </a-form-item>
            </a-col>
        </a-row>
        <a-row>
            <a-table
                    ref="table"
                    :columns="columns"
                    :loading="loading"
                    :scroll="scrollSize"
                    size="small"
                    :pagination="false"
                    :dataSource="loadData">
                <template slot="all" slot-scope="text, record">
                     <span v-if="!record.hasOwnProperty('children')">
                        <a-checkbox v-if="record" :checked="text" @change="onChange(record,'all')"/>
                     </span>
                </template>
                <template slot="view" slot-scope="text, record">
                     <span v-if="!record.hasOwnProperty('children')">
                        <a-checkbox v-if="record" :checked="text" @change="onChange(record,'view')"/>
                     </span>
                </template>
                <template slot="add" slot-scope="text, record">
                     <span v-if="!record.hasOwnProperty('children')">
                        <a-checkbox v-if="record" :checked="text" @change="onChange(record,'add')"/>
                     </span>
                </template>
                <template slot="edit" slot-scope="text, record">
                     <span v-if="!record.hasOwnProperty('children')">
                        <a-checkbox v-if="record" :checked="text" @change="onChange(record,'edit')"/>
                     </span>
                </template>
                <template slot="upload" slot-scope="text, record">
                     <span v-if="!record.hasOwnProperty('children')">
                        <a-checkbox v-if="record" :checked="text" @change="onChange(record,'upload')"/>
                     </span>
                </template>
                <template slot="delete" slot-scope="text, record">
                     <span v-if="!record.hasOwnProperty('children')">
                        <a-checkbox v-if="record" :checked="text" @change="onChange(record,'delete')"/>
                     </span>
                </template>
                <template slot="execute" slot-scope="text, record">
                     <span v-if="!record.hasOwnProperty('children')">
                        <a-checkbox v-if="record" :checked="text" @change="onChange(record,'execute')"/>
                     </span>
                </template>
            </a-table>
        </a-row>
    </a-form>
</template>

<script>
    import langZh from '../../locales/zh-CN/userRole_lang.js'
    import langEn from '../../locales/en-US/userRole_lang.js'
    import Vue from "vue";
    import {menuList} from "@api/userRole_api";
    import {getXScrollSize} from "@api/publicFunc_api";

    export default {
        name: 'TaskForm',
        props: {
            showSubmit: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                loading: false, // 页面是否加载中
                columns: [],
                loadData: [],
                scrollSize: {y:450},
                babelList: [], // 从lang包获取的要展示的字段
                form: this.$form.createForm(this),
                productGroup: Vue.ls.get("PRODUCTGROUP"),
            }
        },
        computed: {
            language() {
                return this.$store.getters.language
            }
        },
        watch: {
            language() {
                this.changeLanguage()
            },
            $route: {
                handler(route) {
                    if (route.name === 'userRole_add') {
                        this.getListFun({})
                    }
                },
                deep: true
            }
        },
        created() {
            this.changeLanguage()
            this.scrollSize.x = getXScrollSize(this.columns, langEn.deltaSize);
            this.getListFun({});
        },
        activated() {
            this.form.resetFields();
        },
        methods: {
            onChange(record, params) {
                for (let item of this.loadData) {
                    for (let child of item.children) {
                        if (child.menuId == record.menuId) {
                            if (params === 'all' && child.all === false) {
                                child.view = true
                                child.all = true
                                child.add = true
                                child.edit = true
                                child.upload = true
                                child.delete = true
                                child.execute = true
                            } else if (params === 'all' && child.all === true) {
                                child.view = false
                                child.all = false
                                child.add = false
                                child.edit = false
                                child.upload = false
                                child.delete = false
                                child.execute = false
                            } else if (params === 'view' && child.view === false) {
                                child.view = true
                            } else if (params === 'view' && child.view === true) {
                                child.view = false
                            } else if (params === 'add' && child.add === false) {
                                child.add = true
                            } else if (params === 'add' && child.add === true) {
                                child.add = false
                            } else if (params === 'edit' && child.edit === false) {
                                child.edit = true
                            } else if (params === 'edit' && child.edit === true) {
                                child.edit = false
                            } else if (params === 'upload' && child.upload === false) {
                                child.upload = true
                            } else if (params === 'upload' && child.upload === true) {
                                child.upload = false
                            } else if (params === 'delete' && child.delete === false) {
                                child.delete = true
                            } else if (params === 'delete' && child.delete === true) {
                                child.delete = false
                            } else if (params === 'execute' && child.execute === false) {
                                child.execute = true
                            } else if (params === 'execute' && child.execute === true) {
                                child.execute = false
                            }
                        }
                    }
                }
            },
            getPopupContainer(trigger) {
                return trigger.parentElement;
            },
            getListFun(params) {
                const that = this;
                that.searchLoading = true;
                menuList(Object.assign({}, that.queryParam)).then(res => {
                    that.searchLoading = false;
                    for (let item of res.result) {
                        item.key = item.menuId
                        for (let ele of item.childMenuList) {
                            ele.key = ele.menuId
                            ele.add = false
                            ele.edit = false
                            ele.delete = false
                            ele.upload = false
                            ele.view = false
                            ele.all = false
                            ele.execute = false
                        }
                        item.children = item.childMenuList
                        delete item.childMenuList;
                    }
                    that.loadData = res.result
                })
            },
            // 更改列表国际化
            changeLanguage() {
                if (this.language == 'zh-CN') {
                    this.babelList = langZh.addAndDetail_langEn
                    this.columns = langZh.columns
                } else if (this.language == 'en-US') {
                    this.babelList = langEn.addAndDetail_langEn
                    this.columns = langEn.columns
                }
            },
            handleSubmit(e) {
                e.preventDefault()
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.$notification.open({
                            message: "Received values of form:",
                            description: values,
                            duration: 6,
                            style: {'background': '#F5222D'}
                        });
                    }
                })
            }
        }
    }
</script>
