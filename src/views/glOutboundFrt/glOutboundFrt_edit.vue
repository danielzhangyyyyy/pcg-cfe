<template>
    <div>
        <a-card class="card" :title="$t('lang.editCommonTitle')" :bordered="false" style="margin-bottom:0">
            <repository-form ref="repository" :showSubmit="false"/>
        </a-card>
        <footer-tool-bar
                :style="{ width: isSideMenu() && isDesktop() ? `calc(100% - ${sidebarOpened ? 256 : 80}px)` : '100%'}">
            <a-button type="primary" icon="rollback" @click="eventBack">Return</a-button>&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button type="primary" @click="validate" :loading="loading">{{ $t('lang.editCommonSubmit') }}</a-button>
        </footer-tool-bar>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {update} from '@api/glOutboundFrt_api'
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
            this.editSelectKey = Vue.ls.get('glOutboundFrt_editSelectKey')
        },
        watch: {
            '$route': {
                handler(route) {
                    if (route.name === 'glOutboundFrt_edit') {
                        this.editSelectKey = Vue.ls.get('glOutboundFrt_editSelectKey')
                    }
                },
                deep: true
            }
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault()
            },
            validatePercentage(AIR, TRUCK, OCEAN) {
                !AIR ? AIR = 0 : AIR
                !TRUCK ? TRUCK = 0 : TRUCK
                !OCEAN ? OCEAN = 0 : OCEAN
                const total = parseFloat(AIR) + parseFloat(TRUCK) + parseFloat(OCEAN)
                return new Promise((resolve, reject) => {
                    if (total == 100) {
                        resolve()
                    } else {
                        reject("The total of 'GL_Percentage' is 100, please fill in the correct 'GL_Percentage' before proceeding!")
                    }
                })
            },
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
                    const {cycle, brand, plant, prodFamily, geo, geoType} = this.$route.query
                    let {AirFreightType, AirGlPercentage, AirGeoPercentage, OceanGeoPercentage, TruckGeoPercentage, N, TruckFreightType, TruckGlPercentage, OceanFreightType, OceanGlPercentage} = values[0]
                    let airData = {
                        cycle: cycle,
                        brand: brand,
                        plant: plant,
                        prodFamily: prodFamily,
                        geo: geo,
                        geoType: geoType,
                        geoUpdateFlag: '',
                        freightType: 'AIR',
                        m1: AirFreightType,
                        glPercentage: AirGlPercentage,
                        geoPercentage: AirGeoPercentage
                    }
                    let oceanData = {
                        cycle: cycle,
                        brand: brand,
                        plant: plant,
                        prodFamily: prodFamily,
                        geo: geo,
                        geoType: geoType,
                        geoUpdateFlag: '',
                        freightType: 'OCEAN',
                        m1: OceanFreightType,
                        glPercentage: OceanGlPercentage,
                        geoPercentage: OceanGeoPercentage
                    }
                    let truckData = {
                        cycle: cycle,
                        brand: brand,
                        plant: plant,
                        prodFamily: prodFamily,
                        geo: geo,
                        geoType: geoType,
                        geoUpdateFlag: '',
                        freightType: 'TRUCK',
                        m1: TruckFreightType,
                        glPercentage: TruckGlPercentage,
                        geoPercentage: TruckGeoPercentage
                    }
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
                            prodFamily: prodFamily,
                            geo: geo,
                            geoType: geoType,
                            geoUpdateFlag: N,
                            freightType: 'GEO_MIX'
                        })
                        this.submitUpdate(params)
                    }).catch(err => {
                        this.$notification.open({
                            message: "Error",
                            description: err,
                            duration: 6,
                            style: {background: "#F5222D"} //red
                        });
                    });
                })
            },
            submitUpdate(params) {
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
                            this.$router.replace(`/glOutboundFrt/glOutboundFrt_list`);
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
            eventBack() {
                this.$store.dispatch('ToggleCloseTab', '');
                setTimeout(() => {
                    this.$store.dispatch('ToggleCloseTab', this.$route.fullPath);
                    this.$router.replace(`/glOutboundFrt/glOutboundFrt_list`);
                }, 500);
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
