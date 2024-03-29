<template>
  <a-card :bordered="false" class="content">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :form="form">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24" v-for="item in filterList.slice(0,2)" :key="item.index">
            <a-form-item :label="item.label">
              <a-select
                showSearch
                :getPopupContainer="getPopupContainer"
                :filterOption="filterOption"
                optionFilterProp="children"
                v-if="item.inputType=='dropDown'"
                :placeholder="item.placeHolder"
                :allowClear="item.allowClear"
                v-decorator="[item.decorator, {initialValue: item.text,rules: [{required: item.required, message: item.message }]}]"
                @change="handleDropDownChange($event, item.decorator)"
              >
                <a-select-option
                  v-for="(element, i) in item.dropDownList"
                  :key="i"
                  :value="element"
                >{{ element }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24" v-for="item in filterList.slice(2)" :key="item.index">
              <a-form-item :label="item.label">
                <a-select
                  showSearch
                  :getPopupContainer="getPopupContainer"
                  :filterOption="filterOption"
                  optionFilterProp="children"
                  v-if="item.inputType=='dropDown'"
                  :placeholder="item.placeHolder"
                  :allowClear="item.allowClear"
                  v-decorator="[item.decorator, {initialValue: item.text,rules: [{required: item.required, message: item.message }]}]"
                  @change="handleDropDownChange($event, item.decorator)"
                >
                  <a-select-option
                    v-for="(element, i) in item.dropDownList"
                    :key="i"
                    :value="element"
                  >{{ element }}</a-select-option>
                </a-select>
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
                @click="resetSearchForm"
              >{{ $t('lang.tabComResetButtonName') }}</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? $t('lang.tabComToggleCloseName') : $t('lang.tabComToggleShowName') }}
                <a-icon :type="advanced ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <tableBtns
      :currentPageManipulationAuth="currentPageManipulationAuth"
      :queryParamemter="queryParam"
      uploadId="UPLOAD_UI_OTHER_GSC"
      @addNewTable="addNewTable"
      @editSelectOne="editSelectOne"
      @deleteSeclectAll="deleteSeclectAll"
    ></tableBtns>

    <s-table
      ref="table"
      :columns="columns"
      :loading="loading"
      :scroll="scrollSize"
      size="small"
      :rowKey="(record) => record.rid"
      :data="loadData"
      :alert="options.alert"
      :rowSelection="options.rowSelection"
    ></s-table>
  </a-card>
</template>

<script>
import Vue from "vue";
import { STable, tableBtns } from "@/components";
import { del, getDropDownList, list } from "@api/otherGSC_api";
import { getXScrollSize } from "@api/publicFunc_api";
import langZh from "../../locales/zh-CN/otherGSC_lang.js";
import langEn from "../../locales/en-US/otherGSC_lang.js";

