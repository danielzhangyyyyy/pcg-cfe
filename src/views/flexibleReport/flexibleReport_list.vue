<template>
  <a-card :bordered="false" class="content">
    <div class="table-page-search-wrapper flexibleReport">
      <a-form layout="inline" @submit="handleSubmit" :form="form">
        <a-row :gutter="48">
          <template v-if="advanced">
            <a-col :md="8" :sm="24" v-for="item in filterList" :key="item.decorator">
              <a-form-item :label="item.label" ref="formItems">
                <a-input
                  :placeholder="item.placeHolder"
                  v-if="item.inputType=='input'"
                  :disabled="item.editDisabled"
                  :allowClear="item.allowClear"
                  @change="inputChange($event, item)"
                  v-decorator="[item.decorator, {initialValue:item.text, rules: [{required: item.required, message: item.message }]}]"
                />
                <a-select
                  :mode="item.mode"
                  :getPopupContainer="getPopupContainer"
                  showSearch
                  :filterOption="filterOption"
                  optionFilterProp="children"
                  v-if="item.inputType=='dropDown'"
                  :placeholder="item.placeHolder"
                  :allowClear="item.allowClear"
                  v-decorator="[item.decorator, {initialValue:item.text, rules: [{required: item.required, message: item.message }]}]"
                  @change="handleQueryDropDownChange($event, item)"
                >
                  <a-select-option
                    v-for="(element, i) in item.dropDownList"
                    v-bind:key="i"
                    :value="element"
                  >{{ element }}</a-select-option>
                </a-select>
                <a-date-picker
                  :getCalendarContainer="getPopupContainer"
                  v-if="item.inputType=='date'"
                  :disabled="item.editDisabled"
                  :placeholder="item.placeHolder"
                  :allowClear="item.allowClear"
                  @change="dateChange($event, item)"
                  v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
                />
              </a-form-item>
            </a-col>
          </template>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <span v-for="(item,index) in buttonList" :key="index">
        <a-button
          v-if="item.name === 'Search'"
          type="primary"
          @click="searchOnClick"
          :loading="searchLoading"
          icon="search"
        >{{ $t('lang.tabComSearchButtonName') }}</a-button>
        <a-button
          v-if="(item.name !== 'Search')&&(item.name !== 'Export')&&(item.name !=='Upload')&&executeButton"
          type="primary"
          @click="executeOnClick(item.url,item.name,index)"
          :loading="btnLoading[index]"
          icon="form"
        >{{item.name}}</a-button>
        <a-button
          v-if="item.name === 'Upload'"
          type="primary"
          icon="download"
          @click="uploadOnClick(item.eventName)"
        >{{item.name}}</a-button>
        <a-button
          v-if="item.name === 'Export'"
          type="primary"
          icon="download"
          @click="exportOnClick"
          :loading="exportLoading"
        >Export</a-button>
      </span>
      <a @click="toggleAdvanced" style="margin-left: 8px" v-if="hasQuery">
        {{ advanced ? $t('lang.tabComToggleCloseName') : $t('lang.tabComToggleShowName') }}
        <a-icon :type="advanced ? 'up' : 'down'" />
      </a>
    </div>
    <m-table
      v-show="tableStatus"
      :columns="columns"
      :dataSource="dataSource"
      :scroll="scroll"
      :loading="loading"
      :showPagination="true"
    ></m-table>
  </a-card>
</template>
<script>
import moment from "moment";
import {
  executeApi,
  getCommonList,
  getReportData,
  getReportFilter,
  cancelFns
} from "@api/flexibleQuery_api";
import { mTable } from "@/components";
import { isArray } from "util";
import { exportByURL } from "@api/exportFunction_api";
import { setTimeout, clearTimeout } from "timers";
import Vue from "vue";

