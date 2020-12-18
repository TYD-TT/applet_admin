<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>文章管理</el-breadcrumb-item>
        <el-breadcrumb-item>文章列表 </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card style="margin-top: 15px">
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
        <el-table-column type="selection" @select="mm(selection, row)">
        </el-table-column>
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="imgUrl" label="标题图片">
          <template slot-scope="scope">
            <img :src="scope.row.imgUrl" alt="标题图片" style="height: 3rem" />
          </template>
        </el-table-column>
        <el-table-column prop="creat_time" label="上传时间"> </el-table-column>
        <el-table-column label="编辑">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="edit(scope)"
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

    <!-- 编辑内容 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="60%">
      <el-form
        label-width="120px"
        @submit.native.prevent="save"
        height="900px"
        style="margin-top: 15px"
      >
        <el-form-item label="标题图">
          <el-upload
            class="avatar-uploader"
            :action="$http.defaults.baseURL + '/upload'"
            :show-file-list="false"
            :on-success="afterUpload"
          >
            <img v-if="model.imgUrl" :src="model.imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="model.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <vue-editor
            v-model="model.content"
            useCustomImageHandler
            @image-added="handleImageAdded"
          ></vue-editor>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      model: {
        avatar: "",
        title: "",
        content: "",
      },
      tableData: [],
      // 分页
      queryInfo: {
        quwey: "",
        pagenum: 1,
        pagesize: 7,
      },
      // 总数据条数
      total: 0,
      dialogVisible: false,
    };
  },
  methods: {
    edit(value) {
      this.dialogVisible = !this.dialogVisible;
      this.model = value.row
    },
    async select() {
      const { data: res } = await this.$http.get("/select/contents");
      console.log(res);
      this.tableData = res.data;
      this.total = this.tableData.length
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
            `/del_message/${row.id}`
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
    selct(e) {
      this.studentList = e;
      console.log(e);
    },
    // 分页切换
    handleSizeChange(val) {
      this.queryInfo.pagesize = val;
    },
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val;
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
  created() {
    this.select();
  },
};
</script>

<style lang="less" scoped>
</style>
