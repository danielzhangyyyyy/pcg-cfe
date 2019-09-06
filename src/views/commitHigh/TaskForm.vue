<template>
    <div>
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
                                v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                        >
                            <a-select-option
                                    v-for="(element, i) in item.dropDownList"
                                    v-bind:key="i"
                                    :value="element"
                            >{{ element }}
                            </a-select-option>
                        </a-select>
                        <a-date-picker
                                v-if="item.inputType=='date'"
                                :getCalendarContainer="getPopupContainer"
                                :disabled="item.editDisabled"
                                :placeholder="item.placeHolder"
                                :allowClear="item.allowClear"
                                v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                        />
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
        <footer-tool-bar
                :style="{width: isSideMenu() && isDesktop() ? `calc(100% - ${sidebarOpened ? 256 : 80}px)` : '100%'}">
            <a-button type="primary" @click="validate" :loading="loading">{{ $t('lang.addCommonSubmit') }}</a-button>
        </footer-tool-bar>
    </div>

</template>

<script>
    import langZh from '../../locales/zh-CN/commitHigh_lang.js'
    import langEn from '../../locales/en-US/commitHigh_lang.js'
    import Vue from "vue";
    import moment from 'moment'
    import {add, getDropDownList} from '@api/commitHigh_api'
    import FooterToolBar from '@/components/FooterToolbar'
    import {mixin, mixinDevice} from '@/utils/mixin'

    export default {
        name: 'TaskForm',
        mixins: [mixin, mixinDevice],
        props: {
            showSubmit: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                brandDataList: [],
                loading: false,
                babelList: [], // 从lang包获取的要展示的字段
                form: this.$form.createForm(this),
                productGroup: Vue.ls.get("PRODUCTGROUP")
            }
        },
        components: {
            FooterToolBar
        },
        computed: {
            language() {
                return this.$store.getters.language
            }
        },
        watch: {
            brandDataList(val) {
                this.babelList.forEach(element => {
                    if (element["decorator"] == "brand") {
                        element["dropDownList"] = [].concat(this.brandDataList);
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
            // 最终全页面提交
            validate() {
                let self = this;
                let time = moment(new Date()).format('YYYYMMDDHHmm')
                this.form.validateFields((err, values) => {
                    let newValue = {
                        uiName: 'commitHigh',
                        cycle: 'CURRENT',
                        uiAction: 'addCommitHigh',
                        productGroup: Vue.ls.get("PRODUCTGROUP"),
                        ownerConfidenceLv: "High",
                        changeId: 'UI_COMMIT_HIGH#ADD#' + time
                    };
                    // let reg = /[^\d]/g;
                    let reg = /^(\-|\+)?\d+(\.\d+)?$/g;
                    if (!reg.test(values.opportunity)) {
                        for (let item of self.babelList) {
                            if (item.decorator === 'opportunity') {
                                this.$notification.open({
                                    message: "Error",
                                    description: 'Opportunity($/unit) Enter only Numbers！',
                                    duration: 6,
                                    style: {'background': '#F5222D'}
                                });
                            }
                        }
                    } else {
                        for (let key in values) {
                            key !== 'brand' && key !== 'projectedBreakInDate' ? newValue[key] = values[key].trim() : key == 'projectedBreakInDate' ? newValue[key] = values[key].format("YYYY-MM-DD") : newValue[key] = values[key]
                        }
                        new Promise((resolve, reject) => {resolve(newValue)}).then(values => {
                            add(values).then(res => {
                                if (res.code == 0) {
                                    self.$notification.open({
                                        message: "Success",
                                        description: this.$t("lang.messageAddSuccess"),
                                        duration: 6,
                                        style: {background: "#52C41A"}
                                    });
                                    this.$store.dispatch('ToggleCloseTab', '');
                                    setTimeout(() => {
                                        this.$store.dispatch('ToggleCloseTab', this.$route.path);
                                        this.$router.replace(`/commitHigh/commitHigh_list`);
                                    }, 500);
                                } else {
                                    this.$notification.open({
                                        message: "Error",
                                        description: res.msg,
                                        duration: 6,
                                        style: {'background': '#F5222D'}
                                    });
                                }
                            }).catch(er => {
                                this.$notification.open({
                                    message: "Error",
                                    description: er.msg,
                                    duration: 6,
                                    style: {'background': '#F5222D'}
                                });
                            })
                        })
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
                        console.log(Vue.ls.get("PRODUCTGROUP"));
                        element["text"] = Vue.ls.get("PRODUCTGROUP");
                    }
                });
                console.log(this.babelList);
            },
            // 更改列表国际化
            changeLanguage() {
                console.log(this.language)
                // eslint-disable-next-line
                if (this.language == 'zh-CN') {
                    this.babelList = langZh.addAndDetail_langZh
                    // eslint-disable-next-line
                } else if (this.language == 'en-US') {
                    this.babelList = langEn.addAndDetail_langEn
                }
            },
            handleSubmit(e) {
                console.log(333333)
                e.preventDefault()
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.$notification['error']({
                            message: 'Received values of form:',
                            description: values
                        })
                    }
                })
            }
        }
    }
</script>
