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
                            :disabled="item.decorator=='productGroup'"
                            :class="{ plantUpperCase: item.decorator=='plant' }"
                            v-decorator="[item.decorator, {initialValue: item.text, rules: [{required: item.required, message: item.message,pattern: new RegExp(/^(\-|\+)?\d+(\.\d+)?$/) }]}]"
                    />
                </a-form-item>
            </a-col>
        </a-row>
    </a-form>
</template>

<script>
    import langZh from '../../locales/zh-CN/modelWeight_lang.js'
    import langEn from '../../locales/en-US/modelWeight_lang.js'
    import Vue from "vue";
    import {getDropDownList} from "@api/modelWeight_api";

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
            language() {
                this.changeLanguage()
            }
        },
        created() {
            this.changeLanguage()
        },
        activated() {
            this.form.resetFields();
        },
        methods: {
            getPopupContainer(trigger) {
                return trigger.parentElement;
            },
            // 更改列表国际化
            changeLanguage() {
                if (this.language == 'zh-CN') {
                    this.babelList = langZh.editAndDetail_langZh
                } else if (this.language == 'en-US') {
                    this.babelList = langEn.editAndDetail_langEn
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