export default {
  name: "TableList",
  components: {
    STable,
    tableBtns
  },
  data() {
    return {
      cycleDataList: [],
      brandDataList: [],
      prodDataList: [],
      plantDataList: [],
      subgeoDataList: [],
      tbaTypeDataList: ["PERCENTAGE", "US_DOLLAR"],
      typeDataList: [],
      filterList: langEn.filter_langEn,
      form: this.$form.createForm(this),
      currentPageManipulationAuth: [
        "Add",
        "Delete",
        "Update",
        "View",
        "Upload"
      ],
      mdl: {},
      searchLoading: false,
      loading: false, // 页面是否加载中
      advanced: false, // 高级搜索 展开/关闭
      queryParam: {
        cycle: "CURRENT"
      }, // 查询参数
      optionAlertShow: true, // 是否显示选择框
      selectedRowKeys: [], // 选中的行的keys数组
      selectedRows: [], // 选中的行的全部数组
      // 表头
      columns: [],
      loadData: "",
      scrollSize: {},
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
    this.getDropDown(
      { moduleName: "getCycleList" },
      this.cycleDataList,
      "CYCLE",
      getDropDownList
    );
    this.getDropDown(
      { moduleName: "getBrandList" },
      this.brandDataList,
      "BRAND",
      getDropDownList
    );
    this.getDropDown(
      { moduleName: "getSubgeoList" },
      this.subgeoDataList,
      "SUBGEO",
      getDropDownList
    );
    this.getDropDown(
      { moduleName: "getOtherGSCType" },
      this.typeDataList,
      "OTHER_GSC_TYPE",
      getDropDownList
    );
    this.getMonths();
    this.setDropDownLists();
  },
  watch: {
    cycleDataList() {
      this.filterList.forEach(element => {
        if (element["decorator"] == "cycle") {
          element["dropDownList"] = [].concat(this.cycleDataList);
        }
      });
    },
    brandDataList() {
      this.filterList.forEach(element => {
        if (element["decorator"] == "brand") {
          element["dropDownList"] = [].concat(this.brandDataList);
        }
      });
    },
    prodDataList() {
      this.filterList.forEach(element => {
        if (element["decorator"] == "productfamily") {
          element["dropDownList"] = ["ALL"].concat(this.prodDataList);
        }
      });
    },
    plantDataList() {
      this.filterList.forEach(element => {
        if (element["decorator"] == "plant") {
          element["dropDownList"] = ["ALL"].concat(this.plantDataList);
        }
      });
    },
    subgeoDataList() {
      this.filterList.forEach(element => {
        if (element["decorator"] == "subgeo") {
          element["dropDownList"] = [].concat(this.subgeoDataList);
        }
      });
    },
    tbaTypeDataList() {
      this.filterList.forEach(element => {
        if (element["decorator"] == "tbatype") {
          element["dropDownList"] = [].concat(this.tbaTypeDataList);
        }
      });
    },
    typeDataList() {
      this.filterList.forEach(element => {
        if (element["decorator"] == "type") {
          element["dropDownList"] = [].concat(this.typeDataList);
        }
      });
    },
    language(val) {
      this.changeLanguage();
    },
    $route: {
      handler(route) {
        if (route.path === "/otherGSC/otherGSC_list") {
          this.resetSearchForm();
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
    getMonths() {
      getDropDownList({
        moduleName: "getMonthListByCycle",
        cycle: this.queryParam.cycle
      }).then(res => {
        for (let key in res.result[0]) {
          for (let item of this.columns) {
            if (
              item.dataIndex &&
              item.dataIndex.toUpperCase() === key.toUpperCase()
            ) {
              item.title = res.result[0][key];
            }
          }
        }
      });
    },
    searchOnClick() {
      this.form.validateFields((err, values) => {
        console.log("values", values);
        if (!err) {
          for (let key in values) {
            this.queryParam[key] = values[key];
          }
          this.getMonths();
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
        if (element["decorator"] == "tbatype") {
          element["dropDownList"] = [].concat(this.tbaTypeDataList);
        }
      });
    },
    getDropDown(param, dropdownList, key, api) {
      api(Object.assign({}, param)).then(res => {
        dropdownList.splice(0);
        res.result.forEach(el => {
          dropdownList.push(el[key]);
        });
      });
    },
    handleDropDownChange(value, decorator) {
      if (decorator === "brand") {
        this.form.resetFields(["plant"]);
        this.plantDataList = [];
        this.getDropDown(
          { moduleName: "getPlantByBrand", brand: value },
          this.plantDataList,
          "PLANT",
          getDropDownList
        );
        this.form.resetFields(["productfamily"]);
        this.prodDataList = [];
        if (value !== undefined) {
          this.getDropDown(
            { moduleName: "getBizProdFByBrand", brand: value },
            this.prodDataList,
            "PROD_FAMILY",
            getDropDownList
          );
        }
      }
    },
    getListFun() {
      const that = this;
      that.loadData = parameter => {
        that.searchLoading = true;
        return list(Object.assign(parameter, that.queryParam)).then(res => {
          if (res.code === "0") {
            that.searchLoading = false;
            that.$refs.table.clearSelected();
            return res.result;
          } else {
            that.$notification.open({
              message: "Error:",
              description: res.msg,
              duration: 6,
              style: { background: "#F5222D" }
            });
          }
        });
      };
    },
    addNewTable() {
      // 新建列表
      if (this.queryParam.cycle != "CURRENT") {
        this.$notification.open({
          message: "Warn:",
          description: "Only the data of CURRENT cycle can be Add",
          duration: 6,
          style: { background: "#FAAD14" }
        });
        return;
      } else {
        this.$router.replace("/otherGSC/otherGSC_add");
      }
    },
    editSelectOne() {
      // 修改选中行
      const selectedRowKeyslen = this.selectedRowKeys.length;
      console.log(selectedRowKeyslen);
      if (selectedRowKeyslen == 1) {
        if (this.queryParam.cycle != "CURRENT") {
          this.$notification.open({
            message: "Warn:",
            description: "Only the data of CURRENT cycle can be Edit",
            duration: 6,
            style: { background: "#FAAD14" }
          });
          return;
        } else {
          const editSelectKey = this.selectedRowKeys[0];
          Vue.ls.set("otherGSC_editSelectKey", editSelectKey);
          this.$router.replace(`/otherGSC/otherGSC_edit`);
        }
      } else if (selectedRowKeyslen < 1) {
        this.$notification.open({
          message: "Warn",
          description: this.$t("lang.messagePleaseSelectEditRow"),
          duration: 6,
          style: { background: "#FAAD14" }
        });
      } else {
        this.$notification.open({
          message: "Warn",
          description: this.$t("lang.messageEditMultiRow"),
          duration: 6,
          style: { background: "#FAAD14" }
        });
      }
    },
    // 选择列表
    onSelectChange(selectedRowKeys, selectedRows) {
      //console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys;
      // this.selectedRows = selectedRows
    },
    // 修改用户
    editListFun(rowKey, disab) {
      console.log(rowKey);
      console.log(disab);
      this.$refs.editForm.edit(rowKey, disab);
    },
    // 删除选中列表
    deleteSeclectAll() {
      if (this.selectedRowKeys.length == 0) {
        this.$notification.open({
          message: "Warn",
          description: this.$t("lang.messagePleaseSelectDeleteRow"),
          duration: 6,
          style: { background: "#FAAD14" }
        });
        return;
      }
      const rowKeys = [];
      this.selectedRowKeys.forEach(element => {
        rowKeys.push({
          rid: element.split("@")[0]
        });
      });
      if (this.queryParam.cycle != "CURRENT") {
        this.$notification.open({
          message: "Warn:",
          description: "Only the data of CURRENT cycle can be Delete",
          duration: 6,
          style: { background: "#FAAD14" }
        });
        return;
      } else {
        this.delfun(rowKeys);
      }
    },

    delfun(rowKeys) {
      let self = this;
      this.$confirm({
        title: self.$t("lang.messageDeleteConfirmTitle"),
        content: self.$t("lang.messageDeleteSelectedConfirm"),
        onOk() {
          return del(rowKeys)
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
                  style: { background: "#F5222D" }
                });
              }
            })
            .catch(err => {
              console.log(err);
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
      this.form.resetFields();
      this.queryParam = {
        cycle: "CURRENT",
        brand: "",
        productfamily: "",
        plant: "",
        subgeo: "",
        type: "",
        tbatype: ""
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
