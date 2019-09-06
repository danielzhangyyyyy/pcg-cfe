<template>
    <a-form @submit="handleSubmit" :form="form" class="form">
        <a-row class="form-row" :gutter="48">
            <a-col class="margin_b_20 float_r" :lg="8" :md="12" :sm="24">
                <a-form-item label="GEO_MIX">
                    <a-input
                            :disabled="true"
                            v-decorator="['geo_mix',{initialValue:geo_mix}]"
                    />
                </a-form-item>
            </a-col>
        </a-row>
        <a-row class="form-row" :gutter="48">
            <a-col :lg="12" :md="12" :sm="24" v-for="(item,index) in airList" :key="item.index">
                <a-form-item :label="item.label">
                    <a-input
                            :placeholder="item.placeHolder"
                            v-if="item.inputType=='input'"
                            :disabled="item.editDisabled"
                            @change="inputChange($event, item.decorator)"
                            v-decorator="[item.decorator, {initialValue:item.text, rules: [{required: item.required, message: item.message,pattern: new RegExp(/^(\-|\+)?\d+(\.\d+)?$/) }]}]"
                    />
                </a-form-item>
            </a-col>

            <a-col :lg="12" :md="12" :sm="24" v-for="(item,index) in oceanList" :key="item.index">
                <a-form-item :label="item.label">
                    <a-input
                            :placeholder="item.placeHolder"
                            v-if="item.inputType=='input'"
                            :disabled="item.editDisabled"
                            @change="inputChange($event, item.decorator)"
                            v-decorator="[item.decorator, {initialValue:item.text, rules: [{required: item.required, message: item.message,pattern: new RegExp(/^(\-|\+)?\d+(\.\d+)?$/) }]}]"
                    />
                </a-form-item>
            </a-col>

            <a-col :lg="12" :md="12" :sm="24" v-for="(item,index) in truckList" :key="item.index">
                <a-form-item :label="item.label">
                    <a-input
                            :placeholder="item.placeHolder"
                            v-if="item.inputType=='input'"
                            :disabled="item.editDisabled"
                            @change="inputChange($event, item.decorator)"
                            v-decorator="[item.decorator, {initialValue:item.text, rules: [{required: item.required, message: item.message,pattern: new RegExp(/^(\-|\+)?\d+(\.\d+)?$/) }]}]"
                    />
                </a-form-item>
            </a-col>
        </a-row>
    </a-form>
</template>

