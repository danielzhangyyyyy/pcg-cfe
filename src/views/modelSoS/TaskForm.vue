<template>
    <a-form @submit="handleSubmit" :form="form" class="form" layout="vertical">
        <a-row class="form-row" :gutter="48">
            <a-col :lg="8" :md="12" :sm="24" v-for="(item,index) in babelList" :key="index">
                <a-form-item :label="item.label">
                    <a-input
                            :placeholder="item.message"
                            v-if="item.inputType=='input'"
                            :disabled="item.editDisabled"
                            @change="inputOnChange($event,item.decorator)"
                            :class="{ plantUpperCase: item.decorator=='plant' }"
                            v-decorator="[item.decorator, {initialValue: item.text, rules: [{required: item.required, message: item.message }]}]"/>
                    <!--<a-auto-complete-->
                            <!--v-if="item.inputType=='autoComplete'"-->
                            <!--:disabled="item.editDisabled"-->
                            <!--:placeholder="item.message"-->
                            <!--:allowClear="item.allowClear"-->
                            <!--:dataSource="item.dropDownList"-->
                            <!--:filterOption="filterOption"-->
                            <!--v-decorator="[item.decorator, { rules: [{required: item.required, message: item.message }]}]"-->
                            <!--@change="handleDropDownChange($event, item.decorator)"/>-->
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
        </a-row>
    </a-form>
</template>

<script>
    import langZh from '../../locales/zh-CN/modelSoS_lang.js'
    import langEn from '../../locales/en-US/modelSoS_lang.js'
    import Vue from "vue";
    import {
        getBrandByModel,
        getBrandList,
        getDescByModel,
        getDropDownList,
        getMotList,
        getProdFamilyByModel
    } from "@api/modelSoS_api";

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
                prod: '',
                brand: '',
                desc: '',
                prodFaimlyDataList: [],
                brandDataList: [],
                descDataList: [],

                plantDataList: [],
                subgeoDataList: [],
                countryDataList: [],
                motDataList: [],
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
            prodFaimlyDataList() {
                this.babelList.forEach(element => {
                    if (element["decorator"] == "prodfamily") {
                        element["dropDownList"] = [].concat(this.prodFaimlyDataList);
                    }
                });
            },
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
            subgeoDataList() {
                this.babelList.forEach(element => {
                    if (element["decorator"] == "subgeo") {
                        element["dropDownList"] = ['ALL'].concat(this.subgeoDataList);
                    }
                });
            },
            countryDataList() {
                this.babelList.forEach(element => {
                    if (element["decorator"] == "country") {
                        element["dropDownList"] = ['ALL'].concat(this.countryDataList);
                    }
                });
            },
            motDataList() {
                this.babelList.forEach(element => {
                    if (element["decorator"] == "mot") {
                        element["dropDownList"] = [].concat(this.motDataList);
                    }
                });
            },
            descDataList() {
                this.babelList.forEach(element => {
                    if (element["decorator"] == "description") {
                        element["dropDownList"] = [].concat(this.descDataList);
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
                {moduleName: "getSubgeoList"},
                this.subgeoDataList,
                "SUBGEO",
                getDropDownList
            );
            this.getDropDown(
                {},
                this.motDataList,
                "mot",
                getMotList
            );
            this.getDropDown(
                {},
                this.brandDataList,
                "brand",
                getBrandList
            );
        },
        activated() {
            this.form.resetFields();
        },
        methods: {
            getValueData(params, api, bool) {
                api(params).then(res => {
                    for (let element of this.babelList) {
                        // if(element.decorator === 'prodfamily' && bool === 'prodfamily'){
                        //    if(res.result.length>0){
                        //        element.text = res.result[0].prodfamily
                        //        element.editDisabled = true
                        //    } else {
                        //        element.text = ''
                        //        element.editDisabled = false
                        //    }
                        // } else if (element.decorator === 'brand' && bool === 'brand'){
                        //     if(res.result.length>0){
                        //         element.text = res.result[0].brand
                        //         element.editDisabled = true
                        //     } else {
                        //         element.text = ''
                        //         element.editDisabled = false
                        //     }
                        // } else
                        if (element.decorator === 'description' && bool === 'description') {
                            if (res.result.length > 0) {
                                element.text = res.result[0].description
                                element.editDisabled = true
                            } else {
                                element.text = ''
                                element.editDisabled = false
                            }
                        }
                    }
                });
            },
            inputOnChange(ev, decorator) {
                let value = ev.target.value;
                if (value && decorator === 'model') {
                    this.form.resetFields('prodfamily');
                    this.form.resetFields('description');
                    this.form.resetFields('brand');
                    this.getValueData({model: value}, getProdFamilyByModel, 'prodfamily');
                    this.getValueData({model: value}, getBrandByModel, 'brand')
                    this.getValueData({model: value}, getDescByModel, 'description')
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
            getDropDown(param, dropdownList, key, api) {
                api(Object.assign({}, param)).then(res => {
                    dropdownList.splice(0);
                    res.result.forEach(el => {
                        dropdownList.push(el[key]);
                    });
                });
            },
            handleDropDownChange(value, decorator) {
                if (decorator === 'brand') {
                    this.form.resetFields('plant')
                    this.plantDataList = []
                    this.getDropDown(
                        {moduleName: "getPlantByBrand", brand: value},
                        this.plantDataList,
                        "PLANT",
                        getDropDownList
                    );
                } else if (decorator === 'subgeo') {
                    this.form.resetFields('country')
                    this.countryDataList = []
                    this.getDropDown(
                        {moduleName: "getCountryBySubgeo", subgeo: value},
                        this.countryDataList,
                        "COUNTRY",
                        getDropDownList
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
