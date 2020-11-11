<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>教师服务</el-breadcrumb-item>
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
        <el-form-item style="display:none">
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
        <el-table-column prop="account" label="账号" width="110">
        </el-table-column>
        <el-table-column prop="password_type" label="密码类型" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="100">
        </el-table-column>
        <el-table-column prop="section" label="所属部门" width="130">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系电话"
          width="120"
        ></el-table-column>
        <el-table-column prop="ID_type" label="证件类型" width="100">
        </el-table-column>
        <el-table-column
          prop="ID_number"
          label="证件号码"
          width="170"
        ></el-table-column>
        <el-table-column prop="creat_time" label="更改时间" width="140">
        </el-table-column>
        <el-table-column label="编辑" fixed="right" width="160">
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
    <!-- 添加信息按钮会话框 -->
    <el-dialog
      title="添加信息"
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
        <el-form-item label="姓名">
          <el-input
            v-model="editStu.name"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="密码类型">
          <el-input
            v-model="editStu.password_type"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-input
            v-model="editStu.section"
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
        <el-form-item label="申请时间">
          <el-input
            v-model="editStu.creat_time"
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
      array1: ["工号", "姓名", "院系","密码类型", "联系方式", "修改日期"],
      array2: ["account", "name", "department","password_type", "phone", "creat_time"],
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
        phone: "",
      },
      editStu: {},
    };
  },
  methods: {
    // 查询信息
    async selectmessage() {
      const { data: res } = await this.$http.get("/teacher/password");
      this.tableData = JSON.parse(res.data);
      this.total = this.tableData.length;
      if (res.status != 201) {
        return this.$message.error("获取数据失败");
      }
      this.$message.success(res.message);
    },
    // 编辑页面
    edit(row) {
      this.dialogeditFormVisible = true;
      this.editStu = row;
    },
    //提交所编辑的信息
    // async editStudent() {
    //   const { data: res } = await this.$http.post(
    //     "/update_message",
    //     this.editStu
    //   );
    //   if (res.status != 201) {
    //     return this.$message.error("更新失败");
    //   }
    //   this.$message.success("更新成功");
    //   this.dialogeditFormVisible = false;
    //   this.selectmessage();
    // },
    // 删除一行数据
    remove(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await this.$http.delete(
            `/teacher/del_pwd/${row.id}`
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
          const { data: res } = await this.$http.post("/teacher/del_pwd", arr);
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
          "密码类型",
          "姓名",
          "所属部门",
          "电话",
          "身份证号",
          "更改时间",
        ];
        const filterVal = [
          "account",
          "password_type",
          "name",
          "section",
          "phone",
          "ID_number",
          "creat_time",
        ];
        const list = this.studentList;
        console.log(list);
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "教师修改密码列表");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    selct(e) {
      console.log(e);
      this.studentList = e;
    },

    //按条件查询信息
    async select_studentMessage() {
      const { data: res } = await this.$http.post("/teacher/find_pwd", this.searchList);
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

    // 添加信息
    async addStudent() {
      this.addStu.department_major = this.value.join("-");
      const { data: res } = await this.$http.post("/add_message", this.addStu);
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
