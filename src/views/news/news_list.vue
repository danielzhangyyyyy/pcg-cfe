<template>
  <a-card class="content">
    <editor id="tinymce" v-if="showEditor" v-model="placeHolder" :init="init"></editor>
    <div class="informEdit-btns">
      <a-button type="primary" class="infbtns" :loading="submitLoading" @click="submit">submit</a-button>
      <a-button type="primary" class="infbtns" @click="previewOnClick">Preview</a-button>
    </div>
    <news
      ref="news"
      :content="content"
      :visible="visible"
      src="preview"
      @handleVisible="handleNewsVisible"
    ></news>
  </a-card>
</template>
<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver/theme";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/table";
import "tinymce/plugins/textcolor";
import Vue from "vue";
import { news } from "@/components";
import { getNews, updateNews, hidenNews } from "@api/news_api";

export default {
  name: "TableList",
  components: {
    Editor,
    news
  },
  data() {
    return {
      showEditor: true,
      submitLoading: false,
      visible: false,
      placeHolder: "please input text",
      content: "",
      init: {
        height: 300,
        skin_url:
          process.env.NODE_ENV == "production" ||
          process.env.NODE_ENV == "development"
            ? "/pcg/tinymce/skins/ui/oxide"
            : "/tinymce/skins/ui/oxide",
        plugins: "link table textcolor",
        toolbar:
          "undo redo | formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | outdent indent | link table textcolor | removeformat",
        contextmenu: "link | table | spellchecker",
        branding: false
        //menubar: true
      }
    };
  },
  created() {},
  mounted() {
    tinymce.init({}).then(r => {
      getNews({ readMark: 1 }).then(res => {
        if (res.result) {
          tinymce.activeEditor.setContent(res.result.msgContent);
        }
      });
    });
  },
  watch: {
    $route: {
      handler(route) {
        console.log(route.path);
        if (route.path === "/news/news_list") {
          this.showEditor = false;
          setTimeout(() => {
            this.showEditor = true;
            tinymce.init({}).then(r => {
              getNews({ readMark: 1 }).then(res => {
                if (res.result) {
                  tinymce.activeEditor.setContent(res.result.msgContent);
                }
              });
            });
          }, 500);
        }
      },
      deep: true
    }
  },
  methods: {
    previewOnClick() {
      this.content = tinymce.activeEditor.getContent();
      this.visible = true;
    },
    submit() {
      this.submitLoading = true;
      updateNews({
        msgType: "news",
        msgContent: tinymce.activeEditor.getContent(),
        readMark: 0
      }).then(res => {
        this.submitLoading = false;
        if (res.code == "0") {
          this.$notification.open({
            message: "Success",
            description: "All users will be notified with the news.",
            duration: 6,
            style: { background: "#52C41A" }
          });
        } else {
          this.$notification.open({
            message: "Error",
            description: "Submit failed, please try again later.",
            duration: 6,
            style: { background: "#F5222D" }
          });
        }
      });
    },
    handleNewsVisible(val) {
      this.visible = val;
    }
  }
};
</script>
<style>
.informEdit-btns {
  margin-top: 5px;
  display: flex;
  flex-direction: row-reverse;
}
.informEdit-btns > .infbtns {
  margin-left: 5px;
}
</style>
