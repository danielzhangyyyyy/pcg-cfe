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
    import {update} from '@api/userRole_api'
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
            this.editSelectKey = Vue.ls.get('userRole_editSelectKey')
            console.log(this.editSelectKey)
        },
        watch: {
            $route: {
                handler(route) {
                    if (route.name === 'userRole_edit') {
                        this.editSelectKey = Vue.ls.get('userRole_editSelectKey')
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
                const loadData = repository.loadData
                const repositoryForm = new Promise((resolve, reject) => {
                    repository.form.validateFields((err, values) => {
                        if (err) {
                            reject(err)
                            return
                        }
                        let arr = []
                        for (let item of loadData) {
                            for (let child of item.children) {
                                if (child.all === true) {
                                    arr.push({
                                        menuId: child.menuId,
                                        Add: child.add,
                                        Update: child.edit,
                                        View: child.view,
                                        Upload: child.upload,
                                        Delete: child.delete,
                                        Execute: child.execute
                                    })
                                } else if (child.add === true) {
                                    arr.push({
                                        menuId: child.menuId,
                                        Add: child.add,
                                        Update: child.edit,
                                        View: child.view,
                                        Upload: child.upload,
                                        Delete: child.delete,
                                        Execute: child.execute
                                    })
                                } else if (child.edit === true) {
                                    arr.push({
                                        menuId: child.menuId,
                                        Add: child.add,
                                        Update: child.edit,
                                        View: child.view,
                                        Upload: child.upload,
                                        Delete: child.delete,
                                        Execute: child.execute
                                    })
                                } else if (child.view === true) {
                                    arr.push({
                                        menuId: child.menuId,
                                        Add: child.add,
                                        Update: child.edit,
                                        View: child.view,
                                        Upload: child.upload,
                                        Delete: child.delete,
                                        Execute: child.execute
                                    })
                                } else if (child.upload === true) {
                                    arr.push({
                                        menuId: child.menuId,
                                        Add: child.add,
                                        Update: child.edit,
                                        View: child.view,
                                        Upload: child.upload,
                                        Delete: child.delete,
                                        Execute: child.execute
                                    })
                                } else if (child.delete === true) {
                                    arr.push({
                                        menuId: child.menuId,
                                        Add: child.add,
                                        Update: child.edit,
                                        View: child.view,
                                        Upload: child.upload,
                                        Delete: child.delete,
                                        Execute: child.execute
                                    })
                                } else if(child.execute === true){
                                    arr.push({
                                        menuId: child.menuId,
                                        Add: child.add,
                                        Update: child.edit,
                                        View: child.view,
                                        Upload: child.upload,
                                        Delete: child.delete,
                                        Execute: child.execute
                                    })
                                }
                            }
                        }
                        values.permission = arr
                        console.log(values, 22);
                        resolve(values)
                    })
                })

                this.errors = []
                Promise.all([repositoryForm]).then(values => {
                    console.log(values[0],2222)
                    values[0].roleId = Vue.ls.get('userRole_editSelectKey')
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
                                this.$router.replace(`/userRole/userRole_list`);
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
