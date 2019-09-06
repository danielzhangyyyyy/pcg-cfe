<template>
    <div>
        <a-card class="card" :title="$t('lang.editCommonTitle')" :bordered="false" style="margin-bottom:0">
            <repository-form ref="repository" :showSubmit="false" />
        </a-card>
        <footer-tool-bar :style="{ width: isSideMenu() && isDesktop() ? `calc(100% - ${sidebarOpened ? 256 : 80}px)` : '100%'}">
            <a-button type="primary" @click="validate" :loading="loading">{{ $t('lang.editCommonSubmit') }}</a-button>
        </footer-tool-bar>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {update} from '@api/warranty_api'
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
    data () {
        return {
            description: '添加信息',
            loading: false,
            memberLoading: false,
            errors: []
        }
    },
    created () {
        this.editSelectKey = Vue.ls.get('warranty_editSelectKey')
        console.log(this.editSelectKey)
    },
    watch: {
        '$route': {
            handler (route) {
                console.log(route.name)
                // eslint-disable-next-line eqeqeq
                if (route.name === 'warranty_edit') {
                    this.editSelectKey = Vue.ls.get('warranty_editSelectKey')
                    console.log(this.editSelectKey)
                    // this.getDetailfun(this.editSelectKey)
                }
            },
            deep: true
        }
    },
    methods: {
        handleSubmit (e) {
            e.preventDefault()
        },
        // 最终全页面提交
        validate () {
            const { $refs: { repository } } = this
            const repositoryForm = new Promise((resolve, reject) => {
                repository.form.validateFields((err, values) => {
                    if (err) {
                        reject(err)
                        return
                    }
                    resolve(values)
                })
        })

        this.errors = []
        Promise.all([repositoryForm]).then(values => {
            values[0].rid = this.editSelectKey.split("@")[0]
            console.log(values)
            update(values[0])
                    .then(res => {
                if (res.code == 0) {
                    this.$notification.open({
                        message: "Success",
                        description: this.$t("lang.messageEditSuccess"),
                        duration: 6,
                        style: { background: "#52C41A" }
                    });
                    this.$store.dispatch('ToggleCloseTab', '');
                    setTimeout(() => {
                        this.$store.dispatch('ToggleCloseTab', this.$route.path);
                        this.$router.replace(`/warranty/warranty_list`);
                    }, 500);
                } else {
                    this.$notification.open({
                        message: "Error",
                        description: res.msg,
                        duration: 6,
                        style: { background: "#F5222D" }
                    });
                }
                // this.$emit('ok', values)
            })
        .catch(er => {
                this.$message.error(er.msg)
                console.log(er)
            })
        })
        },
        scrollToField (fieldKey) {
            const labelNode = document.querySelector(`label[for="${fieldKey}"]`)
            if (labelNode) {
                labelNode.scrollIntoView(true)
            }
        }
    }
}
</script>
