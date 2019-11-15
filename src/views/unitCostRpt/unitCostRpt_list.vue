<template>
  <a-card :bordered="false" class="content">
    <div class="table-page-search-wrapper unitCostReport">
      <a-form layout="inline" :form="form">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24" v-for="item in filterList.slice(0,1)" :key="item.index">
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
          <a-col :md="8" :sm="24" v-for="item in filterList.slice(1)" :key="item.index">
            <a-form-item :label="item.label">
              <a-select
                showSearch
                :mode="item.mode"
                :getPopupContainer="getPopupContainer"
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
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <tableBtns
      :currentPageManipulationAuth="currentPageManipulationAuth"
      :queryParamemter="formParmas()"
      exportId="RPT_UNIT_COST_REPORT"
    >
      <a-button
        type="primary"
        icon="download"
        :loading="batchLoading"
        @click="batchClick"
      >Batch Export</a-button>
      <a-button
        icon="form"
        type="primary"
        v-if="parExecuteStatus"
        :loading="particalLoading"
        @click="partialClick"
      >Partial Execute And Export</a-button>
      <a-button
        icon="form"
        type="primary"
        v-if="executeStatus"
        :loading="executeLoading"
        @click="executeClick"
      >Execute</a-button>
    </tableBtns>
  </a-card>
</template>

<script>
import Vue from "vue";
import moment from "moment";
import { STable, tableBtns } from "@/components";
import {
  getDropDownList,
  executeReportWorkflow,
  batchExport
} from "@api/unitCostRpt_api";
import langZh from "../../locales/zh-CN/unitCostRpt_lang.js";
import langEn from "../../locales/en-US/unitCostRpt_lang.js";

