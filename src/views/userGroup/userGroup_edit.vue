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
    import {update} from '@api/userGroup_api'
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
            this.editSelectKey = Vue.ls.get('userGroup_editSelectKey')
            console.log(this.editSelectKey)
        },
        watch: {
            $route: {
                handler(route) {
                    if (route.name === 'userGroup_edit') {
                        this.editSelectKey = Vue.ls.get('userGroup_editSelectKey')
                    }
                },
                deep: true
            }
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault()
            },
            // 最终全页面提交
            validate() {
                const {$refs: {repository}} = this
                const mockData = repository.mockData
                const targetKeys = repository.targetKeys
                const repositoryForm = new Promise((resolve, reject) => {
                    repository.form.validateFields((err, values) => {
                        if (err) {
                            reject(err)
                            return
                        }
                        values.roleId = ''
                        for(let [index,item] of mockData.entries()){
                            if(targetKeys.includes(index.toString())){
                                values.roleId += item.roleId+','
                            }
                        }
                        console.log(values, 22);
                        resolve(values)
                    })
                })

                this.errors = []
                Promise.all([repositoryForm]).then(values => {
                    console.log(values[0],2222)
                    update(values[0]).then(res => {
                        if (res.code == 0) {
                            this.$notification.open({
                                message: "Success",
                                description: this.$t("lang.messageEditSuccess"),
                                duration: 6,
                                style: {background: "#52C41A"}
                            });
                            this.$store.dispatch('ToggleCloseTab', '');
                            setTimeout(() => {
                                this.$store.dispatch('ToggleCloseTab', this.$route.path);
                                this.$router.replace(`/userGroup/userGroup_list`);
                            }, 500);
                        } else {
                            this.$notification.open({
                                message: "Error",
                                description: res.msg,
                                duration: 6,
                                style: {background: "#F5222D"}
                            });
                        }
                    }).catch(er => {
                        console.log(er)
                    })
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
