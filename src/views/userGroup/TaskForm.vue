<template>
    <a-form @submit="handleSubmit" :form="form" class="form">
        <a-row class="form-row" :gutter="48">
            <a-col :lg="8" :md="12" :sm="24" v-for="(item,index) in babelList.slice(0,1)" :key="item.index">
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
            <a-col :lg="8" :md="12" :sm="24" v-for="(item,index) in babelList.slice(1)" :key="item.index">
                <a-form-item :label="item.label">
                    <a-input
                            :placeholder="item.message"
                            v-if="item.inputType=='input'"
                            :disabled="item.editDisabled"
                            :class="{ plantUpperCase: item.decorator=='plant' }"
                            v-decorator="[item.decorator, {initialValue: item.text, rules: [{required: item.required, message: item.message }]}]"
                    />
                    <a-select
                            showSearch
                            :getPopupContainer="getPopupContainer"
                            :filterOption="filterOption"
                            optionFilterProp="children"
                            v-if="item.inputType=='dropDown'"
                            :placeholder="item.message"
                            :allowClear="item.allowClear"
                            v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                    >
                        <a-select-option
                                v-for="(element, i) in item.dropDownList"
                                v-bind:key="i"
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
    import langZh from '../../locales/zh-CN/userGroup_lang.js'
    import langEn from '../../locales/en-US/userGroup_lang.js'
    import Vue from "vue";
    import {getRoleList, getUser} from "@api/userGroup_api";

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
                userTypeDataList: [],
                statusDataList: ['ACTIVE','INACTIVE'],
                list: [],
                babelList: [], // 从lang包获取的要展示的字段
                form: this.$form.createForm(this),
                productGroup: Vue.ls.get("PRODUCTGROUP"),
                mockData: [],
                targetKeys: [],
                selectedKeys: [],
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
                    if (route.name === 'userGroup_add') {
                        // this.selectedKeys = []
                        this.targetKeys = []
                    }
                },
                deep: true
            }
        },
        created() {
            this.changeLanguage()
            this.getDropDown(
                {},
                getRoleList
            );
            this.setDropDownLists()
        },
        activated() {
            this.form.resetFields();
        },
        methods: {
            setDropDownLists() {
                this.babelList.forEach(element => {
                    if (element["decorator"] == "status") {
                        element["dropDownList"] = [].concat(this.statusDataList);
                    }
                });
            },
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
            getDropDown(param, api) {
                this.mockData = []
                api(Object.assign({}, param)).then(res => {
                    for(let [index,item] of res.result.entries()){
                        this.mockData.push({
                            key: index.toString(),
                            roleId: item.roleId,
                            title: item.roleName
                        });
                    }
                });
            },
            // 更改列表国际化
            changeLanguage() {
                if (this.language == 'zh-CN') {
                    this.babelList = langZh.addAndDetail_langEn
                } else if (this.language == 'en-US') {
                    this.babelList = langEn.addAndDetail_langEn
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
