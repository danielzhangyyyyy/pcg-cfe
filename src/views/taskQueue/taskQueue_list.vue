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
                  v-decorator="[item.decorator, {initialValue: item.text, rules: [{required: item.required, message: item.message }]}]"
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

    <a-table
      ref="table"
      :columns="columns"
      :loading="loading"
      :scroll="scrollSize"
      :pagination="pagination"
      size="small"
      @change="handleTableChange"
      :rowKey="(record) => `${record.rid}`"
      :dataSource="loadData"
    >
      <div
        slot="status"
        slot-scope="text, record"
        :class="{redBGC: record.status=='ACTIVE' && record.failed, greenBGC: record.status=='ACTIVE' && !record.failed}"
      >{{text}}</div>
      <a
        slot="instanceId"
        slot-scope="instanceId"
        @click="eventPush(instanceId)"
        href="javascript:;"
      >{{instanceId}}</a>
    </a-table>
  </a-card>
</template>

<script>
import { STable, tableBtns } from "@/components";
import { del, getDropDownList, list } from "@api/taskQueue_api";
import { isNullOrUndefined } from "util";
import { getXScrollSize } from "@api/publicFunc_api";
import langEn from "../../locales/en-US/taskQueue_lang.js";

export default {
  name: "TableList",
  components: {
    STable,
    tableBtns
  },
  data() {
    return {
      brandDataList: [],
      statusListData: ["ALL", "ACTIVE", " ABORTED", "COMPLETED"],
      filterList: langEn.filter_langEn,
      form: this.$form.createForm(this),
      // currentPageManipulationAuth: ["Add", "Delete", "Update", "View", "Upload"],
      mdl: {},
      searchLoading: false,
      loading: false, // 页面是否加载中
      advanced: false, // 高级搜索 展开/关闭
      scrollSize: { y: false },
      queryParam: {
        status: ""
      }, // 查询参数
      optionAlertShow: true, // 是否显示选择框
      selectedRowKeys: false, // 选中的行的keys数组
      selectedRows: [], // 选中的行的全部数组
      // 表头
      columns: [],
      loadData: [],
      lastQuery: "",
      pagination: {
        showSizeChanger: true,
        // current: 1,
        // total: 0,
        // pageSize: 10,
        pageSizeOptions: ["10", "50", "100", "150"],
        onShowSizeChange: this.showSizeChange,
        showTotal: total =>
          total == 1
            ? `total ${total} row`
            : `total ${total} rows`
        // onChange: this.changePage
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
    this.scrollSize.x = getXScrollSize(this.columns, 0);
    this.getListFun({});
    this.getDropDown(
      { moduleName: "getBrandList" },
      this.brandDataList,
      "BRAND"
    );
    this.setDropDownLists();
  },
  watch: {
    plantListData(val) {
      this.filterList.forEach(element => {
        if (element["decorator"] == "brand") {
          element["dropDownList"] = [].concat(this.brandDataList);
        }
      });
    },
    language(val) {
      this.changeLanguage();
    },
    $route: {
      handler(route) {
        console.log(route.path);
        if (route.path === "/taskQueue/taskQueue_list") {
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
    eventPush(id) {
      this.$store.dispatch("ToggleCloseTab", "");
      setTimeout(() => {
        this.$store.dispatch(
          "ToggleCloseTab",
          "/taskQueue/instance_id" + this.lastQuery
        );
        this.lastQuery = encodeURI("?id=" + id);
        this.$router.push({
          path: "/taskQueue/instance_id",
          query: { id: id }
        });
      }, 500);
    },
    searchOnClick() {
      this.form.validateFields((err, values) => {
        if (!err) {
          for (let key in values) {
            if (key === "status" && values[key] === "ALL") {
              this.queryParam[key] = "";
            } else if (
              key === "eventName" &&
              values[key] != undefined &&
              values[key] !== ""
            ) {
              this.queryParam[key] = `%${values[key]}%`;
            } else if (
              key === "startDateFrom" &&
              !isNullOrUndefined(values[key])
            ) {
              this.queryParam[key] = values[key].format("YYYY-MM-DD");
            } else if (
              key === "startDateTo" &&
              !isNullOrUndefined(values[key])
            ) {
              this.queryParam[key] = values[key].format("YYYY-MM-DD");
            } else if (
              key === "endDateFrom" &&
              !isNullOrUndefined(values[key])
            ) {
              this.queryParam[key] = values[key].format("YYYY-MM-DD");
            } else if (key === "endDateTo" && !isNullOrUndefined(values[key])) {
              this.queryParam[key] = values[key].format("YYYY-MM-DD");
            } else {
              this.queryParam[key] = values[key];
            }
          }
          this.getListFun({});
        } else {
          this.$notification.open({
            message: "Search condition error:",
            description:
              "Please fill in 'Part Number' or select 'Mfg Plant' or fill in 'Owner' or select 'Last Modified Date' before proceeding!",
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
        if (element["decorator"] == "status") {
          element["dropDownList"] = [].concat(this.statusListData);
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
    handleDropDownChange(value, decorator) {},
    showSizeChange(current, pageSize) {
      this.queryParam.pageSize = pageSize;
      this.pagination.pageSize = pageSize;
      console.log(current, pageSize, "current, pageSize");
      this.getListFun({});
    },
    // changePage(page) {
    //     this.pagination.current = page;
    //     this.queryParam.pageNum = page;
    //     this.selectedRows = [];
    //     this.getListFun();
    // },
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.getListFun({
        pageSize: pagination.pageSize,
        pageNum: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order === "descend" ? "desc" : "",
        ...filters
      });
    },
    getListFun(params) {
      const self = this;
      self.loading = true;
      self.searchLoading = true;
      let parameter = {
        pageNum: params.pageNum || this.pagination.current || 1,
        pageSize: params.pageSize || this.pagination.pageSize || 10
      };
      params.sortField ? (parameter.sortField = params.sortField) : "";
      params.sortOrder ? (parameter.sortOrder = params.sortOrder) : "";
      list(Object.assign(parameter, self.queryParam)).then(res => {
        const pagination = { ...self.pagination };
        pagination.total = res.result.total;
        pagination.pageSize = res.result.pageSize;
        pagination.current = res.result.pageNum;
        self.loading = false;
        self.searchLoading = false;
        if (res.code === "0") {
          self.searchLoading = false;
          for (let item of res.result.list) {
            item.check = false;
            item.children = this.tableChildrenList;
          }
          self.loadData = res.result.list;
          self.loadData.length > 10
            ? (self.scrollSize.y = 450)
            : (self.scrollSize.y = false);
          self.pagination = pagination;
        } else {
          self.$notification.open({
            message: "Error",
            description: res.msg,
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
    // 选择列表
    onSelectChange(selectedRowKeys, selectedRows) {
      //console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys;
      // this.selectedRows = selectedRows
    },
    // 修改用户
    editListFun(rowKey, disab) {
      console.log(rowKey);
      console.log(disab);
      this.$refs.editForm.edit(rowKey, disab);
    },
    changeLanguage() {
      if (this.language == "zh-CN") {
        this.columns = langZh.tableTitle_langZh;
      } else if (this.language == "en-US") {
        this.columns = langEn.tableTitle_langEn;
      }
    },
    // 刷新列表
    handleOk() {
      this.getListFun({});
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
.redBGC {
  background: red;
}

.greenBGC {
  background: #11ff11;
}
</style>
