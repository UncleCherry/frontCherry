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
            v-for="item in courseNameOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
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
          action=""
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" style="float: right" type="primary"
            >点击上传申请表</el-button
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

    <el-table
      :data="tableData"
      height="250"
      highlight-current-row="true"
      border
      style="width: 100%"
    >
      <el-table-column prop="Snum" label="序号" width="100"> </el-table-column>
      <el-table-column prop="CourseID" label="课程ID" width="120">
      </el-table-column>
      <el-table-column prop="courseName" label="课程名称" width="180">
      </el-table-column>
      <el-table-column prop="applyDate" label="申请日期" width="120">
      </el-table-column>
      <el-table-column prop="applyType" label="申请类型" width="120">
      </el-table-column>
      <el-table-column prop="State" label="审核状态" width="180">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.row)"
            type="text"
            size="small"
            style="color: red"
            >撤销申请</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      style="bottom: 0%"
      layout="prev, pager, next"
      :total="1000"
    >
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  name: "ApplyExemption",
  data() {
    return {
      courseNameOptions: [
        {
          value: "选项1",
          label: "数据库原理和应用",
        },
        {
          value: "选项2",
          label: "计算机系统结构",
        },
        {
          value: "选项3",
          label: "操作系统",
        },
        {
          value: "选项4",
          label: "系统分析与设计",
        },
        {
          value: "选项5",
          label: "毛泽东思想概述",
        },
      ],
      applyTypeOptions: [
        {
          value: "选项1",
          label: "申请免听",
        },
        {
          value: "选项2",
          label: "申请免修",
        },
      ],
      courseName: "",
      applyType: "",
      applyReason: "",
      tableData: [
        {
          Snum: 1,
          CourseID: 20512314,
          courseName: "数据库原理和应用",
          applyDate: "2016-05-03",
          applyType: "免修",
          State: "正在申请",
        },
        {
          Snum: 2,
          CourseID: 20534512,
          courseName: "计算机系统结构",
          applyDate: "2022-02-03",
          applyType: "免听",
          State: "申请通过",
        },
      ],
    };
  },
  methods: {
    Apply() {
      var str = "";
      if (this.courseName != "") {
        if (this.applyReason != "") {
          if (this.applyTypeOptions.label == "申请免修") {
            str = "是否确定申请免修课程";
            console.log(str);
          } else if (this.applyTypeOptions.label == "申请免听") {
            str = "是否确定申请免听课程";
            console.log(str);
          }
          this.$confirm(this.courseName + "", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.$message({ type: "success", message: "申请成功!" });
            })
            .catch(() => {
              this.$message({ type: "info", message: "已取消申请" });
            });
        } else {
          this.$message({ type: "info", message: "申请理由不能为空" });
        }
      } else {
        this.$message({ type: "info", message: "未选择申请课程" });
      }
    },
    exemption() {
      if (this.value != "") {
        if (this.textarea != "") {
          this.$confirm(
            "是否确定申请《" + this.value + "》这门课程免修",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
          )
            .then(() => {
              this.$message({
                type: "success",
                message: "申请成功!",
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消申请",
              });
            });
        } else {
          this.$message({
            type: "info",
            message: "理由不能为空",
          });
        }
      } else {
        this.$message({
          type: "info",
          message: "未选择申请课程",
        });
      }
    },
    freeAttendance() {
      if (this.value != "") {
        if (this.textarea != "") {
          this.$confirm(
            "是否确定申请《" + this.value + "》这门课程免听",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
          )
            .then(() => {
              this.$message({
                type: "success",
                message: "申请成功!",
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消申请",
              });
            });
        } else {
          this.$message({
            type: "info",
            message: "理由不能为空",
          });
        }
      } else {
        this.$message({
          type: "info",
          message: "未选择申请课程",
        });
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
    handleClick(row) {
      console.log(row);
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
