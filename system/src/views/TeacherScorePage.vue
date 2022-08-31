<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix"></div>
    <div style="width: 100%">
      <div style="font-weight: bold; font-size: large">考试信息</div>
      <el-table
        :data="
          tableData_1.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )
        "
        border
        @selection-change="handleSelectionChange"
        ref="multipleTable"
      >
        <el-table-column type="selection" width="50"> </el-table-column>
        <el-table-column prop="ExamId" label="考试编号" width="200">
        </el-table-column>
        <el-table-column prop="CourseId" label="课程编号" width="200">
        </el-table-column>
        <el-table-column prop="CourseName" label="课程名称" width="200">
        </el-table-column>
        <el-table-column prop="Year" label="年份" width="200">
        </el-table-column>
        <el-table-column prop="Semester" label="学期" width="200">
        </el-table-column>
        <el-table-column label="录入学生成绩" width="200">
          <template slot-scope="scope">
            <el-button
              size="medium"
              icon="el-icon-edit"
              @click="EditGrade(scope.$index, scope.row)"
            ></el-button>
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

    <el-dialog title="考生信息" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column
          property="date"
          label="日期"
          width="150"
        ></el-table-column>
        <el-table-column
          property="name"
          label="姓名"
          width="200"
        ></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { getTeacherScore } from "@/api/grade";
import { ShowStudentScore } from "@/api/grade";

export default {
  name: "TeacherScorePage",
  data() {
    return {
      courseName: "",
      search: "",
      courseMsg: "",
      multipleSelection: [],
      tableData_1: [],
      currentPage: 1,
      pageSize: 2,
      dialogTableVisible: false,
      dialogFormVisible: false,
      // gridData: [
      //   {
      //     date: "2016-05-02",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1518 弄",
      //   },
      //   {
      //     date: "2016-05-04",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1518 弄",
      //   },
      //   {
      //     date: "2016-05-01",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1518 弄",
      //   },
      //   {
      //     date: "2016-05-03",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1518 弄",
      //   },
      // ],
    };
  },
  created() {
    getTeacherScore()
      .then((response) => {
        this.$message({
          message: "获取考试信息成功",
          type: "success",
        });
        this.tableData_1 = response.data.ExamsList;
      })
      .catch((error) => {
        this.$message({
          message: "获取考试信息失败",
          type: "warning",
        });
      });
  },
  mounted() {
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
  methods: {
    // submitApplication() {
    //   this.applicationMsg = [];
    //   var applyType_;
    //   if (this.applyType === "申请免修") applyType_ = 2;
    //   else applyType_ = 3;
    //   var param = { reason: this.applyReason, type: applyType_ };
    //   StudentCreateScoreApplication(param)
    //     .then((response) => {
    //       this.$message({
    //         message: "申请失败",
    //         type: "success",
    //       });
    //     })
    //     .catch((error) => {
    //       this.$message({
    //         message: "申请成功",
    //         type: "warning",
    //       });
    //     });
    //   var that = this;
    //   setTimeout(function () {
    //     that.reload();
    //   }, 500);
    // },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    EditGrade(index, row) {
      this.dialogTableVisible = true;
      var examid = row.ExamId;
      console.log(row.ExamId, "ID");
      ShowStudentScore(examid)
        .then((response) => {
          this.$message({
            message: "查询考生信息成功",
            type: "success",
          });
        })
        .catch((error) => {
          this.$message({
            message: "查询考生信息失败",
            type: "warning",
          });
        });
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
