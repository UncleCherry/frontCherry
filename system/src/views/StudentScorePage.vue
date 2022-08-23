<template>
    <el-container style="height: 100%; margin-top:0px; margin-left:0px">
    <el-header style=" background-color: #545c64;">
      <span style="color:white;  font-size: 15px;">{{semester[curSemester]}}成绩查询</span>
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
      <el-table :data="tableData" height="600px" style="width: 100%">
        <el-table-column type="index" label="序号" min-width="12%">
        </el-table-column>
        <el-table-column prop="code" label="课程代码" sortable min-width="12%">
        </el-table-column>
        <el-table-column prop="name" label="课程名称" sortable min-width="14%">
        </el-table-column>
        <el-table-column prop="examId" label="考试号" sortable  min-width="14%">
        </el-table-column>
        <el-table-column prop="credit" label="学分" sortable min-width="12%">
        </el-table-column>
        <el-table-column prop="gpa" label="绩点" sortable min-width="12%">
        </el-table-column>
        <el-table-column prop="grade" label="成绩" sortable min-width="12%">
        </el-table-column>
        <el-table-column prop="pass" label="是否通过" sortable min-width="12%">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import {getGrades} from "../api/grade";
  export default {
    name: 'Score',
    created(){
      getGrades().then(response=>{
          this.$message({
            message: '获取成绩成功',
            type: 'success'
          });
          this.allGrades=response.data;
          }).catch((error)=>{
            this.$message({
              message: '获取成绩失败',
              type: 'warning'
            });
          return;
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
        for(var i=0;i<this.allGrades.length();++i)
        {
          if(this.allGrades[i].Year==year&&this.allGrades[i].Semester==semester)
          {
            var grade=this.allGrades[i].Grade;
            var pass="是",gpa;
            if(parseInt(grade)<60)
            {
              pass="否";
              gpa=0;
            }
            else if(parseInt(grade)>=60&&parseInt(grade)<70)
            {
              gpa=2;
            }
            else if(parseInt(grade)>=70&&parseInt(grade)<80)
            {
              gpa=3;
            }
            else if(parseInt(grade)>=80&&parseInt(grade)<90)
            {
              gpa=4;
            }
            else
            {
              gpa=5;
            }
            var temp={

            }
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