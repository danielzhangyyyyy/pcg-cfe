<template>
  <a-modal
    :title="$t('lang.tabComAddComponentTitle')"
    :width="700"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel">
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-spin :spinning="confirmLoading">
          <a-form :form="form" layout="inline">
            <a-row :gutter="48">
              <a-form-item label="id" style="display: none;">
                <a-input v-decorator="['id']" />
              </a-form-item>
              <a-col
                :md="12"
                :sm="24"
                v-for="(item,index) in tableList"
                :key="index">
                <a-form-item :label="item.label" >
                  <a-input class="editFormInput" v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-spin>
      </div>
    </a-card>
  </a-modal>
</template>

<script>
    import {add} from '@api/calendar_api'
    import langZh from '../../locales/zh-CN/calendar_lang.js'
    import langEn from '../../locales/en-US/calendar_lang.js'

    export default {
  data () {
    return {
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      tableList: []
    }
  },
  computed: {
    language () {
      return this.$store.getters.language
    }
  },
  created () {
    this.changeLanguage()
    console.log(this.language)
  },
  watch: {
    language (val) {
      this.changeLanguage()
    }
  },
    methods: {
    getPopupContainer(trigger) {
      return trigger.parentElement;
    },
    // 更改列表国际化
    changeLanguage () {
      if (this.language == 'zh-CN') {
        this.tableList = langZh.calendar_edit_langZh
      } else if (this.language == 'en-US') {
        this.tableList = langEn.calendar_edit_langEn
      }
    },
    add () {
      this.visible = true
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          add(values)
            .then(res => {
              console.log(res)
              this.visible = false
              this.confirmLoading = false
              this.$emit('ok', values)
            })
            .catch(err => {
              this.visible = false
              this.confirmLoading = false
            })
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
<style lang="less" scoped>
    @import '../../commoncss/commoncss.less';
</style>
