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

          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span
              class="table-page-search-submitButtons"
              :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
            >
              <!-- <a-button type="primary" @click="$refs.table.refresh(true)">{{ $t('lang.tabComSearchButtonName') }}</a-button> -->
              <a-button
                type="primary"
                :loading="searchLoading"
                icon="search"
                @click="searchOnClick"
              >{{ $t('lang.tabComSearchButtonName') }}</a-button>
              <a-button
                style="margin-left: 8px"
                icon="undo"
                @click="() => {form.resetFields()}"
              >{{ $t('lang.tabComResetButtonName') }}</a-button>
              <!-- <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? $t('lang.tabComToggleCloseName') : $t('lang.tabComToggleShowName') }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>-->
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <tableBtns
      :currentPageManipulationAuth="currentPageManipulationAuth"
      :queryParamemter="queryParam"
      exportId="UPLOAD_BRAND_PLANT"
      @addNewTable="addNewTable"
      @deleteSeclectAll="deleteSeclectAll"
    ></tableBtns>

    <s-table
      ref="table"
      :columns="columns"
      :loading="loading"
      size="small"
      :rowKey="(record) => record.rid"
      :data="loadData"
      :alert="options.alert"
      :customRow="(record) => { return {
        on:{
          dblclick:(record)=>{
            //this.doubleClickOnRow(record,true)
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
import { STable, tableBtns } from "@/components";
import { del, getDropDownList, list } from "@api/brandPlant_api";
import { getXScrollSize } from "@api/publicFunc_api";
import langZh from "../../locales/zh-CN/brandPlant_lang.js";
import langEn from "../../locales/en-US/brandPlant_lang.js";

export default {
  name: "TableList",
  components: {
    STable,
    tableBtns
  },
  data() {
    return {
      PlantDropdownList: [],
      BrandDropdownList: [],
      currentPageManipulationAuth: ["Add", "Delete", "View"],
      filterList: langEn.filter_langEn,
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
    this.getDropDown(
      { moduleName: "getPlantList" },
      this.PlantDropdownList,
      "PLANT"
    );
    this.getDropDown(
      { moduleName: "getBrandList" },
      this.BrandDropdownList,
      "BRAND"
    );
  },
  watch: {
    PlantDropdownList(val) {
      this.filterList.forEach(element => {
        if (element["decorator"] == "plant") {
          element["dropDownList"] = [].concat(this.PlantDropdownList);
        }
      });
    },
    BrandDropdownList(val) {
      this.filterList.forEach(element => {
        if (element["decorator"] == "brand") {
          element["dropDownList"] = [].concat(this.BrandDropdownList);
        }
      });
    },
    language(val) {
      this.changeLanguage();
    },
    $route: {
      handler(route) {
        if (route.path === "/brandPlant/brandPlant_list") {
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
    expand(bool, record) {
      console.log(bool);
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    searchOnClick() {
      // this.$refs.table.refresh(true);
      const that = this;
      this.form.validateFields((err, values) => {
        console.log("err", err);
        console.log("values", values);
        if (!err) {
          that.queryParam.plant = values.plant;
          that.queryParam.brand = values.brand;
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
    handleDropDownChange(value, decorator) {},
    getDropDown(param, dropdownList, key) {
      getDropDownList(Object.assign({}, param)).then(res => {
        dropdownList.length = 0;
        res.result.forEach(el => {
          dropdownList.push(el[key]);
        });
      });
    },
    getListFun() {
      this.searchLoading = true;
      const that = this;
      // const value = this.queryParam
      that.loadData = parameter => {
        console.log("loadData.parameter", parameter);
        return list(Object.assign(parameter, that.queryParam)).then(res => {
          that.searchLoading = false;
          return res.result;
        });
      };
    },
    addNewTable() {
      // 新建列表
      this.$router.replace("/brandPlant/brandPlant_add");
    },
    editSelectOne() {
      // 修改选中行
      const selectedRowKeyslen = this.selectedRowKeys.length;
      if (selectedRowKeyslen == 1) {
        const editSelectKey = this.selectedRowKeys[0];
        Vue.ls.set("brandPlant_editSelectKey", editSelectKey);
        this.$router.replace(`/brandPlant/brandPlant_edit`);
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
    doubleClickOnRow(record) {
      // 双击行查看详情
      const rowKey = record.target.parentNode.dataset.rowKey;
      Vue.ls.set("brandPlant_dblclickRowKey", rowKey);
      this.$router.replace("/brandPlant/brandPlant_detail");
      // this.editListFun(rowKey, true)
    },

    // 选择列表
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      // this.selectedRows = selectedRows
    },
    // 修改用户
    editListFun(rowKey, disab) {
      this.$refs.editForm.edit(rowKey, disab);
    },
    // 删除单个列表
    deleteListFun(id) {
      const rid = id;
      const datas = {
        rid
      };
      this.delfun(datas);
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
      } else {
        const iddatas = [];
        this.selectedRowKeys.forEach(element => {
          iddatas.push({
            rid: element
          });
        });
        this.delfun(iddatas);
      }
    },

    delfun(datas) {
      const self = this;
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
