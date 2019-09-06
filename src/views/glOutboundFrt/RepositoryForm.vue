<template>
    <a-form @submit="handleSubmit" :form="form" class="form">
        <a-row class="form-row" :gutter="48">
            <a-col class="margin_b_20 float_r" :lg="8" :md="12" :sm="24">
                <a-form-item label="GEO Modified">
                    <a-input
                            :disabled="true"
                            v-decorator="[geoUpdateFlag,{initialValue:geoUpdateFlag}]"
                    />
                </a-form-item>
            </a-col>
        </a-row>
        <a-row class="form-row" :gutter="48">
            <a-col :lg="8" :md="12" :sm="24" v-for="(item,index) in airList.slice(0,1)" :key="item.index">
                <a-form-item :label="item.label">
                    <a-input
                            :placeholder="item.placeHolder"
                            v-if="item.inputType=='input'"
                            :disabled="item.editDisabled"
                            v-decorator="[item.decorator, {initialValue:item.text, rules: [{required: item.required, message: item.message,pattern: new RegExp(/^(\-|\+)?\d+(\.\d+)?$/) }]}]"
                    />
                </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24" v-for="(item,index) in airList.slice(1)" :key="item.index">
                <a-form-item :label="item.label">
                    <a-input
                            :placeholder="item.placeHolder"
                            v-if="item.inputType=='input'"
                            :disabled="item.editDisabled"
                            @change="inputChange($event, item.decorator)"
                            v-decorator="[item.decorator, {initialValue:item.text, rules: [{required: item.required, message: item.message,pattern: new RegExp(/^(?:[0-9]\d*|0)(?:\.\d{1,2})?$/) }]}]"
                    />
                </a-form-item>
            </a-col>

            <a-col :lg="8" :md="12" :sm="24" v-for="(item,index) in oceanList.slice(0,1)" :key="item.index">
                <a-form-item :label="item.label">
                    <a-input
                            :placeholder="item.placeHolder"
                            v-if="item.inputType=='input'"
                            :disabled="item.editDisabled"
                            v-decorator="[item.decorator, {initialValue:item.text, rules: [{required: item.required, message: item.message,pattern: new RegExp(/^(\-|\+)?\d+(\.\d+)?$/) }]}]"
                    />
                </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24" v-for="(item,index) in oceanList.slice(1)" :key="item.index">
                <a-form-item :label="item.label">
                    <a-input
                            :placeholder="item.placeHolder"
                            v-if="item.inputType=='input'"
                            :disabled="item.editDisabled"
                            @change="inputChange($event, item.decorator)"
                            v-decorator="[item.decorator, {initialValue:item.text, rules: [{required: item.required, message: item.message,pattern: new RegExp(/^(?:[1-9]\d*|0)(?:\.\d{1,2})?$/) }]}]"
                    />
                </a-form-item>
            </a-col>

            <a-col :lg="8" :md="12" :sm="24" v-for="(item,index) in truckList.slice(0,1)" :key="item.index">
                <a-form-item :label="item.label">
                    <a-input
                            :placeholder="item.placeHolder"
                            v-if="item.inputType=='input'"
                            :disabled="item.editDisabled"
                            v-decorator="[item.decorator, {initialValue:item.text, rules: [{required: item.required, message: item.message,pattern: new RegExp(/^(\-|\+)?\d+(\.\d+)?$/) }]}]"
                    />
                </a-form-item>
            </a-col>
            <a-col :lg="8" :md="12" :sm="24" v-for="(item,index) in truckList.slice(1)" :key="item.index">
                <a-form-item :label="item.label">
                    <a-input
                            :placeholder="item.placeHolder"
                            v-if="item.inputType=='input'"
                            :disabled="item.editDisabled"
                            @change="inputChange($event, item.decorator)"
                            v-decorator="[item.decorator, {initialValue:item.text, rules: [{required: item.required, message: item.message,pattern: new RegExp(/^(?:[1-9]\d*|0)(?:\.\d{1,2})?$/) }]}]"
                    />
                </a-form-item>
            </a-col>
        </a-row>
    </a-form>
</template>

