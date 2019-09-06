<template>
    <div>
        <a-card class="card" :title="$t('lang.addCommonTitle')" :bordered="false" style="margin-bottom:0">
            <task-form ref="task" :showSubmit="false"/>
        </a-card>
        <!--<footer-tool-bar :style="{width: isSideMenu() && isDesktop() ? `calc(100% - ${sidebarOpened ? 256 : 80}px)` : '100%'}">-->
        <!--<a-button type="primary" @click="validate" :loading="loading">{{ $t('lang.addCommonSubmit') }}</a-button>-->
        <!--</footer-tool-bar>-->
    </div>
</template>

<script>
    import {add} from '@api/commitHigh_api'
    import TaskForm from './TaskForm'
    import FooterToolBar from '@/components/FooterToolbar'
    import {mixin, mixinDevice} from '@/utils/mixin'

    export default {
        name: 'AdvancedForm',
        mixins: [mixin, mixinDevice],
        components: {
            FooterToolBar,
            TaskForm
        },
        data() {
            return {
                description: '添加信息',
                loading: false,
                memberLoading: false,
                errors: [],
                babelList: []
            }
        },
        created() {
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault()
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
            // 最终全页面提交
            validate() {
                const {$refs: {task}} = this
                let self = this
                const taskForm = new Promise((resolve, reject) => {
                    task.form.validateFields((err, values) => {
                        if (err) {
                            reject(err)
                            return
                        }
                        // console.log(values)
                        let newValue = {
                            uiName: 'ui_commit_high',
                            uiAction: 'addCommitHigh'
                        };
                        let reg = /[^\d]/g;
                        // reg.test(values.opportunity) ==false? '':''
                        console.log(reg.test(values.opportunity), 222222)
                        if (reg.test(values.opportunity)) {
                            console.log(11111)
                            for (let item of self.babelList) {
                                debugger;
                                if (item.decorator === 'opportunity') {
                                    debugger;
                                    item.message = 'Only Number'
                                }
                            }
                        }
                        for (let key in values) {
                            key !== 'brand' && key !== 'projectedBreakInDate' ? newValue[key] = values[key].trim() : key == 'projectedBreakInDate' ? newValue[key] = values[key].format("YYYY-MM-DD") : newValue[key] = values[key]
                        }
                        resolve(newValue)
                    })
                })
                this.errors = []
                Promise.all([taskForm]).then(values => {
                    console.log(values)
                    add(values[0]).then(res => {
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
