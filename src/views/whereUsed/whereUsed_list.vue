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
                :getPopupContainer="getPopupContainer"
                showSearch
                :filterOption="filterOption"
                optionFilterProp="children"
                v-if="item.inputType=='dropDown'"
                :allowClear="item.allowClear"
                :placeholder="item.placeHolder"
                v-decorator="[item.decorator, {initialValue: item.text, rules: [{required: item.required, message: item.message }] }]"
                @change="handleDropDownChange($event, item.decorator)"
              >
                <a-select-option
                  v-for="(element, i) in item.dropDownList"
                  v-bind:key="i"
                  :value="element"
                >{{ element }}</a-select-option>
              </a-select>
              <a-date-picker
                :getCalendarContainer="getPopupContainer"
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
                  :getPopupContainer="getPopupContainer"
                  showSearch
                  :filterOption="filterOption"
                  optionFilterProp="children"
                  v-if="item.inputType=='dropDown'"
                  :allowClear="item.allowClear"
                  :placeholder="item.placeHolder"
                  v-decorator="[item.decorator, {initialValue: item.text, rules: [{required: item.required, message: item.message }]}]"
                  @change="handleDropDownChange($event, item.decorator)"
                >
                  <a-select-option
                    v-for="(element, i) in item.dropDownList"
                    v-bind:key="i"
                    :value="element"
                  >{{ element }}</a-select-option>
                </a-select>
                <a-date-picker
                  :getCalendarContainer="getPopupContainer"
                  v-if="item.inputType=='date'"
                  :disabled="item.editDisabled"
                  :placeholder="item.placeHolder"
                  :allowClear="item.allowClear"
                  v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                />
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="(!advanced && 8) || 24" :sm="24">
            <span
              class="table-page-search-submitButtons"
              :style="
                (advanced && { float: 'right', overflow: 'hidden' }) || {}
              "
            >
              <a-button
                type="primary"
                icon="search"
                :loading="searchLoading"
                @click="searchOnClick"
              >
                {{
                $t("lang.tabComSearchButtonName")
                }}
              </a-button>
              <a-button
                style="margin-left: 8px"
                icon="undo"
                @click="() => {form.resetFields(); prodFamilyDropdownList.length=0}"
              >{{ $t("lang.tabComResetButtonName") }}</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{
                advanced
                ? $t("lang.tabComToggleCloseName")
                : $t("lang.tabComToggleShowName")
                }}
                <a-icon :type="advanced ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <tableBtns
      :currentPageManipulationAuth="currentPageManipulationAuth"
      :queryParamemter="{...queryParam, 'sysCreatedBy': nickname()}"
      exportId="GET_UI_WHERE_USED"
    >
      <a-button type="primary" icon="form" @click="executeClicked" :loading="executeLoading">
        {{
        $t("lang.tabComExecuteBtn")
        }}

      </a-button>
      <a-button type="primary" icon="form" @click="executeModelListClicked" :loading="executeLoading">
        {{
        $t("lang.tabComExecuteModelListBtn")
        }}
      </a-button>
      <a-button type="primary" icon="form" @click="modelListClicked">
        {{
        $t("lang.tabComModelListBtn")
        }}
      </a-button>
    </tableBtns>

    <s-table
      ref="table"
      :columns="columns"
      :loading="loading"
      :scroll="scrollSize"
      size="small"
      :rowKey="record => record.id"
      :data="loadData"
      :alert="options.alert"
      :customRow="
        record => {
          return {
            on: {
              dblclick: record => {
                // this.doubleClickOnRow(record, true);
              }
            }
          };
        }
      "
      :rowSelection="options.rowSelection"
    ></s-table>
  </a-card>
</template>

<script>
import Vue from "vue";
import moment from "moment";
import { STable, tableBtns } from "@/components";
import { execute, getDropDownList, list, modelList } from "@api/whereUsed_api";
import { getXScrollSize } from "@api/publicFunc_api";
import langZh from "../../locales/zh-CN/whereUsed_lang.js";
import langEn from "../../locales/en-US/whereUsed_lang.js";
import { mapGetters } from "vuex";

