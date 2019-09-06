<template>
  <a-card :bordered="false" class="content">
    <div class="table-page-search-wrapper"></div>

    <tableBtns
      :currentPageManipulationAuth="currentPageManipulationAuth" :queryParamemter="queryParam"
      uploadId="UPLOAD_UI_WHERE_USED"
    >
      <a-button
        type="primary"
        icon="rollback"
        @click="returnBtnOnClick"
      >{{ $t('lang.tabComWhereUsedModelListReturn') }}</a-button>
    </tableBtns>

    <s-table
      ref="table"
      :columns="columns"
      :loading="loading"
      size="small"
      :rowKey="(record) => record.item"
      :data="loadData"
      :alert="options.alert"
      :customRow="(record) => { return {
                    on:{
                      dblclick:(record)=>{
                        // this.doubleClickOnRow(record,true)
                      }
                    }
                  }}"
      :rowSelection="options.rowSelection"
    ></s-table>
  </a-card>
</template>

<script>
    import moment from "moment";
    import {STable, tableBtns} from "@/components";
    import {del, list} from "@api/whereUsedModel_api";
    import langZh from "../../locales/zh-CN/whereUsedModel_lang.js";
    import langEn from "../../locales/en-US/whereUsedModel_lang.js";

    export default {
  name: "TableList",
  components: {
    STable,
    tableBtns
  },
  data() {
    return {
      currentPageManipulationAuth: ["UploadEnforced"],
      mdl: {},
      loading: false, // 页面是否加载中
      advanced: false, // 高级搜索 展开/关闭
      queryParam: {}, // 查询参数
      optionAlertShow: true, // 是否显示选择框
      selectedRowKeys: [], // 选中的行的keys数组
      selectedRows: [], // 选中的行的全部数组
      // 表头
      columns: [],
      loadData: "",
      // 加载数据方法 必须为 Promise 对象
      // loadData: parameter => {
      //   console.log('loadData.parameter', parameter)
      //   return list(Object.assign(parameter, this.queryParam))
      //     .then(res => {
      //       console.log(res.result)
      //       return res.result
      //     })
      // },
      // custom table alert & rowSelection
      options: {
        alert: {
          show: true,
          clear: () => {
            this.selectedRowKeys = [];
          }
        },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        },
        customRow: {
          click: this.aaaa
        }
      }
    };
  },
  computed: {
    language() {
      return this.$store.getters.language;
    }
  },
  created() {
    this.changeLanguage();
    this.getListFun();
  },
  watch: {
    language(val) {
      this.changeLanguage();
    },
    $route: {
      handler(route) {
        console.log(route.path);
        if (route.path === "/whereUsedModel/whereUsedModel_list") {
          this.handleOk();
        }
      },
      deep: true
    }
  },
    methods: {
    getPopupContainer(trigger) {
      return trigger.parentElement;
    },
    returnBtnOnClick() {
      this.$store.dispatch('ToggleCloseTab', '');
      setTimeout(() => {
        this.$store.dispatch('ToggleCloseTab', this.$route.path);
        this.$router.push({ path: "/whereUsed/whereUsed_list" });
      }, 500);
    },
    uploadBtnOnClick() {},
    getListFun() {
      const that = this;
      // const value = this.queryParam
      that.loadData = parameter => {
        console.log("loadData.parameter", parameter);
        return list(Object.assign(parameter, that.queryParam)).then(res => {
          console.log(res.result);
          that.$refs.table.clearSelected();
          return res.result;
        });
      };
    },
    addNewTable() {
      // 新建列表
      this.$router.replace("/whereUsedModel/whereUsedModel_add");
    },
    /* editSelectOne () { // 修改选中行
            const selectedRowKeyslen = this.selectedRowKeys.length
            console.log(selectedRowKeyslen)
            if (selectedRowKeyslen == 1) {
                const editSelectKey = this.selectedRowKeys[0]
                Vue.ls.set('whereUsedModel_editSelectKey', editSelectKey)
                this.$router.replace(`/whereUsedModel/whereUsedModel_edit`)
            } else if (selectedRowKeyslen < 1) {
                this.$message.warning('请选择要编辑的行')
            } else {
                this.$message.warning('每次最多可编辑一条')
            }
        },
        doubleClickOnRow (record) { // 双击行查看详情
            const rowKey = record.target.parentNode.dataset.rowKey
            console.log(rowKey)
            Vue.ls.set('whereUsedModel_dblclickRowKey', rowKey)
            this.$router.replace('/whereUsedModel/whereUsedModel_detail')
            // this.editListFun(rowKey, true)
        }, */

    // 选择列表
    onSelectChange(selectedRowKeys, selectedRows) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
      // this.selectedRows = selectedRows
    },
    // 修改用户
    editListFun(rowKey, disab) {
      console.log(rowKey);
      console.log(disab);
      this.$refs.editForm.edit(rowKey, disab);
    },
    // 删除单个列表
    deleteListFun(id) {
      console.log(id);
      const datas = {
        id: id
      };
      this.delfun(datas);
    },
    // 删除选中列表
    deleteSeclectAll() {
      const selectedIdArr = this.selectedRowKeys.join(",");
      const iddatas = { id: selectedIdArr };
      this.delfun(iddatas);
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
    changeLanguage() {
      if (this.language == "zh-CN") {
        this.columns = langZh.tableTitle_langZh;
      } else if (this.language == "en-US") {
        this.columns = langEn.tableTitle_langEn;
      }
    },
    // 刷新列表
    handleOk() {
      this.$refs.table.refresh(); // refresh() 不传参默认值 false 不刷新到分页第一页，true刷新到第一页
    },

    // 收起展开
    toggleAdvanced() {
      this.advanced = !this.advanced;
    },
    // 重置
    resetSearchForm() {
      this.queryParam = {
        date: moment(new Date())
      };
    }
    // 开启、关闭选择框
    // tableOption () {
    //   if (!this.optionAlertShow) {
    //     this.options = {
    //       alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
    //       rowSelection: {
    //         selectedRowKeys: this.selectedRowKeys,
    //         onChange: this.onSelectChange
    //       }
    //     }
    //     this.optionAlertShow = true
    //   } else {
    //     this.options = {
    //       alert: false,
    //       rowSelection: null
    //     }
    //     this.optionAlertShow = false
    //   }
    // }
  }
};
</script>
