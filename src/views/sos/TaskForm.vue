<template>
  <a-form @submit="handleSubmit" :form="form" class="form">
    <a-row class="form-row" :gutter="48">
      <a-col :lg="8" :md="12" :sm="24" v-for="(item,index) in babelList" :key="index">
        <a-form-item :label="item.label">
          <a-input
            :placeholder="item.message"
            v-if="item.inputType=='input'"
            :disabled="item.decorator=='productGroup'"
            :class="{ plantUpperCase: item.decorator=='plant' }"
            v-decorator="[item.decorator, {initialValue: item.text, rules: [{required: item.required, message: item.message},{pattern: new RegExp(/^[0-9]\d*$/, 'g'), message: 'Priority should be a positive integer'}]}]"
          />
          <a-select
            :getPopupContainer="getPopupContainer"
            showSearch
            :filterOption="filterOption"
            optionFilterProp="children"
            v-if="item.inputType=='dropDown'"
            :placeholder="item.message"
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
    </a-row>
  </a-form>
</template>

<script>
import langZh from "../../locales/zh-CN/sos_lang.js";
import langEn from "../../locales/en-US/sos_lang.js";
import Vue from "vue";
import { getDropDownList, getMachineTypeList } from "@api/sos_api";

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
      prodFamilyDataList: [],
      machineTypeDataList: [],
      plantDataList: [],
      subgeoDataList: [],
      babelList: [], // 从lang包获取的要展示的字段
      form: this.$form.createForm(this),
      productGroup: Vue.ls.get("PRODUCTGROUP")
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
    prodFamilyDataList(val) {
      this.babelList.forEach(element => {
        if (element["decorator"] == "prodFamily") {
          element["dropDownList"] = [].concat(this.prodFamilyDataList);
        }
      });
    },
    machineTypeDataList(val) {
      this.babelList.forEach(element => {
        if (element["decorator"] == "machineType") {
          element["dropDownList"] = [].concat(this.machineTypeDataList);
        }
      });
    },
    plantDataList(val) {
      this.babelList.forEach(element => {
        if (element["decorator"] == "plant") {
          element["dropDownList"] = [].concat(this.plantDataList);
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
  },
  activated() {
    this.form.resetFields();
  },
  methods: {
    getPopupContainer(trigger) {
      return trigger.parentElement;
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
    handleDropDownChange(value, decorator) {
      if (decorator == "brand") {
        this.form.resetFields(["prodFamily", "plant", "machineType"]);
        this.machineTypeDataList.splice(0);
        this.getDropDown(
          { moduleName: "getProductFamilyByBrand", brand: value },
          this.prodFamilyDataList,
          "COST_PROD_FAMILY"
        );
        this.getDropDown(
          { moduleName: "getPlantByBrand", brand: value },
          this.plantDataList,
          "PLANT"
        );
      }
      if (decorator == "prodFamily") {
        this.form.resetFields(["machineType"]);
        this.machineTypeDataList.splice(0);
        getMachineTypeList(Object.assign({}, { prodFamily: value })).then(
          res => {
            res.result.forEach(el => {
              this.machineTypeDataList.push(el["machineType"]);
            });
          }
        );
      }
    },
    getDropDown(param, dropdownList, key) {
      getDropDownList(Object.assign({}, param)).then(res => {
        dropdownList.splice(0);
        res.result.forEach(el => {
          dropdownList.push(el[key]);
        });
      });
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$notification["error"]({
            message: "Received values of form:",
            description: values
          });
        }
      });
    }
  }
};
</script>
