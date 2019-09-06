<template>
  <a-card :bordered="false" class="content">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item :label="$t('lang.tabComSearchName')">
              <a-input v-model="queryParam.id" :placeholder="$t('lang.tabComSearchPlaceholder')"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item :label="$t('lang.tabComSelectName')">
              <a-select v-model="queryParam.status" :placeholder="$t('lang.tabComSelectPlaceholder')" default-value="0">
                <a-select-option value="0">{{ $t('lang.tabCom_country_Select1') }}</a-select-option>
                <a-select-option value="1">{{ $t('lang.tabCom_country_Select2') }}</a-select-option>
                <a-select-option value="2">{{ $t('lang.tabCom_country_Select3') }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item :label="$t('lang.tabComNumName')">
                <a-input-number v-model="queryParam.callNo" :placeholder="$t('lang.tabComNumPlaceholder')" style="width: 100%"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item :label="$t('lang.tabComDateName')">
                <a-range-picker v-model="queryParam.date">
                  <template slot="renderExtraFooter">
                    extra footer
                  </template>
                </a-range-picker>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="$refs.table.refresh(true)">{{ $t('lang.tabComSearchButtonName') }}</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">{{ $t('lang.tabComResetButtonName') }}</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? $t('lang.tabComToggleCloseName') : $t('lang.tabComToggleShowName') }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="$refs.addForm.add()">{{ $t('lang.tabComNewTableName') }}</a-button>
      <a-button type="dashed" @click="tableOption">{{ optionAlertShow && $t('lang.tabComOptionAlertShowClose') || $t('lang.tabComOptionAlertShowOpen') }} {{ $t('lang.tabComOptionAlertShowText') }}</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="deleteSeclectAll()">
            <a-icon type="delete"/>{{ $t('lang.tabComDelSelectAll') }}
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          {{ $t('lang.tabComBatchOperation') }}
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>

    <s-table
      :columns="columns"
      :scroll="{ x: 6150, y: 1000 }"
      ref="table"
      size="default"
      :rowKey="(record) => record.id"
      :data="loadData"
      :alert="options.alert"
      :rowSelection="options.rowSelection">
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="editListFun(record,true)">{{ $t('lang.tabComActionDeta') }}</a>
          <a-divider type="vertical"/>
          <a @click="editListFun(record,false)">{{ $t('lang.tabComActionAdit') }}</a>
          <a-divider type="vertical"/>
          <a-popconfirm title="Sure to delete?" @confirm="() => deleteListFun(record.id)">
            <a>{{ $t('lang.tabComActionDel') }}</a>
          </a-popconfirm>
        </template>
      </span>
    </s-table>

    <edit-form ref="editForm" @ok="handleOk"/>
    <add-form ref="addForm" @ok="handleOk"/>
  </a-card>
</template>

<script>
    import moment from 'moment'
    import {STable} from '@/components'
    import EditForm from './calendar_edit'
    import AddForm from './calendar_add'
    import {del, list} from '@api/calendar_api'
    import langZh from '../../locales/zh-CN/calendar_lang.js'
    import langEn from '../../locales/en-US/calendar_lang.js'

    export default {
  name: 'TableList',
  components: {
    STable,
    AddForm,
    EditForm
  },
  data () {
    return {
      mdl: {},
      advanced: false, // 高级搜索 展开/关闭
      queryParam: {}, // 查询参数
      optionAlertShow: false, // 是否显示选择框
      selectedRowKeys: [], // 选中的行的keys数组
      selectedRows: [], // 选中的行的全部数组
      // 表头
      columns: [],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return list(Object.assign(parameter, this.queryParam))
          .then(res => {
            console.log(res.result)
            return res.result
          })
      },
      // custom table alert & rowSelection
      options: {
        alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      }
    }
  },
  computed: {
    language () {
      return this.$store.getters.language
    }
  },
  created () {
    // console.log(this.loadData)
    this.changeLanguage()
    this.tableOption()
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
    // 开启、关闭选择框
    tableOption () {
      if (!this.optionAlertShow) {
        this.options = {
          alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
          rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange
          }
        }
        this.optionAlertShow = true
      } else {
        this.options = {
          alert: false,
          rowSelection: null
        }
        this.optionAlertShow = false
      }
    },
    // 选择列表
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
      // this.selectedRows = selectedRows
    },
    // 修改用户
    editListFun (record, disab) {
      this.$refs.editForm.edit(record, disab)
    },
    // 删除单个列表
    deleteListFun (id) {
      console.log(id)
      const datas = {
        id: id
      }
      this.delfun(datas)
    },
    // 删除选中列表
    deleteSeclectAll () {
      const selectedIdArr = this.selectedRowKeys.join(',')
      const iddatas = { id: selectedIdArr }
      this.delfun(iddatas)
    },

    delfun(datas) {
      let self = this;
      this.$confirm({
        title: self.$t("lang.messageDeleteConfirmTitle"),
        content: self.$t("lang.messageDeleteSelectedConfirm"),
        onOk() {
          return del(datas)
            .then(res => {
              console.log(res);
              if (res.code == "0") {
                self.$notification.open({
                  message: "Success",
                  description: self.$t("lang.messageDeleteSuccess"),
                  duration: 6,
                  style: { background: "#52C41A" }
                });
                self.selectedRowKeys = [];
                self.handleOk(); // 删除后刷新列表
              } else {
                self.$notification.open({
                message: "Error",
                description: res.msg,
                duration: 6,
                style: {'background': '#F5222D'}
              });
              }
            })
            .catch(err => {
              console.log(err);
              // this.requestFailed(err)
            });
        },
        onCancel() {}
      });
    },
    // 更改列表数组
    changeLanguage () {
      if (this.language == 'zh-CN') {
        this.columns = langZh.calendar_langZh
      } else if (this.language == 'en-US') {
        this.columns = langEn.calendar_langEn
      }
    },
    // 刷新列表
    handleOk () {
      this.$refs.table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页，true刷新到第一页
    },

    // 收起展开
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    // 重置
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }

  }

}
</script>
