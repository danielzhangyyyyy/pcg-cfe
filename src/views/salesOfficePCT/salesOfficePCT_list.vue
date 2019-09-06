<template>
  <a-card :bordered="false" class="content">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @submit="handleSubmit" :form="form">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="Sales Orgs">
              <a-select
                :getPopupContainer="getPopupContainer"
                showSearch
                :filterOption="filterOption"
                optionFilterProp="children"
                placeholder="Please select"
                :allowClear="true"
                v-decorator="['salesOrg', {rules: [{required: false, message: 'Please select'}]}]"
              >
                <a-select-option
                  v-for="(element, i) in salesOrgsDropDownList"
                  :key="i"
                  :value="element"
                >{{ element }}</a-select-option>
              </a-select>
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
      :queryParamemter="queryParam"
      uploadId="UPLOAD_SALES_OFFICE_PCT"
    >
      <a-button
        type="primary"
        icon="save"
        :disabled="saveDisabled"
        :loading="saveLoading"
        @click="saveAllOnClick"
      >Save</a-button>
    </tableBtns>

    <a-table
      ref="table"
      size="small"
      :columns="columns"
      :scroll="scrollSize"
      :dataSource="dataSource"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template v-for="col in ['salesOfficePct']" :slot="col" slot-scope="text, record, index">
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>{{text}}</template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => edit(record.key)">Edit</a>
          </span>
        </div>
      </template>
    </a-table>
  </a-card>
</template>

<script>
import { STable, tableBtns } from "@/components";
import { getDropDownList, list, update } from "@api/salesOfficePCT_api";
import { getXScrollSize } from "@api/publicFunc_api";
import langZh from "../../locales/zh-CN/salesOfficePCT_lang.js";
import langEn from "../../locales/en-US/salesOfficePCT_lang.js";

export default {
  name: "TableList",
  components: {
    STable,
    tableBtns
  },
  data() {
    return {
      modifiedData: [],
      cacheData: [],
      dataSource: [],
      columns: [],
      mdl: {},
      saveDisabled: false,
      saveLoading: false,
      searchLoading: false,
      salesOrgsDropDownList: [],
      form: this.$form.createForm(this),
      currentPageManipulationAuth: ["View", "Upload"],
      loading: false, // 页面是否加载中
      advanced: false, // 高级搜索 展开/关闭
      queryParam: {}, // 查询参数
      pagination: {
        showSizeChanger: true,
        pageSizeOptions: ["10", "50", "100", "150"],
        showTotal: total => total == 1 ? `${total} row totally` : `${total} rows totally`,
      },
      scrollSize: {},
    };
  },
  computed: {
    language() {
      return this.$store.getters.language;
    }
  },
  created() {
    this.changeLanguage();
    this.scrollSize.x = getXScrollSize(this.columns, 0);
    //this.getListFun();
    this.getDropDown(
      { moduleName: "getSalesOrgList" },
      this.salesOrgsDropDownList,
      "SALES_ORG"
    );
  },
  mounted() {
    this.loadData({});
  },
  watch: {
    language(val) {
      this.changeLanguage();
    },
    $route: {
      handler(route) {
        console.log(route.path);
        if (route.path === "/salesOfficePCT/salesOfficePCT_list") {
          this.loadData({});
        }
      },
      deep: true
    }
  },
  methods: {
    getPopupContainer(trigger) {
      return trigger.parentElement;
    },
    handleChange(value, key, column) {
      const newData = [...this.dataSource];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.dataSource = newData;
      }
    },
    saveAllOnClick(key) {
      this.saveDisabled = true;
      this.saveLoading = true;
      let temp = this.dataSource.filter((item, index) => {
        if (
          item["salesOfficePct"] !== this.cacheData[index]["salesOfficePct"]
        ) {
          return item;
        }
      });
      temp.forEach(element => {
        this.modifiedData.push({
          rid: element["rid"],
          salesOrg: element["salesOrg"],
          salesOffice: element["salesOffice"],
          salesOfficePct: element["salesOfficePct"]
        });
      });
      if (this.modifiedData.length > 0) {
        this.loading = true;
        update(this.modifiedData).then(res => {
          this.loading = false;
          if (res.code == 0) {
            this.modifiedData.length = 0;
            this.cacheData.length = 0;
            this.loadData({});
            this.$notification.open({
              message: "Success",
              description: this.$t("lang.messageEditSuccess"),
              duration: 6,
              style: { background: "#52C41A" }
            });
          } else {
            this.modifiedData.length = 0;
            this.$notification.open({
              message: "Error",
              description: res.msg,
              duration: 6,
              style: { background: "#F5222D" }
            });
          }
        });
      } else {
        this.$message.info("Nothing was changed!", 6);
      }
      this.saveDisabled = false;
      this.saveLoading = false;
    },
    edit(key) {
      const newData = [...this.dataSource];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target.editable = true;
        this.dataSource = newData;
      }
    },
    cancel(key) {
      const newData = [...this.dataSource];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter(item => key === item.key)[0]
        );
        delete target.editable;
        this.dataSource = newData;
      }
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
          this.queryParam.salesOrg = values.salesOrg;
          this.loadData({});
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
    getDropDown(param, dropdownList, key) {
      getDropDownList(Object.assign({}, param)).then(res => {
        dropdownList.splice(0);
        res.result.forEach(el => {
          dropdownList.push(el[key]);
        });
      });
    },
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination);
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
    loadData(params) {
      this.loading = true;
      this.searchLoading = true;
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
        for (let i = 0; i < res.result.list.length; i++) {
          res.result.list[i].key = res.result.list[i].rid;
          // res.result.list[i].country +
          // "@" +
          // res.result.list[i].salesOrg +
          // "@" +
          // res.result.list[i].salesOffice +
          // "@" +
          // res.result.list[i].salesOfficePct;
        }
        self.loading = false;
        self.searchLoading = false;
        self.dataSource = res.result.list;
        if (self.cacheData.length == 0) {
          self.dataSource.forEach(item => {
            self.cacheData.push(Object.assign({}, item));
          });
        }
        self.pagination = pagination;
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
    // 收起展开
    toggleAdvanced() {
      this.advanced = !this.advanced;
    }
  }
};
</script>
