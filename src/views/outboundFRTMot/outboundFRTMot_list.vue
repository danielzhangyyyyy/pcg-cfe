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
      uploadId="UPLOAD_UI_OUTBOUND_UNITFRT_MOT"
      @deleteSeclectAll="deleteSeclectAll"
    >
      <a-button icon="rollback" type="primary" @click="eventPush">Return</a-button>
    </tableBtns>

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
import moment from "moment";
import { STable, tableBtns } from "@/components";
import {
  del,
  getDropDownList,
  getGeoCode,
  list
} from "@api/outboundFRTMot_api";
import { getXScrollSize } from "@api/publicFunc_api";
import langZh from "../../locales/zh-CN/outboundFRTMot_lang.js";
import langEn from "../../locales/en-US/outboundFRTMot_lang.js";

export default {
  name: "TableList",
  components: {
    STable,
    tableBtns
  },
  data() {
    return {
      brandDataList: [],
      prodFamilyDataList: [],
      geoCodeDataList: [],
      plantDataList: [],
      geoType: ["SUBGEO", "COUNTRY/REGION"],
      filterList: langEn.filter_langEn,
      form: this.$form.createForm(this),
      currentPageManipulationAuth: [
        "ViewEnforced",
        "UploadEnforced",
        "DeleteEnforced"
      ],
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
      { moduleName: "getBrandList" },
      this.brandDataList,
      "BRAND",
      getDropDownList
    );
    this.setDropDownLists();
  },
  watch: {
    brandDataList(val) {
      this.filterList.forEach(element => {
        if (element["decorator"] == "brand") {
          element["dropDownList"] = [].concat(this.brandDataList);
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
    geoCodeDataList() {
      this.filterList.forEach(element => {
        if (element["decorator"] == "geo") {
          element["dropDownList"] = [].concat(this.geoCodeDataList);
        }
      });
    },
    prodFamilyDataList() {
      this.filterList.forEach(element => {
        if (element["decorator"] == "prodFamily") {
          element["dropDownList"] = ["ALL"].concat(this.prodFamilyDataList);
        }
      });
    },
    language(val) {
      this.changeLanguage();
    },
    $route: {
      handler(route) {
        console.log(route.path);
        if (route.path === "/outboundFRTMot/outboundFRTMot_list") {
          this.handleOk();
        }
      },
      deep: true
    }
  },
  methods: {
    eventPush() {
      this.form.resetFields();
      let obj = {};
      for (let key in this.queryParam) obj[key] = "";
      this.queryParam = obj;
      this.$store.dispatch("ToggleCloseTab", "");
      setTimeout(() => {
        this.$store.dispatch("ToggleCloseTab", this.$route.fullPath);
        this.$router.push({
          path: "/gLOutboundFRTByUnit_list"
        });
      }, 500);
    },
    getPopupContainer(trigger) {
      return trigger.parentElement;
    },
    searchOnClick() {
      this.form.validateFields((err, values) => {
        console.log("values", values);
        if (!err) {
          for (let key in values) {
            key === "geoType" && values[key] === "COUNTRY/REGION"
              ? (this.queryParam[key] = "COUNTRY")
              : (this.queryParam[key] = values[key]);
          }
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
        if (element["decorator"] == "geoType") {
          element["dropDownList"] = [].concat(this.geoType);
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
        this.form.resetFields(["prodFamily"]);
        this.prodFamilyDataList = [];
        if (value !== undefined) {
          this.getDropDown(
            { moduleName: "getBizProdFByBrand", brand: value },
            this.prodFamilyDataList,
            "PROD_FAMILY",
            getDropDownList
          );
        }
      } else if (decorator === "geoType") {
        this.form.resetFields(["geo"]);
        this.geoCodeDataList = [];
        value === "COUNTRY/REGION" ? (value = "COUNTRY") : value;
        this.getDropDown(
          { geoType: value },
          this.geoCodeDataList,
          "geo",
          getGeoCode
        );
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
    // 选择列表
    onSelectChange(selectedRowKeys, selectedRows) {
      //console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys;
      // this.selectedRows = selectedRows
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