<script>
    import langZh from '../../locales/zh-CN/glOutboundFrt_lang.js'
    import langEn from '../../locales/en-US/glOutboundFrt_lang.js'
    import {getDropDownList, show} from '@api/glOutboundFrt_api'

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
                geoUpdateFlag: '',
                funSwitch: false, // 首次不执行
                airList:[],
                oceanList:[],
                truckList:[],
                editSelectKey: '',
                form: this.$form.createForm(this)
            }
        },
        created() {
            this.changeLanguage()
            let {cycle, brand, plant, prodFamily, geo} = this.$route.query
            this.getDetailfun({
                cycle: cycle,
                brand: brand,
                plant: plant,
                prodFamily: prodFamily,
                geo: geo
            })
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
            '$route': {
                handler(route) {
                    if (route.name === 'glOutboundFrt_edit') {
                        let {cycle, brand, plant, prodFamily, geo} = this.$route.query
                        this.getDetailfun({
                            cycle: cycle,
                            brand: brand,
                            plant: plant,
                            prodFamily: prodFamily,
                            geo: geo
                        })
                    }
                },
                deep: true
            }
        },

        methods: {
            getPopupContainer(trigger) {
                return trigger.parentElement;
            },
            // 获取详情并在placeholder上显示
            getDetailfun(params) {
                show(params).then(res => {
                    if (res.code !== '0') {
                        this.$notification.open({
                            message: "Error",
                            description: res.msg,
                            duration: 6,
                            style: {'background': '#F5222D'}
                        });
                        setTimeout(() => {
                            this.$store.dispatch("ToggleCloseTab", this.$route.path);
                            this.$router.replace(`/glOutboundFrt/glOutboundFrt_list`);
                        }, 500);
                        return;
                    } else{
                        this.form.resetFields();
                        for (let i = 0; i < this.airList.length; i++) {
                            this.airList[i].text = '';
                            this.oceanList[i].text = '';
                            this.truckList[i].text = '';
                        }
                        for (let i = 0; i < res.result.length; i++) {
                            if (res.result[i].freightType === 'AIR') {
                                this.airList[0].text = res.result[i].m1
                                this.airList[1].text = res.result[i].glPercentage.toFixed(2)
                                this.airList[2].text = res.result[i].geoPercentage.toFixed(2)
                            } else if (res.result[i].freightType === 'OCEAN') {
                                this.oceanList[0].text = res.result[i].m1
                                this.oceanList[1].text = res.result[i].glPercentage.toFixed(2)
                                this.oceanList[2].text = res.result[i].geoPercentage.toFixed(2)
                            } else if (res.result[i].freightType === 'TRUCK') {
                                this.truckList[0].text = res.result[i].m1
                                this.truckList[1].text = res.result[i].glPercentage.toFixed(2)
                                this.truckList[2].text = res.result[i].geoPercentage.toFixed(2)
                            } else if (res.result[i].freightType === 'GEO_MIX') {
                                this.geoUpdateFlag = res.result[i].geoUpdateFlag
                            }
                        }
                    }
                }).catch(er => {
                    // this.$notification.open({
                    //     message: "Error",
                    //     description: er.msg,
                    //     duration: 6,
                    //     style: {'background': '#F5222D'}
                    // });
                })
            },
            inputChange(ev, decorator) {
                let val = ev.target.value
                if(decorator === 'AirGlPercentage'){
                    this.form.setFieldsValue({
                        AirGeoPercentage: val
                    })
                } else if(decorator === 'OceanGlPercentage'){
                    this.form.setFieldsValue({
                        OceanGeoPercentage: val
                    })
                } else if(decorator === 'TruckGlPercentage'){
                    this.form.setFieldsValue({
                        TruckGeoPercentage: val
                    })
                }
            },
            // 更改列表国际化
            changeLanguage() {
                if (this.language == 'zh-CN') {
                    this.truckList = langZh.truckList
                    this.airList = langZh.airList
                    this.oceanList = langZh.oceanList
                } else if (this.language == 'en-US') {
                    this.truckList = langEn.truckList
                    this.airList = langEn.airList
                    this.oceanList = langEn.oceanList
                }
                if (this.funSwitch) { // 首次不执行
                    let {cycle, brand, plant, prodFamily, geo} = this.$route.query
                    this.getDetailfun({
                        cycle: cycle,
                        brand: brand,
                        plant: plant,
                        prodFamily: prodFamily,
                        geo: geo
                    })
                }
            }
            ,
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

<style scoped>
    .float_r {
        float: right;
    }
</style>

