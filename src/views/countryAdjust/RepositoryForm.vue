<template>
  <a-form @submit="handleSubmit" :form="form" class="form">
    <a-row class="form-row" :gutter="48">
      <a-col :lg="8" :md="12" :sm="24" v-for="(item,index) in detailList" :key="index">
        <a-form-item :label="item.label">
          <a-input
            :placeholder="item.message"
            v-if="item.inputType=='input' && item.decorator == 'modelNo'"
            :disabled="item.editDisabled"
            v-decorator="[item.decorator, {initialValue:item.text, rules: [{required: item.required, message: item.message }]}]"
          />
          <a-input
            :placeholder="item.message"
            v-if="item.inputType=='input' && item.decorator != 'modelNo'"
            type="number"
            :disabled="item.editDisabled"
            v-decorator="[item.decorator, {initialValue:item.text, rules: [{required: item.required, message: item.message }]}]"
          />
          <a-select
            showSearch
            :getPopupContainer="getPopupContainer"
            :filterOption="filterOption"
            optionFilterProp="children"
            v-if="item.inputType=='dropDown'"
            :placeholder="item.message"
            :allowClear="item.allowClear"
            :disabled="item.editDisabled"
            v-decorator="[item.decorator, {initialValue:item.text, rules: [{required: item.required, message: item.message }]}]"
          >
            <a-select-option
              v-for="(element, i) in item.dropDownList"
              :key="i"
              :value="element"
            >{{ element }}</a-select-option>
          </a-select>
          <a-date-picker
            v-if="item.inputType=='date'"
            :getCalendarContainer="getPopupContainer"
            :disabled="item.editDisabled"
            :placeholder="item.message"
            :allowClear="item.allowClear"
            v-decorator="[item.decorator, {rules: [{required: item.required, message: item.message }]}]"
          />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
import Vue from "vue";
import langZh from "../../locales/zh-CN/countryAdjust_lang.js";
import langEn from "../../locales/en-US/countryAdjust_lang.js";
import { show, getDropDownList } from "@api/countryAdjust_api";

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
      funSwitch: false, // 首次不执行
      editSelectKey: "",
      babelList: [], // 从lang包获取的要展示的字段
      detailList: [], // 列表详情数据
      form: this.$form.createForm(this)
    };
  },
  created() {
    this.changeLanguage();
    this.editSelectKey = Vue.ls.get("countryAdjust_editSelectKey");
    console.log(this.editSelectKey);
    this.getDetailfun(this.editSelectKey);
  },
  computed: {
    language() {
      return this.$store.getters.language;
    }
  },
  watch: {
    language(val) {
      this.funSwitch = true;
      this.changeLanguage();
    },
    $route: {
      handler(route) {
        console.log(route.name);
        // eslint-disable-next-line eqeqeq
        if (route.name === "countryAdjust_edit") {
          this.editSelectKey = Vue.ls.get("countryAdjust_editSelectKey");
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
        dropdownList.splice(0);
        res.result.forEach(el => {
          dropdownList.push(el[key]);
        });
      });
    },
    // 获取详情并在placeholder上显示
    getDetailfun(id) {
      const rowKey = { rid: id.split("@")[0] };
      show(rowKey)
        .then(res => {
          if (res.code != 0) {
            this.$notification.open({
              message: "Error",
              description: res.msg,
              duration: 6,
              style: { background: "#F5222D" }
            });
            this.$store.dispatch('ToggleCloseTab', '');
            setTimeout(() => {
              this.$store.dispatch("ToggleCloseTab", this.$route.path);
              this.$router.replace(`/countryAdjust/countryAdjust_list`);
            }, 500);
            return;
          }
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
              editDisabled: babelList[i].editDisabled,
              inputType: babelList[i].inputType
            });
          }
          getDropDownList({
            moduleName: "getMonthListByCycle",
            cycle: "CURRENT"
          }).then(res => {
            let temp = res.result[0];
            for (let key in temp) {
              this.detailList.forEach(el => {
                if (
                  el["decorator"] &&
                  el["decorator"].toUpperCase() === key.toUpperCase()
                ) {
                  el["label"] = temp[key];
                }
              });
            }
          });
          // this.$emit('ok', values)
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
