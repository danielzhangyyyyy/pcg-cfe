<template>
  <a-form @submit="handleSubmit" :form="form" class="form">
    <a-row class="form-row" :gutter="48">
      <a-col :lg="8" :md="12" :sm="24" v-for="(item,index) in babelList.slice(0,4)" :key="item.index">
        <a-form-item :label="item.label">
          <a-input
            :placeholder="item.message"
            v-if="item.inputType=='input'"
            :disabled="item.decorator=='productGroup'"
            :class="{ plantUpperCase: item.decorator=='plant' }"
            v-decorator="[item.decorator, {initialValue: item.text, rules: [{required: item.required, message: item.message }]}]"
          />
          <a-select
            showSearch
            :getPopupContainer="getPopupContainer"
            :filterOption="filterOption"
            optionFilterProp="children"
            v-if="item.inputType=='dropDown'"
            :placeholder="item.message"
            :allowClear="item.allowClear"
            :disabled="item.decorator=='cycle'"
            v-decorator="[item.decorator, {initialValue: item.text, rules: [{required: item.required, message: item.message }]}]"
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
      <a-col :lg="8" :md="12" :sm="24" v-for="(item,index) in babelList.slice(4)" :key="item.index">
        <a-form-item :label="item.label">
          <a-input
                  :placeholder="item.message"
                  v-if="item.inputType=='input'"
                  :disabled="item.decorator=='productGroup'"
                  :class="{ plantUpperCase: item.decorator=='plant' }"
                  v-decorator="[item.decorator, {initialValue: item.text, rules: [{required: item.required, message: item.message,pattern: new RegExp(/^(\-|\+)?\d+(\.\d+)?$/) }]}]"
          />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
    import langZh from "../../locales/zh-CN/eO_lang.js";
    import langEn from "../../locales/en-US/eO_lang.js";
    import {getDropDownList} from "@api/eO_api";

    export default {
  name: "TaskForm",
  props: {
    showSubmit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      brandDataList: [],
      subgeoDataList: [],
      tbaTypeDataList: ["US_DOLLAR", "PERCENTAGE"],
      babelList: [], // 从lang包获取的要展示的字段
      form: this.$form.createForm(this),
      // productGroup: Vue.ls.get("PRODUCTGROUP")
    };
  },
  computed: {
    language() {
      return this.$store.getters.language;
    }
  },
  watch: {
    brandDataList(val) {
      this.babelList.forEach(element => {
        if (element["decorator"] == "brand") {
          element["dropDownList"] = [].concat(this.brandDataList);
        }
      });
    },
    subgeoDataList(val) {
      this.babelList.forEach(element => {
        if (element["decorator"] == "subgeo") {
          element["dropDownList"] = [].concat(this.subgeoDataList);
        }
      });
    },
    language(val) {
      this.changeLanguage();
    }
  },
  created() {
    this.changeLanguage();
    getDropDownList({
      moduleName: "getMonthListByCycle",
      cycle: "CURRENT"
    }).then(res => {
      let temp = res.result[0];
      for (let key in temp) {
        this.babelList.forEach(el => {
          if (
            el["decorator"] &&
            el["decorator"].toUpperCase() === key.toUpperCase()
          ) {
            el["label"] = temp[key];
          }
        });
      }
    });
    this.getDropDown(
      { moduleName: "getBrandList" },
      this.brandDataList,
      "BRAND"
    );
    this.getDropDown(
      { moduleName: "getSubgeoList" },
      this.subgeoDataList,
      "SUBGEO"
    );
    this.setDropDownLists();
  },
  activated() {
    this.form.resetFields();
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
    getDropDown(param, dropdownList, key) {
      getDropDownList(Object.assign({}, param)).then(res => {
        dropdownList.splice(0);
        res.result.forEach(el => {
          dropdownList.push(el[key]);
        });
      });
    },
    setDropDownLists() {
      this.babelList.forEach(element => {
        if (element["decorator"] == "tbaType") {
          element["dropDownList"] = [].concat(this.tbaTypeDataList);
        }
      });
    },
    handleDropDownChange(value, decorator) {
    },
    // 更改列表国际化
    changeLanguage() {
      console.log(this.language);
      // eslint-disable-next-line
      if (this.language == "zh-CN") {
        this.babelList = langZh.editAndDetail_langZh;
        // eslint-disable-next-line
      } else if (this.language == "en-US") {
        this.babelList = langEn.editAndDetail_langEn;
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$notification.open({
            message: "Received values of form:",
            description: values,
            duration: 6,
            style: { background: "#F5222D" }
          });
        }
      });
    }
  }
};
</script>
