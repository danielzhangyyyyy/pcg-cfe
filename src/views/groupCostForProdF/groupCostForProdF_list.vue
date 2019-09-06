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
      uploadId="UPLOAD_UI_GROUP_COST_FOR_PRDFMLY"
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
    import {STable, tableBtns} from "@/components";
    import {del, getDropDownList, getTypeList, list} from "@api/groupCostForProdF_api";
    import {getXScrollSize} from "@api/publicFunc_api";
    import langZh from "../../locales/zh-CN/groupCostForProdF_lang.js";
    import langEn from "../../locales/en-US/groupCostForProdF_lang.js";

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
      prodFamilyDataList: [],
      typeDataList: [],
      countryDataList: [],
      filterList: langEn.filter_langEn,
      columnList: langEn.tableTitle_langEn,
      form: this.$form.createForm(this),
      currentPageManipulationAuth: ["Delete", "View", "Upload"],
      mdl: {},
      searchLoading: false,
      loading: false, // 页面是否加载中
      advanced: false, // 高级搜索 展开/关闭
      queryParam: { cycle: "" }, // 查询参数
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
      { moduleName: "getCountryList" },
      this.countryDataList,
      "COUNTRY"
    );
    this.getTypeList(this.typeDataList, "type");
    this.setDropDownLists();
    getDropDownList({
      moduleName: "getMonthListByCycle",
      cycle: "CURRENT"
    }).then(res => {
      let temp = res.result[0];
      for (let key in temp) {
        this.columns.forEach(el => {
          if (
            el["dataIndex"] &&
            el["dataIndex"].toUpperCase() === key.toUpperCase()
          ) {
            el["title"] = temp[key];
          }
        });
      }
    });
    this.setDropDownLists();
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
    prodFamilyDataList(val) {
      this.filterList.forEach(element => {
        if (element["decorator"] == "prodFamily") {
          element["dropDownList"] = [].concat(this.prodFamilyDataList);
        }
      });
    },
    typeDataList(val) {
      this.filterList.forEach(element => {
        if (element["decorator"] == "type") {
          element["dropDownList"] = [].concat(this.typeDataList);
        }
      });
    },
    countryDataList(val) {
      this.filterList.forEach(element => {
        if (element["decorator"] == "country") {
          element["dropDownList"] = ['WW'].concat(this.countryDataList);
        }
      });
    },
    language(val) {
      this.changeLanguage();
    },
    $route: {
      handler(route) {
        console.log(route.path);
        if (route.path === "/groupCostForProdF/groupCostForProdF_list") {
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
    searchOnClick() {
      // this.$refs.table.refresh(true);
      this.form.validateFields((err, values) => {
        console.log("err", err);
        console.log("values", values);
        if (!err) {
          this.queryParam.cycle = values.cycle;
          this.queryParam.brand = values.brand;
          this.queryParam.prodFamily = values.prodFamily;
          this.queryParam.type = values.type;
          this.queryParam.owner = values.owner
            ? "%" + values.owner.trim() + "%"
            : values.owner;
          this.queryParam.country = values.country;
          getDropDownList({
            moduleName: "getMonthListByCycle",
            cycle: values.cycle
          }).then(res => {
            let temp = res.result[0];
            for (let key in temp) {
              this.columns.forEach(el => {
                if (
                  el["dataIndex"] &&
                  el["dataIndex"].toUpperCase() === key.toUpperCase()
                ) {
                  el["title"] = temp[key];
                }
              });
            }
          });
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
        if (element["decorator"] == "cycle") {
          element["dropDownList"] = [].concat(this.cycleDataList);
        }
      });
      this.filterList.forEach(element => {
        if (element["decorator"] == "brand") {
          element["dropDownList"] = [].concat(this.brandDataList);
        }
      });
      this.filterList.forEach(element => {
        if (element["decorator"] == "prodFamily") {
          element["dropDownList"] = [].concat(this.prodFamilyDataList);
        }
      });
      this.filterList.forEach(element => {
        if (element["decorator"] == "type") {
          element["dropDownList"] = [].concat(this.typeDataList);
        }
      });
      this.filterList.forEach(element => {
        if (element["decorator"] == "country") {
            element["dropDownList"] = [].concat(this.countryDataList);
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
    getTypeList(dropdownList, key) {
      getTypeList(Object.assign({})).then(res => {
        dropdownList.splice(0);
        res.result.forEach(el => {
          dropdownList.push(el[key]);
        });
      });
    },
    handleDropDownChange(value, decorator) {
      if (decorator == "brand") {
        this.form.resetFields(["prodFamily"]);
        this.prodFamilyDataList = [];
        if(value){
            this.getDropDown(
                { moduleName: "getProductFamilyByBrand", brand: value },
                this.prodFamilyDataList,
                "COST_PROD_FAMILY"
            );
        }
      }
    },
    getListFun() {
      const that = this;
      // const value = this.queryParam
      that.loadData = parameter => {
        that.searchLoading = true;
        console.log("loadData.parameter", parameter);
        if (that.queryParam.cycle == "") {
          const promise = new Promise((resolve, reject) => {
            if (true) {
              resolve({
                code: "0",
                msg: "ok",
                result: {
                  total: 0,
                  list: [],
                  pageNum: 1,
                  pageSize: 10,
                  size: 10,
                  startRow: 1,
                  endRow: 10,
                  pages: 11,
                  prePage: 0,
                  nextPage: 2,
                  isFirstPage: true,
                  isLastPage: false,
                  hasPreviousPage: false,
                  hasNextPage: true,
                  navigatePages: 1,
                  navigatepageNums: [1],
                  navigateFirstPage: 1,
                  navigateLastPage: 8,
                  firstPage: 1,
                  lastPage: 8
                }
              });
            } else {
              reject("something error");
            }
          });
          return promise.then(res => {
            console.log(res.result);
            that.searchLoading = false;
            return res.result;
          });
        } else {
          return list(Object.assign(parameter, that.queryParam)).then(res => {
            console.log(res.result);
            that.searchLoading = false;
            that.$refs.table.clearSelected();
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
      this.$router.replace("/groupCostForProdF/groupCostForProdF_add");
    },
    editSelectOne() {
      // 修改选中行
      const selectedRowKeyslen = this.selectedRowKeys.length;
      console.log(selectedRowKeyslen);
      if (selectedRowKeyslen == 1) {
        if (this.selectedRows[0].cycle != "CURRENT") {
          this.$message.error("Only the data of CURRENT cycle can be edit");
          return;
        }
        const editSelectKey = this.selectedRowKeys[0];
        Vue.ls.set("groupCostForProdF_editSelectKey", editSelectKey);
        this.$router.replace(`/groupCostForProdF/groupCostForProdF_edit`);
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
    doubleClickOnRow(record) {
      // 双击行查看详情
      const rowKey = record.target.parentNode.dataset.rowKey;
      console.log(rowKey);
      Vue.ls.set("groupCostForProdF_dblclickRowKey", rowKey);
      this.$router.replace("/groupCostForProdF/groupCostForProdF_detail");
      // this.editListFun(rowKey, true)
    },

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
      if (this.selectedRows[0].cycle != "CURRENT") {
        this.$message.error("Only the data of CURRENT cycle can be delete");
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
