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
      let _this = this
      var valid = false
      for(var i = 0; i < _this.courselist.length; ++i){
        if(_this.courseid.toString() == _this.courselist[i]["value"]){
          valid = true
          break
        }
      }
      if(valid == false){
        this.$message({
          message:'查询的课程不在您所教课程范围内，请重新填写',
          type:'warning',
        })
      }else{
        this.getAttScore()
      }
    },
    getAttScore(){
      var _this = this
      var param = {
        courseid:_this.courseid,
        number:"",
        studentid:"",
      };
      getStudentAttendance(param).then(response=>{
        let list = response.data.AttendanceList
        let score = []
        var count = 0
        for(var i = 0; i < list.length; ++i){
          var valid = false
          var j = 0
          for(j = 0; j < score.length; ++j){
            if(score[j]["courseid"] == list[i].CourseId && score[j]["studentid"] == list[i].StudentId){
              valid = true
              break
            }
          }
          if(valid == false){
            score[count] = { "courseid":list[i].CourseId,
            "coursename":list[i].CourseName,
            "name":list[i].Name,
            "studentid":list[i].StudentId,
            "absence":'无',
            "count":0 }
            if(list[i].IsEffective == false){
              score[count]["absence"] = list[i].CourseNumber
              score[count]["count"] = 1
            }else{
              score[count]["absence"] = '无'
              score[count]["count"] = 0
            }
            count++
          }else{
            score[j]["count"]++
            if(score[j]["absence"] == '无'){
              score[j]["absence"] = list[i].CourseNumber
            }else{
              score[j]["absence"] += ','
              score[j]["absence"] += list[i].CourseNumber
            }
          }
        }
        for(var k = 0; k < score.length; ++k){
          var mygrade = 100 - 10 * score[k]["count"]
          let tmp = ''
          tmp += score[k]["courseid"] + ' - '
          tmp += score[k]["coursename"] + ' - '
          tmp += score[k]["name"] + ' - '
          tmp += score[k]["studentid"] + ' - '
          tmp += mygrade + ' - '
          tmp += score[k]["absence"]
          _this.message.push(tmp);
        }
      }).catch((error)=>{
        console.log(error)
        this.$message({
          message: '获取考勤成绩失败',
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