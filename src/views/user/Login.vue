<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <a-tab-pane key="tab1" tab>
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="CFE account"
              v-decorator="[
                'username',
                {rules: [{ required: true, message: 'Please enter your CFE account(admin)' }], validateTrigger: 'change'}
              ]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
              size="large"
              type="password"
              autocomplete="false"
              placeholder="AD password"
              v-decorator="[
                'password',
                {rules: [{ required: true, message: 'Please enter your password(admin)' }], validateTrigger: 'blur'}
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
        </a-tab-pane>
      </a-tabs>
      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >Login</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions } from "vuex";
import { timeFix } from "@/utils/util";
import { login, getMenu } from "@/api/loginApi";
import {
  generatorDynamicRouter,
  constructRouter,
  constantRouterMap
} from "@/config/router.config";

export default {
  data() {
    return {
      customActiveKey: "tab1",
      loginBtn: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        smsSendBtn: false
      }
    };
  },
  methods: {
    ...mapActions(["Login"]),
    handleTabClick(key) {
      this.customActiveKey = key;
    },
    handleSubmit(e) {
      // 登录
      e.preventDefault();
      const {
        form: { validateFields },
        state,
        Login
      } = this;
      state.loginBtn = true;
      validateFields(
        ["username", "password"],
        { force: true },
        (err, values) => {
          if (!err) {
            Login(values)
              .then(res => this.loginSuccess(res))
              .catch(err => this.requestFailed(err))
              .finally(() => {
                state.loginBtn = false;
              });
          } else {
            setTimeout(() => {
              state.loginBtn = false;
            }, 500);
          }
        }
      );
    },
    async loginSuccess(res) {
      if (res.code == 0) {
        const resr = res.result;
        const itcode = resr.itcode;
        const loginName = resr.loginName;
        const productGroup = res.result.productGroup;
        this.$store.dispatch("setProdcutGroup", { productGroup });
        Vue.ls.set("PRODUCTGROUP", productGroup);
        this.$store.dispatch("GetUserInfo", { loginName, itcode });
        Vue.ls.set("LOGINNAME", loginName);
        Vue.ls.set("USER_ITCODE", resr.itcode); // OK
        try {
          let dynamicRoute = await generatorDynamicRouter({
            "pcgcfe-java-token": resr.token
          });
          let isSaved = await this.$store.dispatch(
            "SaveMenu",
            dynamicRoute.result
          );
          this.$router.addRoutes(
            constantRouterMap.concat(constructRouter(dynamicRoute.result)),
            { replace: true }
          );
          this.getMenuSuccess(dynamicRoute);
        } catch (err) {
          this.requestFailed(err);
        }
      } else {
        this.requestFailed(res.msg);
      }
    },
    getMenuSuccess(res) {
      if (res.code == 0) {
        this.$router.push("/tapePublishSchedule/tapePublishSchedule_list");
        setTimeout(() => {
          this.$notification.open({
            message: timeFix(),
            description: "Welcome back",
            duration: 6,
            style: { background: "#52C41A" }
          });
        }, 1000);
      } else {
        this.requestFailed(res.msg);
      }
    },
    requestFailed(err) {
      console.log(err);
      this.$notification.open({
        message: "error",
        description:
          err || "An error occurred in the request, please try again later",
        duration: 4,
        style: { background: "#F5222D" } //red
      });
    }
  }
};
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
