<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>教师信息</el-breadcrumb-item>
        <el-breadcrumb-item>基本信息</el-breadcrumb-item>
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
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="account" label="账号"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="department" label="院系"> </el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="ID_type" label="证件类型"> </el-table-column>
        <el-table-column
          prop="ID_number"
          label="证件号码"
          width="170px"
        ></el-table-column>
        <el-table-column label="编辑">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="edit(scope.row)"
              >编辑</el-button
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
    <!-- 添加教师按钮会话框 -->
    <el-dialog
      title="添加教师"
      :visible.sync="dialogFormVisible"
      width="330px"
      top="20px"
    >
      <el-form
        :model="addTea"
        label-position="right"
        label-width="75px"
        ref="addTea"
      >
        <el-form-item label="工号">
          <el-input v-model="addTea.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="addTea.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="addTea.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="addTea.ID_number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="院系">
          <el-cascader
            v-model="value"
            :options="options"
            @change="addHandleChange"
          ></el-cascader>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTeacher()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑教师信息对话框 -->
    <el-dialog
      title="修改信息"
      :visible.sync="dialogeditFormVisible"
      width="330px"
      top="20px"
    >
      <el-form
        :model="editTea"
        label-position="right"
        label-width="75px"
        ref="addTea"
      >
        <el-form-item label="工号">
          <el-input v-model="editTea.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="editTea.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="editTea.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="editTea.ID_number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="院系">
          <el-cascader
            v-model="value"
            :options="options"
            @change="editHandleChange"
          ></el-cascader>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogeditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editTeacher()">确 定</el-button>
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
      array1: ["工号", "姓名", "院系", "联系方式"],
      array2: ["account", "name", "department", "phone"],
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
      addTea: {
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
        },
        {
          label: "电子信息与电气工程学院",
          value: "电子信息与电气工程学院",
        },
        {
          label: "计算机科学与信息工程学院",
          value: "计算机科学与信息工程学院",
        },
        {
          label: "土木与建筑工程学院",
          value: "土木与建筑工程学院",
        },
        {
          label: "化学与环境工程学院",
          value: "化学与环境工程学院",
        },
        {
          label: "生物与食品工程学院",
          value: "生物与食品工程学院",
        },
        {
          label: "数理学院",
          value: "数理学院",
        },
        {
          label: "飞行学院",
          value: "飞行学院",
        },
        {
          label: "经济管理学院",
          value: "经济管理学院",
        },
        {
          label: "文法学院",
          value: "文法学院",
        },
        {
          label: "外国语学院",
          value: "外国语学院",
        },
        {
          label: "艺术设计学院",
          value: "艺术设计学院",
        },
        {
          label: "国际教育学院",
          value: "国际教育学院",
        },
      ],
      editTea: {},
    };
  },
  methods: {
    // 查询信息
    async selectmessage() {
      const { data: res } = await this.$http.get("/teacher/select_message");
      this.tableData = JSON.parse(res.data);
      this.total = this.tableData.length;
    },
    // 选择教师院系
    editHandleChange(value) {
      this.value = value[0];
      this.editTea.department = value[0];
    },
    // 打开编辑页面
    edit(row) {
      console.log(row);
      this.dialogeditFormVisible = true;
      this.editTea = row;
      this.editTea.ID_type = "身份证";
      this.value = this.editTea.department;
    },
    // 编辑信息
    async editTeacher() {
      const { data: res } = await this.$http.put(
        `/teacher/editTeacher/${this.editTea.id}`,
        this.editTea
      );
      if (res.status != 201) {
        return this.$message.error("更新失败");
      }
      this.$message.success("更新成功");
      this.dialogeditFormVisible = false;
      this.selectmessage();
      this.editTea = {};
      this.value = [];
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
            `/teacher/del_msg/${row.id}`
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
          const { data: res } = await this.$http.post("/teacher/del_msg", arr);
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
    selct(e) {
      this.studentList = e;
    },

    //按条件查询信息
    async select_studentMessage() {
      const { data: res } = await this.$http.post(
        "/teacher/find_msg",
        this.searchList
      );
      this.tableData = [];
      this.tableData = JSON.parse(res.data);
      this.total = this.tableData.length;
      this.searchList = {};
    },

    // 分页切换
    handleSizeChange(val) {
      this.queryInfo.pagesize = val;
    },
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val;
    },

    // 添加教师时选择院系
    addHandleChange(value) {
      this.value = value[0];
      this.addTea.department = value[0];
    },
    // 添加信息
    async addTeacher() {
      this.addTea.creat_time = this.$getFormatDate.getFormatDate();
      const { data: res } = await this.$http.post(
        "/teacher/register",
        this.addTea
      );
      if (res.status != 201) {
        return this.$message.error("添加失败");
      }
      this.$message.success("添加成功");
      this.dialogFormVisible = false;
      this.selectmessage();
      this.addTea = {};
      this.selectmessage();
    },
  },
  created() {
    this.selectmessage();
  },
};
</script>

<style lang="less" scoped>
</style>
