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
            <el-button style="background:#409EFF; border-color:#409EFF; margin-top: 30px;" type="primary" icon="el-icon-search" @click.native="getResult">搜索</el-button></el-col>
            </el-row>
        </div>
        <AttendanceTable :AttendanceMsg="message" style="margin-top: 50px"/>
      </el-main>
      </el-container>
</template>

<script>
import AttendanceTable from '@/components/AttendanceTable.vue';
import {getStudentInfo} from "../api/studentInfo";
import {getStudentAttendance} from "@/api/attendance";
export default {
  name: 'AttendanceRetabulation',
  created(){
      let token=localStorage.getItem('Authorization');
      let _this = this;
        if(token==null||token=='')
        {
          //无token,需要登陆
          console.log('无token信息')
          return;
        }
        else {
          //有token,则读取token
          console.log('有token信息')
          //调用api
          getStudentInfo().then(response=>{
            console.log(response.data);
            //获取api中的数据
            //let _this=this;
            _this.id=response.data.studentID;
            
          }).catch((error)=>{
            this.$message({
              message:error,
              type:'warning'
            });
            console.log('error',error)
            return;
          })
        }
      },
  data() {
      return{
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
      


        this.message=["1002019 - 数据库 - 1 - 张三 - 200001 - 2.1 - 10:00 - 11.35 - 1",
                      "1002019 - 数据库 - 1 - 张三 - 200001 - 2.3 - 10:00 - 11.35 - 1"];
        
    },
  },    
  components: {
    AttendanceTable,
}
}
</script>

<style scoped>
.el-input {
  margin-top: 30px;
  margin-right: 10px;
  width: 250px;
}
</style>