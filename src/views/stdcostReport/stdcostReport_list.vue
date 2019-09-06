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
                v-decorator="[item.decorator, {initialValue: item.text, rules: [{required: item.required, message: item.message }]}]"
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
                  v-decorator="[item.decorator, {initialValue: item.text, rules: [{required: item.required, message: item.message }]}]"
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

    <tableBtns :currentPageManipulationAuth="currentPageManipulationAuth">
      <a-button
        type="primary"
        icon="download"
        :loading="exportLoading"
        @click="exportOnClick"
      >{{ $t('lang.tabComExport') }}</a-button>
      <a-button
        type="primary"
        icon="form"
        @click="$router.replace('/stdcostInModelList/stdcostInModelList_list')"
      >Direct Run Model</a-button>
      <a-button
        type="primary"
        icon="form"
        @click="$router.replace('/stdcostExModelList/stdcostExModelList_list')"
      >Exclude Model</a-button>
      <a-button
        type="primary"
        :loading="monthlyEndLoading"
        icon="form"
        @click="monthlyEnd"
      >Monthly End</a-button>
      <a-button type="primary" :loading="executeLoading" icon="form" @click="doCalculation">Calculation</a-button>
      <a-button type="primary" :loading="publishLoading" icon="form" @click="doPublish">Publish</a-button>
    </tableBtns>
  </a-card>
</template>

