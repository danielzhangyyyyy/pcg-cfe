<template>
  <div class="table-page-search-wrapper">
    <a-form layout="inline" :form="form" :selfUpdate="selfUpdate">
      <a-row :gutter="48">
        <a-col :md="8" :sm="24" v-for="item in filterList.slice(0,2)" :key="item.index">
          <a-form-item :label="item.label">
            <a-input
              :placeholder="item.placeHolder"
              v-if="item.inputType=='input'"
              :disabled="item.editDisabled"
              @change="inputChange($event,item.decorator)"
              v-decorator="[item.decorator, {initialValue: item.text,rules: [{required: item.required, message: item.message }]}]"
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
              v-decorator="[item.decorator,{rules: [{required: item.required, message: item.message }]}]"
            />
          </a-form-item>
        </a-col>

        <template v-if="advanced">
          <a-col :md="8" :sm="24" v-for="item in filterList.slice(2, 11)" :key="item.index">
            <a-form-item :label="item.label">
              <a-input
                :placeholder="item.placeHolder"
                v-if="item.inputType=='input'"
                :disabled="item.editDisabled"
                @change="inputChange($event, item.decorator)"
                v-decorator="[item.decorator, {initialValue: item.text,rules: [{required: item.required, message: item.message }]}]"
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
                @change="dateChange($event, item.decorator)"
                v-decorator="[item.decorator,{rules: [{required: item.required, message: item.message }]}]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="16" v-for="item in filterList.slice(11)" :key="item.index">
            <a-form-item :label="item.label">
              <a-input
                :disabled="item.editDisabled"
                :placeholder="item.placeHolder"
                :allowClear="item.allowClear"
                @change="inputChange($event, item.decorator)"
                v-decorator="[item.decorator,{rules: [{required: item.required, message: item.message }]}]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8" class="message">
            <span>eg:73040611;73040612;73040613</span>
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
              @click="() => {form.resetFields();setRequiredDefault();}"
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
</template>

<script>
export default {
  name: "costTapeUploadForm",
  data() {
    return {
      form: this.$form.createForm(this),
      selfUpdate: true
    };
  },
  props: ["filterList", "advanced", "searchLoading"],
  created() {},
  watch: {},
  methods: {
    searchOnClick() {
      this.$emit("searchOnClick");
    },
    handleDropDownChange(e, d) {
      this.$emit("handleDropDownChange", e, d);
    },
    dateChange(e, d) {
      this.$emit("dateChange", e, d);
    },
    inputChange(e, d) {
      //this.$emit("inputChange", e, d);
    },
    toggleAdvanced() {
      this.$emit("toggleAdvanced");
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
    setRequiredDefault() {
      this.$emit("setRequiredDefault");
    }
  }
};
</script>