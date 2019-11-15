<template>
  <a-card :bordered="false" class="content">
    <div class="table-page-search-wrapper" v-if="advanced">
      <a-form layout="inline" @submit="handleSubmit" :form="form">
        <a-row :gutter="16" v-for="item in filterList" :key="item.index">
          <a-col :span="item.inputType=='input'?12:8">
            <a-form-item :label="item.label">
              <a-input
                :placeholder="item.placeHolder"
                :allowClear="item.allowClear"
                v-if="item.inputType=='input'"
                :disabled="item.editDisabled"
                @change="inputChange($event, item.decorator)"
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
                  v-bind:key="i"
                  :value="element"
                >{{ element }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col v-if="item.example">
            <a-form-item label="Example" class="examples">
              <span>{{item.example}}</span>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <tableBtns
      :currentPageManipulationAuth="currentPageManipulationAuth"
      :queryParamemter="queryParam"
      uploadId="UPLOAD_ONDEMAND_REFRESH_MODEL"
      exportId="EXPORT_ONDEMAND_REFRESH"
    >
      <!--<a-button type="primary" icon="download" @click="exportExcelOnClick">Export</a-button>-->
      <a-button type="primary" @click="searchOnClick" :loading="searchLoading" icon="search">Search</a-button>
      <a-button
        type="primary"
        @click="executeModelOnClick"
        :loading="executeModelLoading"
        :disabled="executeModelDisabled"
        icon="form"
      >Execute Model</a-button>
      <a-button
        type="primary"
        @click="executeFamilyOnClick"
        :loading="executeFamilyLoading"
        :disabled="executeFamilyDisabled"
        icon="form"
      >Execute Family</a-button>
      <!--<a @click="toggleAdvanced" style="margin-left: 8px">-->
      <!--{{ advanced ? $t('lang.tabComToggleCloseName') : $t('lang.tabComToggleShowName') }}-->
      <!--<a-icon :type="advanced ? 'up' : 'down'" />-->
      <!--</a>-->
    </tableBtns>
    <a-table
      ref="table"
      size="small"
      :scroll="scrollSize"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    ></a-table>
  </a-card>
</template>
<script>
    import Vue from "vue";
    import {executeFamily, executeModel, getRefreshObject, list} from "@api/onDemandRefresh_api";
    import {tableBtns} from "@/components";
    import {getXScrollSize} from "@api/publicFunc_api";
    import langZh from "../../locales/zh-CN/onDemandRefresh_lang.js";
    import langEn from "../../locales/en-US/onDemandRefresh_lang.js";
    import {exportByURL} from "@api/exportFunction_api";

    export default {
  name: "TableList",
  components: {
    tableBtns
  },
  data() {
    return {
      currentPageManipulationAuth: ["UploadEnforced"],
      filterList: langEn.filter_langEn,
      form: this.$form.createForm(this),
      scrollSize: {},
      pagination: {
        showSizeChanger: true,
        pageSizeOptions: ["10", "50", "100", "150"],
        showTotal: total =>
                        total < 2000
                            ? total == 1
                            ? `total ${total} row`
                            : `total ${total} rows`
                            : this.$t("lang.messageFor2000Records"),
      },
      searchLoading: false,
      loading: false, // 页面是否加载中
      executeModelLoading: false,
      executeModelDisabled: false,
      executeFamilyLoading: false,
      executeFamilyDisabled: false,
      advanced: true, // 高级搜索 展开/关闭
      queryParam: {}, // 查询参数
      columns: [],
      dataSource: []
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
    this.getRefreshObjectList();
  },
  watch: {
    language(val) {
      this.changeLanguage();
    },
    $route: {
      handler(route) {
        console.log(route.path);
        if (route.path === "/onDemandRefresh/onDemandRefresh_list") {
          this.loadData({});
        }
      },
      deep: true
    }
  },
  methods: {
    handleDropDownChange(val, decorator) {},
    inputChange(e, decorator) {
      let value = e.target.value;
    },
    executeModelOnClick() {
      let self = this;
      self.form.validateFields((err, values) => {
        if (!err) {
          if (values.modelfamily || self.dataSource.length > 0) {
            self.$confirm({
              title: self.$t("lang.messageConfirmTitle"),
              content: values.modelfamily
                ? `Execute according to input model?`
                : `Execute according to the model searched out?`,
              onOk() {
                self.executeModelLoading = true;
                let params = { ondemandType: values.ondemandType };
                values.modelfamily
                  ? (params.modelfamily = values.modelfamily)
                  : (params.eventName = self.dataSource[0]["eventName"]);
                executeModel(params)
                  .then(res => {
                    self.executeModelLoading = false;
                    if (res.code == 0) {
                      self.$notification.open({
                        message: "Success",
                        description: res.msg,
                        duration: 6,
                        style: { background: "#52C41A" }
                      });
                      self.loadData({});
                    } else if(res.code == 2){
                        self.$notification.open({
                            message: "Warning",
                            description: res.msg,
                            duration: 6,
                            style: { background: "#faad14" }
                        });
                    }else {
                      self.$notification.open({
                        message: "Error",
                        description: res.msg,
                        duration: 6,
                        style: { background: "#F5222D" }
                      });
                    }
                  })
                  .catch(err => {
                    self.executeModelLoading = false;
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
          } else {
            self.$notification.open({
              message: "Search condition error:",
              description:
                "Please fill in 'Model' or search uploaded model out in table!",
              duration: 6,
              style: { background: "#F5222D" }
            });
          }
        } else {
          self.$notification.open({
            message: "Search condition error:",
            description: "Please fill in 'Refresh Object' before proceeding!",
            duration: 6,
            style: { background: "#F5222D" }
          });
        }
      });
    },
    executeFamilyOnClick() {
      let self = this;
      self.form.validateFields((err, values) => {
        if (!err && values.modelfamily) {
          this.$confirm({
            title: self.$t("lang.messageConfirmTitle"),
            content: self.$t("lang.messageExecuteConfirmation"),
            onOk() {
              self.executeFamilyLoading = true;
              executeFamily(values)
                .then(res => {
                  self.executeFamilyLoading = false;
                  if (res.code == 0) {
                    self.$notification.open({
                      message: "Success",
                      description: res.msg,
                      duration: 6,
                      style: { background: "#52C41A" }
                    });
                    self.loadData({});
                  } else if(res.code == 2){
                      self.$notification.open({
                          message: "Warning",
                          description: res.msg,
                          duration: 6,
                          style: { background: "#faad14" }
                      });
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
                  self.executeFamilyLoading = false;
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
        } else {
          self.executeFamilyLoading = false;
          self.$notification.open({
            message: "Search condition error:",
            description:
              "Please fill in 'Refresh Object' & 'Family' before proceeding!",
            duration: 6,
            style: { background: "#F5222D" }
          });
        }
      });
    },
    searchOnClick(key) {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.queryParam.ondemandType = values.ondemandType;
          this.loadData(this.queryParam);
        } else {
          this.$notification.open({
            message: "Search condition error:",
            description: "Please fill in 'Refresh Object' before proceeding",
            duration: 6,
            style: { background: "#F5222D" } //red
          });
        }
      });
    },
    loadData(params) {
      this.loading = true;
      this.searchLoading = true;
      this.dataSource = [];
      let parameter = {
        pageNum: params.pageNum || this.pagination.current || 1,
        pageSize: params.pageSize || this.pagination.pageSize || 10
      };
      if (params.sortField) {
        parameter.sortField = params.sortField;
      }
      if (params.sortOrder) {
        parameter.sortOrder = params.sortOrder;
      }
      let self = this;
      list(Object.assign(parameter, self.queryParam)).then(res => {
        const pagination = { ...self.pagination };
        pagination.total = res.result.total;
        pagination.pageSize = res.result.pageSize;
        pagination.current = res.result.pageNum;
        self.pagination = pagination;
        for (let i = 0; i < res.result.list.length; i++) {
          res.result.list[i].key = i;
        }
        self.dataSource = res.result.list;
        self.loading = false;
        this.searchLoading = false;
      });
    },
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.loadData({
        pageSize: pagination.pageSize,
        pageNum: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order === "descend" ? "desc" : "",
        ...filters
      });
    },
    changeLanguage() {
      console.log(this.language);
      if (this.language == "zh-CN") {
        this.columns = langZh.tableTitle_langZh;
        this.filterlList = langZh.filter_langZh;
      } else if (this.language == "en-US") {
        this.columns = langEn.tableTitle_langEn;
        this.filterlList = langEn.filter_langEn;
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        console.log("err", err);
        console.log("values", values);
        if (!err) {
          this.$notification.open({
            message: "Search condition error:",
            description: "Please fill in query parameters.",
            duration: 6,
            style: { background: "#F5222D" } //red
          });
        }
      });
    },
    getRefreshObjectList() {
      getRefreshObject().then(res => {
        this.filterList[0].dropDownList.splice(0);
        for (let i = 0; i < res.result.length; i++) {
          this.filterList[0].dropDownList.push(res.result[i]["ondemandType"]);
        }
      });
    },
    exportExcelOnClick() {
      this.form.validateFields((err, values) => {
        if (!err) {
          exportByURL(
            {
              ondemandType: values.ondemandType,
              eventName: "EXPORT_ONDEMAND_REFRESH",
              sysCreatedBy: Vue.ls.get("LOGINNAME"),
              status: "CURRENT"
            },
            "common/exportExcel"
          );
        } else {
          this.$notification.open({
            message: "Search condition error:",
            description: "Please fill in 'Refresh Object' before proceeding",
            duration: 6,
            style: { background: "#F5222D" } //red
          });
        }
      });
    },
    getDropDown(param, dropdownList, key) {
      getDropDownList(Object.assign({}, param)).then(res => {
        dropdownList.length = 0;
        res.result.forEach(el => {
          dropdownList.push(el[key]);
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
    // 收起展开
    toggleAdvanced() {
      this.advanced = !this.advanced;
    }
  }
};
</script>
<style>
.examples {
  color: red !important;
}
.examples .ant-form-item-label > label {
  color: red !important;
}
</style>

