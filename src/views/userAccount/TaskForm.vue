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
                            @blur="inputChange($event,item.decorator)"
                            v-decorator="[item.decorator, {initialValue: item.text, rules: [{required: item.required, message: item.message }]}]"
                    />
                </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24" v-for="(item,index) in babelList.slice(1,4)" :key="item.index">
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
            <a-col :lg="8" :md="12" :sm="24" v-for="(item,index) in babelList.slice(4,5)" :key="item.index">
                <a-form-item :label="item.label">
                    <a-input
                            :placeholder="item.message"
                            v-if="item.inputType=='input'"
                            :disabled="item.editDisabled"
                            :class="{ plantUpperCase: item.decorator=='plant' }"
                            v-decorator="[item.decorator, {initialValue: item.text, rules: [{required: item.required, message: item.message }]}]"
                    />
                </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24" v-for="(item,index) in babelList.slice(5)" :key="item.index">
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
    </a-form>
</template>

<script>
    import langZh from '../../locales/zh-CN/userAccount_lang.js'
    import langEn from '../../locales/en-US/userAccount_lang.js'
    import Vue from "vue";
    import {getUserGroupNoPage, getUser, getUserType} from "@api/userAccount_api";

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
                userGroupDataList: [],
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
            userGroupDataList(){
                this.babelList.forEach(element => {
                    if (element["decorator"] == "userGrpId") {
                        element["dropDownList"] = [].concat(this.userGroupDataList);
                    }
                });
            },
            userTypeDataList() {
                this.babelList.forEach(element => {
                    if (element["decorator"] == "userType") {
                        element["dropDownList"] = [].concat(this.userTypeDataList);
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
                this.userGroupDataList,
                "groupId",
                getUserGroupNoPage
            );
            this.getDropDown(
                {},
                this.userTypeDataList,
                "USER_TYPE",
                getUserType
            );
        },
        activated() {
            this.form.resetFields();
        },
        methods: {
            inputChange(ev, decorator) {
                let value = ev.target.value;
                getUser({itcode: value}).then(res => {
                    if (res.code == 0) {
                        if(!res.result) {
                            for (let item of this.babelList) {
                                item.text = ''
                                item.editDisabled = false
                            }
                        } else {
                            for (let item of this.babelList) {
                                for (let ele in res.result) {
                                    if (item.decorator == ele) {
                                        item.text = res.result[ele]
                                        item.editDisabled = true
                                    }
                                }
                            }
                        }

                    } else {
                        this.$notification.open({
                            message: "Error",
                            description: res.msg,
                            duration: 6,
                            style: {background: "#F5222D"}
                        });
                    }
                })
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
            getDropDown(param, dropdownList, key, api) {
                api(Object.assign({}, param)).then(res => {
                    dropdownList.splice(0);
                    if(key == 'groupId'){
                        this.list = res.result;
                        res.result.forEach(el => {
                            dropdownList.push(el[key]);
                        });
                    } else {
                        res.result.forEach(el => {
                            dropdownList.push(el[key]);
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
