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
                            v-decorator="[item.decorator, {initialValue: item.text, rules: [{required: item.required, message: item.message,pattern: new RegExp(/^(\-|\+)?\d+(\.\d+)?$/) }]}]"/>
                    <a-select
                            showSearch
                            :getPopupContainer="getPopupContainer"
                            :filterOption="filterOption"
                            optionFilterProp="children"
                            v-if="item.inputType=='dropDown'"
                            :placeholder="item.message"
                            :disabled = 'item.editDisabled'
                            :allowClear="item.allowClear"
                            @change="handleDropDownChange($event, item.decorator)"
                            v-decorator="[item.decorator, {initialValue: item.text,rules: [{required: item.required, message: item.message }]}]">
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
    import langZh from '../../locales/zh-CN/inboundFreight_lang.js'
    import langEn from '../../locales/en-US/inboundFreight_lang.js'
    import Vue from "vue";
    import {getDropDownList} from "@api/inboundFreight_api";

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
                brandDataList: [],
                plantDataList: [],
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
            brandDataList() {
                this.babelList.forEach(element => {
                    if (element["decorator"] == "brand") {
                        element["dropDownList"] = [].concat(this.brandDataList);
                    }
                });
            },
            plantDataList() {
                this.babelList.forEach(element => {
                    if (element["decorator"] == "plant") {
                        element["dropDownList"] = [].concat(this.plantDataList);
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
                {moduleName: "getBrandList"},
                this.brandDataList,
                "BRAND"
            );
            this.getMonths();
        },
        activated() {
            this.form.resetFields();
        },
        methods: {
            getMonths() {
                getDropDownList({moduleName: 'getMonthListByCycle', cycle: 'CURRENT'}).then(res => {
                    for (let key in res.result[0]) {
                        for (let item of this.babelList) {
                            if (item.decorator && item.decorator.toUpperCase() === key.toUpperCase()) {
                                item.label = res.result[0][key]
                            }
                        }
                    }
                });
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
                getDropDownList(Object.assign({}, param)).then(res => {
                    dropdownList.splice(0);
                    res.result.forEach(el => {
                        dropdownList.push(el[key]);
                    });
                });
            },
            handleDropDownChange(value, decorator) {
                if(decorator === 'brand'){
                    this.form.resetFields('plant')
                    this.plantDataList = []
                    this.getDropDown(
                        {moduleName: "getPlantByBrand",brand: value},
                        this.plantDataList,
                        "PLANT"
                    );
                }
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
