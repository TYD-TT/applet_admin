<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>教师服务</el-breadcrumb-item>
        <el-breadcrumb-item>网络故障</el-breadcrumb-item>
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
        <el-form-item style="display: none">
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
        <el-table-column prop="name" label="姓名" width="110">
        </el-table-column>
        <el-table-column prop="account" label="账号" width="110">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" width="120">
        </el-table-column>
        <el-table-column prop="address" label="故障地点" width="120">
        </el-table-column>
        <el-table-column prop="fault_type" label="故障类型" width="120">
        </el-table-column>
        <el-table-column prop="section" label="所在部门"> </el-table-column>
        <el-table-column prop="fault_message" label="故障描述" width="120">
        </el-table-column>
        <el-table-column prop="imgURL" label="故障图片" width="100">
          <template slot-scope="scope">
            <el-image
              style="width: 50px; height: 50px"
              :src="scope.row.imgurl[0]"
              :preview-src-list="scope.row.imgurl"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope1">
            <div>
              <el-tag type="" size="small" >
                {{
                  scope1.row.status == -1
                    ? "&ensp;审&nbsp;&ensp;核"
                    : scope1.row.status == 0
                    ? "审核中"
                    : "已完成"
                }}</el-tag
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="creat_time" label="申请时间" width="140">
        </el-table-column>
        <el-table-column label="编辑" fixed="right" width="240">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="edit(scope.row)"
              >详情</el-button
            >
            <el-button
              type="success"
              size="small"
              @click="completa(scope.row)" :disabled="scope.row.status == '1'"
              >{{ scope.row.status == "1" ? "已完成" : "完成" }}</el-button
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
          :page-sizes="[10, 20, 50, 100]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 详情页面 -->
    <el-dialog
      title="详情页面"
      :visible.sync="dialogeditFormVisible"
      width="630px"
      top="20px"
    >
      <el-form
        :model="editStu"
        label-position="right"
        label-width="75px"
        ref="addStu"
        class="detali"
      >
        <el-form-item label="姓名">
          <el-input v-model="editStu.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="工号">
          <el-input v-model="editStu.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="editStu.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地点">
          <el-input v-model="editStu.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="故障类型">
          <el-input v-model="editStu.fault_type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在部门">
          <el-input v-model="editStu.section" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="故障描述">
          <el-input
            type="textarea"
            :rows="2"
            v-model="editStu.fault_message"
            style="width: 480px"
          ></el-input>
        </el-form-item>
        <div class="img-message">
          <div
            class="img-message-block"
            v-for="(item, index) in editStu.imgurl"
            :key="index"
          >
            <el-image :src="item" class="img"></el-image>
          </div>
        </div>
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
      imgURL: [],
      tableData: [],
      // table 选择框
      studentList: [],
      // 搜索条件
      searchList: {
        index: "",
        value: "",
      },
      array1: ["工号", "姓名", "联系方式", "故障地点", "申请日期"],
      array2: ["account", "name", "phone", "address", "creat_time"],
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
        phone: "",
      },
      editStu: {},
    };
  },
  methods: {
    // 查询信息
    async selectmessage() {
      const { data: res } = await this.$http.get("/teacher/fault");
      this.tableData = JSON.parse(res.data);
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].imgurl = this.tableData[i].imgURL.split("+");
      }
      this.total = this.tableData.length;
    },
    // 编辑页面
    edit(row) {
      this.dialogeditFormVisible = true;
      this.editStu = row;
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
            `/teacher/del_fault/${row.id}`
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
          const { data: res } = await this.$http.post(
            "/teacher/del_fault",
            arr
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

    // 导出文件为Excel
    exportToExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../excel/Export2Excel");
        const tHeader = [
          "工号",
          "姓名",
          "联系方式",
          "开通端口办公地",
          "部门类型",
          "端口数量",
          "端口通途",
          "所在部门",
          "申请日期",
        ];
        const filterVal = [
          "account",
          "name",
          "phone",
          "address",
          "section_type",
          "port_number",
          "port_number",
          "section",
          "creat_time",
        ];
        const list = this.studentList;
        console.log(list);
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "虚拟服务器开通服务列表");
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
        "/teacher/find_fault",
        this.searchList
      );
      this.tableData = [];
      this.tableData = JSON.parse(res.data);
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].imgurl = this.tableData[i].imgURL.split("+");
      }
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

    // 图片显示
    handleAvatarSuccess(res, file) {
      this.imgURL = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 修改提交表单的状态
    async completa(scope) {
      console.log(scope);
      const pwd_data = {
        sql_type: "tea_fault",
        id: scope.id,
        status: scope.status,
      };
      const { data: res } = await this.$http.post(
        `/teacher/edit_status1`,
        pwd_data
      );
      this.$message.success(res.message);
      this.selectmessage();
    },
  },
  created() {
    this.selectmessage();
  },
};
</script>

<style lang="less" scoped>
.detali {
  display: inline-flex;
  flex-wrap: wrap;
}
.avatar {
  width: 50px;
  height: 50px;
  display: block;
}
.img-message {
  display: inline-flex;
  flex-wrap: wrap;
  .img-message-block {
    width: 48%;
    margin-left: 2%;
    margin-bottom: 10px;
    .img {
      width: 100%;
      height: 180px;
    }
  }
}
</style>
