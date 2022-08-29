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
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        border
        @selection-change="handleSelectionChange"
        ref="multipleTable"
      >
        <el-table-column type="selection" width="55"> </el-table-column>

        <el-table-column prop="Snum" label="序号" width="120">
        </el-table-column>
        <el-table-column prop="CourseID" label="课程ID" width="160">
        </el-table-column>
        <el-table-column prop="courseName" label="课程名称" width="230">
        </el-table-column>
        <el-table-column prop="applyDate" label="申请日期" width="210">
        </el-table-column>
        <el-table-column prop="applyType" label="申请类型" width="155">
        </el-table-column>
        <el-table-column prop="State" label="审核状态" width="160">
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >重新编辑</el-button
            >
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
        :page-sizes="[2, 5, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="10"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "ApplyExemption",
  data() {
    return {
      courseNameOptions: [
        {
          label: "数据库原理和应用",
          value: "数据库原理和应用",
        },
        {
          label: "计算机系统结构",
          value: "计算机系统结构",
        },
        {
          label: "操作系统",
          value: "操作系统",
        },
        {
          label: "系统分析与设计",
          value: "系统分析与设计",
        },
        {
          label: "毛泽东思想概述",
          value: "毛泽东思想概述",
        },
      ],
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
      courseName: "",
      applyType: "",
      applyReason: "",
      search: "",
      fileList: [],
      multipleSelection: [],
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
      currentPage: 1,
      pageSize: 2,
    };
  },
  methods: {
    Apply() {
      var str = "";
      console.log(this.applyTypeOptions.value);
      if (this.courseName != "") {
        if (this.applyReason != "") {
          if (this.applyType != "") {
            if (this.applyType === "申请免修") {
              str = "是否确定申请免修课程";
            } else if (this.applyType === "申请免听") {
              str = "是否确定申请免听课程";
            }
            this.$confirm(str + ":《" + this.courseName + "》", "提示", {
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
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    handleDelete(index, row) {
      console.log(index, row);
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