<script>
    import moment from "moment";
    import {STable, tableBtns} from "@/components";
    import {
        execMonthlyStdCost,
        getDropDownList,
        getProdFamily,
        publishMonthlyStdCost,
        updateMonthlyEnd
    } from "@api/stdcostReport_api";
    import {exportByURL} from "@api/exportFunction_api";
    import langZh from "../../locales/zh-CN/stdcostReport_lang.js";
    import langEn from "../../locales/en-US/stdcostReport_lang.js";

    export default {
  name: "TableList",
  components: {
    STable,
    tableBtns
  },
  data() {
    return {
      exportId: "RPT_STDCOST_MAPPING",
      currentPageManipulationAuth: [],
      cycleDropdownList: [],
      brandDropdownList: [],
      prodFamilyDropdownList: [],
      plantDropdownList: [],
      subgeoDropdownList: [],
      categoryDropdownList: [
        "Both_WB",
        "Part_WB",
        "Model_WB",
        "Both",
        "Part",
        "Model"
      ],
      filterList: langEn.filter_langEn,
      form: this.$form.createForm(this),
      mdl: {},
      searchLoading: false,
      exportLoading: false,
      monthlyEndLoading: false,
      executeLoading: false,
      publishLoading: false,
      loading: false, // 页面是否加载中
      advanced: true, // 高级搜索 展开/关闭
      queryParam: { cycle: "CURRENT" }, // 查询参数
      optionAlertShow: true, // 是否显示选择框
      selectedRowKeys: [], // 选中的行的keys数组
      selectedRows: [], // 选中的行的全部数组
      // 表头
      columns: [],
      queryParamExe: {},
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
    this.getDropDown(
      { moduleName: "getCycleList" },
      this.cycleDropdownList,
      "CYCLE"
    );
    this.getDropDown(
      { moduleName: "getPlantList" },
      this.plantDropdownList,
      "PLANT"
    );
    this.getDropDown(
      { moduleName: "getSubgeoList" },
      this.subgeoDropdownList,
      "SUBGEO"
    );
    this.setDropDownLists();
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
        }
      });
    },
    plantDropdownList(val) {
      this.filterList.forEach(element => {
        if (element["decorator"] == "plant") {
          element["dropDownList"] = [].concat(this.plantDropdownList);
        }
      });
    },
    subgeoDropdownList(val) {
      this.filterList.forEach(element => {
        if (element["decorator"] == "subgeo") {
          element["dropDownList"] = [].concat(this.subgeoDropdownList);
        }
      });
    },
    language(val) {
      this.changeLanguage();
    },
    $route: {
      handler(route) {
        console.log(route.path);
        if (route.path === "/stdcostReport/stdcostReport_list") {
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
          this.$notification.config({
            duration: 5
          });
          this.$notification["error"]({
            message: "Search condition error:",
            description: "please input search conditions."
          });
        }
      });
    },
    setDropDownLists() {
      this.filterList.forEach(element => {
        if (element["decorator"] == "category") {
          element["dropDownList"] = [].concat(this.categoryDropdownList);
        }
      });
    },
    getProdFamilyList(param, dropdownList, key) {
      getProdFamily(Object.assign({}, param)).then(res => {
        dropdownList.length = 0;
        res.result.forEach(el => {
          dropdownList.push(el[key]);
        });
      });
    },
    handleDropDownChange(value, decorator) {
      console.log("value", value);
      if (decorator == "brand") {
        this.form.resetFields(["prodFamily"]);
        this.prodFamilyDropdownList.splice(0);
        this.getProdFamilyList(
          { brand: value },
          this.prodFamilyDropdownList,
          "prodFamily"
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
    exportOnClick() {
      this.exportLoading = true;
      this.queryParam.cycle = this.form.getFieldValue("cycle");
      this.queryParam.brand = this.form.getFieldValue("brand");
      this.queryParam.prodFamily = this.form.getFieldValue("prodFamily");
      this.queryParam.plant = this.form.getFieldValue("plant");
      this.queryParam.subgeo = this.form.getFieldValue("subgeo");
      let json = { ...this.queryParam, eventName: this.exportId };
      let url = "common/exportExcel";
      exportByURL(json, url);
      this.exportLoading = false;
    },
    monthlyEnd(param) {
      let self = this;
      this.$confirm({
        title: self.$t("lang.messageConfirmTitle"),
        content: self.$t("lang.messageMonthlyEndConfirmation"),
        onOk() {
          self.monthlyEndLoading = true;
          updateMonthlyEnd(param).then(res => {
            if (res.code == 0) {
              self.$notification.open({
                message: "Success",
                description: res.result,
                duration: 6,
                style: { background: "#52C41A" }
              });
            } else {
              self.$notification.open({
                message: "Error",
                description: "Invoke workflow failed! " + res.result,
                duration: 6,
                style: { background: "#F5222D" }
              });
            }
          });
          self.monthlyEndLoading = false;
        },
        onCancel() {}
      });
    },
    doCalculation() {
      let self = this;
      this.$confirm({
        title: self.$t("lang.messageConfirmTitle"),
        content: self.$t("lang.messageCalculationConfirmation"),
        onOk() {
          self.queryParamExe.cycle = self.form.getFieldValue("cycle");
          self.queryParamExe.brand = self.form.getFieldValue("brand") ? self.form.getFieldValue("brand") : 'NULL';
          self.queryParamExe.prodFamily = self.form.getFieldValue("prodFamily") ? self.form.getFieldValue("prodFamily") : 'NULL';
          self.queryParamExe.plant = self.form.getFieldValue("plant") ? self.form.getFieldValue("plant") : 'NULL';
          self.queryParamExe.subgeo = self.form.getFieldValue("subgeo") ? self.form.getFieldValue("subgeo") : 'NULL';
          self.queryParamExe.category = self.form.getFieldValue("category");
          self.executeLoading = true;
          const param = {
            ...self.queryParamExe,
            uiAction: "RPT_STDCOST"
          };
          execMonthlyStdCost(Object.assign({}, param)).then(res => {
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
    doPublish() {
      let self = this;
      this.$confirm({
        title: self.$t("lang.messageConfirmTitle"),
        content: self.$t("lang.messagePublishConfirmation"),
        onOk() {
          self.publishLoading = true;
          const param = {
            uiAction: "RPT_STDCOST_PUBLISH"
          };
          publishMonthlyStdCost(Object.assign({}, param)).then(res => {
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
            self.publishLoading = false;
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
