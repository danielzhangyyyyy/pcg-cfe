<template>
  <a-form @submit="handleSubmit" :form="form" class="form">
    <a-row class="form-row" :gutter="48">
      <a-col :lg="8" :md="12" :sm="24" v-for="(item,index) in detailList.slice(0,4)" :key="item.index">
        <a-form-item :label="item.label">
          <a-input
            v-if="item.inputType=='input'"
            :disabled="item.editDisabled"
            :allowClear="item.allowClear"
            v-decorator="[item.decorator, {initialValue:item.text, rules: [{required: item.required, message: item.message }]}]"
          />
          <a-select
                :getPopupContainer="getPopupContainer"          showSearch
            :filterOption="filterOption"
            optionFilterProp="children"
            v-if="item.inputType=='dropDown'"
            :allowClear="item.allowClear"
            v-decorator="[item.decorator, {initialValue:item.text, rules: [{required: item.required, message: item.message }]}]"
          >
            <a-select-option
              v-for="(element, i) in item.dropDownList"
              v-bind:key="i"
              :value="element"
            >{{ element }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :lg="8" :md="12" :sm="24" v-for="(item,index) in detailList.slice(4)" :key="item.index">
        <a-form-item :label="item.label">
          <a-input
                  v-if="item.inputType=='input'"
                  :disabled="item.editDisabled"
                  :allowClear="item.allowClear"
                  v-decorator="[item.decorator, {initialValue:item.text, rules: [{required: false, message: item.message }]}]"
          />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
    import Vue from "vue";
    import langZh from "../../locales/zh-CN/machineTypeFamily_lang.js";
    import langEn from "../../locales/en-US/machineTypeFamily_lang.js";
    import {getProductTypeDropDownList, show} from "@api/machineTypeFamily_api";

    export default {
  name: "RepositoryForm",
  props: {
    showSubmit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ProductFamilyDropdownList: [],
      ProductTypeDropdownList: [],
      eolStatusDropDownList: ["EOL", "OL", "TEMP"],
      funSwitch: false, // 首次不执行
      editSelectKey: "",
      babelList: [], // 从lang包获取的要展示的字段
      detailList: [], // 列表详情数据
      form: this.$form.createForm(this)
    };
  },
  created() {
    this.changeLanguage();
    this.editSelectKey = Vue.ls.get("machineTypeFamily_editSelectKey");
    console.log(this.editSelectKey);
    this.getDetailfun(this.editSelectKey);
    getProductTypeDropDownList({})
      .then(res => {
        this.ProductTypeDropdownList.length = 0;
        res.result.forEach(el => {
          this.ProductTypeDropdownList.push(el["pvalue"]);
        });
      })
      .catch(err => {
        console.log(err);
        this.$message.warning("Load product type dropdown list failed!");
      });
  },
  computed: {
    language() {
      return this.$store.getters.language;
    }
  },
  watch: {
    ProductTypeDropdownList(val) {
      this.detailList.forEach(element => {
        if (element["decorator"] == "productType") {
          element["dropDownList"] = [].concat(this.ProductTypeDropdownList);
        }
      });
    },
    ProductFamilyDropdownList(val) {
      this.detailList.forEach(element => {
        if (element["decorator"] == "prodFamily") {
          element["dropDownList"] = [].concat(this.ProductFamilyDropdownList);
        }
      });
    },
    language(val) {
      this.funSwitch = true;
      this.changeLanguage();
    },
    $route: {
      handler(route) {
        console.log(route.name);
        // eslint-disable-next-line eqeqeq
        if (route.name === "machineTypeFamily_edit") {
          this.editSelectKey = Vue.ls.get("machineTypeFamily_editSelectKey");
          console.log(this.editSelectKey);
          this.getDetailfun(this.editSelectKey);
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
    getDropDown(param, dropdownList, key) {
      getDropDownList(Object.assign({}, param)).then(res => {
        dropdownList.length = 0;
        res.result.forEach(el => {
          dropdownList.push(el[key]);
        });
      });
    },
    setDropDownLists() {
      this.detailList.forEach(element => {
        if (element["decorator"] == "eolStatus") {
          element["dropDownList"] = [].concat(this.eolStatusDropDownList);
        }
      });
    },
    // 获取详情并在placeholder上显示
    getDetailfun(id) {
      const rid = id;
      const values = {
        rid
      };
      console.log(values);
      show(values)
        .then(res => {
          if (res.code != 0) {
            this.$notification.open({
                message: "Error",
                description: res.msg,
                duration: 6,
                style: {'background': '#F5222D'}
              });
            this.$store.dispatch('ToggleCloseTab', '');
            setTimeout(() => {
              this.$store.dispatch('ToggleCloseTab', this.$route.path);
              this.$router.replace(`/machineTypeFamily/machineTypeFamily_list`);
            }, 500);
            return;
          }
          console.log(res);
          const babelList = this.babelList;
          this.detailList = [];
          this.form.resetFields();
          for (let i = 0; i < babelList.length; i++) {
            const textField = `${babelList[i].decorator}`;
            this.detailList.push({
              label: babelList[i].label,
              message: babelList[i].message,
              decorator: babelList[i].decorator,
              required: babelList[i].required,
              text: res.result[textField],
              inputType: babelList[i].inputType,
              allowClear: babelList[i].allowClear,
              editDisabled: babelList[i].editDisabled,
              dropDownList: []
            });
          }
          this.setDropDownLists();
          console.log(this.detailList);
        })
        .catch(er => {
          this.$notification.open({
                message: "Error",
                description: res.msg,
                duration: 6,
                style: {'background': '#F5222D'}
              });
          console.log(er);
        });
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
      if (this.funSwitch) {
        // 首次不执行
        this.getDetailfun(this.editSelectKey);
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        console.log("err", err);
        console.log("values", values);
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
