<template>
  <a-card :bordered="false" class="content">
    <tableBtns :currentPageManipulationAuth="currentPageManipulationAuth">
      <a-button
        type="primary"
        icon="search"
        :loading="searchLoading"
        @click="searchOnClick"
      >{{ $t('lang.tabComSearchButtonName') }}</a-button>
      <a-button type="primary" icon="upload" @click="uploadOnClick">{{ $t('lang.tabComUpload') }}</a-button>
      <a-button
        type="primary"
        icon="download"
        :loading="exportLoading"
        @click="exportOnClick"
      >{{ $t('lang.tabComExport') }}</a-button>
      <a-button type="primary" icon="delete" @click="deleteAll">Delete All</a-button>
      <a-button
        type="primary"
        icon="delete"
        @click="deleteSeclectAll"
      >{{ $t('lang.tabComActionDel') }}</a-button>
      <a-button type="primary" icon="rollback" @click="returnBtnOnClick">Return</a-button>
    </tableBtns>
    <s-table
      ref="table"
      :columns="columns"
      :loading="loading"
      size="small"
      :rowKey="record => record.rid"
      :data="loadData"
      :alert="options.alert"
      :rowSelection="options.rowSelection"
    ></s-table>
  </a-card>
</template>

<script>
    import Vue from "vue";
    import moment from "moment";
    import {STable, tableBtns} from "@/components";
    import {del, delAll, list} from "@api/stdcostInModelList_api";
    import {exportByURL} from "@api/exportFunction_api";
    import { getXScrollSize } from "@api/publicFunc_api";
    import langZh from "../../locales/zh-CN/stdcostInModelList_lang.js";
    import langEn from "../../locales/en-US/stdcostInModelList_lang.js";

    export default {
  name: "TableList",
  components: {
    STable,
    tableBtns
  },
  data() {
    return {
      currentPageManipulationAuth: [],
      exportLoading: false,
      uploadId:"UPLOAD_STDCOST_IN_MODEL",
      form: this.$form.createForm(this),
      searchLoading: false,
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
      scrollSize: {},
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
    this.scrollSize.x = getXScrollSize(this.columns, langEn.deltaSize);
    this.getListFun();
  },
  watch: {
    language(val) {
      this.changeLanguage();
    },
    $route: {
      handler(route) {
        console.log(route.path);
        if (route.path === "/stdcostInModelList/stdcostInModelList_list") {
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
    exportOnClick() {
      this.exportLoading = true;
      let json = { ...this.queryParam, eventName: this.uploadId };
      let url = "common/exportExcel";
      exportByURL(json, url);
      this.exportLoading = false;
    },
    uploadOnClick() {
      this.$router.push(`/upload/upload_list/${this.uploadId}/origin/${this.$route.name}`);
    },
    returnBtnOnClick() {
      this.$store.dispatch("ToggleCloseTab", "");
      setTimeout(() => {
        this.$store.dispatch("ToggleCloseTab", this.$route.path);
        this.$router.push({ path: "/stdcostReport/stdcostReport_list" });
      }, 500);
    },
    searchOnClick() {
      this.$refs.table.refresh(true);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        console.log("err", err);
        console.log("values", values);
        if (!err) {
          this.$notification.open({
            message: "Search condition error:",
            description: "please input search conditions.",
            duration: 6,
            style: { background: "#F5222D" }
          });
        }
      });
    },
    getListFun() {
      const that = this;
      // const value = this.queryParam
      that.loadData = parameter => {
        that.searchLoading = true;
        console.log("loadData.parameter", parameter);
        return list(Object.assign(parameter, that.queryParam)).then(res => {
          console.log(res.result);
          that.searchLoading = false;
          that.$refs.table.clearSelected();
          return res.result;
        });
      };
    },

    // 选择列表
    onSelectChange(selectedRowKeys, selectedRows) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
      // this.selectedRows = selectedRows
    },
    deleteAll() {
      let self = this;
      this.$confirm({
        title: self.$t("lang.messageDeleteConfirmTitle"),
        content: self.$t("Are you sure to delete all rows ?"),
        onOk() {
          return delAll()
            .then(res => {
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
      console.log(this.selectedRowKeys);
      if (this.selectedRowKeys.length == 0) {
           this.$notification.open({
                        message: "Warn",
                        description: this.$t("lang.messagePleaseSelectDeleteRow"),
                        duration: 6,
                        style: {background: "#FAAD14"}
                    });
        return;
      }
      const iddatas = [];
      this.selectedRowKeys.forEach(element => {
        iddatas.push({
          rid: element
        });
      });
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
                console.log("^^^^^^^^^^^^^^");
                self.$notification.open({
                  message: "Success",
                  description: self.$t("lang.messageDeleteSuccess"),
                  duration: 6,
                  style: { background: "#52C41A" }
                });
                self.selectedRowKeys = [];
                console.log("!!!!!!!!");
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
