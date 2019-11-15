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
                            :getPopupContainer="getPopupContainer" showSearch
                            :filterOption="filterOption"
                            optionFilterProp="children"
                            v-if="item.inputType=='dropDown'"
                            :placeholder="item.message"
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
    import langZh from "../../locales/zh-CN/plantMaintenance_lang.js";
    import langEn from "../../locales/en-US/plantMaintenance_lang.js";
    import Vue from "vue";
    import {getDropDownList} from "@api/plantMaintenance_api";

    export default {
        name: "TaskForm",
        props: {
            showSubmit: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                plantCountryRegionDropDownList: [],
                plantTypeDropDownList: ["DC", "IN_HOUSE", "OEM"],
                babelList: [], // 从lang包获取的要展示的字段
                form: this.$form.createForm(this),
                productGroup: Vue.ls.get("PRODUCTGROUP")
            };
        },
        computed: {
            language() {
                return this.$store.getters.language;
            }
        },
        watch: {
            plantCountryRegionDropDownList(val) {
                this.babelList.forEach(element => {
                    if (element["decorator"] == "plantCountry") {
                        element["dropDownList"] = [].concat(
                            this.plantCountryRegionDropDownList
                        );
                    }
                });
            },
            language(val) {
                this.changeLanguage();
            }
        },
        created() {
            this.changeLanguage();
            this.getDropDown(
                {moduleName: "getCountryList"},
                this.plantCountryRegionDropDownList,
                "COUNTRY"
            );
        },
        activated() {
            this.form.resetFields();
        },
        methods: {
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
                    if (element["decorator"] == "plantType") {
                        element["dropDownList"] = [].concat(this.plantTypeDropDownList);
                    } else if (element["decorator"] == "productGroup") {
                        element["text"] = Vue.ls.get("PRODUCTGROUP");
                    }
                });
            },
            // 更改列表国际化
            changeLanguage() {
                if (this.language == "zh-CN") {
                    this.babelList = langZh.editAndDetail_langZh;
                } else if (this.language == "en-US") {
                    this.babelList = langEn.editAndDetail_langEn;
                }
                this.setDropDownLists();
            },
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.$notification["error"]({
                            message: "Received values of form:",
                            description: values
                        });
                    }
                });
            }
        }
    };
</script>
<style>
    .plantUpperCase {
        text-transform: uppercase;
    }
</style>

