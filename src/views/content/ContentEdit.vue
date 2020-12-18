<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>文章管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加文章</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form label-width="120px" @submit.native.prevent="save" height="900px" style="margin-top:15px">
        <el-form-item label="标题图">
        <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <vue-editor v-model="model.content" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
      <!-- 回到顶部 -->
        <el-backtop :bottom="100" :visibility-height="100"></el-backtop>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  props: {
    id: {},
  },
  components: {
    VueEditor,
  },
  data() {
    return {
      model: {
        avatar: "",
        titlr:"",
        content:""
      },
    };
  },
  created() {
  },
  methods: {
    //   上传文章
    async save(){
        const {data:res} = await this.$http.post('/upload/content',this.model)
        if(res.status != 201){
            return this.$message.error(res.message)
        }
        this.$message.success(res.message)
    },
          // 富文本编译器上传图片
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("upload", formData);
      console.log(res);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    afterUpload(res) {
      this.model.avatar = res;
      console.log(res);
      console.log(this.model);
    },
  },
};
</script>

<style lang="less" scope>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 120px;
    line-height: 120px;
    display: block;
  }
</style>