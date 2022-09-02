<template>
    <el-container style="height: 100%; margin-top:0px; margin-left:0px">
        <el-header style=" background-color: #545c64;">
        <span style="color:white;  font-size: 15px;">提交请假申请</span>
        </el-header>
      <el-main style="margin-top:-20px">
        <div>
          <el-autocomplete
            class="inline-input"
            v-model="courseid"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
            @input="change($event)"
          >
            <template slot="prepend">请假课程ID:</template>
          </el-autocomplete>
          <el-input placeholder="请输入内容" v-model="number" @input="change($event)">
            <template slot="prepend">请假课次:  </template>
          </el-input>
          <div style="margin: 15px 0;"></div>
          <span style="float: left;  margin-left: 100px;">请假理由:</span>
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="reason"
              style="width: 1000px"
              maxlength="100"
              show-word-limit
            >
            </el-input>
            <div style="margin: 20px 0;"></div>
            <el-button type="primary" @click.native="createNewLeave">提交申请</el-button>
        </div>
        <ApplyLeaveTable :LeaveMsg="message" style="margin-top: 50px"/>
      </el-main>
      </el-container>
</template>

<script>
import ApplyLeaveTable from '@/components/ApplyLeaveTable.vue'
import { getCourseInfo } from '@/api/course';
import { getStudentInfo } from "@/api/studentInfo";
import { getStudentCourse } from '@/api/course'
import { createLeave,getStudentLeave } from '@/api/leave'
export default {
  name: 'ApplyLeave',
  inject:['reload'],
  created(){
    let token=localStorage.getItem('Authorization')
    let _this = this
    if(token==null||token==''){
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
        _this.id=response.data.studentID;
        let courseMsg=''
        getStudentCourse().then(response=>{
          courseMsg=response.data.CoursesList
          _this.courselist=[]
          for(var i=0;i<courseMsg.length;++i)
          {
            _this.courselist[i]={"value":courseMsg[i].CourseId.toString(),"name":courseMsg[i].CourseName}
          }
          _this.courseid=''
          _this.number=''
          _this.getLeave()
        }).catch((error)=>{
          this.$message({
            message: '获取课程信息失败',
            type: 'warning'
          });
        })
      }).catch((error)=>{
        this.$message({
          message:error,
          type:'获取学生信息失败'
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
        number:'',
        reason:'',
        id:'',
        courselist:[],
      }
    },
   methods:{
    change(event){
      this.$forceUpdate(event)
    },
    createNewLeave(){
      let _this = this
      var param = {
        courseid:_this.courseid,
        number:_this.number,
        reason:_this.reason,
      };
      console.log(param)
      createLeave(param).then(response=>{
        this.$message({
          message:'提交申请成功',
          type:'success',
        })
        this.reload()
      }).catch((error)=>{
        this.$message({
          message:'提交申请失败',
          type:'warning',
        })
      })
    },
    getLeave(){
      let _this = this
      _this.message = []
      getStudentLeave().then(async(response)=>{
        var list = response.data.ApplicationsList
        for(var i = 0; i < list.length; ++i){
          let tmp = ''
          var myreason = list[i].Reason.split('-')
          var mytime = list[i].Time.split('T')
          var mycoursename = ''
          var param = {
            courseid: parseInt(myreason[0])
          }
          await getCourseInfo(param).then(response=>{
            mycoursename = response.data.course.CourseName
          }).catch((error)=>{
            this.$message({
              message:'获取课程信息失败',
              type:'warning',
            })
          });
          tmp += list[i].ApplicationId + ' - '
          tmp += myreason[0] + ' - '
          tmp += mycoursename + ' - '
          tmp += myreason[1] + ' - '
          tmp += list[i].StudentName + ' - '
          tmp += list[i].UserId + ' - '
          tmp += mytime[0] + ' - '
          tmp += list[i].State
          console.log(tmp)
          _this.message.push(tmp);
        }
      }).catch((error)=>{
        console.log(error);
        this.$message({
          message:'获取申请信息失败',
          type:'warning',
        })
      })
    },
    querySearch(queryString, cb) {
      var strlist = this.courselist;
      var results = queryString ? strlist.filter(this.createFilter(queryString)) : strlist;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (strlist) => {
        return (strlist.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      console.log(item);
    },
  },    
  components: {
    ApplyLeaveTable,
}
}
</script>

<style scoped>
.el-input {
  margin-top: 30px;
  margin-right: 10px;
  width: 250px;
}
.el-autocomplete {
  margin-top: 30px;
  margin-right: 10px;
  width: 250px;
}
</style>