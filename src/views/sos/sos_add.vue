<template>
  <div>
    <a-card
      class="card"
      :title="$t('lang.addCommonTitle')"
      :bordered="false"
      style="margin-bottom:0"
    >
      <task-form ref="task" :showSubmit="false"/>
    </a-card>
    <footer-tool-bar
      :style="{
        width:
          isSideMenu() && isDesktop()
            ? `calc(100% - ${sidebarOpened ? 256 : 80}px)`
            : '100%'
      }"
    >
      <a-button type="primary" @click="validate" :loading="loading">
        {{
        $t("lang.addCommonSubmit")
        }}
      </a-button>
    </footer-tool-bar>
  </div>
</template>

<script>
    import {add} from "@api/sos_api";
    import TaskForm from "./TaskForm";
    import FooterToolBar from "@/components/FooterToolbar";
    import {mixin, mixinDevice} from "@/utils/mixin";

    export default {
  name: "AdvancedForm",
  mixins: [mixin, mixinDevice],
  components: {
    FooterToolBar,
    TaskForm
  },
  data() {
    return {
      description: "添加信息",
      loading: false,
      memberLoading: false,
      errors: []
    };
  },
    methods: {
    getPopupContainer(trigger) {
      return trigger.parentElement;
    },
    handleSubmit(e) {
      e.preventDefault();
    },
    // 最终全页面提交
    validate() {
      const {
        $refs: { task }
      } = this;
      const taskForm = new Promise((resolve, reject) => {
        task.form.validateFields((err, values) => {
          if (err) {
            reject(err);
            return;
          }
          // if (!Number.isInteger(values[0].priority*1) || parseInt(values[0].priority*1) < 0){
          //     this.$message.error("Priority should be a positive integer!")
          //     return;
          // }
          if (!values.machineType) values.machineType = "ALL";
          if (!values.subgeo) values.subgeo = "ALL";
          console.log(values);
          resolve(values);
        });
      });
      this.errors = [];
      Promise.all([taskForm]).then(values => {
        add(values[0])
          .then(res => {
            if (res.code == 0) {
               this.$notification.open({
                message: "Success",
                description: this.$t("lang.messageAddSuccess"),
                duration: 6,
                style: {'background': '#52C41A'}
              });
              this.$store.dispatch('ToggleCloseTab', '');
              setTimeout(() => {
                this.$store.dispatch('ToggleCloseTab', this.$route.path);
                this.$router.replace(`/sos/sos_list`);
              }, 500);
            } else {
              this.$notification.open({
                message: "Error",
                description: res.msg,
                duration: 6,
                style: {'background': '#F5222D'}
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
