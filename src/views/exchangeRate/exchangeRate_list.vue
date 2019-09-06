<template>
  <a-card :bordered="false" class="content">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @submit="handleSubmit" :form="form">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="Cycle">
              <a-select
                :getPopupContainer="getPopupContainer"
                showSearch
                :filterOption="filterOption"
                optionFilterProp="children"
                :allowClear="true"
                placeholder="Please select"
                v-decorator="['cycle', {initialValue: 'CURRENT', rules: [{required: true, message: 'Please select' }]}]"
              >
                <a-select-option
                  v-for="(element, i) in cycleDropDownList"
                  :key="i"
                  :value="element"
                >{{ element }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label>
              <a-radio-group
                name="radioGroup"
                v-decorator="['rateType', {initialValue: 'Rate From US Dollars', rules: [{required: true, message: 'Please select' }]}]"
              >
                <a-radio v-for="(item, i) in radioDropDownList" :key="i" :value="item">{{ item }}</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>

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
      :queryParamemter="queryParamWatched"
      uploadId="UPLOAD_EXCHANGE_RATE_DATA"
      @editSelectOne="editSelectOne"
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
    import {STable, tableBtns} from "@/components";
    import {del, getDropDownList, list} from "@api/exchangeRate_api";
    import { getXScrollSize } from "@api/publicFunc_api";
    import langZh from "../../locales/zh-CN/exchangeRate_lang.js";
    import langEn from "../../locales/en-US/exchangeRate_lang.js";

    export default {
  name: "TableList",
  components: {
    STable,
    tableBtns
  },
  data() {
    return {
      cycleDropDownList: [],
      radioDropDownList: ["Rate From US Dollars", "Rate To US Dollars"],
      currentPageManipulationAuth: ["Update", "View", "Upload"],
      searchLoading: false,
      form: this.$form.createForm(this),
      mdl: {},
      required: true,
      loading: false, // 页面是否加载中
      advanced: false, // 高级搜索 展开/关闭
      queryParamWatched:{},
      queryParam: {
        cycle: "CURRENT",
        rateType: "Rate From US Dollars"
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
    getDropDownList({ moduleName: "getCycleList" }).then(res => {
      this.cycleDropDownList.length = 0;
      res.result.forEach(item => {
        this.cycleDropDownList.push(item["CYCLE"]);
      });
    });
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
  },
  watch: {
    queryParam() {
      this.queryParamWatched = Object.assign({}, this.queryParam);
      if (this.queryParamWatched.rateType) {
        delete this.queryParamWatched.rateType;
      }
      return this.queryParamWatched;
    },
    language(val) {
      this.changeLanguage();
    },
    $route: {
      handler(route) {
        console.log(route.path);
        if (route.path === "/exchangeRate/exchangeRate_list") {
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
        console.log("err", err);
        console.log("values", values);
        if (!err) {
          this.queryParam.cycle = values.cycle;
          this.queryParam.rateType = values.rateType;
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
    getListFun() {
      const that = this;
      // const value = this.queryParam
      that.loadData = parameter => {
        console.log("loadData.parameter", parameter);
        return list(Object.assign(parameter, that.queryParam)).then(res => {
          console.log(res.result);
          that.$refs.table.clearSelected();
          return res.result;
        });
      };
    },
    addNewTable() {
      // 新建列表
      this.$router.replace("/exchangeRate/exchangeRate_add");
    },
    editSelectOne() {
      if (
        this.queryParam.cycle === "CURRENT" &&
        this.queryParam.rateType === "Rate From US Dollars"
      ) {
        const selectedRowKeyslen = this.selectedRowKeys.length;
        console.log(selectedRowKeyslen);
        if (selectedRowKeyslen == 1) {
          const editSelectKey = this.selectedRowKeys[0];
          Vue.ls.set("exchangeRate_editSelectKey", editSelectKey);
          this.$router.replace(`/exchangeRate/exchangeRate_edit`);
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
      } else {
        this.$message.warning(
          "Data can be edited with CURRENT cycle and Rate From US Dollars"
        );
      }
    },
    // 选择列表
    onSelectChange(selectedRowKeys, selectedRows) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
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
    }
  }
};
</script>
