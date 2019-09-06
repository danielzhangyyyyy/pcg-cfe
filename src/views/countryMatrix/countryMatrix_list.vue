<template>
  <a-card :bordered="false" class="content">
    <div class="table-page-search-wrapper">
      <a-form :form="form" @submit="handleSubmit" layout="inline">
        <a-row :gutter="48">
          <a-col :key="item.index" :md="8" :sm="24" v-for="item in filterList.slice(0,2)">
            <a-form-item :label="item.label">
              <a-input
                :disabled="item.editDisabled"
                :placeholder="item.placeHolder"
                v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                v-if="item.inputType=='input'"
              />
              <a-select
                :getPopupContainer="getPopupContainer"              showSearch
                :filterOption="filterOption"
                optionFilterProp="children"
                :allowClear="item.allowClear"
                :placeholder="item.placeHolder"
                @change="handleDropDownChange($event, item.decorator)"
                v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                v-if="item.inputType=='dropDown'"
              >
                <a-select-option
                  :key="i"
                  :value="element"
                  v-for="(element, i) in item.dropDownList"
                >{{ element }}</a-select-option>
              </a-select>
              <a-date-picker
                :getCalendarContainer="getPopupContainer"
                :allowClear="item.allowClear"
                :disabled="item.editDisabled"
                :placeholder="item.placeHolder"
                v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                v-if="item.inputType=='date'"
              />
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :key="item.index" :md="8" :sm="24" v-for="item in filterList.slice(2)">
              <a-form-item :label="item.label">
                <a-input
                  :disabled="item.editDisabled"
                  :placeholder="item.placeHolder"
                  v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                  v-if="item.inputType=='input'"
                />
                <a-select
                :getPopupContainer="getPopupContainer"                showSearch
                  :filterOption="filterOption"
                  optionFilterProp="children"
                  :allowClear="item.allowClear"
                  :placeholder="item.placeHolder"
                  @change="handleDropDownChange($event, item.decorator)"
                  v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                  v-if="item.inputType=='dropDown'"
                >
                  <a-select-option
                    :key="i"
                    :value="element"
                    v-for="(element, i) in item.dropDownList"
                  >{{ element }}</a-select-option>
                </a-select>
                <a-date-picker
                :getCalendarContainer="getPopupContainer"
                  :allowClear="item.allowClear"
                  :disabled="item.editDisabled"
                  :placeholder="item.placeHolder"
                  v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                  v-if="item.inputType=='date'"
                />
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span
              :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
              class="table-page-search-submitButtons"
            >
              <!-- <a-button type="primary" @click="$refs.table.refresh(true)">{{ $t('lang.tabComSearchButtonName') }}</a-button> -->
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
      uploadId="UPLOAD_COUNTRY_MATRIX"
      @addNewTable="addNewTable"
      @editSelectOne="editSelectOne"
      @deleteSeclectAll="deleteSeclectAll"
    ></tableBtns>

    <s-table
      :alert="options.alert"
      :columns="columns"
      :customRow="(record) => { return {
                    on:{
                      // dblclick:(record)=>{
                      //   this.doubleClickOnRow(record,true)
                      // }
                    }
                  }}"
      :data="loadData"
      :loading="loading"
      :rowKey="(record) => record.rid"
      :rowSelection="options.rowSelection"
      ref="table"
      size="small"
    ></s-table>
  </a-card>
</template>

<script>
    import moment from "moment";
    import {STable, tableBtns} from "@/components";
    import {del, getDropDownList, list} from "@api/countryMatrix_api";
    import { getXScrollSize } from "@api/publicFunc_api";
    import langZh from "../../locales/zh-CN/countryMatrix_lang.js";
    import langEn from "../../locales/en-US/countryMatrix_lang.js";

    export default {
  name: "TableList",
  components: {
    STable,
    tableBtns
  },
  data() {
    return {
      brandListData: [],
      filterList: langEn.filter_langEn,
      form: this.$form.createForm(this),
      currentPageManipulationAuth: ["Delete", "View", "Upload"],
      mdl: {},
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
      this.brandListData,
      "BRAND"
    );
  },
  watch: {
    brandListData(val) {
      this.filterList.forEach(element => {
        if (element["decorator"] == "brand") {
          element["dropDownList"] = this.brandListData;
        }
      });
    },
    language(val) {
      this.changeLanguage();
    },
    $route: {
      handler(route) {
        console.log(route.path);
        if (route.path === "/countryMatrix/countryMatrix_list") {
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
        if (!err) {
          this.queryParam.brand = values.brand;
          this.$refs.table.refresh(true);
        } else {
          this.$notification.config({
            duration: 5
          });
          this.$notification["error"]({
            message: "Search condition error:",
            description: "please select brand"
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
      const that = this;
      // const value = this.queryParam
      that.loadData = parameter => {
        return list(Object.assign(parameter, that.queryParam)).then(res => {
          that.searchLoading = false;
          that.$refs.table.clearSelected();
          return res.result;
        });
      };
    },
    addNewTable() {}, // 新建列表
    editSelectOne() {}, // 修改选中行
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
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
    // 选择列表
    onSelectChange(selectedRowKeys, selectedRows) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
      // this.selectedRows = selectedRows
    },
    // // 修改用户
    // editListFun(rowKey, disab) {
    //     console.log(rowKey)
    //     console.log(disab)
    //     this.$refs.editForm.edit(rowKey, disab)
    // },
    // // 删除单个列表
    // deleteListFun(id) {
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
