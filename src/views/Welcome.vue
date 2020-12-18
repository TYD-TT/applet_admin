<template>
  <div>
    <el-tabs type="border-card" class="tabs">
      <el-tab-pane label="学生">
        <div class="student">
          <!-- 左侧申请人信息 -->
          <div class="studentLeft">
            <el-badge :value="student_pwd_sum" class="item">
              <el-button size="middle" style="width: 583px">学生申请</el-button>
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>学生申请修改密码</span>
                </div>

                <el-table
                  :data="stu_tableData"
                  height="420"
                  border
                  stripe
                  style="width: 100%"
                >
                  <el-table-column
                    type="index"
                    label="#"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="name"
                    label="姓名"
                    width="100"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="account"
                    label="学号"
                    width="140"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="creat_time"
                    label="时间"
                    align="center"
                    width="120"
                  >
                  </el-table-column>
                  <el-table-column prop="status" label="状态" align="center">
                    <template slot-scope="scope">
                      <div>
                        <el-button
                          type="success"
                          size="mini"
                          @click="aa(scope)"
                          :disabled="scope.row.status != -1"
                          >{{
                            scope.row.status == -1
                              ? "审核"
                              : scope.row.status == 0
                              ? "审核中"
                              : "已完成"
                          }}</el-button
                        >
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-card>
            </el-badge>
          </div>
          <!-- 右侧饼状图和柱状图 -->
          <div class="studentRight">
            <div
              style="
                float: left;
                margin-left: 20px;
                magin-top: 40px;
                font-size: 20px;
                font-weight: 600;
                color: #333333;
              "
            >
              每<br />天<br />的<br />申<br />请<br />情<br />况
            </div>
            <div class="studentRight_top">
              <el-tabs type="border-card">
                <el-tab-pane label="解决情况">
                  <div class="question" id="main_top1"></div>
                </el-tab-pane>
                <el-tab-pane label="运行商">
                  <div class="question" id="main_top2"></div>
                </el-tab-pane>
                <!-- <el-tab-pane label="男女比例">
                  <div class="question" id="main_top3"></div>
                </el-tab-pane> -->
              </el-tabs>
            </div>
            <div class="studentRight_buttom" id="main_buttom"></div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="教师">
        <div class="teacher">
          <div class="teaLeft">
            <el-collapse
              v-model="activeName"
              accordion
              style="width: 580px; margin-top: 10px"
            >
              <div @click="changess(0)">
                <el-badge :value="tea_pwdDate_sum" style="width: 580px">
                  <el-collapse-item name="1">
                    <template slot="title">
                      <i
                        class="iconfont iconmimaxiugai"
                        style="margin-right: 10px"
                      ></i
                      >密码修改
                    </template>
                    <div>
                      <el-table
                        :data="tea_pwdDate"
                        height="370"
                        border
                        stripe
                        style="width: 100%"
                      >
                        <el-table-column
                          type="index"
                          label="#"
                          align="center"
                        ></el-table-column>
                        <el-table-column
                          prop="name"
                          label="姓名"
                          width="100"
                          align="center"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="account"
                          label="工号"
                          width="140"
                          align="center"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="creat_time"
                          label="时间"
                          align="center"
                          width="120"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="status"
                          label="状态"
                          align="center"
                        >
                          <template slot-scope="scope">
                            <div>
                              <el-button
                                type="success"
                                size="mini"
                                @click="pwd(scope)"
                                :disabled="scope.row.status != -1"
                                >{{
                                  scope.row.status == -1
                                    ? "审核"
                                    : scope.row.status == 0
                                    ? "审核中"
                                    : "已完成"
                                }}</el-button
                              >
                            </div>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </el-collapse-item>
                </el-badge>
              </div>
              <div @click="changess(1)">
                <el-badge :value="tea_sfwDate_sum" style="width: 580px">
                  <el-collapse-item name="2">
                    <template slot="title">
                      <i
                        class="iconfont iconruanjianzhengbanhua"
                        style="margin-right: 10px"
                      ></i
                      >软件正版化
                    </template>
                    <div>
                      <el-table
                        :data="tea_sfwDate"
                        height="370"
                        border
                        stripe
                        style="width: 100%"
                      >
                        <el-table-column
                          type="index"
                          label="#"
                          align="center"
                        ></el-table-column>
                        <el-table-column
                          prop="name"
                          label="姓名"
                          width="100"
                          align="center"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="account"
                          label="工号"
                          width="140"
                          align="center"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="creat_time"
                          label="时间"
                          align="center"
                          width="120"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="status"
                          label="状态"
                          align="center"
                        >
                          <template slot-scope="scope">
                            <div>
                              <el-button
                                type="success"
                                size="mini"
                                @click="sfw(scope)"
                                :disabled="scope.row.status != -1"
                                >{{
                                  scope.row.status == -1
                                    ? "审核"
                                    : scope.row.status == 0
                                    ? "审核中"
                                    : "已完成"
                                }}</el-button
                              >
                            </div>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </el-collapse-item>
                </el-badge>
              </div>
              <div @click="changess(2)">
                <el-badge :value="tea_virtualDate_sum" style="width: 580px">
                  <el-collapse-item name="3">
                    <template slot="title">
                      <i
                        class="iconfont iconfuwuqi"
                        style="margin-right: 10px"
                      ></i
                      >虚拟服务器
                    </template>
                    <div>
                      <el-table
                        :data="tea_virtualDate"
                        height="370"
                        border
                        stripe
                        style="width: 100%"
                      >
                        <el-table-column
                          type="index"
                          label="#"
                          align="center"
                        ></el-table-column>
                        <el-table-column
                          prop="name"
                          label="姓名"
                          width="100"
                          align="center"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="account"
                          label="工号"
                          width="140"
                          align="center"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="creat_time"
                          label="时间"
                          align="center"
                          width="120"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="status"
                          label="状态"
                          align="center"
                        >
                          <template slot-scope="scope">
                            <div>
                              <el-button
                                type="success"
                                size="mini"
                                @click="virtual(scope)"
                                :disabled="scope.row.status != -1"
                                >{{
                                  scope.row.status == -1
                                    ? "审核"
                                    : scope.row.status == 0
                                    ? "审核中"
                                    : "已完成"
                                }}</el-button
                              >
                            </div>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </el-collapse-item>
                </el-badge>
              </div>
              <div @click="changess(3)">
                <el-badge :value="tea_hostDate_sum" style="width: 580px">
                  <el-collapse-item name="4">
                    <template slot="title">
                      <i
                        class="iconfont iconfuwuqi1"
                        style="margin-right: 10px"
                      ></i
                      >服务器托管
                    </template>
                    <div>
                      <el-table
                        :data="tea_hostDate"
                        height="370"
                        border
                        stripe
                        style="width: 100%"
                      >
                        <el-table-column
                          type="index"
                          label="#"
                          align="center"
                        ></el-table-column>
                        <el-table-column
                          prop="name"
                          label="姓名"
                          width="100"
                          align="center"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="account"
                          label="工号"
                          width="140"
                          align="center"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="creat_time"
                          label="时间"
                          align="center"
                          width="120"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="status"
                          label="状态"
                          align="center"
                        >
                          <template slot-scope="scope">
                            <div>
                              <el-button
                                type="success"
                                size="mini"
                                @click="host(scope)"
                                :disabled="scope.row.status != -1"
                                >{{
                                  scope.row.status == -1
                                    ? "审核"
                                    : scope.row.status == 0
                                    ? "审核中"
                                    : "已完成"
                                }}</el-button
                              >
                            </div>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </el-collapse-item>
                </el-badge>
              </div>
              <div @click="changess(4)">
                <el-badge :value="tea_portDate_sum" style="width: 580px">
                  <el-collapse-item name="5">
                    <template slot="title">
                      <i
                        class="iconfont iconduankou"
                        style="margin-right: 10px"
                      ></i
                      >端口开通
                    </template>
                    <div>
                      <el-table
                        :data="tea_portDate"
                        height="370"
                        border
                        stripe
                        style="width: 100%"
                      >
                        <el-table-column
                          type="index"
                          label="#"
                          align="center"
                        ></el-table-column>
                        <el-table-column
                          prop="name"
                          label="姓名"
                          width="100"
                          align="center"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="account"
                          label="工号"
                          width="140"
                          align="center"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="creat_time"
                          label="时间"
                          align="center"
                          width="120"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="status"
                          label="状态"
                          align="center"
                        >
                          <template slot-scope="scope">
                            <div>
                              <el-button
                                type="success"
                                size="mini"
                                @click="port(scope)"
                                :disabled="scope.row.status != -1"
                                >{{
                                  scope.row.status == -1
                                    ? "审核"
                                    : scope.row.status == 0
                                    ? "审核中"
                                    : "已完成"
                                }}</el-button
                              >
                            </div>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </el-collapse-item>
                </el-badge>
              </div>
              <div @click="changess(5)">
                <el-badge :value="tea_faultDate_sum" style="width: 580px">
                  <el-collapse-item name="6">
                    <template slot="title">
                      <i
                        class="iconfont iconguzhang"
                        style="margin-right: 10px"
                      ></i
                      >网络故障
                    </template>
                    <div>
                      <el-table
                        :data="tea_faultDate"
                        height="370"
                        border
                        stripe
                        style="width: 100%"
                      >
                        <el-table-column
                          type="index"
                          label="#"
                          align="center"
                        ></el-table-column>
                        <el-table-column
                          prop="name"
                          label="姓名"
                          width="100"
                          align="center"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="account"
                          label="工号"
                          width="140"
                          align="center"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="creat_time"
                          label="时间"
                          align="center"
                          width="120"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="status"
                          label="状态"
                          align="center"
                        >
                          <template slot-scope="scope">
                            <div>
                              <el-button
                                type="success"
                                size="mini"
                                @click="fault(scope)"
                                :disabled="scope.row.status != -1"
                                >{{
                                  scope.row.status == -1
                                    ? "审核"
                                    : scope.row.status == 0
                                    ? "审核中"
                                    : "已完成"
                                }}</el-button
                              >
                            </div>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </el-collapse-item>
                </el-badge>
              </div>
            </el-collapse>
          </div>
          <div class="teaRight">
            <div class="bbtn" style="display: block">
              <div class="teaRight_top" id="tea_pwd_top"></div>
              <div class="teaRight_bottom" id="tea_pwd_bottom"></div>
            </div>
            <div class="bbtn">
              <div class="teaRight_top" id="tea_sfw_top"></div>
              <div class="teaRight_bottom" id="tea_sfw_bottom"></div>
            </div>
            <div class="bbtn">
              <div class="teaRight_top" id="tea_virtual_top"></div>
              <div class="teaRight_bottom" id="tea_virtual_bottom"></div>
            </div>
            <div class="bbtn">
              <div class="teaRight_top" id="tea_host_top"></div>
              <div class="teaRight_bottom" id="tea_host_bottom"></div>
            </div>
            <div class="bbtn">
              <div class="teaRight_top" id="tea_port_top"></div>
              <div class="teaRight_bottom" id="tea_port_bottom"></div>
            </div>
            <div class="bbtn">
              <div class="teaRight_top" id="tea_fault_top"></div>
              <div class="teaRight_bottom" id="tea_fault_bottom"></div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 学生修改密码数据
      stu_tableData: [],
      student_pwd_sum: 0,

      // 教师页面默认显示第几个
      activeName: "1",
      // 教师修改密码数据
      tea_pwdDate: [],
      tea_pwdDate_sum: 0,
      // 教师软件正版化数据
      tea_sfwDate: [],
      tea_sfwDate_sum: 0,
      // 教师虚拟服务器数据
      tea_virtualDate: [],
      tea_virtualDate_sum: 0,
      // 教师托管服务器数据
      tea_hostDate: [],
      tea_hostDate_sum: 0,
      // 教师端口开通数据
      tea_portDate: [],
      tea_portDate_sum: 0,
      // 教师网络故障数据
      tea_faultDate: [],
      tea_faultDate_sum: 0,

      // 指定图表的配置项和数据
      // 修改进度
      stu_option1: {
        title: { text: "修改进度占比" },
        tooltip: {},
        legend: {
          data: [""],
        },
        color: ["#37A2DA", "#32C5E9", "#9FE6B8"],
        series: [
          {
            name: "",
            type: "pie",
            data: [],
          },
        ],
      },
      // 运营商
      stu_option2: {
        title: { text: "各运营商占比" },
        tooltip: {},
        legend: {
          data: [],
        },
        color: ["#e7bcf3", "#9d96f5", "#8378EA"],
        series: [
          {
            name: "",
            type: "pie",
            data: [],
          },
        ],
      },
      // 一周内的申请量
      stu_option5: {
        title: {
          text: "近七天的申请量",
        },
        color: ["#0082cf"],
        tooltip: {},
        legend: {},
        xAxis: {
          type: "category",
          axisLabel: {
            rotate: 30,
            interval: 0,
          },
        },
        dataset: {
        },
        yAxis: {},
        series: [
          {
            name: "申请人数",
            type: "line",
            data:[['2020-12-10','1'],['2020-12-14','2']]
          },
        ],
      },
      // 教师修改密码饼状图
      tea_pwd_option: {
        title: {
          text: "修改密码进度",
        },
        tooltip: {},
        legend: {
          data: ["修改进度"],
        },
        series: [
          {
            name: "修改进度",
            type: "pie",
            radius: "55%",
            data: [],
            itemStyle: {
              normal: {
                shadowBlur: 200,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },

      // 教师软件正版化饼状图
      tea_sfw_option: {
        title: { text: "软件正版化申请处理进度" },
        tooltip: {},
        legend: {
          data: ["修改进度"],
        },
        series: [
          {
            name: "修改进度",
            type: "pie",
            radius: "55%",
            data: [],
            itemStyle: {
              normal: {
                shadowBlur: 200,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },

      // 教师虚拟服务器饼状图
      tea_virtual_option: {
        title: { text: "服务器开通申请处理进度" },
        tooltip: {},
        legend: {
          data: ["修改进度"],
        },
        series: [
          {
            name: "修改进度",
            type: "pie",
            radius: "55%",
            data: [],
            itemStyle: {
              normal: {
                shadowBlur: 200,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },

      // 教师服务器托管饼状图
      tea_host_option: {
        title: { text: "服务器托管申请处理进度" },
        tooltip: {},
        legend: {
          data: ["修改进度"],
        },
        series: [
          {
            name: "修改进度",
            type: "pie",
            radius: "55%",
            data: [],
            itemStyle: {
              normal: {
                shadowBlur: 200,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },

      // 教师端口开通饼状图
      tea_port_option: {
        title: { text: "端口开通申请处理进度" },
        tooltip: {},
        legend: {
          data: ["修改进度"],
        },
        series: [
          {
            name: "修改进度",
            type: "pie",
            radius: "55%",
            data: [],
            itemStyle: {
              normal: {
                shadowBlur: 200,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },

      // 教师网络故障饼状图
      tea_fault_option: {
        title: { text: "网络故障申请处理进度" },
        tooltip: {},
        legend: {
          data: ["修改进度"],
        },
        series: [
          {
            name: "修改进度",
            type: "pie",
            radius: "55%",
            data: [],
            itemStyle: {
              normal: {
                shadowBlur: 200,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
  methods: {
    // 修改学生申请状态
    async aa(scope) {
      const pwd_data = {
        sql_type: "tea_password",
        id: scope.row.id,
        status: scope.row.status,
      };
      const { data: res } = await this.$http.post(
        `/student/edit_status1`,
        pwd_data
      );
      this.$message.success(res.message);
      this.stu_pwd_sum();
    },

    // 获取学生申请的人数以及信息
    async stu_pwd_sum() {
      this.student_pwd_sum = 0;
      // 代表未审核的人数
      var a = 0;
      // 代表审核中的人数
      var b = 0;
      // 代表已完成的人数
      var c = 0;
      // 中国移动
      var d = 0;
      // 中国电信
      var e = 0;
      // 中国联通
      var f = 0;
      // 其他运营商
      var g = 0;

      const { data: res } = await this.$http.get("/student/stu_pwd_sum");
      this.stu_tableData = JSON.parse(res.data);
      if (res.status == 201) {
        for (let i = 0; i < this.stu_tableData.length; i++) {
          if (this.stu_tableData[i].status == -1) {
            this.student_pwd_sum++;
          } else {
            this.student_pwd_sum += 0;
          }

          // 判断状态
          switch (this.stu_tableData[i].status) {
            case -1:
              a++;
              break;
            case 0:
              b++;
              break;
            case 1:
              c++;
              break;
          }

          // 判断运营商
          switch (this.stu_tableData[i].operator) {
            case "中国联通":
              e++;
              break;
            case "中国移动":
              d++;
              break;
            case "中国电信":
              f++;
              break;
            case "其他":
              g++;
              break;
          }
        }
        // 给审核状态赋值
        this.stu_option1.series[0].data = [
          { value: a, name: "未审核" },
          { value: b, name: "审核中" },
          { value: c, name: "已完成" },
        ];
        // 给运营商赋值
        this.stu_option2.series[0].data = [
          { value: d, name: "中国移动" },
          { value: e, name: "中国联通" },
          { value: g, name: "其他" },
          { value: f, name: "中国电信" },
        ];
      } else {
        return this.$message.error("获取数据失败");
      }
      var myChart1 = this.$echarts.init(document.getElementById("main_top1"));
      // 使用刚指定的配置项和数据显示图表。
      myChart1.setOption(this.stu_option1);
      var myChart2 = this.$echarts.init(document.getElementById("main_top2"));
      myChart2.setOption(this.stu_option2);
    },

    //学生柱状图
    async stu_bar_sum() {
      var arr = []
      const { data: res } = await this.$http.get("/student/edit_sum");
      for (let i = 0; i < res.data.length; i++) {
        arr[i] = [res.data[i]["creat_time"],res.data[i]["COUNT(*)"]]
      }
     this.stu_option5.series[0].data=arr
      var myChart5 = this.$echarts.init(document.getElementById("main_buttom"));
      // 使用刚指定的配置项和数据显示图表。
      myChart5.setOption(this.stu_option5);
    },

    // 修改教师申请状态
    async pwd(scope) {
      const pwd_data = {
        sql_type: "tea_password",
        id: scope.row.id,
        status: scope.row.status,
      };
      const { data: res } = await this.$http.post(
        `/teacher/edit_status`,
        pwd_data
      );
      this.$message.success(res.message);
      this.tea_select();
    },
    async sfw(scope) {
      const pwd_data = {
        sql_type: "tea_software",
        id: scope.row.id,
        status: scope.row.status,
      };
      const { data: res } = await this.$http.post(
        `/teacher/edit_status`,
        pwd_data
      );
      this.$message.success(res.message);
      this.tea_select();
    },
    async virtual(scope) {
      const pwd_data = {
        sql_type: "tea_virtual",
        id: scope.row.id,
        status: scope.row.status,
      };
      const { data: res } = await this.$http.post(
        `/teacher/edit_status`,
        pwd_data
      );
      this.$message.success(res.message);
      this.tea_select();
    },
    async host(scope) {
      const pwd_data = {
        sql_type: "tea_host",
        id: scope.row.id,
        status: scope.row.status,
      };
      const { data: res } = await this.$http.post(
        `/teacher/edit_status`,
        pwd_data
      );
      this.$message.success(res.message);
      this.tea_select();
    },
    async port(scope) {
      const pwd_data = {
        sql_type: "tea_port",
        id: scope.row.id,
        status: scope.row.status,
      };
      const { data: res } = await this.$http.post(
        `/teacher/edit_status`,
        pwd_data
      );
      this.$message.success(res.message);
      this.tea_select();
    },
    async fault(scope) {
      const pwd_data = {
        sql_type: "tea_fault",
        id: scope.row.id,
        status: scope.row.status,
      };
      const { data: res } = await this.$http.post(
        `/teacher/edit_status`,
        pwd_data
      );
      this.$message.success(res.message);
      this.tea_select();
      console.log("123456");
    },

    // 教师数据分析的变换
    changess(value) {
      var a = document.getElementsByClassName("bbtn");
      for (let i = 0; i < a.length; i++) {
        if (i == value) {
          a[i].style.display = "block";
        } else {
          a[i].style.display = "none";
        }
      }
      switch (value) {
        case 0:
          this.tea_line_sum("tea_password", "tea_pwd_bottom");
          break;
        case 1:
          this.tea_line_sum("tea_software", "tea_sfw_bottom");
          break;
        case 2:
          this.tea_line_sum("tea_virtual", "tea_virtual_bottom");
          break;
        case 3:
          this.tea_line_sum("tea_host", "tea_host_bottom");
          break;
        case 4:
          this.tea_line_sum("tea_port", "tea_port_bottom");
          break;
        case 5:
          this.tea_line_sum("tea_fault", "tea_fault_bottom");
          break;
      }
    },

    // 查询教师各种申请信息
    async tea_select() {
      this.tea_pwdDate_sum = 0;
      this.tea_sfwDate_sum = 0;
      this.tea_virtualDate_sum = 0;
      this.tea_hostDate_sum = 0;
      this.tea_portDate_sum = 0;
      this.tea_faultDate_sum = 0;
      // 修改密码
      const { data: res0 } = await this.$http.get("/teacher/select_pwd");
      if (res0.status == 201) {
        // 代表未审核的人数
        var a = 0;
        // 代表审核中的人数
        var b = 0;
        // 代表已完成的人数
        var c = 0;
        this.tea_pwdDate = res0.data;
        for (let i = 0; i < res0.data.length; i++) {
          if (this.tea_pwdDate[i].status == -1) {
            this.tea_pwdDate_sum++;
          } else {
            this.tea_pwdDate_sum += 0;
          }
          // 判断状态
          switch (this.tea_pwdDate[i].status) {
            case -1:
              a++;
              break;
            case 0:
              b++;
              break;
            case 1:
              c++;
              break;
          }
          this.tea_pwd_option.series[0].data = [
            { value: a, name: "未审核" },
            { value: b, name: "审核中" },
            { value: c, name: "已完成" },
          ];
        }

        const myChart = this.$echarts.init(
          document.getElementById("tea_pwd_top")
        );
        myChart.setOption(this.tea_pwd_option);
      }
      // 软件正版化
      const { data: res1 } = await this.$http.get(`/teacher/select_sfw`);
      if (res1.status == 201) {
        var a1 = 0,
          b1 = 0,
          c1 = 0;
        this.tea_sfwDate = res1.data;
        for (let i = 0; i < res1.data.length; i++) {
          if (this.tea_sfwDate[i].status == -1) {
            this.tea_sfwDate_sum++;
          } else {
            this.tea_sfwDate_sum += 0;
          }
          // 判断状态
          switch (this.tea_sfwDate[i].status) {
            case -1:
              a1++;
              break;
            case 0:
              b1++;
              break;
            case 1:
              c1++;
              break;
          }
          this.tea_sfw_option.series[0].data = [
            { value: a1, name: "未审核" },
            { value: b1, name: "审核中" },
            { value: c1, name: "已完成" },
          ];
        }
        const myChart = this.$echarts.init(
          document.getElementById("tea_sfw_top")
        )
        myChart.setOption(this.tea_sfw_option);
      }
      // 虚拟服务器
      const { data: res2 } = await this.$http.get("/teacher/select_virtual");
      if (res2.status == 201) {
        var a2 = 0,
          b2 = 0,
          c2 = 0;
        this.tea_virtualDate = res2.data;
        for (let i = 0; i < res2.data.length; i++) {
          if (this.tea_virtualDate[i].status == -1) {
            this.tea_virtualDate_sum++;
          } else {
            this.tea_virtualDate_sum += 0;
          }
          // 判断状态
          switch (this.tea_virtualDate[i].status) {
            case -1:
              a2++;
              break;
            case 0:
              b2++;
              break;
            case 1:
              c2++;
              break;
          }
          this.tea_virtual_option.series[0].data = [
            { value: a2, name: "未审核" },
            { value: b2, name: "审核中" },
            { value: c2, name: "已完成" },
          ];
        }
        const myChart = this.$echarts.init(
          document.getElementById("tea_virtual_top")
        );
        myChart.setOption(this.tea_virtual_option);
      }
      // 服务器托管
      const { data: res3 } = await this.$http.get("/teacher/select_host");
      if (res3.status == 201) {
        var a3 = 0,
          b3 = 0,
          c3 = 0;
        this.tea_hostDate = res3.data;
        for (let i = 0; i < res3.data.length; i++) {
          if (this.tea_hostDate[i].status == -1) {
            this.tea_hostDate_sum++;
          } else {
            this.tea_hostDate_sum += 0;
          }
          // 判断状态
          switch (this.tea_hostDate[i].status) {
            case -1:
              a3++;
              break;
            case 0:
              b3++;
              break;
            case 1:
              c3++;
              break;
          }
          this.tea_host_option.series[0].data = [
            { value: a3, name: "未审核" },
            { value: b3, name: "审核中" },
            { value: c3, name: "已完成" },
          ];
        }
        const myChart = this.$echarts.init(
          document.getElementById("tea_host_top")
        );
        myChart.setOption(this.tea_host_option);
      }
      // 端口开通
      const { data: res4 } = await this.$http.get("/teacher/select_port");
      if (res4.status == 201) {
        var a4 = 0,
          b4 = 0,
          c4 = 0;
        this.tea_portDate = res4.data;
        for (let i = 0; i < res4.data.length; i++) {
          if (this.tea_portDate[i].status == -1) {
            this.tea_portDate_sum++;
          } else {
            this.tea_portDate_sum += 0;
          }
          // 判断状态
          switch (this.tea_portDate[i].status) {
            case -1:
              a4++;
              break;
            case 0:
              b4++;
              break;
            case 1:
              c4++;
              break;
          }
          this.tea_port_option.series[0].data = [
            { value: a4, name: "未审核" },
            { value: b4, name: "审核中" },
            { value: c4, name: "已完成" },
          ];
        }
        const myChart = this.$echarts.init(
          document.getElementById("tea_port_top")
        );
        myChart.setOption(this.tea_port_option);
      }
      // 网络故障
      const { data: res5 } = await this.$http.get("/teacher/select_fault");
      if (res5.status == 201) {
        var a5 = 0;
        var b5 = 0;
        var c5 = 0;
        this.tea_faultDate = res5.data;
        for (let i = 0; i < res5.data.length; i++) {
          if (this.tea_faultDate[i].status == -1) {
            this.tea_faultDate_sum++;
          } else {
            this.tea_faultDate_sum += 0;
          }
          // 判断状态
          switch (this.tea_faultDate[i].status) {
            case -1:
              a5++;
              break;
            case 0:
              b5++;
              break;
            case 1:
              c5++;
              break;
          }
          this.tea_fault_option.series[0].data = [
            { value: a5, name: "未审核" },
            { value: b5, name: "审核中" },
            { value: c5, name: "已完成" },
          ];
        }
        const myChart = this.$echarts.init(
          document.getElementById("tea_fault_top")
        );
        myChart.setOption(this.tea_fault_option);
      }
    },
    //教师修改折线图
    async tea_line_sum(value1, value2) {
      // 代表周日至周六
      const weekDay = ["7", "1", "2", "3", "4", "5", "6"];
      var weekdata = [0, 0, 0, 0, 0, 0, 0];
      const { data: res } = await this.$http.get("/teacher/select_sum", {
        params: { sql_tyep: value1 },
      });
      if (res.status == 201) {
        for (let i = 0; i < res.data.length; i++) {
          // 判断一周内每天的人数
          var time = new Date(Date.parse(res.data[i].creat_time));
          switch (weekDay[time.getDay()]) {
            case 1:
              weekdata[0]++;
              break;
            case "2":
              weekdata[1]++;
              break;
            case "3":
              weekdata[2]++;
              break;
            case "4":
              weekdata[3]++;
              break;
            case "5":
              weekdata[4]++;
              break;
            case "6":
              weekdata[5]++;
              break;
            case "7":
              weekdata[6]++;
              break;
          }
        }
      }
      // 给柱状图一周内每天的人数赋值
      const option = {
        title: {
          text: "一周内的申请量",
        },
        tooltip: {},
        xAxis: {
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: {},
        series: [
          {
            name: "申请人数",
            type: "line",
            data: weekdata,
          },
        ],
      };
      const myChart = this.$echarts.init(document.getElementById(value2));
      myChart.setOption(option);
    },
  },
  created() {
    // 学生饼状图和柱状图
    this.stu_pwd_sum();
    this.stu_bar_sum();
    // 教师饼状图和柱状图
    this.tea_select();
    this.tea_line_sum("tea_password", "tea_pwd_bottom");
  },
};
</script>

<style lang="less" scoped>
.tabs {
  .teacher {
    height: 580px;
  }
  .student {
    height: 580px;
    overflow-y: scroll;
    .studentLeft {
      float: left;
      width: 600px;
      height: 580px;
      margin-top: 10px;
      border-right: 1px solid #b3c0d1;
    }
    .studentRight {
      float: left;
      width: 600px;
      height: 100%;
      .studentRight_top {
        margin: 0px auto;
        width: 480px;
        height: 300px;
        border-bottom: 1px solid #b3c0d1;
        .question {
          width: 450px;
          height: 240px;
        }
      }
      .studentRight_buttom {
        margin: 0px auto;
        width: 480px;
        height: 300px;
        margin-top: 20px;
      }
    }
  }
}

.teacher {
  height: 680px;
  .teaLeft {
    height: 680px;
    overflow-y: scroll;
    height: 100%;
    width: 620px;
    // margin-top: 20px;
    float: left;
    border-right: 1px solid #b3c0d1;
  }
  .teaRight {
    float: left;
    height: 95%;
    width: 600px;
    .bbtn {
      width: 500px;
      height: 100%;
      margin-top: 20px;
      margin-left: auto;
      margin-right: auto;
      display: none;
      .teaRight_top {
        width: 500px;
        height: 275px;
        border-bottom: 1px solid #e1e2e3;
      }
      .teaRight_bottom {
        width: 540px;
        height: 275px;
        margin-top: 25px;
      }
    }
  }
}
.text {
  font-size: 14px;
}

.item {
  height: 38px;
  line-height: 38px;
  margin-bottom: 5px;
  border-bottom: 1px solid #d5c9c9;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  margin-top: 15px;
  width: 580px;
}
</style>