export default {
  name: "TableList",
  components: {
    mTable
  },
  data() {
    return {
      executeButton: false,
      btnLoading: [],
      mandatoryForSearch: [],
      executeSearch: [],
      buttonList: [],
      filterList: [],
      form: this.$form.createForm(this),
      categoryReports: [],
      scroll: { x: true },
      pagination: {},
      searchLoading: false,
      loading: false, // 页面是否加载中
      executeLoading: false,
      exportLoading: false,
      executeDisabled: true,
      advanced: true, // 高级搜索 展开/关闭
      queryParam: {}, // 查询参数
      queryArray: [],
      hasQuery: false,
      columns: [],
      dataSource: [],
      countLoadData: 0,
      filterStorage: {},
      tableStatus: true,
      lastPath: "",
      cancelLast: null
    };
  },
  created() {
    const temp = this.$route.path.split("/")[1];
    const flexibleReportId = JSON.parse(
      localStorage.getItem("flexibleReportId")
    );
    this.queryParam.rptId = flexibleReportId[temp];
    this.getPermissions();
  },
  mounted() {
    window.onresize = () => {
      this.setWidth();
    };
  },
  watch: {
    $route: {
      handler(route) {
        if (route.path.indexOf("flexibleReport_list") > 0) {
          if (this.lastPath != this.$route.path) {
            this.$store.dispatch("ToggleCloseTab", "");
            setTimeout(() => {
              this.$store.dispatch("ToggleCloseTab", this.lastPath);
              this.lastPath = this.$route.path;
            }, 500);
          }
          const rptName = this.$route.path.split("/")[1];
          const flexibleReportId = JSON.parse(
            localStorage.getItem("flexibleReportId")
          );
          this.queryParam = {};
          this.filterList.splice(0);
          this.dataSource.splice(0);
          /* let queryCopy = this.getFilterStorage(rptName);
                        if (queryCopy) {
                            this.queryParam = Object.assign({}, queryCopy)
                            this.loadData({});
                        } else {
                            this.queryParam = {};
                        } */
          this.queryParam.rptId = flexibleReportId[rptName];
          this.getFilter({ rptId: flexibleReportId[rptName] }).then(res => {
            /* for(let item of this.filterList){
                                this.toggleCascader('', item)
                            }
                            for (let key in queryCopy) {
                                queryCopy[key] ? this.form.setFieldsValue({[key]: queryCopy[key]}) : '';
                            } */
          });
          let self = this;
          let timer = setTimeout(() => {
            self.setWidth();
            clearTimeout(self.timer);
          }, 500);
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    getPermissions() {
      const localRouter = JSON.parse(localStorage.getItem('pcg__GET_MENU'))
      console.log(localRouter, 'localRouter')
      let path = this.$route.path
      for (let item of localRouter.value) {
        for (let element of item.childMenuList) {
          if (element.frontRouter.startsWith(path.substring(1, path.length))) {
            this.executeButton = element.accessLevel && element.accessLevel.includes('Execute') ?  true : false;
            return;
          }
        }
      }
    },
    uploadOnClick(eventName) {
      const originalPage = this.$route.name;
      const uploadId = eventName;
      const rptName = this.$route.path.split("/")[1];
      const flexibleReportId = JSON.parse(
        localStorage.getItem("flexibleReportId")
      );
      this.$router.replace({
        path: `/upload/upload_list/${uploadId}/origin/${originalPage}/flexibleReport/${flexibleReportId[rptName]}`
      });
    },
    setWidth() {
      const form = document.getElementsByClassName("ant-form-item");
      const label = document.getElementsByClassName("ant-form-item-label");
      let c = document.getElementsByClassName("ant-form-item-children");
      if (c.length > 0 && form != "undefined") {
        for (let i = 0; i < c.length; i++) {
          c[i]["children"][0].style.width =
            form[i]["clientWidth"] -
            label[i]["children"][0]["offsetWidth"] +
            "px";
        }
      }
    },
    toggleCascader(value, item) {
      if (item.cascader) {
        item.cascader.forEach(el => {
          this.form.resetFields([el.field]);
          this.filterList.forEach(element => {
            if (element.decorator == el.field) {
              element.dropDownList.splice(0);
              element.text = undefined;
              let fieldsValue = this.form.getFieldsValue(el.father);
              if (value) {
                fieldsValue[item.decorator] = value;
                getCommonList({
                  moduleName: el.moduleName,
                  eventName: "flexibleQuery",
                  ...fieldsValue
                }).then(res => {
                  if (res.code == 0) {
                    element.dropDownList = res.result;
                  } else {
                    this.$notification.open({
                      message: "Error:",
                      description: `Something wrong with query parameter ${el.field}`,
                      duration: 6,
                      style: { background: "#F5222D" }
                    });
                  }
                });
              }
            }
          });
        });
      }
      this.countLoadData++;
    },
    handleQueryDropDownChange(value, item) {
      !isArray(value) ? this.toggleCascader(value, item) : "";
    },
    inputChange(e, item) {
      let value = e.target.value;
      this.toggleCascader(value, item);
    },
    dateChange(e, item) {
      let value = "";
      e ? (value = e.format("YYYY-MM-DD")) : "";
      this.toggleCascader(value, item);
    },
    exportOnClick() {
      return new Promise((resolve, reject) => {
        for (let item of this.filterList) {
          this.mandatoryForSearch.includes(item.label)
            ? (item.required = true)
            : (item.required = false);
        }
        resolve();
      }).then(res => {
        let data = new Date();
        this.exportLoading = true;
        this.form.validateFields((err, values) => {
          if (!err) {
            for (let key in values) {
              if (values[key] && values[key].constructor.name == "Moment") {
                values[key] = values[key].format("YYYY-MM-DD");
              }
            }
            values.rptId = this.queryParam.rptId;
            for (let key in values) {
              values[key] != undefined
                ? (values[key] = values[key].toString())
                : "";
            }
            exportByURL(values, "flexibleQuery/exportExcel").then(res => {
              this.exportLoading = false;
              //this.setFilterStorage(values);
            });
          } else {
            this.$notification.open({
              message: "Search condition error:",
              description: "Please fill in query parameters.",
              duration: 6,
              style: { background: "#F5222D" } //red
            });
            this.exportLoading = false;
          }
        });
      });
    },
    executeOnClick(url, name, index) {
      let arr = this.form.getFieldsValue();
      for (let i = 0; i < this.filterList.length; i++) {
        delete this.filterList[i].text;
        if (arr[this.filterList[i]["decorator"]])
          this.filterList[i].text = arr[this.filterList[i]["decorator"]];
      }
      this.form.resetFields();
      for (let item of this.filterList) {
        if (this.executeSearch.includes(item.label)) {
          item.required = true;
        } else {
          item.required = false;
          // arr[item.decorator] != undefined ? item.text = arr[item.decorator] : ""
          // arr[item.decorator] != undefined ? this.form.setFieldsValue({[item.decorator]: arr[item.decorator]}) : ""
        }
      }
      let self = this;
      this.btnLoading[index] = true;
      setTimeout(() => {
        self.form.validateFields((err, values) => {
          for (let [key, value] of Object.entries(arr)) {
            values[key] = value;
          }
          values.name = name;
          if (!err) {
            for (let key in values) {
              if (values[key] && values[key].constructor.name == "Moment") {
                values[key] = values[key].format("YYYY-MM-DD");
              }
            }
            values.rptId = self.queryParam.rptId;
            for (let key in values) {
              values[key] != undefined
                ? (values[key] = values[key].toString())
                : "";
            }
            this.$confirm({
              title: self.$t("lang.messageConfirmTitle"),
              content: self.$t("lang.messageExecuteConfirmation"),
              onOk() {
                executeApi(url, values)
                  .then(res => {
                    self.executeLoading = false;
                    // self.btnLoading[index] = false;
                    Vue.set(self.btnLoading, index, false);
                    if (res.code == 0) {
                      self.$notification.open({
                        message: "Success",
                        description: res.msg,
                        duration: 6,
                        style: { background: "#52C41A" }
                      });
                    } else if (res.code == 1) {
                      self.$notification.open({
                        message: "Info",
                        description: res.msg,
                        duration: 6,
                        style: { background: "#52C41A" }
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
                    Vue.set(self.btnLoading, index, false);
                    self.$notification.open({
                      message: "Error",
                      description: self.$t("lang.messageExecuteFailed"),
                      duration: 6,
                      style: { background: "#F5222D" }
                    });
                  });
              },
              onCancel() {
                Vue.set(self.btnLoading, index, false);
              }
            });
          } else {
            self.executeLoading = false;
            self.btnLoading[index] = false;
            self.$notification.open({
              message: "Search condition error:",
              description:
                "Please fill in available conditions before proceeding!",
              duration: 6,
              style: { background: "#F5222D" }
            });
          }
        });
      }, 20);
    },
    searchOnClick() {
      let arr = this.form.getFieldsValue();
      for (let i = 0; i < this.filterList.length; i++) {
        delete this.filterList[i].text;
        if (arr[this.filterList[i]["decorator"]]) {
          this.filterList[i].text = arr[this.filterList[i]["decorator"]];
        }
      }
      this.form.resetFields();
      for (let item of this.filterList) {
        if (this.mandatoryForSearch.includes(item.label)) {
          item.required = true;
        } else {
          item.required = false;
          // arr[item.decorator] != undefined ? item.text = arr[item.decorator] : ""
          // arr[item.decorator] != undefined ? this.form.setFieldsValue({[item.decorator]: arr[item.decorator]}) : ""
        }
      }
      this.countLoadData++;
      setTimeout(() => {
        this.form.validateFields((err, values) => {
          for (let [key, value] of Object.entries(arr)) {
            values[key] = value;
          }
          if (!err) {
            for (let key in values) {
              if (values[key] && values[key].constructor.name == "Moment") {
                values[key] = values[key].format("YYYY-MM-DD");
              }
            }
            for (let key in values) {
              values[key] != undefined
                ? (values[key] = values[key].toString())
                : "";
            }
            this.queryParam = { ...this.queryParam, ...values };
            this.loadData({});
          } else if (!values.category || !values.report) {
            this.$notification.open({
              message: "Search condition error:",
              description: "please input search conditions.",
              duration: 6,
              style: { background: "#F5222D" } //red
            });
          } else {
            this.$notification.open({
              message: "Search condition error:",
              description: "please input search conditions.",
              duration: 6,
              style: { background: "#F5222D" } //red
            });
          }
        });
      }, 20);
    },
    loadData(params) {
      this.loading = true;
      this.searchLoading = true;
      this.dataSource = [];
      let parameter = {};
      if (params.sortField) {
        parameter.sortField = params.sortField;
      }
      if (params.sortOrder) {
        parameter.sortOrder = params.sortOrder;
      }
      var countLoad = this.countLoadData;
      //this.setFilterStorage(this.queryParam);
      let self = this;
      getReportData(Object.assign(parameter, self.queryParam)).then(res => {
        if (res.result) {
          countLoad == self.countLoadData
            ? (self.dataSource = res.result.rptData)
            : "";
          self.dataSource.length > 10
            ? (self.scroll.y = 450)
            : (self.scroll.y = false);
        }
        self.loading = false;
        self.searchLoading = false;
      });
    },
    handleTableChange(pagination, filters, sorter) {
      this.loadData({
        sortField: sorter.field,
        sortOrder: sorter.order === "descend" ? "desc" : "",
        ...filters
      });
    },
    getFilter(params) {
      if (cancelFns.cancelgetReportFilter) {
        cancelFns.cancelgetReportFilter();
      }

      let self = this;
      return new Promise((resolve, reject) => {
        getReportFilter(params)
          .then(res => {
            if (res.code == 0) {
              this.columns.splice(0);
              this.btnLoading.splice(0);
              this.buttonList = JSON.parse(res.result.buttonCtrlList[0]);
              for (let i = 0; i < this.buttonList.length; i++) {
                this.btnLoading.push(false);
                if (this.buttonList[i].name == "Search") {
                  this.tableStatus = true;
                  break;
                } else {
                  this.tableStatus = false;
                }
              }
              this.scroll.x = res.result.headerList.length * 200;
              res.result.headerList.forEach(el => {
                this.columns.push({
                  title: el.displayName,
                  dataIndex: el.dataIndex,
                  width: 200,
                  align: "center"
                  // sorter: true
                });
              });
              this.queryArray.splice(0);
              this.filterList.splice(0);
              const rptName = this.$route.path.split("/")[1];
              this.mandatoryForSearch = res.result.mandatoryForSearch;
              res.result.reportFilterList.forEach((el, index) => {
                el.required ? this.executeSearch.push(el.label) : "";
                this.queryArray.push(el.decorator);
                let temp = {
                  index: index,
                  label: el.label,
                  decorator: el.decorator,
                  required: el.required,
                  allowClear: true,
                  mode: !el.mode ? "default" : "multiple",
                  message:
                    el.inputType == "input"
                      ? "Please input " + el.label
                      : "Please select " + el.label,
                  placeHolder: !el.placeHolder
                    ? el.inputType == "input"
                      ? "Please input " + el.label
                      : "Please select " + el.label
                    : el.placeHolder,
                  inputType: el.inputType,
                  text: el.defaultValue,
                  dropDownList: el.dropDownList
                    ? JSON.parse(el.dropDownList)
                    : "",
                  cascader: el.linkCol ? JSON.parse(el.linkCol) : ""
                };
                /* if (this.filterStorage[rptName]) {
                                    if (this.filterStorage[rptName][el.decorator]) {
                                        temp.text = this.filterStorage[rptName][el.decorator];
                                    }
                                } */
                this.filterList.push(temp);
              });
              this.hasQuery = this.filterList.length == 0 ? false : true;
              resolve(res);
            } else {
              reject(res);
              this.$notification.open({
                message: "Error:",
                description: "Failed to load query fields.",
                duration: 6,
                style: { background: "#F5222D" } //red
              });
            }
          })
          .catch(err => {
            console.log("one ajax is canceled");
          });
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
            description: "Please fill in query parameters.",
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
    moment,
    // 收起展开
    toggleAdvanced() {
      this.advanced = !this.advanced;
    }
  }
};
</script>
<style>
.flexibleReport
  .ant-select-allow-clear
  .ant-select-selection--multiple
  .ant-select-selection__rendered {
  overflow-x: scroll;
}

.flexibleReport
  .ant-select-selection--multiple
  .ant-select-selection__rendered {
  overflow: hidden;
}

.flexibleReport
  .ant-select-selection--multiple
  .ant-select-selection__rendered
  ul {
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  float: left;
}

.flexibleReport .ant-select-selection--multiple .ant-select-selection__choice {
  float: none;
  overflow: visible;
}

.flexibleReport .ant-select-selection--multiple .ant-select-search--inline {
  float: none;
  position: absolute;
}

.flexibleReport .ant-select-selection--multiple {
  max-height: 32px;
  min-width: 100px;
  overflow: hidden;
}

.flexibleReport .ant-select-selection--multiple:focus-within {
  max-height: 40px;
}
</style>
