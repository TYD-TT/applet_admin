<template>
  <div>
    <el-tabs type="border-card" class="tabs">
      <el-tab-pane label="教师">
        <div class="teacher"></div>
      </el-tab-pane>
      <el-tab-pane label="学生">
        <div class="student">
          <!-- 左侧申请人信息 -->
          <div class="studentLeft">
            <el-badge :value="12" class="item">
              <el-button size="middle" style="width: 583px">学生申请</el-button>
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>学生申请修改密码</span>
                </div>

                <el-table
                  :data="tableData"
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
                  <el-table-column prop="date" label="时间" align="center">
                  </el-table-column>
                  <el-table-column prop="nn" label="状态" align="center">
                    <template slot-scope="scope">
                      <div>
                        <el-button
                          type="success"
                          size="mini"
                          @click="aa(scope)"
                          :disabled="scope.row.status == 1"
                          id="aaaa"
                          >{{
                            scope.row.status == -1 ? "确定" : "已确定"
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
            <div class="studentRight_top">
              <el-tabs type="border-card">
                <el-tab-pane label="解决情况">
                  <div class="question" id="main_top1"></div>
                </el-tab-pane>
                <el-tab-pane label="运行商">
                  <div class="question" id="main_top2"></div>
                </el-tab-pane>
                <el-tab-pane label="男女比例">
                  <div class="question" id="main_top3"></div>
                </el-tab-pane>
              </el-tabs>
            </div>
            <div class="studentRight_buttom" id="main_buttom"></div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import echarts from "echarts";
// import lodash from 'lodash'
export default {
  data() {
    return {
      // 指定图表的配置项和数据
      option1: {
        title: {},
        tooltip: {},
        legend: {
          data: ["修改进度"],
        },
        series: [
          {
            name: "修改进度",
            type: "pie",
            data: [
              { value: 30, name: "未完成修改" },
              { value: 7, name: "其他" },
              { value: 63, name: "已完成修改" },
            ],
          },
        ],
      },
      option2: {
        title: {},
        tooltip: {},
        legend: {
          data: ["运营商"],
        },
        series: [
          {
            name: "运营商",
            type: "pie",
            data: [
              { value: 45, name: "中国移动" },
              { value: 60, name: "中国联通" },
              { value: 10, name: "其他" },
              { value: 30, name: "中国电信" },
            ],
          },
        ],
      },
      option3: {
        title: {},
        tooltip: {},
        legend: {
          data: ["男女比例"],
        },
        series: [
          {
            name: "男女比例",
            type: "pie",
            data: [
              { value: "", name: "" },
              { value: "", name: "" },
              { value: "", name: "" },
              { value: 75, name: "男" },
              { value: 3, name: "女" },
            ],
          },
        ],
      },
      option5: {
        title: {
          text: "一周内的申请量",
        },
        tooltip: {},
        legend: {},
        xAxis: {
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: {},
        series: [
          {
            name: "申请人数",
            type: "bar",
            data: [55, 20, 36, 10, 10, 20, 40],
          },
        ],
      },
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          account: "17031110129",
          status: -1,
          text: "确定",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          account: "17031110129",
          status: 1,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          account: "17031110129",
          status: 1,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          account: "17031110129",
          status: -1,
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          account: "17031110129",
          status: 1,
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          account: "17031110129",
          status: -1,
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          account: "17031110129",
          status: -1,
        },
      ],
    };
  },
  methods: {
    aa(scope) {
      console.log(scope);
    },
  },
  mounted() {
    var myChart1 = echarts.init(document.getElementById("main_top1"));
    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(this.option1);
    var myChart2 = echarts.init(document.getElementById("main_top2"));
    myChart2.setOption(this.option2);
    var myChart3 = echarts.init(document.getElementById("main_top3"));
    myChart3.setOption(this.option3);
    var myChart5 = echarts.init(document.getElementById("main_buttom"));
    // 使用刚指定的配置项和数据显示图表。
    myChart5.setOption(this.option5);
    var aaaa = document.getElementById("aaaa");
    console.log(aaaa);
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
          height: 220px;
        }
      }
      .studentRight_buttom {
        margin: 0px auto;
        width: 480px;
        height: 300px;
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