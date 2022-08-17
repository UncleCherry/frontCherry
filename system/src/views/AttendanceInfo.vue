<template>
    <el-container style="height: 100%; margin-top:0px; margin-left:0px">
        <el-header style=" background-color: #545c64;">
        <span style="color:white;  font-size: 15px;">考勤信息查询</span>
        </el-header>
      <el-main style="margin-top:-20px">
        <div>
            <el-input placeholder="请输入内容" v-model="courseid" @input="change($event)">
                <template slot="prepend">课程ID:</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="date" @input="change($event)">
                <template slot="prepend">日期:  </template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="id" @input="change($event)">
                <template slot="prepend">学号:  </template>
            </el-input>
            <el-button type="primary" icon="el-icon-search" @click.native="getResult">搜索</el-button>
        </div>
        <AttendanceTable :AttendanceMsg="message" style="margin-top: 50px"/>
      </el-main>
      </el-container>
</template>

<script>
import AttendanceTable from '@/components/AttendanceTable.vue'
export default {
  name: 'AttendanceRetabulation',
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
        this.message=["1002019 - 数据库 - 2 - 张三 - 200001 - 2.1 - 10:00 - 11:35 - 1",
                      "1002019 - 数据库 - 3 - 张三 - 200001 - 2.3 - 10:00 - 11:35 - 1"];
        
    },
  },    
  components: {
    AttendanceTable,
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