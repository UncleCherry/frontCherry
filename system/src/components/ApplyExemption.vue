<template>
    <el-card class="box-card" style="margin-left:0px">
    <div slot="header" class="clearfix">
        <span style="float:left;">申请课程名称</span>
        <el-select v-model="value" placeholder="请选择" style="margin-left:10px;width:400px">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.label">
            </el-option>
        </el-select>

          <div style="margin: 30px 0;"></div>
          <div>
            <span style="float:left;">申请理由</span>
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="textarea"
              maxlength="100"
              show-word-limit
              style="width:700px;"
            >
            </el-input>
            <el-upload
  class="upload-demo"
  action=""
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  multiple
  :limit="3"
  :on-exceed="handleExceed"
  :file-list="fileList">
  <el-button size="small" style="margin-left:10px" type="primary">点击上传附件(可选)</el-button>
  <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
</el-upload>
          </div>
          <div>
            <el-button type="text" style="font-size:20px" @click="exemption">申请免修</el-button>
            <el-button type="text" style="margin-left:100px;font-size:20px;" @click="freeAttendance">申请免听</el-button>
          </div>

    </div>


    <el-table
    :data="tableData"
    height="250"
    border
    style="width: 100%">
    <el-table-column
      prop="Snum"
      label="序号"
      width="100">
    </el-table-column>
    <el-table-column
      prop="CourseID"
      label="课程ID"
      width="120">
    </el-table-column>
    <el-table-column
      prop="CourseName"
      label="课程名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="ApplyDate"
      label="申请日期"
      width="120">
    </el-table-column>
    <el-table-column
      prop="ApplyType"
      label="申请类型"
      width="120">
    </el-table-column>
    <el-table-column
      prop="State"
      label="审核状态"
      width="180">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small" style="color:red">撤销申请</el-button>
      </template>
    </el-table-column>
  </el-table>
    </el-card>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          label: '数据库原理和应用'
        }, {
          label: '计算机系统结构'
        }, {
          label: '操作系统'
        }, {
          label: '系统分析与设计'
        }, {
          label: '毛泽东思想概述'
        }],
        value: '',
        textarea: '',
        tableData: [{
          Snum: 1,
          CourseID: 20512314,
          CourseName: '数据库原理和应用',
          ApplyDate:'2016-05-03',
          ApplyType:'免修',
          State:'正在申请',
        }]
      }
    },
    methods: {
        exemption(){
          if(this.value!='')
         {
          if(this.textarea!='')
          {
            this.$confirm('是否确定申请《'+this.value+'》这门课程免修', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '申请成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消申请'
              });
            });
          }
          else{
            this.$message({
                type: 'info',
                message: '理由不能为空'
              });
          }
        }
        else{
          this.$message({
                type: 'info',
                message: '未选择申请课程'
              });
        }
      },
      freeAttendance(){
        if(this.value!='')
         {
          if(this.textarea!='')
          {
            this.$confirm('是否确定申请《'+this.value+'》这门课程免听', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '申请成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消申请'
              });
            });
          }
          else{
            this.$message({
                type: 'info',
                message: '理由不能为空'
              });
          }
        }
        else{
          this.$message({
                type: 'info',
                message: '未选择申请课程'
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
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}?`);
      },
      handleClick(row) {
        console.log(row);
      }
  }
  }
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
    clear: both
  }

  .box-card {
    width: 1000px;
    margin-left:-10px ;
  }
</style>
