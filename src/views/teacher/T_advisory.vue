<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>教师服务</el-breadcrumb-item>
        <el-breadcrumb-item>技术支持</el-breadcrumb-item>
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
          <el-button type="primary" icon="el-icon-search">查询信息</el-button>
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
        <el-table-column type="index" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="account" label="账号"> </el-table-column>
        <el-table-column prop="text" label="内容"> </el-table-column>
        <el-table-column prop="imgURL" label="问题图片">
          <template slot-scope="scope">
            <el-image
              style="width: 50px; height: 50px"
              :src="scope.row.imgurl[0]"
              :preview-src-list="scope.row.imgurl"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="creat_time" label="询问时间" width="140">
        </el-table-column>
        <el-table-column label="编辑" fixed="right" width="240">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="edit(scope.row)"
              >详情</el-button
            >
            <el-button type="danger" size="small" @click="remove(scope.row)"
              >删除</el-button
            >
            <el-button type="success" size="small" @click="reply(scope.row)"
              >回复</el-button
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
          <el-input
            v-model="editStu.name"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="工号">
          <el-input
            v-model="editStu.account"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="询问问题">
          <el-input
            disabled
            type="textarea"
            :rows="2"
            v-model="editStu.text"
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
      array1: [],
      array2: [],
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
      const { data: res } = await this.$http.get("/teacher/advisory");
      this.tableData = res.data;
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
          const { data: res } = await this.$http.delete(`/teacher/advisory/${row.id}`);
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
          const { data: res } = await this.$http.post("/teacher/advisories", arr);
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
        const tHeader = ["姓名","工号","内容", "申请日期"];
        const filterVal = ["name","account","text", "creat_time"];
        const list = this.studentList;
        console.log(list);
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "技术问题");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    selct(e) {
      this.studentList = e;
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
    // 回复消息
    reply(){
      console.log('123');
    }
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
      width: 180px;
      height: 180px;
    }
  }
}
</style>
