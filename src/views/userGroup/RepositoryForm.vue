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
                    <a-select
                            showSearch
                            :getPopupContainer="getPopupContainer"
                            :filterOption="filterOption"
                            optionFilterProp="children"
                            v-if="item.inputType=='dropDown'"
                            :placeholder="item.message"
                            :allowClear="item.allowClear"
                            v-decorator="[item.decorator, {initialValue:item.text, rules: [{required: item.required, message: item.message }]}]"
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
        </a-row>
        <a-row>
            <a-col :lg="12" :md="24" :sm="24">
                <a-form-item label="Role">
                    <a-transfer
                            :dataSource="mockData"
                            :titles="['Source', 'Target']"
                            :targetKeys="targetKeys"
                            :selectedKeys="selectedKeys"
                            @change="handleChange"
                            @selectChange="handleSelectChange"
                            :render="item=>item.title"
                    />
                </a-form-item>
            </a-col>
        </a-row>
    </a-form>
</template>

<script>

    import Vue from 'vue'
    import langZh from '../../locales/zh-CN/userGroup_lang.js'
    import langEn from '../../locales/en-US/userGroup_lang.js'
    import {show,getRoleByGroup,getRoleList} from '@api/userGroup_api'

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
                babelList: [], // 从lang包获取的要展示的字段
                detailList: [], // 列表详情数据
                form: this.$form.createForm(this),
                mockData: [],
                targetKeys: [],
                selectedKeys: [],
            }
        },
        created() {
            this.changeLanguage()
            this.editSelectKey = Vue.ls.get('userGroup_editSelectKey')
            this.getDetailfun(this.editSelectKey)
            this.getShowRole(this.editSelectKey)
            // this.getDropDown({}, getRoleList);
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
                    if (route.name === 'userGroup_edit') {
                        this.editSelectKey = Vue.ls.get('userGroup_editSelectKey')
                        this.getDetailfun(this.editSelectKey)
                        this.getShowRole(this.editSelectKey)
                        // this.getDropDown({}, getRoleList);
                    }
                },
                deep: true
            }
        },

        methods: {
            handleChange(nextTargetKeys, direction, moveKeys) {
                this.targetKeys = nextTargetKeys
            },
            handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
                this.selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys]
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
            getShowRole(groupName){
                return new Promise((resolve, reject) => {
                    getRoleByGroup(Object.assign({}, {groupName:groupName})).then(res => {
                        resolve(res.result)
                    });
                }).then(res=>{
                    this.getDropDown({}, getRoleList,res)
                })

            },
            getDropDown(param, api,data) {
                this.mockData = []
                this.targetKeys = []
                api(Object.assign({}, param)).then(res => {
                    for(let [index,item] of res.result.entries()){
                        for(let [i,ele] of data.entries()){
                            if(item.roleId == ele.roleId){
                                this.targetKeys.push(index.toString())
                            }
                        }
                        this.mockData.push({
                            key: index.toString(),
                            roleId: item.roleId,
                            title: item.roleName
                        });
                    }
                });
            },
            // 获取详情并在placeholder上显示
            getDetailfun(id) {
                const rowKey = {groupName: id};
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
                            this.$router.replace(`/userGroup/userGroup_list`);
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
                    for(let [index,item] of this.detailList.entries()){
                        item.dropDownList.splice(0)
                        if(item.decorator === 'status'){
                            item.dropDownList.push('ACTIVE','INACTIVE')
                        }
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
                } else if (this.language == 'en-US') {
                    this.babelList = langEn.editAndDetail_langEn
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
