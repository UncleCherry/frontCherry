<template>
    <el-container style="height: 100%; margin-top:0px; margin-left:0px">
      <el-header style=" background-color: #545c64;">
        <span style="color:white;  font-size: 15px;">{{id}}考勤信息查询</span>
      </el-header>  
      <el-main style="margin-top:-20px">
        <div>
          <el-row>
          <el-col :span="5"><br></el-col>
          <el-col :span="5">
            <el-input placeholder="请输入内容" v-model="courseid" @input="change($event)">
                <template slot="prepend">课程ID:</template>
            </el-input></el-col>
            <el-col :span="5">
            <el-input placeholder="请输入内容" v-model="date" @input="change($event)">
                <template slot="prepend">课次:  </template>
            </el-input></el-col>
            <el-col :span="4">
            <el-button type="primary" icon="el-icon-search" @click.native="getResult">搜索</el-button></el-col>
            </el-row>
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
        message:[],
        courseid:'',
        date:'',
        id:this.$store.state.userName,
      }
    },
   methods:{
    change(event){
        this.$forceUpdate(event)
    },
    getResult(){
        this.message=["1002019 - 数据库 - 1 - 张三 - 200001 - 2.1 - 10:00 - 11.35 - 1",
                      "1002019 - 数据库 - 1 - 张三 - 200001 - 2.3 - 10:00 - 11.35 - 1"];
        
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
  margin-right: 10px;
  width: 250px;
}
.el-button {
  margin-top: 30px;
  margin-right: 10px;
  background:#409EFF;
}
</style>