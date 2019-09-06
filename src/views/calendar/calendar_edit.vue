<template>
  <a-modal
    :title="$t(titletext)"
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
                  <a-input class="inputdisable editFormInput" v-if="isEdit" :disabled="isEdit" v-decorator="[item.decorator, {rules: [{required: false, message: item.message }]}]" />
                  <a-input class="editFormInput" v-else v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]" />
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
    import {update} from '@api/calendar_api'
    import langZh from '../../locales/zh-CN/calendar_lang.js'
    import langEn from '../../locales/en-US/calendar_lang.js'

    export default {
  name: 'StepByStepModal',
  data () {
    return {
      isEdit: true,
      titletext: '',
      visible: false,
      confirmLoading: false,
      mdl: {},
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
        console.log(this.tableList)
      } else if (this.language == 'en-US') {
        this.tableList = langEn.calendar_edit_langEn
      }
    },
    edit (record, disab) {
      console.log(disab)
      this.visible = true
      this.isEdit = disab
      if (!disab) {
        this.titletext = 'lang.tabComEditComponentTitle'
      } else {
        this.titletext = 'lang.tabComShowComponentTitle'
      }
      const { form: { setFieldsValue } } = this
      this.$nextTick(() => {
        //        setFieldsValue(pick(record, []))
        setFieldsValue(record)
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors && !this.isEdit) { // 编辑
          console.log('values', values)
          update(values)
            .then(res => {
              console.log(res)
              this.visible = false
              this.confirmLoading = false
              this.$emit('ok', values)
            }).catch(e => {
              this.visible = false
              this.confirmLoading = false
            })
        } else { // 详情
          this.visible = false
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
