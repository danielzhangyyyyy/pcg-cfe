<template>
  <a-card :bordered="false" class="content">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @submit="handleSubmit" :form="form">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24" v-for="item in filterList.slice(0,2)" :key="item.index">
            <a-form-item :label="item.label">
              <a-input
                :placeholder="item.placeHolder"
                v-if="item.inputType=='input'"
                :disabled="item.editDisabled"
                v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
              />
              <a-select
                showSearch
                :filterOption="filterOption"
                optionFilterProp="children"
                v-if="item.inputType=='dropDown'"
                :placeholder="item.placeHolder"
                :allowClear="item.allowClear"
                v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                @change="handleDropDownChange($event, item.decorator)"
              >
                <a-select-option
                  v-for="(element, i) in item.dropDownList"
                  :key="i"
                  :value="element"
                >{{ element }}</a-select-option>
              </a-select>
              <a-date-picker
                v-if="item.inputType=='date'"
                :disabled="item.editDisabled"
                :placeholder="item.placeHolder"
                :allowClear="item.allowClear"
                v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
              />
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24" v-for="item in filterList.slice(2)" :key="item.index">
              <a-form-item :label="item.label">
                <a-input
                  :placeholder="item.placeHolder"
                  v-if="item.inputType=='input'"
                  :disabled="item.editDisabled"
                  v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                />
                <a-select
                  showSearch
                  :filterOption="filterOption"
                  optionFilterProp="children"
                  v-if="item.inputType=='dropDown'"
                  :placeholder="item.placeHolder"
                  :allowClear="item.allowClear"
                  v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                  @change="handleDropDownChange($event, item.decorator)"
                >
                  <a-select-option
                    v-for="(element, i) in item.dropDownList"
                    :key="i"
                    :value="element"
                  >{{ element }}</a-select-option>
                </a-select>
                <a-date-picker
                  v-if="item.inputType=='date'"
                  :disabled="item.editDisabled"
                  :placeholder="item.placeHolder"
                  :allowClear="item.allowClear"
                  v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                />
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span
              class="table-page-search-submitButtons"
              :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
            >
              <a-button
                type="primary"
                icon="search"
                :loading="searchLoading"
                @click="searchOnClick"
              >{{ $t('lang.tabComSearchButtonName') }}</a-button>
              <a-button
                style="margin-left: 8px"
                icon="undo"
                @click="() => {form.resetFields()}"
              >{{ $t('lang.tabComResetButtonName') }}</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <tableBtns
      :currentPageManipulationAuth="currentPageManipulationAuth"
      :queryParamemter="queryParam"
      uploadId="EXPORT_SBB_COMPONENT_FILTER"
      @addNewTable="addNewTable"
      @editSelectOne="editSelectOne"
      @deleteSeclectAll="deleteSeclectAll"
    >
      <a-button type="primary" @click="eventExecute">Execute</a-button>
      <a-button type="primary" @click="eventPush">BasicNameEdit</a-button>
    </tableBtns>

    <s-table
      ref="table"
      :columns="columns"
      :loading="loading"
      :scroll="scrollSize"
      size="small"
      :rowKey="(record) => `${record.rid}`"
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
    import Vue from "vue";
    import moment from "moment";
    import {STable, tableBtns} from "@/components";
    import {del, filterSBB, getDropDownList, list} from "@api/sBBComponentFilter_api";
    import { getXScrollSize } from "@api/publicFunc_api";
    import langZh from "../../locales/zh-CN/sBBComponentFilter_lang.js";
    import langEn from "../../locales/en-US/sBBComponentFilter_lang.js";

    export default {
  name: "TableList",
  components: {
    STable,
    tableBtns
  },
  data() {
    return {
      brandDataList: [],
      filterList: langEn.filter_langEn,
      form: this.$form.createForm(this),
      currentPageManipulationAuth: ["Delete", "View"],
      mdl: {},
      searchLoading: false,
      loading: false, // 页面是否加载中
      advanced: false, // 高级搜索 展开/关闭
      queryParam: {
        sbb: ""
      }, // 查询参数
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
    // this.getDropDown(
    //     { moduleName: "getBrandList" },
    //     this.brandDataList,
    //     "BRAND"
    // );
    // this.setDropDownLists();
  },
  watch: {
    plantListData(val) {
      this.filterList.forEach(element => {
        if (element["decorator"] == "brand") {
          element["dropDownList"] = [].concat(this.brandDataList);
        }
      });
    },
    language(val) {
      this.changeLanguage();
    },
    $route: {
      handler(route) {
        console.log(route.path);
        if (route.path === "/sBBComponentFilter/sBBComponentFilter_list") {
          this.handleOk();
        }
      },
      deep: true
    }
  },
  methods: {
      eventExecute(){
          let params = {
              uiAction: 'SBB_COMPONENT_FILTER',
              uiName: 'sBBComponentFilter'
          },self = this;
          filterSBB(params).then(res=>{
              if(res.code === '0'){
                  self.$notification.open({
                      message: "Success",
                      description: res.msg,
                      duration: 6,
                      style: {background: "#52C41A"}
                  });
              }else {
                  self.$notification.open({
                      message: "Error",
                      description: res.msg,
                      duration: 6,
                      style: {'background': '#F5222D'}
                  });
              }
          }).catch(err=>{
              console.log(err);
          })
      },
    eventPush() {
      this.$router.push("/sBBComponentFilter/BasicNameList");
    },
    searchOnClick() {
      // this.$refs.table.refresh(true);
      let self = this;
      this.form.validateFields((err, values) => {
        console.log("err", err);
        console.log("values", values);
        if (!err) {
          console.log(1111);
          this.queryParam.sbb = values.sbb.trim();
          // self.getListFun();
          this.$refs.table.refresh(true);
        } else {
          this.$notification.open({
            message: "Search condition error:",
            description: "please input search conditions.",
            duration: 6,
            style: { background: "#F5222D" }
          });
        }
      });
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    setDropDownLists() {
      this.filterList.forEach(element => {
        if (element["decorator"] == "plantType") {
          element["dropDownList"] = [].concat(this.plantTypeListData);
        }
      });
    },
    getDropDown(param, dropdownList, key) {
      getDropDownList(Object.assign({}, param)).then(res => {
        dropdownList.splice(0);
        res.result.forEach(el => {
          dropdownList.push(el[key]);
        });
      });
    },
    handleDropDownChange(value, decorator) {},
    getListFun() {
      const that = this;
      that.loadData = parameter => {
        that.searchLoading = true;
        if (that.queryParam.sbb !== "") {
          return list(Object.assign(parameter, that.queryParam)).then(res => {
            that.searchLoading = false;
            that.$refs.table.clearSelected();
            return res.result;
          });
        } else {
          return new Promise((resolve, reject) => {
            if (true) {
              resolve({
                result: { total: 0, list: [], pageNum: 1, pageSize: 10 }
              });
            } else {
              reject("something error");
            }
          }).then(res => {
            that.searchLoading = false;
            return res.result;
          });
        }
      };
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
    addNewTable() {
      // 新建列表
      this.$router.replace("/sBBComponentFilter/sBBComponentFilter_add");
    },
    editSelectOne() {
      // 修改选中行
      const selectedRowKeyslen = this.selectedRowKeys.length;
      console.log(selectedRowKeyslen);
      if (selectedRowKeyslen == 1) {
        const editSelectKey = this.selectedRowKeys[0];
        Vue.ls.set("sBBComponentFilter_editSelectKey", editSelectKey);
        this.$router.replace(`/sBBComponentFilter/sBBComponentFilter_edit`);
      } else if (selectedRowKeyslen < 1) {
        this.$notification.open({
                        message: "Warn",
                        description: this.$t("lang.messagePleaseSelectEditRow"),
                        duration: 6,
                        style: {background: "#FAAD14"}
                    });
      } else {
         this.$notification.open({
                        message: "Warn",
                        description: this.$t("lang.messageEditMultiRow"),
                        duration: 6,
                        style: {background: "#FAAD14"}
                    });
      }
    },
    // doubleClickOnRow (record) { // 双击行查看详情
    //     const rowKey = record.target.parentNode.dataset.rowKey
    //     console.log(rowKey)
    //     Vue.ls.set('sBBComponentFilter_dblclickRowKey', rowKey)
    //     this.$router.replace('/sBBComponentFilter/sBBComponentFilter_detail')
    //     // this.editListFun(rowKey, true)
    // },

    // 选择列表
    onSelectChange(selectedRowKeys, selectedRows) {
      //console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },
    // 修改用户
    editListFun(rowKey, disab) {
      console.log(rowKey);
      console.log(disab);
      this.$refs.editForm.edit(rowKey, disab);
    },
    // 删除单个列表
    // deleteListFun (id) {
    //     console.log(id)
    //     const datas = {
    //         id: id
    //     }
    //     this.delfun(datas)
    // },
    // 删除选中列表
    deleteSeclectAll() {
      if (this.selectedRowKeys.length == 0) {
           this.$notification.open({
                        message: "Warn",
                        description: this.$t("lang.messagePleaseSelectDeleteRow"),
                        duration: 6,
                        style: {background: "#FAAD14"}
                    });
        return;
      }
      const rowKeys = [];
      this.selectedRows.forEach(element => {
        rowKeys.push({
          rid: element.rid,
          component: element.component
        });
      });
      this.delfun(rowKeys);
    },

    delfun(rowKeys) {
      let self = this;
      this.$confirm({
        title: self.$t("lang.messageDeleteConfirmTitle"),
        content: self.$t("lang.messageDeleteSelectedConfirm"),
        onOk() {
          return del(rowKeys)
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
                  style: { background: "#F5222D" }
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
