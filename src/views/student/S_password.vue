<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>学生服务</el-breadcrumb-item>
        <el-breadcrumb-item>密码修改</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-top: 15px">
      <el-form :inline="true" :model="searchList" class="demo-form-inline">
        <el-form-item label="搜索类型" width="60">
          <el-select v-model="searchList.index" placeholder="搜索类型">
            <el-option
              v-for="(item, keys) in array1"
              :key="keys"
              :label="item"
              :value="array2[keys]"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="searchList.value"
            placeholder="请输入搜索"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="select_studentMessage"
            >查询信息</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            type="warning"
            icon="el-icon-edit"
            @click="dialogFormVisible = true"
            >添加信息</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            icon="el-icon-download"
            @click="exportToExcel"
            >导出数据</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="danger" icon="el-icon-delete" @click="removeMore"
            >批量删除</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <el-card>
      <el-table
        :data="
          tableData.slice(
            (queryInfo.pagenum - 1) * queryInfo.pagesize,
            queryInfo.pagenum * queryInfo.pagesize
          )
        "
        stripe
        style="width: 100%"
        @selection-change="selct"
      >
        <el-table-column
          type="selection"
          width="55"
          @select="mm(selection, row)"
        >
        </el-table-column>
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="account" label="账号" width="120">
        </el-table-column>
        <el-table-column prop="password" label="密码" width="90">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="100">
        </el-table-column>
        <el-table-column prop="major" label="专业" width="130">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系电话"
          width="120"
        ></el-table-column>
        <el-table-column prop="ID_type" label="证件类型" width="90">
        </el-table-column>
        <el-table-column
          prop="ID_number"
          label="证件号码"
          width="180"
        ></el-table-column>
        <el-table-column prop="creat_time" label="更改时间" width="140">
        </el-table-column>
        <el-table-column label="编辑">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="edit(scope.row)"
              >详情</el-button
            >
            <el-button type="danger" size="small" @click="remove(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div class="block" style="margin-top: 10px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[7, 10, 15, 20]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 添加学生按钮会话框 -->
    <el-dialog
      title="添加学生"
      :visible.sync="dialogFormVisible"
      width="330px"
      top="20px"
    >
      <el-form
        :model="addStu"
        label-position="right"
        label-width="75px"
        ref="addStu"
      >
        <el-form-item label="学号">
          <el-input v-model="addStu.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addStu.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="addStu.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="addStu.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="addStu.ID_number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="院系专业">
          <el-cascader v-model="value" :options="options"></el-cascader>
        </el-form-item>
        <el-form-item label="年级">
          <el-input v-model="addStu.class" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStudent()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑学生对话框 -->
    <el-dialog
      title="内容详情"
      :visible.sync="dialogeditFormVisible"
      width="330px"
      top="20px"
    >
      <el-form
        :model="editStu"
        label-position="right"
        label-width="75px"
        ref="addStu"
      >
        <el-form-item label="学号">
          <el-input
            v-model="editStu.account"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="editStu.password"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input
            v-model="editStu.name"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input
            v-model="editStu.phone"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input
            v-model="editStu.ID_number"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="院系专业">
          <el-cascader
            v-model="value"
            :options="options"
            disabled
          ></el-cascader>
        </el-form-item>
        <el-form-item label="年级">
          <el-input
            v-model="editStu.class"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogeditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogeditFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      // table 选择框
      studentList: [],
      // 搜索条件
      searchList: {
        index: "",
        value: "",
      },
      array1: ["学号", "姓名", "院系", "专业", "联系方式", "修改日期"],
      array2: ["account", "name", "department", "major", "phone", "creat_time"],
      // 分页
      queryInfo: {
        quwey: "",
        pagenum: 1,
        pagesize: 7,
      },
      // 总数据条数
      total: 0,
      dialogFormVisible: false,
      dialogeditFormVisible: false,
      addStu: {
        class: "",
        account: "",
        name: "",
        ID_type: "身份证",
        ID_number: "",
        password: "888888",
        department: "",
        major: "",
        department_major: "",
        phone: "",
      },
      value: [],
      options: [
        {
          label: "机械工程学院",
          value: "机械工程学院",
          children: [
            {
              label: "机械电子工程",
              value: "机械电子工程",
            },
            {
              label: "材料成型及控制工程",
              value: "材料成型及控制工程",
            },
            {
              label: "机械设计制造及其自动化",
              value: "机械设计制造及其自动化",
            },
            {
              label: "汽车服务工程",
              value: "汽车服务工程",
            },
            {
              label: "工业设计",
              value: "工业设计",
            },
            {
              label: "飞行器制造工程",
              value: "飞行器制造工程",
            },
            {
              label: "飞行器适航技术",
              value: "飞行器适航技术",
            },
            {
              label: "机电一体化技术",
              value: "机电一体化技术",
            },
          ],
        },
        {
          label: "电子信息与电气工程学院",
          value: "电子信息与电气工程学院",
          children: [
            {
              label: "自动化",
              value: "自动化",
            },
            {
              label: "电子信息工程",
              value: "电子信息工程",
            },
            {
              label: "通信工程",
              value: "通信工程",
            },
            {
              label: "电气工程及其自动化",
              value: "电气工程及其自动化",
            },
            {
              label: "机器人工程",
              value: "机器人工程",
            },
            {
              label: "电气自动化技术",
              value: "电气自动化技术",
            },
          ],
        },
        {
          label: "计算机科学与信息工程学院",
          value: "计算机科学与信息工程学院",
          children: [
            {
              label: "计算机科学与技术",
              value: "计算机科学与技术",
            },
            {
              label: "网络工程",
              value: "网络工程",
            },
            {
              label: "软件工程",
              value: "软件工程",
            },
            {
              label: "物联网工程",
              value: "物联网工程",
            },
            {
              label: "信息管理与信息系统",
              value: "信息管理与信息系统",
            },
            {
              label: "数据科学与大数据技术",
              value: "数据科学与大数据技术",
            },
            {
              label: "计算机应用技术",
              value: "计算机应用技术",
            },
            {
              label: "软件技术",
              value: "软件技术",
            },
          ],
        },
        {
          label: "土木与建筑工程学院",
          value: "土木与建筑工程学院",
          children: [
            {
              label: "土木工程",
              value: "土木工程",
            },
            {
              label: "工程管理",
              value: "工程管理",
            },
            {
              label: "建筑学",
              value: "建筑学",
            },
            {
              label: "给排水科学与工程",
              value: "给排水科学与工程",
            },
            {
              label: "城乡规划",
              value: "城乡规划",
            },
            {
              label: "建筑工程技术",
              value: "建筑工程技术",
            },
          ],
        },
        {
          label: "化学与环境工程学院",
          value: "化学与环境工程学院",
          children: [
            {
              label: "化学工程与工艺",
              value: "化学工程与工艺",
            },
            {
              label: "应用化学",
              value: "应用化学",
            },
            {
              label: "环境工程",
              value: "环境工程",
            },
            {
              label: "高分子材料与工程",
              value: "高分子材料与工程",
            },
            {
              label: "应用化工技术",
              value: "应用化工技术",
            },
          ],
        },
        {
          label: "生物与食品工程学院",
          value: "生物与食品工程学院",
          children: [
            {
              label: "食品科学与工程",
              value: "食品科学与工程",
            },
            {
              label: "食品质量与安全",
              value: "食品质量与安全",
            },
            {
              label: "生物工程",
              value: "生物工程",
            },
            {
              label: "生物技术",
              value: "生物技术",
            },
            {
              label: "动物医学",
              value: "动物医学",
            },
            {
              label: "农业生物技术",
              value: "农业生物技术",
            },
            {
              label: "畜牧兽医",
              value: "畜牧兽医",
            },
          ],
        },
        {
          label: "数理学院",
          value: "数理学院",
          children: [
            {
              label: "信息与计算科学",
              value: "信息与计算科学",
            },
            {
              label: "应用物理学",
              value: "应用物理学",
            },
            {
              label: "新能源材料与器件",
              value: "新能源材料与器件",
            },
          ],
        },
        {
          label: "飞行学院",
          value: "飞行学院",
          children: [
            {
              label: "飞行技术",
              value: "飞行技术",
            },
            {
              label: "物流管理",
              value: "物流管理",
            },
            {
              label: "安全工程",
              value: "安全工程",
            },
            {
              label: "交通运输",
              value: "交通运输",
            },
            {
              label: "直升机驾驶技术",
              value: "直升机驾驶技术",
            },
            {
              label: "民航空中安全保卫",
              value: "民航空中安全保卫",
            },
          ],
        },
        {
          label: "经济管理学院",
          value: "经济管理学院",
          children: [
            {
              label: "会计学",
              value: "会计学",
            },
            {
              label: "工商管理",
              value: "工商管理",
            },
            {
              label: "财务管理",
              value: "财务管理",
            },
            {
              label: "国际经济与贸易",
              value: "国际经济与贸易",
            },
            {
              label: "市场营销",
              value: "市场营销",
            },
            {
              label: "电子商务",
              value: "电子商务",
            },
            {
              label: "会计",
              value: "会计",
            },
          ],
        },
        {
          label: "文法学院",
          value: "文法学院",
          children: [
            {
              label: "社会工作",
              value: "社会工作",
            },
            {
              label: "知识产权",
              value: "知识产权",
            },
            {
              label: "播音与主持艺术",
              value: "播音与主持艺术",
            },
            {
              label: "广播电视编导",
              value: "广播电视编导",
            },
            {
              label: "新闻采编与制作",
              value: "新闻采编与制作",
            },
          ],
        },
        {
          label: "外国语学院",
          value: "外国语学院",
          children: [
            {
              label: "英语",
              value: "英语",
            },
            {
              label: "商务英语",
              value: "商务英语",
            },
            {
              label: "汉语国际教育",
              value: "汉语国际教育",
            },
            {
              lable: "应用英语",
              value: "应用英语",
            },
          ],
        },
        {
          label: "艺术设计学院",
          value: "艺术设计学院",
          children: [
            {
              label: "视觉传达设计",
              value: "视觉传达设计",
            },
            {
              label: "环境设计",
              value: "环境设计",
            },
            {
              label: "产品设计",
              value: "产品设计",
            },
            {
              label: "动画",
              value: "动画",
            },
            {
              label: "绘画",
              value: "绘画",
            },
            {
              label: "视觉传播设计与制作",
              value: "视觉传播设计与制作",
            },
          ],
        },
        {
          label: "国际教育学院",
          value: "国际教育学院",
          children: [
            {
              label: "土木工程",
              value: "土木工程",
            },
            {
              label: "城乡规划",
              value: "城乡规划",
            },
          ],
        },
      ],
      editStu: {},
    };
  },
  methods: {
    // 查询信息
    async selectmessage() {
      const { data: res } = await this.$http.get("/student/password");
      this.tableData = JSON.parse(res.data);
      this.total = this.tableData.length;
    },
    // 详情页面
    edit(row) {
      this.dialogeditFormVisible = true;
      this.editStu = row;
      this.value = [];
      this.value.unshift(row.department, row.major);
      this.editStu.department_major = this.value.join("/");
    },

    //修改学生信息
    async editStudent() {
      const { data: res } = await this.$http.post(
        "/update_message",
        this.editStu
      );
      if (res.status != 201) {
        return this.$message.error("更新失败");
      }
      this.$message.success("更新成功");
      this.dialogeditFormVisible = false;
      this.selectmessage();
    },
    // 删除一行数据
    remove(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await this.$http.delete(
            `/student/del_pwd/${row.id}`
          );
          if (res.status != 201) {
            return this.$message.error("删除失败");
          }
          this.$message.success("删除成功");
          this.selectmessage();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 批量删除数据
    async removeMore() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const nn = JSON.parse(JSON.stringify(this.studentList));
          const arr = [];
          for (let i = 0; i < nn.length; i++) {
            arr[i] = nn[i].id;
          }
          console.log(arr);
          const { data: res } = await this.$http.post("/student/del_pwd", arr);
          if (res.status != 201) {
            return this.$message.error("删除失败");
          }
          this.$message.success("删除成功");
          this.selectmessage();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 导出文件为Excel
    exportToExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../excel/Export2Excel");
        // excel表头
        const tHeader = [
          "账号",
          "密码",
          "姓名",
          "联系电话",
          "院系",
          "专业",
          "身份证号",
          "更改时间",
        ];
        const filterVal = [
          "account",
          "password",
          "name",
          "phone",
          "department",
          "major",
          "ID_number",
          "creat_time",
        ];
        const list = this.studentList;
        console.log(list);
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "学生列表");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    // 选择框选择
    selct(e) {
      console.log(e);
      this.studentList = e;
    },

    //按条件查询信息
    async select_studentMessage() {
      console.log(this.searchList);
      const { data: res } = await this.$http.post(
        `/student/find_pwd`,
        this.searchList
      );
      this.tableData = [];
      this.tableData = JSON.parse(res.data);
      this.total = this.tableData.length;
    },

    // 分页切换
    handleSizeChange(val) {
      this.queryInfo.pagesize = val;
    },
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val;
    },

    // 添加信息
    async addStudent() {
      this.addStu.department_major = this.value.join("-");
      this.addStu.creat_time = this.$getFormatDate.getFormatDate();
      console.log(this.addStu);
      const { data: res } = await this.$http.post(
        "/student/add_message",
        this.addStu
      );
      if (res.status != 201) {
        return this.$message.error("添加失败");
      }
      this.$message.success("添加成功");
      this.dialogFormVisible = false;
      this.selectmessage();
      this.addStu = {};
      this.addStu.department_major = "";
    },
  },
  created() {
    this.selectmessage();
  },
};
</script>

<style lang="less" scoped>
</style>
