<template>
  <a-form @submit="handleSubmit" :form="form" class="form">
    <a-row class="form-row" :gutter="48">
      <a-col :lg="8" :md="12" :sm="24" v-for="(item,index) in detailList" :key="index">
        <a-form-item :label="item.label">
          <a-input
            :placeholder="item.placeHolder"
            v-if="item.inputType=='input'"
            :disabled="item.editDisabled"
            v-decorator="[item.decorator, {initialValue:item.text, rules: [{required: item.required, message: item.message }]}]"
          />
          <a-select
                :getPopupContainer="getPopupContainer"          v-if="item.inputType=='dropDown'"
            :placeholder="item.placeHolder"
            :allowClear="item.allowClear"
            v-decorator="[item.decorator, {initialValue:item.text, rules: [{required: item.required, message: item.message }]}]"
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
    </a-row>
  </a-form>
</template>

<script>
    import Vue from "vue";
    import langZh from "../../locales/zh-CN/optionPCMapping_lang.js";
    import langEn from "../../locales/en-US/optionPCMapping_lang.js";
    import {show} from "@api/optionPCMapping_api";

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
    this.editSelectKey = Vue.ls.get("optionPCMapping_editSelectKey");
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
        if (route.name === "optionPCMapping_edit") {
          this.editSelectKey = Vue.ls.get("optionPCMapping_editSelectKey");
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
    // 获取详情并在placeholder上显示
    getDetailfun(value) {
      const rid = value;
      const values = { rid };
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
              this.$router.replace(`/optionPCMapping/optionPCMapping_list`);
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
              inputType: babelList[i].inputType,
              dropDownList: []
            });
          }
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
