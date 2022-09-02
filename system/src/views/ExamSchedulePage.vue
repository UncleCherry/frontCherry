<template>
    <el-container style="height: 100%;margin-top:-19px; margin-left:-12px">
    <el-header style=" background-color: #545c64;">
      <span style="color:white;  font-size: 15px;">考试安排查询</span>
      <el-dropdown style=" font-size : 12px; float:right;">
      </el-dropdown>

    </el-header>
    
    <el-main>
      <el-table :data="tableData" width="100%">
        <el-table-column prop="CourseId" label="课程代码" sortable width="200">
        </el-table-column>
        <el-table-column prop="CourseName" label="课程名称" sortable width="300">
        </el-table-column>
        <el-table-column prop="StartTime" label="考试开始时间" sortable width="250">
        </el-table-column>
        <el-table-column prop="EndTime" label="考试结束时间" sortable width="250">
        </el-table-column>
        <el-table-column prop="MeetingId" label="会议号" sortable width="200">
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

  <el-dialog :visible.sync="tableVisible" width="75%" ref="dialog">
      <div v-if="isCreate">
      <el-row :span="200">
        <el-col :span="20">
          <ApplyTable :tableData="applyData" ref="applyTable"/>
        </el-col>
        </el-row>
        </div>
    </el-dialog>
  </el-container>

</template>





<script>
import { getAllExam} from '../api/Exam'
import ApplyTable from '@/components/ApplyTable.vue'
export default {
  name: 'ExamSchedulePage',
  created(){
    getAllExam().then(response=>{
      this.tableData=response.data.ExamsList;
      for(var i=0;i<this.tableData.length;i++){
        this.tableData[i].StartTime = this.tableData[i].StartTime.replace("T"," ");
        this.tableData[i].EndTime = this.tableData[i].EndTime.replace("T"," ");        
      }

    }).catch((error)=>{
      this.$message({
        message: '获取考试信息失败',
        type: 'warning'
      });
    })
  },
    data() {
      return {
        isCreate: false,
        tableVisible: false,
        tableData:[],
        retForm:{
          reason:"",
        }
      }
    },
  components:{
      ApplyTable
    },
    methods: {
      OpenRetakeExamPage(index,row){
        this.tableVisible = true;
        console.log(index);
        this.isCreate = true;
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