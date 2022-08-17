<template>
    <el-container style="height: 100%; margin-top:0px; margin-left:0px">
        <el-header style=" background-color: #545c64;">
        <span style="color:white;  font-size: 15px;">计算考勤成绩</span>
        </el-header>
      <el-main style="margin-top:-20px">
        <div>
            <el-input placeholder="请输入内容" v-model="courseid" @input="change($event)">
                <template slot="prepend">课程ID:</template>
            </el-input>
            <el-button type="primary" icon="el-icon-search" @click.native="getResult">搜索</el-button>
        </div>
        <AttendanceScoreTable :AttendanceScoreMsg="message" style="margin-top: 50px"/>
      </el-main>
      </el-container>
</template>

<script>
import AttendanceScoreTable from '@/components/AttendanceScoreTable.vue'
export default {
  name: 'AttendanceScore',
  data() {
      return{
        /*到时候从head里面读出具体学期再从数据库中取数据*/ 
        message:[],
        courseid:'',
        date:'',
        id:'',
      }
    },
   methods:{
    change(event){
        this.$forceUpdate(event)
    },
    getResult(){
        this.message=["1002019 - 数据库 - 张三 - 200001 - 90 - 1",
                      "1002019 - 数据库 - 李四 - 200002 - 80 - 1,2,3"];
        
    },
  },    
  components: {
    AttendanceScoreTable,
}
}
</script>

<style>
.el-input {
  margin-top: 30px;
  margin-right: 30px;
  width: 200px;
}
</style>