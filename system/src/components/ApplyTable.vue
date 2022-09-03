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
  </el-card>
</template>

<script>
import { getAllExam} from "@/api/Exam";
import { StudentCreateScoreApplication } from "@/api/apply";
import { getStudentScoreApplication } from "@/api/apply";

export default {
  name: "ApplyExemption",
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
  methods: {
    submitApplication() {
      console.log(courseId);
      this.applicationMsg = [];
      var applyType_;
      if (this.applyType === "申请缓考") applyType_ = 1;
      else applyType_ = 0;
      var param = { courseid: this.courseId ,reason: this.applyReason, type: applyType_ };
      StudentCreateScoreApplication(param)
        .then((response) => {
          this.$message({
            message: "申请成功",
            type: "success",
          });
        })
        .catch((error) => {
          this.$message({
            message: "申请失败",
            type: "warning",
          });
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
                var param = { reason: this.applyReason, type: applyType_ };
                StudentCreateScoreApplication(param)
                  .then((response) => {
                    this.$message({ message: "申请成功", type: "success" });
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
