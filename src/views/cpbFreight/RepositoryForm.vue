<template>
  <a-form @submit="handleSubmit" :form="form" class="form">
    <p :style="{'font-weight': 'bold'}">Product Group: {{productGroup}}</p>
    <a-alert :style="{'margin-top': '5px', 'font-weight': 'bold'}" message="Outbound Freight:"></a-alert>
    <div class="container">
      <span v-for="(item,index) in detailListOutBound" :key="index" class="item">
        <span v-if="item.inputType=='text'" class="item">{{ item.text }}</span>
        <a-form-item>
          <a-input
            v-if="item.inputType=='input'"
            type="number"
            v-decorator="[item.decorator, {initialValue: item.text}]"
            :disabled="item.editDisabled"
          />
        </a-form-item>
      </span>
    </div>
    <a-alert :style="{'margin-top': '5px', 'font-weight': 'bold'}" message="Domestic Freight:"></a-alert>
    <div class="container">
      <span v-for="(item,index) in detailListDomestic" :key="index" class="item">
        <span v-if="item.inputType=='text'" class="item">{{ item.text }}</span>
        <a-form-item>
          <a-input
            v-if="item.inputType=='input'"
            type="number"
            v-decorator="[item.decorator, {initialValue: item.text}]"
            :disabled="item.editDisabled"
          />
        </a-form-item>
      </span>
    </div>
    <a-alert :style="{'margin-top': '5px', 'font-weight': 'bold'}" message="GL Percentage:"></a-alert>
    <div class="PercentageContainer">
      <span v-for="(item,index) in glPercentage" :key="index" class="percentageItem">
        <span v-if="item.inputType=='text'" class="spanItem">{{ item.text }}</span>
        <a-form-item>
          <a-input
            class="inputItem"
            v-if="item.inputType=='input'"
            type="number"
            v-decorator="[item.decorator, {initialValue: item.text}]"
            :disabled="item.editDisabled"
          />
          <span v-if="item.inputType=='input'" class="symbol">%</span>
        </a-form-item>
      </span>
    </div>
  </a-form>
</template>

<script>
import Vue from "vue";
import langZh from "../../locales/zh-CN/cpbFreight_lang.js";
import langEn from "../../locales/en-US/cpbFreight_lang.js";
import { getDropDownList, show } from "@api/cpbFreight_api";

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
      productGroup: Vue.ls.get("PRODUCTGROUP"),
      funSwitch: false, // 首次不执行
      editSelectKey: "",
      babelList: [], // 从lang包获取的要展示的字段
      detailListOutBound: langEn.editOutbound_langEn, // 列表详情数据
      detailListDomestic: langEn.editDomestic_langEn,
      glPercentage: langEn.GlPercentage_langEn,
      form: this.$form.createForm(this)
    };
  },
  created() {
    this.changeLanguage();
    this.editSelectKey = Vue.ls.get("cpbFreight_editSelectKey");
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
        if (route.name === "cpbFreight_edit") {
          this.editSelectKey = Vue.ls.get("cpbFreight_editSelectKey");
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
      show(this.$route.query)
        .then(res => {
          if (res.code != 0) {
            this.$message.error(res.msg, 6);
            setTimeout(() => {
              this.$store.dispatch("ToggleCloseTab", this.$route.path);
              this.$router.replace(`/cpbFreight/cpbFreight_list`);
            }, 500);
            return;
          }
          this.form.resetFields();
          for (let i = 0; i < this.detailListOutBound.length; i++) {
            if (this.detailListOutBound[i].decorator.indexOf("M") != -1) {
              this.detailListOutBound[i].text = "";
            }
          }
          for (let i = 0; i < this.detailListDomestic.length; i++) {
            if (this.detailListDomestic[i].decorator.indexOf("M") != -1) {
              this.detailListDomestic[i].text = "";
            }
          }
          for (let i = 0; i < this.glPercentage.length; i++) {
            if (this.glPercentage[i].decorator.indexOf("Percentage") != -1) {
              this.glPercentage[i].text = "";
            }
          }
          for (let j = 0; j < this.detailListOutBound.length; j++) {
            for (let i = 0; i < res.result.length; i++) {
              if (
                this.detailListOutBound[j].decorator.indexOf("M") != -1 &&
                this.detailListOutBound[j].decorator
                  .toUpperCase()
                  .split("OUTBOUND")[0] ==
                  res.result[i].freightType.toUpperCase()
              ) {
                let m = this.detailListOutBound[j].decorator
                  .toUpperCase()
                  .split("OUTBOUND")[1];
                this.detailListOutBound[j].text =
                  res.result[i]["outbound" + m] + "";
              }
            }
          }
          for (let j = 0; j < this.detailListDomestic.length; j++) {
            for (let i = 0; i < res.result.length; i++) {
              if (
                this.detailListDomestic[j].decorator.indexOf("M") != -1 &&
                this.detailListDomestic[j].decorator
                  .toUpperCase()
                  .split("DOMESTIC")[0] ==
                  res.result[i].freightType.toUpperCase()
              ) {
                let m = this.detailListDomestic[j].decorator
                  .toUpperCase()
                  .split("DOMESTIC")[1];
                this.detailListDomestic[j].text =
                  res.result[i]["domestic" + m] + "";
              }
            }
          }
          for (let j = 0; j < this.glPercentage.length; j++) {
            for (let i = 0; i < res.result.length; i++) {
              if (
                this.glPercentage[j].decorator.indexOf("Percentage") != -1 &&
                this.glPercentage[j].decorator
                  .split("Percentage")[1]
                  .toUpperCase() == res.result[i].freightType.toUpperCase()
              ) {
                this.glPercentage[j].text = res.result[i].glPercentage + "";
              }
            }
          }
        })
        .catch(er => {
          this.$message.error(er.msg);
          console.log(er);
        });
    },
    // 更改列表国际化
    changeLanguage() {
      console.log(this.language);
      // eslint-disable-next-line
      if (this.language == "zh-CN") {
        this.detailListOutBound = langZh.editOutbound_langZh;
        this.detailListDomestic = langZh.editDomestic_langZh;
        this.glPercentage = langZh.GlPercentage_langZh;
        // eslint-disable-next-line
      } else if (this.language == "en-US") {
        this.detailListOutBound = langEn.editOutbound_langEn;
        this.detailListDomestic = langEn.editDomestic_langEn;
        this.glPercentage = langEn.GlPercentage_langEn;
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
<style>
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-between;
  background: #ffffff !important;
}
.item {
  width: 7.2%;
  padding-top: 5px;
}
.PercentageContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: space-between;
}
.percentageItem {
  position: static;
  padding-top: 5px;
  padding-right: 15px;
}
.inputItem {
  margin-top: 1px;
  width: 90%;
}
.spanItem {
  position: relative;
  width: 8%;
  top: 3px;
  height: 70%;
}
.symbol {
  padding-left: 3px;
}
.container .item .ant-form-item {
  margin-bottom: 0px !important;
}
</style>

