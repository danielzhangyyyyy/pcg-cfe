<template>
    <a-form @submit="handleSubmit" :form="form" class="form">
        <a-row class="form-row" :gutter="48">
            <a-col :lg="8" :md="12" :sm="24" v-for="(item,index) in babelList.slice(0,6)" :key="item.index">
                <a-form-item :label="item.label">
                    <a-input
                            :placeholder="item.message"
                            v-if="item.inputType=='input'"
                            :disabled="item.decorator=='productGroup'"
                            :class="{ plantUpperCase: item.decorator=='plant' }"
                            v-decorator="[item.decorator, {initialValue: item.text, rules: [{required: item.required, message: item.message }]}]"/>
                    <a-select
                            showSearch
                            :getPopupContainer="getPopupContainer"
                            :filterOption="filterOption"
                            optionFilterProp="children"
                            v-if="item.inputType=='dropDown'"
                            :placeholder="item.message"
                            :allowClear="item.allowClear"
                            @change="handleDropDownChange($event, item.decorator)"
                            v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]">
                        <a-select-option
                                v-for="(element, i) in item.dropDownList"
                                v-bind:key="i"
                                :value="element"
                        >{{ element }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24" v-for="(item,index) in babelList.slice(6)" :key="item.index">
                <a-form-item :label="item.label">
                    <a-input
                            :placeholder="item.message"
                            v-if="item.inputType=='input'"
                            :disabled="item.decorator=='productGroup'"
                            :class="{ plantUpperCase: item.decorator=='plant' }"
                            v-decorator="[item.decorator, {initialValue: item.text, rules: [{required: item.required, message: item.message,pattern: new RegExp(/^(\-|\+)?\d+(\.\d+)?$/)  }]}]"/>
                </a-form-item>
            </a-col>
        </a-row>
    </a-form>
</template>

<script>
    import langZh from '../../locales/zh-CN/gscRealCostGroup_lang.js'
    import langEn from '../../locales/en-US/gscRealCostGroup_lang.js'
    import Vue from "vue";
    import {getDropDownList} from "@api/gscRealCostGroup_api";

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
                familyDataList: [],
                countryDataList: [],
                categoryDataList: [],
                tbaTypeDataList: ['US_DOLLAR', 'PERCENTAGE'],
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
            categoryDataList() {
                this.babelList.forEach(element => {
                    if (element["decorator"] == "category") {
                        element["dropDownList"] = [].concat(this.categoryDataList);
                    }
                });
            },
            countryDataList() {
                this.babelList.forEach(element => {
                    if (element["decorator"] == "country") {
                        element["dropDownList"] = [].concat(this.countryDataList);
                    }
                });
            },
            familyDataList() {
                this.babelList.forEach(element => {
                    if (element["decorator"] == "family") {
                        element["dropDownList"] = ['ALL'].concat(this.familyDataList);
                    }
                });
            },
            language(val) {
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
            this.getDropDown(
                {moduleName: "getCountryList"},
                this.countryDataList,
                "COUNTRY"
            );
            this.getDropDown(
                {moduleName: "getCategoryGscList"},
                this.categoryDataList,
                "CATEGORY"
            );
            this.setDropDownLists();
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
            setDropDownLists() {
                this.babelList.forEach(element => {
                    if (element["decorator"] == "tbaType") {
                        element["dropDownList"] = [].concat(this.tbaTypeDataList);
                    }
                });
            },
            handleDropDownChange(value, decorator) {
                if (decorator === 'brand') {
                    this.form.resetFields('family')
                    this.familyDataList.splice(0)
                    this.getDropDown(
                        {moduleName: "getBizProdFByBrand", brand: value},
                        this.familyDataList,
                        "PROD_FAMILY"
                    );
                }
            },
            // 更改列表国际化
            changeLanguage() {
                if (this.language == 'zh-CN') {
                    this.babelList = langZh.addAndDetail_langZh
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
