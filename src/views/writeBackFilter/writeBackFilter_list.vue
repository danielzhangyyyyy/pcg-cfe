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
                :placeholder="item.placeHolder"
                :allowClear="item.allowClear"
                v-decorator="[item.decorator, {initialValue: item.text}, {rules: [{required: item.required, message: item.message }]}]"
                @change="handleDropDownChange($event, item.decorator)"
              >
                <a-select-option
                  v-for="(element, i) in item.dropDownList"
                  :key="i"
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
                  :placeholder="item.placeHolder"
                  :allowClear="item.allowClear"
                  v-decorator="[item.decorator, {initialValue: item.text}, {rules: [{required: item.required, message: item.message }]}]"
                  @change="handleDropDownChange($event, item.decorator)"
                >
                  <a-select-option
                    v-for="(element, i) in item.dropDownList"
                    :key="i"
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
            <!--<a-col>-->
            <!--<span-->
            <!--class="table-page-search-submitButtons"-->
            <!--:style="advanced && { float: 'right', overflow: 'hidden' } || {} "-->
            <!--&gt;-->
            <!--<a-button-->
            <!--icon="undo"-->
            <!--@click="() => {form.resetFields()}"-->
            <!--&gt;{{ $t('lang.tabComResetButtonName') }}</a-button>-->
            <!--</span>-->
            <!--</a-col>-->
          </template>
          <!-- <a-col :md="(!advanced && 6) || 24" :sm="24">
              <span
                class="table-page-search-submitButtons"
                :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
              >
                <a-button
                  icon="undo"
                  @click="() => {form.resetFields()}"
                >{{ $t('lang.tabComResetButtonName') }}</a-button>
              </span>
          </a-col>-->
        </a-row>
      </a-form>
    </div>

    <tableBtns
      :currentPageManipulationAuth="currentPageManipulationAuth"
      exportId="EXPORT_WRITEBACK_FILTER"
      :queryParamemter="queryParam"
    >
      <a-button
        type="primary"
        icon="form"
        @click="$router.replace('/wbFilterIn/wbFilterIn_list')"
      >Direct Run Model</a-button>
      <a-button
        type="primary"
        icon="form"
        @click="$router.replace('/wbFilterEx/wbFilterEx_list')"
      >Exclude Model</a-button>
      <a-button type="primary" :loading="executeLoading" icon="form" @click="doExecute">Execute</a-button>
    </tableBtns>
  </a-card>
</template>

<script>
import moment from "moment";
import { STable, tableBtns } from "@/components";
import { getDropDownList, invokeWorkflow } from "@api/writeBackFilter_api";
import langZh from "../../locales/zh-CN/writeBackFilter_lang.js";
import langEn from "../../locales/en-US/writeBackFilter_lang.js";

export default {
  name: "TableList",
  components: {
    STable,
    tableBtns
  },
  data() {
    return {
      currentPageManipulationAuth: ["View"],
      // cycleDropdownList: [],
      brandDropdownList: [],
      prodFamilyDropdownList: [],
      filterList: langEn.filter_langEn,
      form: this.$form.createForm(this),
      mdl: {},
      searchLoading: false,
      executeLoading: false,
      loading: false, // 页面是否加载中
      advanced: true, // 高级搜索 展开/关闭
      queryParam: {}, // 查询参数
      optionAlertShow: true, // 是否显示选择框
      selectedRowKeys: [], // 选中的行的keys数组
      selectedRows: [], // 选中的行的全部数组
      // 表头
      columns: [],
      tableParameter: {},
      loadData: ""
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
    };
  },
  computed: {
    language() {
      return this.$store.getters.language;
    }
  },
  created() {
    this.changeLanguage();
    // this.getListFun();
    this.getDropDown(
      { moduleName: "getBrandList" },
      this.brandDropdownList,
      "BRAND"
    );
    // this.getDropDown(
    //   { moduleName: "getCycleList" },
    //   this.cycleDropdownList,
    //   "CYCLE"
    // );
    // this.setDropDownLists();
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
    // cycleDropdownList(val) {
    //   this.filterList.forEach(element => {
    //     if (element["decorator"] == "cycle") {
    //       element["dropDownList"] = [].concat(this.cycleDropdownList);
    //     }
    //   });
    // },
    language(val) {
      this.changeLanguage();
    },
    $route: {
      handler(route) {
        console.log(route.path);
        if (route.path === "/writeBackFilter/writeBackFilter_list") {
          // this.handleOk();
        }
      },
      deep: true
    }
  },
  methods: {
    getPopupContainer(trigger) {
      return trigger.parentElement;
    },
    moment,
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
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
    // setDropDownLists() {
    //   this.filterList.forEach(element => {
    //     if (element["decorator"] == "cycle") {
    //       element["dropDownList"] = [].concat(this.cycleDropdownList);
    //     } else if (element["decorator"] == "brand") {
    //       element["dropDownList"] = [].concat(this.brandDropdownList);
    //     } else if (element["decorator"] == "prodFamily") {
    //       element["dropDownList"] = [].concat(this.prodFamilyDropdownList);
    //     }
    //   });
    // },
    handleDropDownChange(value, decorator) {
      console.log("value", value);
      if (decorator == "brand") {
        this.form.resetFields(["prodFamily"]);
        this.prodFamilyDropdownList.splice(0);
        this.getDropDown(
          { moduleName: "getProductFamilyByBrand", brand: value },
          this.prodFamilyDropdownList,
          "COST_PROD_FAMILY"
        );
        this.queryParam.brand = value;
      }
      if (decorator == "prodFamily") this.queryParam.aspPrdFamily = value;
    },
    getDropDown(param, dropdownList, key) {
      getDropDownList(Object.assign({}, param)).then(res => {
        dropdownList.length = 0;
        res.result.forEach(el => {
          dropdownList.push(el[key]);
        });
      });
    },

    doExecute() {
      let self = this;
      this.$confirm({
        title: self.$t("lang.messageConfirmTitle"),
        content: self.$t("lang.messageExecuteConfirmation"),
        onOk() {
          // self.queryParam.cycle = self.form.getFieldValue("cycle");
          self.queryParam.brand = self.form.getFieldValue("brand");
          self.queryParam.prodFamily = self.form.getFieldValue("prodFamily");
          self.executeLoading = true;
          const param = {
            ...self.queryParam,
            uiName: "writeBackFilter",
            uiAction: "RPT_WBF"
          };
          invokeWorkflow(Object.assign({}, param)).then(res => {
            if (res.code == 0) {
              self.$notification.open({
                message: "Success",
                description: res.msg,
                duration: 6,
                style: { background: "#52C41A" }
              });
            } else {
              self.$notification.open({
                message: "Error",
                description: "Invoke workflow failed! " + res.msg,
                duration: 6,
                style: { background: "#F5222D" }
              });
            }
            self.executeLoading = false;
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
