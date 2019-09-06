<template>
  <div>
    <a-card
      class="card"
      :title="$t('lang.editCommonTitle')"
      :bordered="false"
      style="margin-bottom:0"
    >
      <repository-form ref="repository" :showSubmit="false" />
    </a-card>
    <footer-tool-bar
      :style="{ width: isSideMenu() && isDesktop() ? `calc(100% - ${sidebarOpened ? 256 : 80}px)` : '100%'}"
    >
      <a-button
        type="primary"
        @click="validate"
        :loading="loading"
      >{{ $t('lang.editCommonSubmit') }}</a-button>
    </footer-tool-bar>
  </div>
</template>

<script>
    import Vue from "vue";
    import {update} from "@api/cpbFreight_api";
    import RepositoryForm from "./RepositoryForm";
    import FooterToolBar from "@/components/FooterToolbar";
    import {mixin, mixinDevice} from "@/utils/mixin";

    export default {
  name: "AdvancedForm",
  mixins: [mixin, mixinDevice],
  components: {
    FooterToolBar,
    RepositoryForm
  },
  data() {
    return {
      description: "添加信息",
      loading: false,
      memberLoading: false,
      errors: []
    };
  },
  created() {
    this.editSelectKey = Vue.ls.get("cpbFreight_editSelectKey");
    console.log(this.editSelectKey);
  },
  watch: {
    $route: {
      handler(route) {
        console.log(route.name);
        // eslint-disable-next-line eqeqeq
        if (route.name === "cpbFreight_edit") {
          this.editSelectKey = Vue.ls.get("cpbFreight_editSelectKey");
          console.log(this.editSelectKey);
          // this.getDetailfun(this.editSelectKey)
        }
      },
      deep: true
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
    },
    percentageValidate(percentageObject) {
      return new Promise((resolve, reject) => {
        let total = 0;
        for (let key in percentageObject) {
          total += Number(percentageObject[key]);
        }
        if (total != 100) {
          reject({
            msg:
              "The total of 'GL_Percentage' is 100, please fill in the correct 'GL_Percentage' before proceeding!"
          });
        } else {
          resolve({});
        }
      });
    },
    rowValidate(arrOut, arrDomestic, percentage, type) {
      const res = { ...this.$route.query, freightType: type };
      if (percentage != "") {
        res.glPercentage = percentage;
      }
      return new Promise((resolve, reject) => {
        let tempOut = arrOut.filter(
          el => el != "" && el != undefined && el != "undefined"
        );
        let tempIn = arrDomestic.filter(
          el => el != "" && el != undefined && el != "undefined"
        );
        if (tempIn.length == 0) {
          if (tempOut.length == 0) {
            if (percentage == "" || percentage == undefined) {
              resolve(res);
            } else {
              reject({
                msg: `Please fill all costs of '${type}' before save, including 'Domestic', 'Outbound' & corresponding 'GL_Percentage'.`
              });
            }
          } else {
            reject({
              msg: `Please fill all costs of '${type}' before save, including 'Domestic', 'Outbound' & corresponding 'GL_Percentage'.`
            });
          }
        } else if (tempIn.length == 12) {
          if (tempOut.length == 12) {
            if (percentage == "" || percentage == undefined) {
              reject({
                msg: `Please fill all costs of '${type}' before save, including 'Domestic', 'Outbound' & corresponding 'GL_Percentage'.`
              });
            } else {
              resolve(res);
            }
          } else {
            reject({
              msg: `Please fill all costs of '${type}' before save, including 'Domestic', 'Outbound' & corresponding 'GL_Percentage'.`
            });
          }
        }
      });
    },
    // 最终全页面提交
    validate() {
      const {
        $refs: { repository }
      } = this;
      const repositoryForm = new Promise((resolve, reject) => {
        repository.form.validateFields((err, values) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(values);
        });
      });
      this.errors = [];
      Promise.all([repositoryForm]).then(values => {
        let AirOut = [];
        let OceanOut = [];
        let RailOut = [];
        let TruckOut = [];
        let AirDomestic = [];
        let OceanDomestic = [];
        let RailDomestic = [];
        let TruckDomestic = [];
        let glPercentage = {};
        for (let key in values[0]) {
          if (key.indexOf("airOutboundM") != -1) {
            AirOut.push(values[0][key]);
          } else if (key.indexOf("oceanOutboundM") != -1) {
            OceanOut.push(values[0][key]);
          } else if (key.indexOf("railOutboundM") != -1) {
            RailOut.push(values[0][key]);
          } else if (key.indexOf("truckOutboundM") != -1) {
            TruckOut.push(values[0][key]);
          } else if (key.indexOf("airDomesticM") != -1) {
            AirDomestic.push(values[0][key]);
          } else if (key.indexOf("oceanDomesticM") != -1) {
            OceanDomestic.push(values[0][key]);
          } else if (key.indexOf("railDomesticM") != -1) {
            RailDomestic.push(values[0][key]);
          } else if (key.indexOf("truckDomesticM") != -1) {
            TruckDomestic.push(values[0][key]);
          } else if (key.indexOf("glPercentage") != -1) {
            if (key == "glPercentageAir") {
              glPercentage.air = values[0][key];
            } else if (key == "glPercentageOcean") {
              glPercentage.ocean = values[0][key];
            } else if (key == "glPercentageRail") {
              glPercentage.rail = values[0][key];
            } else if (key == "glPercentageTruck") {
              glPercentage.truck = values[0][key];
            }
          }
        }
        Promise.all([
          this.rowValidate(AirOut, AirDomestic, glPercentage.air, "AIR"),
          this.rowValidate(
            OceanOut,
            OceanDomestic,
            glPercentage.ocean,
            "OCEAN"
          ),
          this.rowValidate(RailOut, RailDomestic, glPercentage.rail, "RAIL"),
          this.rowValidate(
            TruckOut,
            TruckDomestic,
            glPercentage.truck,
            "TRUCK"
          ),
          this.percentageValidate(glPercentage)
        ])
          .then(res => {
            let updateParams = [];
            const indexs = [
              "M1",
              "M2",
              "M3",
              "M4",
              "M5",
              "M6",
              "M7",
              "M8",
              "M9",
              "M10",
              "M11",
              "M12"
            ];
            for (let item of res) {
              let temp = { ...item };
              if (item.glPercentage) {
                for (let el of indexs) {
                  values[0][item.freightType.toLowerCase() + "Domestic" + el] !=
                  ""
                    ? (temp["domestic" + el] =
                        values[0][
                          item.freightType.toLowerCase() + "Domestic" + el
                        ])
                    : "";
                  values[0][item.freightType.toLowerCase() + "Outbound" + el] !=
                  ""
                    ? (temp["outbound" + el] =
                        values[0][
                          item.freightType.toLowerCase() + "Outbound" + el
                        ])
                    : "";
                }
              }
              updateParams.push(temp);
            }
            update(updateParams)
              .then(res => {
                if (res.code == 0) {
                  this.$notification.open({
                    message: "Success",
                    description: this.$t("lang.messageEditSuccess"),
                    duration: 6,
                    style: { background: "#52C41A" }
                  });
                  this.$store.dispatch("ToggleCloseTab", "");
                  setTimeout(() => {
                    this.$store.dispatch("ToggleCloseTab", this.$route.path);
                    this.$router.replace(`/cpbFreight/cpbFreight_list`);
                  }, 500);
                } else {
                  this.$notification.open({
                    message: "Error",
                    description: res.msg,
                    duration: 6,
                    style: { background: "#F5222D" }
                  });
                }
              })
              .catch(er => {
                this.$notification.open({
                  message: "Error",
                  description: er.msg,
                  duration: 6,
                  style: { background: "#F5222D" }
                });
              });
          })
          .catch(err => {
            console.log(err, "ertytre");
            this.$notification.open({
              message: "Error",
              description: err.msg,
              duration: 6,
              style: { background: "#F5222D" } //red
            });
          });
      });
    },
    scrollToField(fieldKey) {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    }
  }
};
</script>
