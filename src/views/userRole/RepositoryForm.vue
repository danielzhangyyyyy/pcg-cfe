<template>
    <a-form @submit="handleSubmit" :form="form" class="form">
        <a-row class="form-row" :gutter="48">
            <a-col :lg="8" :md="12" :sm="24" v-for="(item,index) in detailList" :key="index">
                <a-form-item :label="item.label">
                    <a-input
                            :placeholder="item.message"
                            v-if="item.inputType=='input'"
                            :disabled="item.editDisabled"
                            v-decorator="[item.decorator, {initialValue:item.text, rules: [{required: item.required, message: item.message }]}]"
                    />
                </a-form-item>
            </a-col>
        </a-row>
        <a-row>
            <a-table
                    ref="table"
                    :columns="columns"
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

    import Vue from 'vue'
    import langZh from '../../locales/zh-CN/userRole_lang.js'
    import langEn from '../../locales/en-US/userRole_lang.js'
    import {show,menuList} from '@api/userRole_api'
    import {getXScrollSize} from "@api/publicFunc_api";

    export default {
        name: 'RepositoryForm',
        props: {
            showSubmit: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                funSwitch: false, // 首次不执行
                editSelectKey: '',
                columns: [],
                loadData: [],
                scrollSize: {y:450},
                babelList: [], // 从lang包获取的要展示的字段
                detailList: [], // 列表详情数据
                form: this.$form.createForm(this),
            }
        },
        created() {
            this.changeLanguage()
            this.editSelectKey = Vue.ls.get('userRole_editSelectKey')
            // this.getDetailfun(this.editSelectKey)
            this.getListFun(this.editSelectKey)
            this.scrollSize.x = getXScrollSize(this.columns, langEn.deltaSize);
        },
        computed: {
            language() {
                return this.$store.getters.language
            }
        },
        watch: {
            language() {
                this.funSwitch = true
                this.changeLanguage()
            },
            $route: {
                handler(route) {
                    if (route.name === 'userRole_edit') {
                        this.editSelectKey = Vue.ls.get('userRole_editSelectKey')
                        // this.getDetailfun(this.editSelectKey)
                        this.getListFun(this.editSelectKey)
                    }
                },
                deep: true
            }
        },

        methods: {
            onChange(record,params){
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
                            } else if(params === 'upload' && child.upload === true){
                                child.upload = false
                            } else if(params === 'delete' && child.delete === false){
                                child.delete = true
                            } else if(params === 'delete' && child.delete === true){
                                child.delete = false
                            } else if(params === 'execute' && child.execute === false){
                                child.execute = true
                            } else if(params === 'execute' && child.execute === true){
                                child.execute = false
                            }
                        }
                    }
                }
            },
            getListFun(params) {
                const that = this;
                that.searchLoading = true;
                menuList({roleId: params}).then(res => {
                    for (let item of res.result){
                        item.key = item.menuId
                        for(let child of item.childMenuList){
                            child.key = child.menuId
                            child.view = false
                            child.add = false
                            child.edit = false
                            child.upload = false
                            child.delete = false
                            child.all = false
                            child.execute = false
                            if(child.accessLevel){
                                let str = child.accessLevel.split('+')
                                if(child.accessLevel.includes('View')){
                                    child.view = true
                                }
                                if(child.accessLevel.includes('Add')){
                                    child.add = true
                                }
                                if(child.accessLevel.includes('Update')){
                                    child.edit = true
                                }
                                if(child.accessLevel.includes('Upload')){
                                    child.upload = true
                                }
                                if(child.accessLevel.includes('Delete')){
                                    child.delete = true
                                }
                                if(child.accessLevel.includes('Execute')){
                                    child.execute = true
                                }
                                if(child.accessLevel.includes('View')&&child.accessLevel.includes('Add')&&
                                    child.accessLevel.includes('Update')&&child.accessLevel.includes('Upload')&&
                                    child.accessLevel.includes('Delete')&& child.accessLevel.includes('Execute')
                                ){
                                    child.view = true
                                    child.add = true
                                    child.edit = true
                                    child.upload = true
                                    child.delete = true
                                    child.all = true
                                    child.execute = true
                                }
                                console.log(child.accessLevel,'child.accessLevel')
                            }
                        }
                        item.children = item.childMenuList
                        delete item.childMenuList;
                    }
                    that.loadData = res.result
                    console.log(that.loadData,'33333333')
                })
            },
            getPopupContainer(trigger) {
                return trigger.parentElement;
            },
            // 获取详情并在placeholder上显示
            getDetailfun(id) {
                const rowKey = {roleId: id};
                show(rowKey).then(res => {
                    if (res.code != 0) {
                        this.$notification.open({
                            message: "Error",
                            description: res.msg,
                            duration: 6,
                            style: {'background': '#F5222D'}
                        });
                        setTimeout(() => {
                            this.$store.dispatch("ToggleCloseTab", this.$route.path);
                            this.$router.replace(`/userRole/userRole_list`);
                        }, 500);
                        return;
                    }
                    const babelList = this.babelList;
                    this.detailList = [];
                    this.form.resetFields();
                    for (let i = 0; i < babelList.length; i++) {
                        const textField = `${babelList[i].decorator}`
                        this.detailList.push({
                            label: babelList[i].label,
                            message: babelList[i].message,
                            decorator: babelList[i].decorator,
                            required: babelList[i].required,
                            text: res.result.list[0][textField],
                            editDisabled: babelList[i].editDisabled,
                            inputType: babelList[i].inputType,
                            dropDownList: []
                        })
                    }
                }).catch(er => {
                    this.$notification.open({
                        message: "Error",
                        description: er,
                        duration: 6,
                        style: {'background': '#F5222D'}
                    });
                })
            },
            // 更改列表国际化
            changeLanguage() {
                if (this.language == 'zh-CN') {
                    this.babelList = langZh.editAndDetail_langZh
                    this.columns = langZh.columns
                } else if (this.language == 'en-US') {
                    this.babelList = langEn.editAndDetail_langEn
                    this.columns = langEn.columns
                }
                if (this.funSwitch) { // 首次不执行
                    this.getDetailfun(this.editSelectKey)
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
