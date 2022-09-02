<template>
    <el-container style="height: 100%; margin-top:-19px; margin-left:-12px">
    <el-header style=" background-color: #545c64;">
      <span style="color:white;  font-size: 15px;">{{semester[curSemester]}}考试安排查询</span>
      <el-dropdown style=" font-size : 12px; float:right;">
        <span style="color:white; font-size: 12px; float:right">切换学期</span>
        <i class="el-icon-setting" style=" color:white; "></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="item in 4" :key="item" @click.native="changeSemester(item-1)">
            {{semester[item-1]}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </el-header>
    
    <el-main>
      <el-table :data="tableData" width="100%">
        <el-table-column prop="CourseId" label="课程代码" sortable width="150">
        </el-table-column>
        <el-table-column prop="CourseName" label="课程名称" sortable width="150">
        </el-table-column>
        <el-table-column prop="StartTime" label="考试开始时间" sortable width="200">
        </el-table-column>
        <el-table-column prop="EndTime" label="考试结束时间" sortable width="200">
        </el-table-column>
        <el-table-column prop="MeetingId" label="会议号" sortable width="150">
        </el-table-column>
        <el-table-column  sortable label="操作">
          <template slot-scope="scope">
          <el-button
            size="mini"
            @click="OpenRetakeExamPage(scope.$index, scope.row)">申请缓考/重考</el-button>
        </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import { getAllExam} from '../api/Exam'
export default {
  name: 'ExamSchedulePage',
  created(){
    getAllExam().then(response=>{
      this.$message({
        message: '获取考试信息成功',
        //message: response.data.ExamsList,
        type: 'success'
      });
      this.tableData=response.data.ExamsList
     // for(i=0;i<this.tableData.length;i++){
        //this.tableData[i].StartTime = this.tableData[i].StartTime.replace('T',' ');
       // this.tableData[i].StartTime[10]=' ';
      //}
    }).catch((error)=>{
      this.$message({
        message: '获取考试信息失败',
        type: 'warning'
      });
    })
  },
    data() {
      return {
        tableData:[],
        semester:[
          '2022第二学期',
          '2022第一学期',
          '2021第二学期',
          '2021第一学期',
        ],
        curSemester:0,
        allGrades:[]
      }
    },
    methods: {
      changeSemester(chooseTerm){
        this.curSemester=chooseTerm;
      },
      OpenRetakeExamPage(){
        this.$router.replace("/RetakeExamPage");
      }
    }  
}
</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>