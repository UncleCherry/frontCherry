<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <div style="float: left; display: inline-block, inline">
        <span>申请课程名称</span>
        <el-select
          v-model="courseID"
          clearable
          placeholder="请选择"
          style="width: 300px; margin-left: 10px"
          @change="getCourseName"
        >
          <el-option
            v-for="item in courseMsg"
            :key="item.CourseId"
            :label="item.CourseName"
            :value="item.CourseId"
          >
          </el-option>
        </el-select>
      </div>
      <div style="clear: both; float: left; margin-top: 30px">
        <span>申请类型</span>
        <el-select
          v-model="applyType"
          clearable
          placeholder="请选择"
          style="width: 200px; margin-left: 10px"
        >
          <el-option
            v-for="item in applyTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div style="clear: both; float: left; margin-top: 30px">
        <span style="text-align: center">申请理由</span>
        <el-input
          type="textarea"
          clearable
          placeholder="请输入内容"
          v-model="applyReason"
          maxlength="200"
          show-word-limit
          style="width: 700px; height: 40px; margin-left: 10px"
        >
        </el-input>
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
          <el-button size="small" type="primary">点击上传申请表</el-button>
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
      <div style="font-weight: bold; font-size: large">申请免修/免听列表</div>
      <el-table
        :data="
          this.tableData.slice(
            (this.currentPage - 1) * this.pageSize,
            this.currentPage * this.pageSize
          )
        "
        border
        @selection-change="handleSelectionChange"
        ref="multipleTable"
      >
        <el-table-column type="selection" width="50"> </el-table-column>
        <el-table-column prop="courseid" label="课程ID" min-width="15%">
        </el-table-column>
        <el-table-column prop="date" label="申请日期" min-width="15%">
        </el-table-column>
        <el-table-column prop="type" label="申请类型" min-width="15%">
        </el-table-column>
        <el-table-column prop="reason" label="申请理由" min-width="25%">
        </el-table-column>
        <el-table-column prop="state" label="审核状态" min-width="15%">
        </el-table-column>
        <el-table-column label="操作" min-width="15%">
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
import { getStudentCourse, getCourseInfo } from "@/api/course";
import { StudentCreateScoreApplication, cancelApplication } from "@/api/apply";
import { getStudentScoreApplication } from "@/api/apply";
import axios from 'axios';

export default {
  inject:['reload'],
  name: "ApplyExemption",
  data() {
    return {
      applyTypeOptions: [
        {
          label: "申请免听",
          value: "申请免听",
        },
        {
          label: "申请免修",
          value: "申请免修",
        },
      ],
      courseID: "",
      courseName: "",
      courseName_: "",
      applyType: "",
      applyReason: "",
      search: "",
      applicationMsg: [],
      courseMsg: [],
      multipleSelection: [],
      tableData: [],
      currentPage: 1,
      pageSize: 2,
      year: "2022",
      semester: "第二学期",
      fileList: [],
    };
  },
  created() {
    getStudentCourse()
      .then((response) => {
        this.$message({
          message: "获取选课信息成功",
          type: "success",
        });
        this.courseMsg = response.data.CoursesList;
        this.particularSemesterCourse(this.courseMsg, this.year, this.semester);
        console.log(this.courseMsg);
      })
      .catch((error) => {
        console.log(error);
        this.$message({
          message: "获取选课信息失败",
          type: "warning",
        });
      });
  },
  mounted() {
    getStudentScoreApplication()
      .then(async (response) => {
        this.$message({ message: "获取申请信息成功", type: "success" });
        var list = response.data.ApplicaitionsList;
        for (var i = 0; i < list.length; ++i) {
          if (list[i].Type != 2 && list[i].Type != 3) continue;
          var tmp = {};
          var myreason = list[i].Reason.split("-");
          var mytime = list[i].Time.split("T");
          tmp["applicationid"] = list[i].ApplicationId;
          tmp["courseid"] = myreason[0];
          tmp["reason"] = myreason[2];
          tmp["date"] = mytime[0];
          tmp["student"] =
            list[i].UserId.toString() + "-" + list[i].StudentName;
          switch (list[i].Type) {
            case 0:
              tmp["type"] = "重考";
              break;
            case 1:
              tmp["type"] = "缓考";
              break;
            case 2:
              tmp["type"] = "免修";
              break;
            case 3:
              tmp["type"] = "免听";
              break;
            case 4:
              tmp["type"] = "成绩复核";
              break;
            case 5:
              tmp["type"] = "请假";
              break;
            default:
              break;
          }
          if (list[i].State == 0) {
            tmp["state"] = "待审核";
          } else if (list[i].State == 1) {
            tmp["state"] = "已通过";
          } else if (list[i].State == 2) {
            tmp["state"] = "已拒绝";
          }
          
          var _param = { courseid: tmp["courseid"] };
          getCourseInfo(_param)
            .then((response) => {
              this.courseName_ = response.data.course.CourseName;
              // console.log(this.courseName_);
            })
            .catch((error) => {
              this.$message({
                message: "获取课程信息失败",
                type: "warning",
              });
            });
          console.log(this.courseName_);
          tmp["coursename"] = this.courseName_;
          this.tableData.push(tmp);
          this.totalnum++;
        }
      })
      .catch((error) => {
        this.$message({ message: "获取申请信息失败", type: "warning" });
      });
  },
  computed: {},
  methods: {
    getCourseName() {
      var _param = { courseid: this.courseID };
      getCourseInfo(_param)
        .then((response) => {
          this.courseName = response.data.course.CourseName;
        })
        .catch((error) => {
          this.$message({
            message: "获取课程信息失败",
            type: "warning",
          });
        });
    },
    particularSemesterCourse(course, year, semester) {
      for (var i = 0; i < course.length; ++i) {
        if (!(course[i].Year == year && course[i].Semester == semester)) {
          course.splice(i, 1);
          --i;
        }
      }
    },
    Apply() {
      var str = "";
      if (this.courseID != "") {
        if (this.applyReason != "") {
          if (this.applyType != "") {
            if (this.applyType === "申请免修") {
              str = "是否确定申请免修课程";
            } else if (this.applyType === "申请免听") {
              str = "是否确定申请免听课程";
            }
            console.log(this.courseName);
            this.$confirm(str + "《" + this.courseName + "》", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                this.applicationMsg = [];
                var applyType_;
                if (this.applyType === "申请免修") applyType_ = 2;
                else applyType_ = 3;
                var str = this.courseName;
                console.log(str);
                str = this.courseName + "-" + this.applyReason;
                console.log(str);
                var param = {
                  reason: this.applyReason,
                  type: applyType_,
                  courseid: this.courseID,
                };
                axios.all([
                  StudentCreateScoreApplication(param)
                  .then((response) => {
                    this.$message({ message: "申请成功", type: "success" });
                  })
                  .catch((error) => {
                    this.$message({ message: "申请失败", type: "warning" });
                  })
                ]).then(()=>{
                  this.reload();
                })
                
              })
              .catch(() => {
                this.$message({ type: "info", message: "已取消申请" });
              });
          } else {
            this.$message({ type: "info", message: "未选择申请类型" });
          }
        } else {
          this.$message({ type: "info", message: "申请理由不能为空" });
        }
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
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    handleDelete(index, row) {
      this.tableData.splice(index, 1);
      console.log(row.applicationid);
      var param = { applicationid: row.applicationid };
      console.log(param);
      cancelApplication(param)
        .then((response) => {
          this.$message({
            message: "撤销申请成功",
            type: "success",
          });
        })
        .catch((error) => {
          this.$message({
            message: "撤销申请失败",
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
