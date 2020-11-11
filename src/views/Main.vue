<template>
  <div>
    <el-container style="height: 100vh">
      <el-header style="font-size: 12px; display: inline-block; float: left">
        <div
          style="
            width: 400px;
            height: 60px;
            display: flex;
            float: left;
          "
        >
          <div>
            <img src="../assets/logo.png" style="width: 60px; height: 60px" />
          </div>
          <div>
            <h1 style="display: block; margin-left: 15px; color: white">
              安阳工学院现教中心信息服务平台
            </h1>
          </div>
        </div>
        <div style="display: block; float: right; margin-right: 20px">
          <el-button type="danger" @click="logout">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside
          :width="isCollapse ? '64px' : '200px'"
          style="background-color: rgb(238, 241, 246)"
        >
          <!-- 侧边栏的折叠和展开 -->
          <div class="toggle-button" @click="toggleCollapse">
            <i :class="arrows2" ref="caret"></i>
          </div>
          <el-menu
            router
            :default-openeds="['1']"
            :collapse="isCollapse"
            unique-opened
            :default-active="$route.path"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user" style="padding-right: 20px"></i>学生管理
              </template>
              <el-menu-item-group>
                <template slot="title">学生信息</template>
                <el-menu-item index="/student/s_message" @click="restart">
                  <i
                    class="iconfont iconjibenxinxi"
                    style="padding-right: 5px"
                  ></i
                  >基本信息
                </el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <template slot="title">学生服务</template>
                <el-menu-item index="/student/s_password" @click="restart">
                  <i
                    class="iconfont iconmimaxiugai"
                    style="padding-right: 5px"
                  ></i>
                  密码修改</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-custom" style="padding-right: 20px"></i
                >教师管理
              </template>
              <el-menu-item-group>
                <template slot="title">教师信息</template>
                <el-menu-item index="/teacher/t_basic" @click="restart">
                  <i
                    class="iconfont iconjibenxinxi"
                    style="padding-right: 5px"
                  ></i
                  >基本信息</el-menu-item>
                <el-menu-item index="/teacher/t_new" @click="restart">
                  <i
                    class="iconfont iconjibenxinxi"
                    style="padding-right: 5px"
                  ></i
                  >新进教师</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <template slot="title">教师服务</template>
                <el-menu-item index="/teacher/t_password" @click="restart">
                  <i
                    class="iconfont iconmimaxiugai"
                    style="padding-right: 5px"
                  ></i>
                  密码修改</el-menu-item
                >
                <el-menu-item index="/teacher/t_software" @click="restart">
                  <i
                    class="iconfont iconruanjianzhengbanhua"
                    style="padding-right: 5px"
                  ></i
                  >正版化</el-menu-item
                >
                <el-menu-item index="/teacher/t_virtual" @click="restart">
                  <i class="iconfont iconfuwuqi" style="padding-right: 5px"></i
                  >虚拟服务器</el-menu-item
                >
                <el-menu-item index="/teacher/t_host" @click="restart">
                  <i class="iconfont iconfuwuqi1" style="padding-right: 5px"></i
                  >托管服务</el-menu-item
                >
                <el-menu-item index="/teacher/t_port" @click="restart">
                  <i class="iconfont iconduankou" style="padding-right: 5px"></i
                  >端口开通</el-menu-item
                >
                <el-menu-item index="/teacher/t_fault" @click="restart">
                  <i class="iconfont iconguzhang" style="padding-right: 5px"></i
                  >网络故障</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-edit-outline" style="padding-right: 20px"></i
                >意见反馈
              </template>
              <el-menu-item-group>
                <template slot="title">意见反馈</template>
                <el-menu-item index="/feedback" @click="restart">
                  <i class="el-icon-edit-outline" style="padding-right: 5px"></i
                  >意见反馈
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view :key="$route.path"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //   控制侧边栏的展开与收缩
      isCollapse: false,
      //   控制侧边栏展开与收缩的箭头
      arrows1: -1,
      arrows2: "el-icon-caret-left",
    };
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    //   控制侧边栏的展开与收缩
    toggleCollapse() {
      this.arrows1 = -this.arrows1;
      if (this.arrows1 > 0) {
        this.arrows2 = "el-icon-caret-right";
      } else {
        this.arrows2 = "el-icon-caret-left";
      }
      this.isCollapse = !this.isCollapse;
    },
    restart() {
      this.$router.go(0);
    },
  },
};
</script>

<style lang="less" scope>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.toggle-button {
  background-color: #eef1f6;
  font-size: 20px;
  line-height: 24px;
  color: #b3c0d1;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>

