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
      <el-table :data="tableData" height="100%">
        <el-table-column prop="number" label="序号" sortable width="120">
        </el-table-column>
        <el-table-column prop="code" label="课程代码" sortable width="150">
        </el-table-column>
        <el-table-column prop="name" label="课程名称" sortable width="200">
        </el-table-column>
        <el-table-column prop="time" label="考试时间" sortable width="120">
        </el-table-column>
        <el-table-column prop="place" label="考试地点" sortable width="120">
        </el-table-column>
        <el-table-column prop="examState" label="考试情况" sortable width="120">
        </el-table-column>
        <el-table-column prop="remark" label="考试备注" sortable width="120">
        </el-table-column>
        <el-table-column prop="verifyState" label="审核状态" sortable width="120">
        </el-table-column>
        <el-table-column prop="updateDate" sortable label="操作">
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
        type: 'success'
      });
      this.examList=response.data.ExamsList
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
      changeTableData(){
        var year=this.semester[this.curSemester].substring(0,4);
        var semester=this.semester[this.curSemester].substring(4);
        this.tableData=[];
        for(var i=0;i<this.examList.length();++i)
        {
          if(this.examList[i].Year==year&&this.examList[i].Semester==semester)
          {
              var temp={
                  courseId:this.examList[i].CourseId,
                  courseName:this.examList[i].CourseName,
                  examId:this.examList[i].ExamId,
                  startTime:this.examList[i].StartTime,
                  endTime:this.examList[i].EndTime,
                  meetingId:this.examList[i].MeetingId,
              };
              this.tableData.push(temp);
          }
        }
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