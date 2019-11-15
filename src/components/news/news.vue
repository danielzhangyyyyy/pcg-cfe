<template>
  <a-modal :visible="show" @cancel="handleCancel">
    <p v-html="content">{{content}}</p>
    <template slot="footer">
      <a class="noMoreHint" @click="doNotOnClick">{{hint}}</a>
    </template>
  </a-modal>
</template>

<script>
import { hidenNews } from "@api/news_api";
export default {
  name: "news",
  data() {
    return {
      hint: "Do not hint again",
      show: this.visible
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: ""
    },
    src: {
      type: String,
      default: "others"
    },
    rid: {
      type: String,
      default: ""
    }
  },
  watch: {
    visible(val) {
      this.show = val;
    },
    show(val) {
      this.$emit("handleVisible", val);
    }
  },
  created() {},
  methods: {
    handleCancel() {
      this.show = false;
    },
    doNotOnClick() {
      if (this.src == "preview") return false;
      hidenNews({ rid: this.rid }).then(res => {
        this.hint = "This won't be poped up before message refreshed";
      });
    }
  }
};
</script>

<style lang="less">
.noMoreHint:visited {
  color: #9f5fc5;
}
</style>