export default {
  name: "TableList",
  components: {
    STable,
    tableBtns
  },
  data() {
    return {
      executeStatus: false,
      parExecuteStatus: false,
      cycleDataList: [],
      brandDataList: [],
      familyDataList: [],
      plantDataList: [],
      subgeoDataList: [],
      itemTypeDataList: [],
      countryDataList: [],
      executeLoading: false,
      batchLoading: false,
      particalLoading: false,
      filterList: langEn.filter_langEn,
      form: this.$form.createForm(this),
      currentPageManipulationAuth: ["View", "export"],
      searchLoading: false,
      loading: false, // 页面是否加载中
      advanced: false, // 高级搜索 展开/关闭
      queryParam: {}, // 查询参数
      optionAlertShow: true, // 是否显示选择框
      selectedRowKeys: [], // 选中的行的keys数组
      selectedRows: [], // 选中的行的全部数组
      // 表头
      columns: [],
      loadData: "",
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
    // this.getListFun()
    this.getDropDown(
      { moduleName: "getCycleList" },
      this.cycleDataList,
      "CYCLE"
    );
    this.getDropDown(
      { moduleName: "getBrandList" },
      this.brandDataList,
      "BRAND"
    );
    this.getDropDown(
      { moduleName: "getPlantList" },
      this.plantDataList,
      "PLANT"
    );
    this.getDropDown(
      { moduleName: "getSubgeoList" },
      this.subgeoDataList,
      "SUBGEO"
    );
    this.getDropDown(
      { moduleName: "getItemTypeList" },
      this.itemTypeDataList,
      "PVALUE"
    );
    this.getPermissions();
  },
  watch: {
    cycleDataList(val) {
      this.filterList.forEach(element => {
        if (element["decorator"] == "cycle") {
          element["dropDownList"] = [].concat(this.cycleDataList);
        }
      });
    },
    brandDataList(val) {
      this.filterList.forEach(element => {
        if (element["decorator"] == "brand") {
          element["dropDownList"] = [].concat(this.brandDataList);
        }
      });
    },
    familyDataList() {
      this.filterList.forEach(element => {
        if (element["decorator"] == "family") {
          element["dropDownList"] = [].concat(this.familyDataList);
        }
      });
    },
    plantDataList() {
      this.filterList.forEach(element => {
        if (element["decorator"] == "plant") {
          element["dropDownList"] = [].concat(this.plantDataList);
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
    itemTypeDataList() {
      this.filterList.forEach(element => {
        if (element["decorator"] == "itemType") {
          element["dropDownList"] = [].concat(this.itemTypeDataList);
        }
      });
    },
    countryDataList() {
      this.filterList.forEach(element => {
        if (element["decorator"] == "country") {
          element["dropDownList"] = [].concat(this.countryDataList);
        }
      });
    },
    language(val) {
      this.changeLanguage();
    },
    $route: {
      handler(route) {
        if (route.path === "/unitCostRpt/unitCostRpt_list") {
          // this.handleOk()
        }
      },
      deep: true
    }
  },
  methods: {
    getPermissions() {
      const localRouter = JSON.parse(localStorage.getItem("pcg__GET_MENU"));
      console.log(localRouter, "localRouter");
      let path = this.$route.path;
      for (let item of localRouter.value) {
        for (let element of item.childMenuList) {
          if (element.frontRouter === path.substring(1, path.length)) {
            element.accessLevel && element.accessLevel.includes("Execute")
              ? (this.executeStatus = true)
              : (this.executeStatus = false);
            element.accessLevel && element.accessLevel.includes("Execute")
              ? (this.parExecuteStatus = true)
              : (this.parExecuteStatus = false);
          }
        }
      }
    },
    formParmas() {
      let params = this.form.getFieldsValue();
      params.family ? (params.family = params.family.join(",")) : "";
      return params;
    },
    executeClick() {
      this.executeLoading = true;
      this.form.validateFields((err, values) => {
        const params = {
            ...values,
            uiName: "unitCost",
            uiAction: "UNIT_COST_REPORT"
          },
          self = this;
        executeReportWorkflow(params).then(res => {
          if (res.code == 0) {
            this.executeLoading = false;
            self.$notification.open({
              message: "Success",
              description: res.msg,
              duration: 6,
              style: { background: "#52C41A" }
            });
          } else if (res.code == 1) {
            this.executeLoading = false;
            self.$notification.open({
              message: "Info",
              description: res.msg,
              duration: 6,
              style: { background: "#52C41A" }
            });
          } else {
            this.executeLoading = false;
            self.$notification.open({
              message: "Error",
              description: res.msg,
              duration: 6,
              style: { background: "#F5222D" }
            });
          }
        });
      });
    },
    batchClick() {
      this.batchLoading = true;
      this.form.validateFields((err, values) => {
        const params = {
            ...values
          },
          self = this;
        batchExport(params).then(res => {
          this.batchLoading = false;
          debugger;
          if (res.code == 0) {
            self.$notification.open({
              message: "Success",
              description: res.msg,
              duration: 6,
              style: { background: "#52C41A" }
            });
          } else if (res.code == 1) {
            // sync execute
            self.$notification.open({
              message: "Info",
              description: res.msg,
              duration: 6,
              style: { background: "#52C41A" }
            });
          } else if (res.code == 2) {
            // warn
            self.$notification.open({
              message: "Warn",
              description: res.msg,
              duration: 6,
              style: { background: "#FAAD14" }
            });
          } else {
            self.$notification.open({
              // error
              message: "Error",
              description: res.msg,
              duration: 6,
              style: { background: "#F5222D" }
            });
          }
        });
      });
    },
    partialClick() {
      this.particalLoading = true;
      this.form.validateFields((err, values) => {
        const params = {
            ...values,
            uiName: "unitCost",
            uiAction: "UNIT_COST_REPORT_PARTIAL"
          },
          self = this;
        executeReportWorkflow(params).then(res => {
          if (res.code == 0) {
            this.particalLoading = false;
            self.$notification.open({
              message: "Success",
              description: res.msg,
              duration: 6,
              style: { background: "#52C41A" }
            });
          } else if (res.code == 1) {
            this.particalLoading = false;
            self.$notification.open({
              message: "Info",
              description: res.msg,
              duration: 6,
              style: { background: "#52C41A" }
            });
          } else {
            this.particalLoading = false;
            self.$notification.open({
              message: "Error",
              description: res.msg,
              duration: 6,
              style: { background: "#F5222D" }
            });
          }
        });
      });
    },
    getPopupContainer(trigger) {
      return trigger.parentElement;
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    getDropDown(param, dropdownList, key) {
      getDropDownList(Object.assign({}, param)).then(res => {
        dropdownList.splice(0);
        res.result.forEach(el => {
          dropdownList.push(el[key]);
        });
      });
    },
    handleDropDownChange(value, decorator) {
      if (decorator == "brand") {
        this.form.resetFields(["family"]);
        this.familyDataList = [];
        if (value) {
          this.getDropDown(
            { moduleName: "getProductFamilyByBrand", brand: value },
            this.familyDataList,
            "COST_PROD_FAMILY"
          );
        }
      } else if (decorator == "subgeo") {
        this.form.resetFields(["country"]);
        this.countryDataList = [];
        if (value) {
          this.getDropDown(
            { moduleName: "getCountryBySubgeo", subgeo: value },
            this.countryDataList,
            "COUNTRY"
          );
        }
      }
    },
    // 选择列表
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      // this.selectedRows = selectedRows
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
  }
};
</script>
<style>
.unitCostReport
  .ant-select-allow-clear
  .ant-select-selection--multiple
  .ant-select-selection__rendered {
  overflow-x: scroll;
}

.unitCostReport
  .ant-select-selection--multiple
  .ant-select-selection__rendered {
  overflow: hidden;
}

.unitCostReport
  .ant-select-selection--multiple
  .ant-select-selection__rendered
  ul {
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  float: left;
}

.unitCostReport .ant-select-selection--multiple .ant-select-selection__choice {
  float: none;
  overflow: visible;
}

.unitCostReport .ant-select-selection--multiple .ant-select-search--inline {
  float: none;
  position: absolute;
}

.unitCostReport .ant-select-selection--multiple {
  max-height: 32px;
  /*min-width: 100px;*/
  width: 252px;
  overflow: hidden;
}

.unitCostReport .ant-select-selection--multiple:focus-within {
  max-height: 40px;
}
</style>
