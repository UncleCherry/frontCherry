<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <div style="float: left; display: inline-block, inline">
        <span>申请考试名称</span>
        <el-select
          v-model="courseName"
          clearable
          placeholder="请选择"
          style="width: 300px; margin-left: 10px"
          @change = "changeCourseInfo"
        >
          <el-option
            v-for="item in examMsg"
            :key="item.CourseId"
            :label="item.CourseName"
            :value="{courseId:item.CourseId,
                    courseName:item.CourseName}"
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
      <div style="font-weight: bold; font-size: large">申请缓考/重考列表</div>
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
        <el-table-column prop="courseid" label="课程ID" width="100">
        </el-table-column>
        <el-table-column prop="date" label="申请日期" width="200">
        </el-table-column>
        <el-table-column prop="type" label="申请类型" width="100">
        </el-table-column>
        <el-table-column prop="reason" label="申请理由" width="200">
        </el-table-column>
        <el-table-column prop="state" label="审核状态" width="100">
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="deleteApplication(scope.$index)"
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
import { getAllExam} from "@/api/Exam";
import { StudentCreateScoreApplication } from "@/api/apply";
import { getStudentScoreApplication } from "@/api/apply";
import { deleteLeave } from "@/api/leave";

export default {
  inject:['reload'],
  name: "ApplyTable",
  data() {
    return {
      applyTypeOptions: [
        {
          label: "申请缓考",
          value: "申请缓考",
        },
        {
          label: "申请重考",
          value: "申请重考",
        },
      ],
      courseName: "",
      courseId: "",
      applyType: "",
      applyReason: "",
      search: "",
      fileList: [],
      examMsg: [],
      tableData: [],
      currentPage: 1,
      pageSize: 2,
    };
  },
  created() {
    getAllExam()
      .then((response) => {
        this.examMsg = response.data.ExamsList;
      })
      .catch((error) => {
        this.$message({
          message: "获取考试信息失败",
          type: "warning",
        });
      });
  },
  mounted() {
    this.GetApp();
  },
  methods: {
    GetApp(){
      getStudentScoreApplication()
      .then(async (response) => {
        var list = response.data.ApplicaitionsList;
        this.tableData=[];
        for (var i = 0; i < list.length; ++i) {
          if (list[i].Type != 0 && list[i].Type != 1) continue;
          var tmp = {};
          var myreason = list[i].Reason.split("-");
          var mytime = list[i].Time.split("T");

          tmp['applicationid'] = list[i].ApplicationId;
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
          } else if (list[i].State == 1 || list[i].State == 2) {
            tmp["state"] = "已审核";
          }
          this.tableData.push(tmp);
          this.totalnum++;
        }
      })
      .catch((error) => {
        this.$message({ message: "获取申请信息失败", type: "warning" });
      });
    },
    Apply() {
      var str = "";
      console.log(this.applyTypeOptions.value);
      if (this.courseId != "") {
        if (this.applyReason != "") {
          if (this.applyType != "") {
            if (this.applyType === "申请缓考") {
              str = "是否确定申请缓考课程";
            } else if (this.applyType === "申请重考") {
              str = "是否确定申请重考课程";
            }
            this.$confirm(str + ":《" + this.courseName + "》", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                this.applicationMsg = [];
                var applyType_;
                if (this.applyType === "申请缓考") applyType_ = 1;
                else applyType_ = 0;
                var param = {courseid: this.courseId , reason: this.applyReason, type: applyType_ };
                StudentCreateScoreApplication(param)
                  .then((response) => {
                    this.$message({ message: "申请成功", type: "success" });
                    this.GetApp();
                  })
                  .catch((error) => {
                    this.$message({ message: "申请失败", type: "warning" });
                  });
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
    changeCourseInfo(data){
      const{value, label} = data;
      this.courseId = data.courseId;
      this.courseName = data.courseName;
      console.log(this.courseId);
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
    deleteApplication(index){
      var i= (this.currentPage-1)*2 + index;
      console.log((this.currentPage-1)*2 + index);
      var param = {applicationid:this.tableData[i].applicationid};
      deleteLeave(param)
        .then((response) => {
        this.$message({ message: "撤销成功", type: "success" });
        this.GetApp();
         })
        .catch((error) => {
         this.$message({ message: "撤销失败", type: "warning" });
      });
    }
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
