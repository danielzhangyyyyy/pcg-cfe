<template>
  <div class="browserWarning">
    <a-alert
      v-if="IEWarning"
      message="We highly recommend you to use Chrome browser. "
      banner
      closable
      :afterClose="handleClose"
    />
  </div>
</template>

<script>
export default {
  name: "browserDetecter",
  data() {
    return {
      IEWarning: false
    };
  },
  created() {
    if (this.detector() != "Chrome") {
      this.IEWarning = true;
    }
  },
  methods: {
    handleClose() {
      this.IEWarning = false;
    },
    detector() {
      let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
      console.log(userAgent, "agenttttttttt");
      if (userAgent.indexOf("Opera") > -1) {
        return "Opera";
      } //判断是否Opera浏览器
      if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
      } //判断是否Firefox浏览器
      if (userAgent.indexOf("Edge") > -1) {
        return "Edge";
      }
      if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
      }
      if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
      } //判断是否Safari浏览器
      if (!!window.ActiveXObject || "ActiveXObject" in window) {
        return "IE";
      } //判断是否IE浏览器
    }
  }
};
</script>
<style scoped>
.browserWarning {
  position: absolute;
  left: 40%;
  top: 20px;
}
</style>