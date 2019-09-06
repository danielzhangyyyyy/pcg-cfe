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
            v-decorator="[item.decorator, {initialValue: item.text, rules: [{required: item.required, message: item.message}]}]"
          />
          <a-select
            :getPopupContainer="getPopupContainer"
            showSearch
            :filterOption="filterOption"
            optionFilterProp="children"
            v-if="item.inputType=='dropDown'"
            :placeholder="item.message"
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
    import langZh from "../../locales/zh-CN/formula_lang.js";
    import langEn from "../../locales/en-US/formula_lang.js";
    import {getDropDownList} from "@api/formula_api";

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
      brandListData: [],
      prodFamilyByBrandListData: [],
      categoryListData: ["BASE", "MTM", "NON-BASE"],
      plantByBrandListData: [],
      subgeoListData: [],
      babelList: [], // 从lang包获取的要展示的字段
      form: this.$form.createForm(this)
    };
  },
  computed: {
    language() {
      return this.$store.getters.language;
    }
  },
  watch: {
    brandListData(val) {
      this.babelList.forEach(element => {
        if (element["decorator"] == "brand") {
          element["dropDownList"] = [].concat(this.brandListData);
        }
      });
    },
    prodFamilyByBrandListData(val) {
      this.babelList.forEach(element => {
        if (element["decorator"] == "prodfamily") {
          element["dropDownList"] = [].concat(this.prodFamilyByBrandListData);
        }
      });
    },
    plantByBrandListData(val) {
      this.babelList.forEach(element => {
        if (element["decorator"] == "plant") {
          element["dropDownList"] = [].concat(this.plantByBrandListData);
        }
      });
    },
    subgeoListData(val) {
      this.babelList.forEach(element => {
        if (element["decorator"] == "subgeo") {
          element["dropDownList"] = [].concat(this.subgeoListData);
        }
      });
    },
    language(val) {
      this.changeLanguage();
    }
  },
  created() {
    this.changeLanguage();
    this.getDropDownList(
      { moduleName: "getBrandList" },
      this.brandListData,
      "BRAND"
    );
    this.getDropDownList(
      { moduleName: "getSubgeoList" },
      this.subgeoListData,
      "SUBGEO"
    );
    this.setDropDownLists();
  },
  activated() {
    this.form.resetFields();
  },
  methods: {
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
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
        this.prodFamilyByBrandListData.length = 0;
        this.plantByBrandListData.length = 0;
        this.form.resetFields(["prodfamily", "plant"]);
        this.getDropDownList(
          { moduleName: "getBizProdFByBrand", brand: value },
          this.prodFamilyByBrandListData,
          "PROD_FAMILY"
        );
        this.getDropDownList(
          { moduleName: "getPlantByBrand", brand: value },
          this.plantByBrandListData,
          "PLANT"
        );
      }
    },
    setDropDownLists() {
      this.babelList.forEach(element => {
        if (element["decorator"] == "category") {
          element["dropDownList"] = [].concat(this.categoryListData);
        }
      });
    },
    getDropDownList(param, dropdownList, key) {
      getDropDownList(Object.assign({}, param)).then(res => {
        dropdownList.length = 0;
        res.result.forEach(el => {
          dropdownList.push(el[key]);
        });
      });
    },
    // getListFun() {
    //   const that = this;
    //   // const value = this.queryParam
    //   that.loadData = parameter => {
    //     console.log("loadData.parameter", parameter);
    //     return list(Object.assign(parameter, that.queryParam)).then(res => {
    //       console.log(res.result);
    //       return res.result;
    //     });
    //   };
    // },
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