export default {
  name: "TableList",
  components: {
    STable,
    tableBtns
  },
  data() {
    return {
      cycleDropdownList: [],
      brandDropdownList: [],
      prodFamilyDropdownList: [],
      currentPageManipulationAuth: ["View"],
      filterList: langEn.filter_langEn,
      form: this.$form.createForm(this),
      mdl: {},
      executeLoading: false,
      searchLoading: false,
      loading: false, // 页面是否加载中
      advanced: false, // 高级搜索 展开/关闭
      queryParam: { cycle: "CURRENT" }, // 查询参数
      optionAlertShow: true, // 是否显示选择框
      selectedRowKeys: [], // 选中的行的keys数组
      selectedRows: [], // 选中的行的全部数组
      // 表头
      columns: [],
      tableParameter: {},
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
    this.getDropDown(
      { moduleName: "getBrandList" },
      this.brandDropdownList,
      "BRAND"
    );
    this.getDropDown(
      { moduleName: "getCycleList" },
      this.cycleDropdownList,
      "CYCLE"
    );
    this.getListFun();
  },
  watch: {
    brandDropdownList(val) {
      this.filterList.forEach(element => {
        if (element["decorator"] == "brand") {
          element["dropDownList"] = [].concat(this.brandDropdownList);
        }
      });
    },
    prodFamilyDropdownList(val) {
      this.filterList.forEach(element => {
        if (element["decorator"] == "prodFamily") {
          element["dropDownList"] = [].concat(this.prodFamilyDropdownList);
        }
      });
    },
    cycleDropdownList(val) {
      this.filterList.forEach(element => {
        if (element["decorator"] == "cycle") {
          element["dropDownList"] = [].concat(this.cycleDropdownList);
          element["text"] = "CURRENT";
        }
      });
    },
    language(val) {
      this.changeLanguage();
    },
    $route: {
      handler(route) {
        console.log(route.path);
        if (route.path === "/whereUsed/whereUsed_list") {
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
    ...mapGetters(["nickname"]),
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    searchOnClick() {
      // this.$refs.table.refresh(true);
      this.form.validateFields((err, values) => {
        console.log("err", err);
        console.log("values", values);
        if (!err) {
          let { partNumber, cycle, brand, prodFamily } = values;
          this.queryParam = {
            partNumber,
            // cycle,
            brand,
            prodFamily
          };
          this.$refs.table.refresh(true);
        } else {
          this.$notification.open({
            message: "Search condition error:",
            description: "Please fill in 'Part' before search!",
            duration: 6,
            style: { background: "#F5222D" }
          });
        }
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        console.log("err", err);
        console.log("values", values);
        if (!err) {
          this.$notification.open({
            message: "Search condition error:",
            description: "Please fill in 'Part' before search!",
            duration: 6,
            style: { background: "#F5222D" }
          });
        }
      });
    },
    handleDropDownChange(value, decorator) {
      console.log("value", value);
      if (decorator == "brand") {
        this.form.resetFields(["prodFamily"]);
        this.prodFamilyDropdownList = [];
        this.getDropDown(
          { moduleName: "getProductFamilyByBrand", brand: value },
          this.prodFamilyDropdownList,
          "COST_PROD_FAMILY"
        );
      }
    },
    getDropDown(param, dropdownList, key) {
      getDropDownList(Object.assign({}, param)).then(res => {
        dropdownList.length = 0;
        res.result.forEach(el => {
          dropdownList.push(el[key]);
        });
      });
    },
    executeClicked() {
      let self = this;
      this.$confirm({
        title: self.$t("lang.messageConfirmTitle"),
        content: self.$t("lang.messageExecuteConfirmation"),
        onOk() {
          self.form.validateFields((err, values) => {
            if (!err) {
              const {
                cycle = "",
                partNumber,
                brand = "",
                prodFamily = ""
              } = values;
              self.executeLoading = true;
              execute({
                uiName: "whereUsed",
                uiAction: "executeList",
                cycle: "CURRENT",
                partNumber: partNumber,
                brand: brand,
                prodFamily: prodFamily
              })
                .then(res => {
                  self.executeLoading = false;
                  if (res.code == 0) {
                    self.$notification.open({
                      message: "Success",
                      description: self.$t("lang.messageExecuteSuccess"),
                      duration: 6,
                      style: { background: "#52C41A" }
                    });
                  } else if (res.code == 1) {
                    self.$notification.open({
                      message: "Info",
                      description: self.$t("lang.messageExecuting"),
                      style: { background: "#52C41A" }
                    });
                  } else {
                    self.$notification.open({
                      message: "Error",
                      description: self.$t("lang.messageExecuteFailed"),
                      duration: 6,
                      style: { background: "#F5222D" }
                    });
                  }
                })
                .catch(err => {
                  self.executeLoading = false;
                  self.$notification.open({
                    message: "Error",
                    description: self.$t("lang.messageExecuteFailed"),
                    duration: 6,
                    style: { background: "#F5222D" }
                  });
                });
            } else {
              self.$notification.open({
                message: "Search condition error:",
                description: "Please fill in 'Part' before proceeding!",
                duration: 6,
                style: { background: "#F5222D" }
              });
            }
          });
        },
        onCancel() {}
      });
    },
    modelListClicked() {
      this.$router.push({
        path: "/whereUsedModel/whereUsedModel_list"
      });
    },
    executeModelListClicked() {
      let self = this;
      this.$confirm({
        title: self.$t("lang.messageConfirmTitle"),
        content: self.$t("lang.messageExecuteConfirmation"),
        onOk() {
         let fieldsValues = self.form.getFieldsValue([
        "cycle",
        "partNumber",
        "brand",
        "prodFamily"
      ]);
      const {
        cycle = "",
        partNumber = "",
        brand = "",
        prodFamily = ""
      } = fieldsValues;
      self.executeLoading = true;
      execute({
        uiName: "whereUsed",
        uiAction: "executeModelList",
        cycle: "CURRENT",
        partNumber: partNumber,
        brand: brand,
        prodFamily: prodFamily
      })
        .then(res => {
            self.executeLoading = false;
            if (res.code == 0) {
                self.$notification.open({
                    message: "Success",
                    description: self.$t("lang.messageExecuteSuccess"),
                    duration: 6,
                    style: { background: "#52C41A" }
                });
            } else if (res.code == 1) {
                self.$notification.open({
                    message: "Info",
                    description: self.$t("lang.messageExecuting"),
                    style: { background: "#52C41A" }
                });
            } else {
                self.$notification.open({
                    message: "Error",
                    description: self.$t("lang.messageExecuteFailed"),
                    duration: 6,
                    style: { background: "#F5222D" }
                });
            }
        })
        .catch(err => {
            self.executeLoading = false;
            self.$notification.open({
                message: "Error",
                description: self.$t("lang.messageExecuteFailed"),
                duration: 6,
                style: { background: "#F5222D" }
            });
        });
        },
        onCancel() {}
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
          res.result.list.forEach((element, index) => {
            element.id = index + 1;
          });
          that.searchLoading = false;
          that.$refs.table.clearSelected();
          return res.result;
        });
      };
    },
    // addNewTable() {
    //   // 新建列表
    //   this.$router.replace("/whereUsed/whereUsed_add");
    // },
    // editSelectOne() {
    //   // 修改选中行
    //   const selectedRowKeyslen = this.selectedRowKeys.length;
    //   console.log(selectedRowKeyslen);
    //   if (selectedRowKeyslen == 1) {
    //     const editSelectKey = this.selectedRowKeys[0];
    //     Vue.ls.set("whereUsed_editSelectKey", editSelectKey);
    //     this.$router.replace(`/whereUsed/whereUsed_edit`);
    //   } else if (selectedRowKeyslen < 1) {
    //     this.$notification.open({
        //   message: "Warn",
        //   description: this.$t("lang.messagePleaseSelectEditRow"),
        //   duration: 6,
        //   style: { background: "#FAAD14" }
        // });
    //   } else {
    //     this.$notification.open({
        //   message: "Warn",
        //   description: this.$t("lang.messageEditMultiRow"),
        //   duration: 6,
        //   style: { background: "#FAAD14" }
        // });
    //   }
    // },

    doubleClickOnRow(record) {
      // 双击行查看详情
      const rowKey = record.target.parentNode.dataset.rowKey;
      console.log(rowKey);
      Vue.ls.set("whereUsed_dblclickRowKey", rowKey);
      this.$router.replace("/whereUsed/whereUsed_detail");
      // this.editListFun(rowKey, true)
    },

    // 选择列表
    onSelectChange(selectedRowKeys, selectedRows) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
      // this.selectedRows = selectedRows
    },
    // 修改用户
    // editListFun(rowKey, disab) {
    //   console.log(rowKey);
    //   console.log(disab);
    //   this.$refs.editForm.edit(rowKey, disab);
    // },
    // // 删除单个列表
    // deleteListFun(id) {
    //   console.log(id);
    //   const datas = {
    //     id: id
    //   };
    //   this.delfun(datas);
    // },
    // // 删除选中列表
    // deleteSeclectAll() {
    //   const selectedIdArr = this.selectedRowKeys.join(",");
    //   const iddatas = { id: selectedIdArr };
    //   this.delfun(iddatas);
    // },

    // delfun(datas) {
    //   del(datas)
    //     .then(res => {
    //       console.log(res);
    //       if (res.code == "0") {
    //         this.$message.info(res.msg);
    //         this.selectedRowKeys = [];
    //         this.handleOk(); // 删除后刷新列表
    //       } else {
    //         this.$message.info(res.msg);
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       // this.requestFailed(err)
    //     });
    // },
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
  }
};
</script>
