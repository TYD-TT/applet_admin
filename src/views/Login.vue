<template>
  <div class="login-container" :style="WidthHeight">
    <img src="../assets/login.png" :style="WidthHeight" class="login-img" />
    <div class="login">
      <img src="../assets/login-left.jpg" style="width: 50%; height: 100%" />
      <el-card header="请先登录" class="login-card">
        <el-form @submit.native.prevent="login">
          <el-form-item>
            <el-input
              v-model="model.name"
              prefix-icon="el-icon-s-custom"
              placeholder="请输入账号"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              type="password"
              v-model="model.password"
              placeholder="请输入密码"
            >
              <i
                slot="prefix"
                class="el-input__icon iconfont iconmimaxiugai"
                style="margin-left: 5px"
              ></i>
            </el-input>
          </el-form-item>
          <div style="display: block;float:left">
            <el-form-item style="display:block;float:left">
              <el-button type="primary" native-type="submit">登录</el-button>
            </el-form-item>
            <el-form-item style="display:block;float:left;margin-left:35px">
              <el-button type="success">注册</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
      WidthHeight: {
        width: "",
        height: "",
      },
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("/admin/login", this.model);
      if (res.data.status == 201) {
        this.$message.success("登录成功");
        this.$router.push("/main");
      } else {
        this.$message.success("登录失败");
      }
    },
    GetWindowInfo() {
      // 获取浏览器高度，减去顶部导航栏的值70（可动态获取）,再减去head-DIV高度值80
      this.WidthHeight.height = window.innerHeight - 5 + "px";
      this.WidthHeight.width = window.innerWidth + "px";
    },
  },
  created() {
    window.addEventListener("resize", this.GetWindowInfo); //注册监听器
    this.GetWindowInfo(); //页面创建时先调用一次
  },
  destroyed() {
    window.removeEventListener("resize", this.GetWindowInfo);
  },
};
</script>

<style lang="less" scoped>
.login-container {
  .login-img {
    position: absolute;
    z-index: -1;
  }
  .login {
    width: 640px;
    height: 307px;
    border: 2px solid white;
    background-color: #fff;
    border-radius: 8px;
    left: 30%;
    top: 25%;
    position: absolute;
    .login-card {
      display: block;
      width: 40%;
      margin: 0 auto;
      float: right;
      position: absolute;
      right: 0px;
      height: 100%;
      z-index: 99;
      top: 0px;
    }
  }
  .el-input__prefix {
    width: 25px;
  }
  .el-button{
    width: 90px;
  }
}
</style>