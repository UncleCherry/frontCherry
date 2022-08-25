<template>
    <el-container style="height: 100%; margin-top:0px; margin-left:0px">
      <el-header style=" background-color: #545c64;">
        <span style="color:white;  font-size: 15px;">考勤成绩</span>
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
            <template slot="prepend">课程ID:</template>
          </el-autocomplete>
          <el-button style="background:#409EFF; border-color:#409EFF; margin-top: 30px;" type="primary" icon="el-icon-search" @click.native="getResult">搜索</el-button>
        </div>
        <AttendanceScoreTable :AttendanceScoreMsg="message" style="margin-top: 50px"/>
      </el-main>
      </el-container>
</template>

<script>
import AttendanceScoreTable from '@/components/AttendanceScoreTable.vue'
import { getInstructorCourse } from '@/api/course'
import { getStudentAttendance } from '@/api/attendance'
import { getAttendanceScore } from '@/api/attendance';
export default {
  name: 'AttendanceScore',
  mounted(){
    let courseMsg=''
    let _this=this
    getInstructorCourse().then(response=>{
      courseMsg=response.data.CoursesList
      _this.courselist=[]
      _this.message=[]
      _this.number=""
      for(var i=0;i<courseMsg.length;++i)
      {
        _this.courselist.push({"value":courseMsg[i].CourseId.toString(),"name":courseMsg[i].CourseName})
        _this.courseid=courseMsg[i].CourseId.toString()
        //_this.getStuAtt()
        _this.getAttScore()
      }
      _this.courseid=""
    }).catch((error)=>{
      console.log(error)
      this.$message({
        message: '获取授课信息失败',
        type: 'warning'
      });
    })
  },

  data() {
      return{
        message:[],
        courseid:'',
        number:'',
        id:'',
        courselist:[],
      }
    },
   methods:{
    change(event){
      this.$forceUpdate(event)
    },
    getResult(){
      this.message=[]
      //this.getStuAtt()
      this.getAttScore()
    },
    getAttScore(){
      var _this = this
      var param = {
        courseid:_this.courseid,
      };
      getAttendanceScore(param).then(response=>{
        let list = response.data.AttendanceGradeList
        for(var i = 0; i < list.length; ++i){
          let tmp = ''
          tmp += list[i].CourseId + ' - '
          tmp += list[i].CourseName + ' - '
          tmp += list[i].Name + ' - '
          tmp += list[i].StudentId + ' - '
          tmp += list[i].grade + ' - '
          /* let absence = ''
          var param_att = {
            courseid:_this.courseid,
            number:_this.number,
            studentid:list[i].StudentId,
          };
          getStudentAttendance(param_att).then(response=>{
            let att_list = response.data.AttendanceList
            var count = 0;
            for(var i = 0; i < att_list.length; ++i){
              if(att_list[i].IsEffective == false){
                if(count > 0){
                  absence += ','
                }
                count++;
                absence += att_list[i].CourseNumber
              }
            }
          }).catch((error)=>{
              this.$message({
              message: '获取考勤信息失败',
              type: 'warning'
            });
          });
          tmp += absence */
          tmp += list[i].absence
          _this.message.push(tmp);
        }
      }).catch((error)=>{
        this.$message({
          message: '获取考勤成绩失败',
          type: 'warning'
        });
      });
    },
    getStuAtt(){
      var _this=this
      var param={
          courseid:_this.courseid,
          number:_this.number,
          studentid:"",
        };
      getStudentAttendance(param).then(response=>{
              let list=response.data.AttendanceList
              for(var i=0;i<list.length;++i){
                let tmp=''
                tmp+=list[i].CourseId+' - '
                tmp+=list[i].CourseName+' - '
                tmp+=list[i].CourseNumber+' - '
                tmp+=list[i].Name+' - '
                tmp+=list[i].StudentId+' - '
                if(list[i].IsEffective==true){
                  if(list[i].StartTime!=undefined){
                    list[i].StartTime=new Date(list[i].StartTime)
                    list[i].EndTime=new Date(list[i].EndTime)
                    tmp+=list[i].StartTime.getMonth()+'.'+list[i].StartTime.getDate()+' - '
                    tmp+=list[i].StartTime.getHours()+':'+list[i].StartTime.getMinutes()+':'+list[i].StartTime.getSeconds()+' - '
                    tmp+=list[i].EndTime.getHours()+':'+list[i].EndTime.getMinutes()+':'+list[i].EndTime.getSeconds()+' - '
                  }
                  else{
                    tmp+='/ - '
                    tmp+='/ - '
                    tmp+='/ - '
                  }
                  tmp+='是'
                }
                else{
                  tmp+='/ - '
                  tmp+='/ - '
                  tmp+='/ - '
                  tmp+='否'
                }
                _this.message.push(tmp);
              }
            }).catch((error)=>{
              this.$message({
              message: '获取考勤信息失败',
              type: 'warning'
            });
          });
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
    AttendanceScoreTable,
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