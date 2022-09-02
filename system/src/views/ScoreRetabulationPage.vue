<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <div style="float: left; display: inline-block, inline">
        <span>申请课程名称</span>
        <el-select
          v-model="courseName"
          clearable
          placeholder="请选择"
          style="width: 300px; margin-left: 10px"
        >
          <el-option
            v-for="item in courseMsg"
            :key="item.CourseID"
            :label="item.CourseName"
            :value="item.CourseName"
          >
          </el-option>
        </el-select>
      </div>

      <div>
        <el-upload
          style="clear: both; float: left; margin-top: 30px"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary"
            >点击上传成绩复核申请表</el-button
          >
        </el-upload>
      </div>
      <el-button
        size="small"
        style="float: right; margin-top: 30px"
        type="primary"
        @click="Apply"
        >申请</el-button
      >
    </div>
    <div style="width: 100%">
      <div style="font-weight: bold; font-size: large">申请成绩复核列表</div>

      <el-table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        border
        @selection-change="handleSelectionChange"
        ref="multipleTable"
      >
        <el-table-column type="selection" width="50"> </el-table-column>
        <!-- <el-table-column prop="courseName" label="课程名称" width="230">
        </el-table-column> -->
        <el-table-column prop="Time" label="申请日期" width="340">
        </el-table-column>
        <!-- <el-table-column prop="Type" label="申请类型" width="300">
        </el-table-column> -->
        <el-table-column prop="State" label="审核状态" width="300">
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >撤销申请</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="clear: both; float: left; margin-top: 15px">
        <el-button @click="toggleSelection(tableData)">全选</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>

      <el-pagination
        style="clear: both; margin-top: 30px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 5]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="20"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import { getStudentCourse } from "@/api/course";
import { StudentCreateScoreApplication } from "@/api/apply";
import { getStudentScoreApplication } from "@/api/apply";

export default {
  data() {
    return {
      courseNameOptions: [],
      courseName: "",
      applyType: "",
      applyReason: "",
      search: "",
      fileList: [],
      applicationMsg: [],
      courseMsg: [],
      multipleSelection: [],
      tableData: [],
      currentPage: 1,
      pageSize: 2,
    };
  },
  created() {
    getStudentCourse()
      .then((response) => {
        this.$message({
          message: "获取授课信息成功",
          type: "success",
        });
        this.courseMsg = response.data.CoursesList;
      })
      .catch((error) => {
        this.$message({
          message: "获取授课信息失败",
          type: "warning",
        });
      });
    // getStudentScoreApplication()
    //   .then((response) => {
    //     this.tableData = [];
    //     this.$message({ message: "获取申请信息成功", type: "success" });
    //     console.log(response.data.ApplicaitionsList);
    //     this.tableData = response.data.ApplicaitionsList;
    //   })
    //   .catch((error) => {
    //     this.$message({ message: "获取申请信息失败", type: "warning" });
    //   });
  },
  mounted() {
    getStudentScoreApplication()
      .then((response) => {
        this.tableData = [];
        this.$message({ message: "获取申请信息成功", type: "success" });
        console.log(response.data.ApplicaitionsList);
        this.tableData = response.data.ApplicaitionsList;
      })
      .catch((error) => {
        this.$message({ message: "获取申请信息失败", type: "warning" });
      });
  },
  methods: {
    Apply() {
      if (this.courseName != "") {
        this.$confirm(
          "是否确定申请复核成绩" + ":《" + this.courseName + "》",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            this.applicationMsg = [];
            var applyType_ = 4;
            var param = { reason: this.applyReason, type: applyType_ };
            StudentCreateScoreApplication(param)
              .then((response) => {
                this.$message({ message: "申请成功", type: "success" });
              })
              .catch((error) => {
                this.$message({ message: "申请失败", type: "warning" });
              });
            var that = this;
            setTimeout(function () {
              that.reload();
            }, 500);
            // this.tableData.push({
            //   couseName: this.CourseName,
            //   applyType: this.applyType,
            // });
          })
          .catch(() => {
            this.$message({ type: "info", message: "已取消申请" });
          });
      } else {
        this.$message({ type: "info", message: "未选择申请课程" });
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}?`);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      this.tableData.splice(index, 1);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
  },
};
</script>

<style>
.text {
  font-size: 20px;
}

.item {
  margin-bottom: 18px;
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
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
