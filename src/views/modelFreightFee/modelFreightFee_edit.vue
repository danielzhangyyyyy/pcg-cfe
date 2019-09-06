<template>
    <div>
        <a-card class="card" :title="$t('lang.editCommonTitle')" :bordered="false" style="margin-bottom:0">
            <repository-form ref="repository" :showSubmit="false"/>
        </a-card>
        <footer-tool-bar
                :style="{ width: isSideMenu() && isDesktop() ? `calc(100% - ${sidebarOpened ? 256 : 80}px)` : '100%'}">
            <a-button type="primary" @click="validate" :loading="loading">{{ $t('lang.editCommonSubmit') }}</a-button>
        </footer-tool-bar>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {update} from '@api/modelFreightFee_api'
    import RepositoryForm from './RepositoryForm'
    import FooterToolBar from '@/components/FooterToolbar'
    import {mixin, mixinDevice} from '@/utils/mixin'

    export default {
        name: 'AdvancedForm',
        mixins: [mixin, mixinDevice],
        components: {
            FooterToolBar,
            RepositoryForm
        },
        data() {
            return {
                description: '添加信息',
                loading: false,
                memberLoading: false,
                errors: []
            }
        },
        created() {
            this.editSelectKey = Vue.ls.get('modelFreightFee_editSelectKey')
        },
        watch: {
            '$route': {
                handler(route) {
                    if (route.name === 'modelFreightFee_edit') {
                        this.editSelectKey = Vue.ls.get('modelFreightFee_editSelectKey')
                    }
                },
                deep: true
            }
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault()
            },
            // 校验百分比
            validatePercentage(AIR, TRUCK, OCEAN) {
                !AIR ? AIR = 0 : AIR
                !TRUCK ? TRUCK = 0 : TRUCK
                !OCEAN ? OCEAN = 0 : OCEAN
                const total = parseFloat(AIR) + parseFloat(TRUCK) + parseFloat(OCEAN)
                return new Promise((resolve, reject) => {
                    if (total == 1) {
                        resolve()
                    } else {
                        reject("The total of 'GL_Percentage' is 1, please fill in the correct 'GL_Percentage' before proceeding!")
                    }
                })
            },
            //校验不能为空
            validateRow(obj, type, percentage) {
                return new Promise((resolve, reject) => {
                    if (type && percentage) {
                        resolve(obj)
                    } else if (!type && !percentage) {
                        resolve()
                    } else {
                        if (!type) {
                            reject("Please fill in correct 'Fee' before proceeding!")
                        } else if (!percentage) {
                            reject("Please fill in correct 'GL Percentage' before proceeding!")
                        }
                    }
                })
            },
            // 最终全页面提交
            validate() {
                const {$refs: {repository}} = this
                const repositoryForm = new Promise((resolve, reject) => {
                    repository.form.validateFields((err, values) => {
                        if (err) {
                            reject(err)
                            return
                        }
                        resolve(values)
                    })
                })
                // this.loading = true;
                this.errors = []
                Promise.all([repositoryForm]).then(values => {
                    console.log(values, 'values: 1111')
                    let {cycle, brand, plant, country} = this.$route.query
                    let {geo_mix, AirFreightType, AirGlPercentage, OceanFreightType, OceanGlPercentage, TruckFreightType, TruckGlPercentage} = values[0]
                    let airData = {
                        cycle: cycle,
                        brand: brand,
                        plant: plant,
                        country: country,
                        freightType: 'AIR',
                        m1: AirFreightType,
                        percentage: AirGlPercentage
                    };
                    let oceanData= {
                        cycle: cycle,
                        brand: brand,
                        plant: plant,
                        country: country,
                        freightType: 'OCEAN',
                        m1: OceanFreightType,
                        percentage: OceanGlPercentage
                    };
                    let truckData = {
                        cycle: cycle,
                        brand: brand,
                        plant: plant,
                        country: country,
                        freightType: 'TRUCK',
                        m1: TruckFreightType,
                        percentage: TruckGlPercentage
                    };

                    Promise.all([
                        this.validateRow(airData, AirFreightType, AirGlPercentage),
                        this.validateRow(truckData, TruckFreightType, TruckGlPercentage),
                        this.validateRow(oceanData, OceanFreightType, OceanGlPercentage),
                        this.validatePercentage(AirGlPercentage, TruckGlPercentage, OceanGlPercentage)
                    ]).then(res => {
                        let params = []
                        for (let element of res) element ? params.push(element) : '';
                        params.push({
                            cycle: cycle,
                            brand: brand,
                            plant: plant,
                            country: country,
                            freightType: 'GEO_MIX',
                            m1: geo_mix,
                            percentage: 1
                        })
                        console.log(params,'params: 1111');
                        this.eventSubmit(params)
                    }).catch(err => {
                        this.loading = false;
                        this.$notification.open({
                            message: "Error",
                            description: err,
                            duration: 6,
                            style: {background: "#F5222D"} //red
                        });
                    });

                })
            },
            eventSubmit(params) {
                update(params).then(res => {
                    if (res.code == 0) {
                        this.loading = false;
                        this.$notification.open({
                            message: "Success",
                            description: this.$t("lang.messageEditSuccess"),
                            duration: 6,
                            style: {background: "#52C41A"}
                        });
                        this.$store.dispatch('ToggleCloseTab', '');
                        setTimeout(() => {
                            this.$store.dispatch('ToggleCloseTab', this.$route.path);
                            this.$router.replace(`/modelFreightFee/modelFreightFee_list`);
                        }, 500);
                    } else {
                        this.loading = false;
                        this.$notification.open({
                            message: "Error",
                            description: res.msg,
                            duration: 6,
                            style: {background: "#F5222D"}
                        });
                    }
                }).catch(er => {
                    this.loading = false;
                    this.$message.error(er.msg)
                })
            },
            scrollToField(fieldKey) {
                const labelNode = document.querySelector(`label[for="${fieldKey}"]`)
                if (labelNode) {
                    labelNode.scrollIntoView(true)
                }
            }
        }
    }
</script>
