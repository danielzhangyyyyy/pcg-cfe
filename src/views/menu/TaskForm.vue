<template>
    <a-form @submit="handleSubmit" :form="form" class="form">
        <a-row class="form-row" :gutter="48">
            <a-col :lg="8" :md="12" :sm="24" v-for="(item,index) in babelList" :key="index">
                <a-form-item :label="item.label">
                    <a-input
                            :placeholder="item.message"
                            v-if="item.inputType=='input'"
                            :disabled="item.decorator=='productGroup'"
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
                            @change="handleDropDownChange($event, item.decorator)"
                            v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                    >
                        <a-select-option
                                v-for="(element, i) in item.dropDownList"
                                v-bind:key="i"
                                :value="element"
                        >{{ element }}
                        </a-select-option>
                    </a-select>
                    <a-radio-group
                            v-if="item.inputType=='radio'"
                            v-decorator="[item.decorator,{initialValue: item.text}]">
                        <a-radio value="Y">
                            yes
                        </a-radio>
                        <a-radio value="N">
                            no
                        </a-radio>
                    </a-radio-group>
                </a-form-item>
            </a-col>
        </a-row>
    </a-form>
</template>

<script>
    import langZh from '../../locales/zh-CN/menu_lang.js'
    import langEn from '../../locales/en-US/menu_lang.js'
    import Vue from "vue";
    import {getParentList} from "@api/menu_api";

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
                parentIdDataList: [],
                list: [],
                babelList: [], // 从lang包获取的要展示的字段
                form: this.$form.createForm(this),
                productGroup: Vue.ls.get("PRODUCTGROUP")
            }
        },
        computed: {
            language() {
                return this.$store.getters.language
            }
        },
        watch: {
            parentIdDataList() {
                this.babelList.forEach(element => {
                    if (element["decorator"] == "parentId") {
                        element["dropDownList"] = [].concat(this.parentIdDataList);
                    }
                });
            },
            language() {
                this.changeLanguage()
            }
        },
        created() {
            this.changeLanguage()
            this.getDropDown(
                {},
                this.parentIdDataList,
                "menuName"
            );
        },
        activated() {
            this.form.resetFields();
        },
        methods: {
            handleDropDownChange(value, decorator) {
                console.log(value, decorator, 44444)
                if(value === 'Root'){
                    for(let item of this.babelList){
                        item.decorator === 'frontRouter' ? item.required = false : ''
                    }
                } else {
                    for(let item of this.babelList){
                        item.decorator === 'frontRouter' ? item.required = true : ''
                    }
                }
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
            getDropDown(param, dropdownList, key) {
                getParentList(Object.assign({}, param)).then(res => {
                    dropdownList.splice(0);
                    this.list = res.result
                    res.result.forEach(el => {
                        dropdownList.push(el[key]);
                    });
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