<script>

    import Vue from 'vue'
    import {getDropDownList, show} from '@api/modelFreightFee_api'

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
                truckList: [],
                airList: [],
                oceanList: [],
                AirGlPercentage: 0,
                OceanGlPercentage: 0,
                TruckGlPercentage: 0,
                AirFreightType: 0,
                OceanFreightType: 0,
                TruckFreightType: 0,
                funSwitch: false, // 首次不执行
                editSelectKey: '',
                geo_mix: 0,
                form: this.$form.createForm(this)
            }
        },
        created() {
            this.changeLanguage()
            this.editSelectKey = Vue.ls.get('modelFreightFee_editSelectKey')
            let {cycle, brand, plant, country} = this.$route.query
            this.getDetailfun({
                cycle: cycle,
                brand: brand,
                plant: plant,
                country: country
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
                    if (route.name === 'modelFreightFee_edit') {
                        this.editSelectKey = Vue.ls.get('modelFreightFee_editSelectKey')
                        let {cycle, brand, plant, country} = this.$route.query
                        this.getDetailfun({
                            cycle: cycle,
                            brand: brand,
                            plant: plant,
                            country: country
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
            inputChange(ev, decorator) {
                let val = Number(ev.target.value)
                if(decorator === 'AirGlPercentage' && val){
                    this.AirGlPercentage = val
                    this.form.setFieldsValue({
                        geo_mix: (val*this.AirFreightType + this.OceanGlPercentage*this.OceanFreightType + this.TruckGlPercentage*this.TruckFreightType).toFixed(4)
                    })
                } else if(decorator === 'OceanGlPercentage' && val){
                    this.OceanGlPercentage = val
                    this.form.setFieldsValue({
                        geo_mix: (val*this.OceanFreightType + this.AirGlPercentage*this.AirFreightType + this.TruckGlPercentage*this.TruckFreightType).toFixed(4)
                    })
                } else if(decorator === 'TruckGlPercentage' && val){
                    this.TruckGlPercentage = val
                    this.form.setFieldsValue({
                        geo_mix: (val*this.TruckFreightType + this.OceanGlPercentage*this.OceanFreightType + this.AirGlPercentage*this.AirFreightType).toFixed(4)
                    })
                } else if(decorator === 'AirFreightType' && val){
                    this.AirFreightType = val
                    this.form.setFieldsValue({
                        geo_mix: (val*this.AirGlPercentage + this.OceanGlPercentage*this.OceanFreightType + this.TruckGlPercentage*this.TruckFreightType).toFixed(4)
                    })
                } else if(decorator === 'OceanFreightType' && val){
                    this.OceanFreightType = val
                    this.form.setFieldsValue({
                        geo_mix: (val*this.OceanGlPercentage + this.AirGlPercentage*this.AirFreightType + this.TruckGlPercentage*this.TruckFreightType).toFixed(4)
                    })
                } else if(decorator === 'TruckFreightType' && val){
                    this.TruckFreightType = val
                    this.form.setFieldsValue({
                        geo_mix: (val*this.TruckGlPercentage + this.OceanGlPercentage*this.OceanFreightType + this.AirGlPercentage*this.AirFreightType).toFixed(4)
                    })
                }
            },
            // 获取详情并在placeholder上显示
            getDetailfun(params) {
                show(params).then(res => {
                    if (res.code != 0) {
                        this.$notification.open({
                            message: "Error",
                            description: res.msg,
                            duration: 6,
                            style: {'background': '#F5222D'}
                        });
                        setTimeout(() => {
                            this.$store.dispatch("ToggleCloseTab", this.$route.path);
                            this.$router.replace(`/modelFreightFee/modelFreightFee_list`);
                        }, 500);
                        return;
                    }
                    this.form.resetFields();
                    this.truckList = []
                    this.airList = []
                    this.oceanList = []
                    for (let i = 0; i < res.result.length; i++) {
                        if (res.result[i].freightType === 'AIR') {
                            this.AirGlPercentage = Number(res.result[i].percentage);
                            this.AirFreightType = Number(res.result[i].m1);
                            this.airList.push(
                                {
                                    label: 'AIR',
                                    decorator: 'AirFreightType',
                                    required: false,
                                    allowClear: true,
                                    editDisabled: false,
                                    inputType: 'input',
                                    text: res.result[i].m1,
                                    message: 'Please input Only Number'
                                },
                                {
                                    label: 'GL Percentage',
                                    decorator: 'AirGlPercentage',
                                    required: false,
                                    allowClear: true,
                                    editDisabled: false,
                                    inputType: 'input',
                                    text: res.result[i].percentage,
                                    message: 'Please input Only Number'
                                }
                            )
                        } else if (res.result[i].freightType === 'OCEAN') {
                            this.OceanGlPercentage = Number(res.result[i].percentage);
                            this.OceanFreightType = Number(res.result[i].m1);
                            this.oceanList.push(
                                {
                                    label: 'OCEAN',
                                    decorator: 'OceanFreightType',
                                    required: false,
                                    allowClear: true,
                                    editDisabled: false,
                                    inputType: 'input',
                                    text: res.result[i].m1,
                                    message: 'Please input Only Number'
                                },
                                {
                                    label: 'GL Percentage',
                                    decorator: 'OceanGlPercentage',
                                    required: false,
                                    allowClear: true,
                                    editDisabled: false,
                                    inputType: 'input',
                                    text: res.result[i].percentage,
                                    message: 'Please input Only Number'
                                }
                            )
                        } else if (res.result[i].freightType === 'TRUCK') {
                            this.TruckGlPercentage = Number(res.result[i].percentage);
                            this.TruckFreightType = Number(res.result[i].m1);
                            this.truckList.push(
                                {
                                    label: 'TRUCK',
                                    decorator: 'TruckFreightType',
                                    required: false,
                                    allowClear: true,
                                    editDisabled: false,
                                    inputType: 'input',
                                    text: res.result[i].m1,
                                    message: 'Please input Only Number'
                                },
                                {
                                    label: 'GL Percentage',
                                    decorator: 'TruckGlPercentage',
                                    required: false,
                                    allowClear: true,
                                    editDisabled: false,
                                    inputType: 'input',
                                    text: res.result[i].percentage,
                                    message: 'Please input Only Number'
                                }
                            )
                        }
                    }
                    this.geo_mix = (this.AirFreightType*this.AirGlPercentage+ this.OceanFreightType*this.OceanGlPercentage+this.TruckFreightType*this.TruckGlPercentage).toFixed(4)
                }).catch(er => {
                    console.log(er);
                })
            },
            // 更改列表国际化
            changeLanguage() {
                if (this.funSwitch) { // 首次不执行
                    let {cycle, brand, plant, country} = this.$route.query
                    this.getDetailfun({
                        cycle: cycle,
                        brand: brand,
                        plant: plant,
                        country: country
                    })
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
