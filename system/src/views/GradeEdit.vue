<template>
<div style="width:100%;margin-top:50px;text-align: center;">
    <div style="width:80%;display: inline-block;">
        <div style="float: left; font-weight:bold; font-size:20px">本学期需要编辑成绩的考试课程信息</div>
        <div style="float: right">
            <el-select v-model="value">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.value"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div style="clear: both;"></div>
    </div>

    <div style="width:80%;display: inline-block;">
        <InsCourseExam :tableData="courseExams" @func="changeExam"/>
    </div>
    <el-divider></el-divider>
    <div style="width:80%;display: inline-block;margin-top:0px">
        <div style="font-weight:bold; font-size:20px">{{courseName}}考试成绩编辑</div>
    </div>
    <div style="width:80%;display: inline-block;margin-top:20px"> 
        <div style="float: left;width:45%">
            <AddGradeTable ref="addTbl" :items="addTblData" @func="addScore"/>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div style="float: right;width:45%">
            <ModGradeTable ref="modTbl" :tableData="modTblData" @func="modScore(arguments)"/>
        </div>
    </div>

</div>

</template>

<script>
import InsCourseExam from '@/components/InsCourseExam.vue'
import AddGradeTable from '@/components/AddGradeTable.vue'
import ModGradeTable from '@/components/ModGradeTable.vue'
import { getCourseExams,getStudentInExam,addGrade,altGrade,delGrade } from '@/api/grade'
import axios from 'axios'
export default {
  inject: ['reload'],
  name: 'GradeEdit',
  created(){
    axios.all([
    getCourseExams().then(response=>{
      this.allCourseExams=response.data.ExamsList
    }).catch((error)=>{
      this.$message({
        message: '获取考试课程失败',
        type: 'warning'
      });
    })
    ]).then(()=>{
        this.changeSemester()
    })
  },
  data() {
      return{
        options: [{
          value: '2022第二学期',
        }, {
          value: '2022第一学期'
        }, {
          value: '2021第二学期'
        }, {
          value: '2021第一学期'
        }, {
          value: '2020第二学期'
        }],
        value: '2022第二学期',
        allCourseExams:[],
        courseExams:[],
        examStudents:[],
        courseName:"",
        addTblData:[],
        modTblData:[],
        params:"" //用于再次执行changeExam更新下半页面
      }
    },
   methods:{
    changeSemester(){
        this.courseExams=[];
        var year=this.value.substring(0,4);
        var semester=this.value.substring(4);
        for(var i=0;i<this.allCourseExams.length;++i)
        {
            if(this.allCourseExams[i].Year==year&&this.allCourseExams[i].Semester==semester)
            {
                var temp={
                    courseId:this.allCourseExams[i].CourseId,
                    courseName:this.allCourseExams[i].CourseName,
                    examId:this.allCourseExams[i].ExamId,
                    startTime:this.allCourseExams[i].StartTime,
                    endTime:this.allCourseExams[i].EndTime,
                    meetingId:this.allCourseExams[i].MeetingId,
                };
                this.courseExams.push(temp);
            }
        }
    },
    changeExam(params){
        this.courseName=params.courseName;
        this.params=params;
        this.$refs.addTbl.examId=params.examId;
        this.$refs.modTbl.examId=params.examId;
        var param={
            examid:params.examId,
        };
        getStudentInExam(param).then(response=>{
            this.examStudents=response.data.StudentsList
            this.divideData();
        }).catch((error)=>{
            this.$message({
                message: '获取考试学生失败',
                type: 'warning'
            });
        });
    },
    divideData(){
      this.addTblData=[];
      this.modTblData=[];
      for(var i=0;i<this.examStudents.length;++i)
      {
        var temp={
          studentId:this.examStudents[i].StudentId,
          studentName:this.examStudents[i].Name,
          score:this.examStudents[i].Grade
        };
        if(this.examStudents[i].Grade==""||this.examStudents[i].Grade==null)
        {
          this.addTblData.push(temp);
        }
        else
        {
          this.modTblData.push(temp);
        }
      }
    },
    //score和grade避免重名
    addScore(params){
      for(var i=0;i<params.length;++i)
      {
        addGrade(params[i]).then(response=>{
        }).catch((error)=>{
            this.$message({
                message: '添加学号为'+params[i].studentid+'的学生成绩失败',
                type: 'warning'
            });
        });
      };
      var that=this;
      setTimeout(function(){that.changeExam(that.params)},500);
    },
    modScore(params){
      console.log(params)
      if(params[0]==0){
        altGrade(params[1]).then(response=>{
        }).catch((error)=>{
            this.$message({
                message: '修改学号为'+params[1].studentid+'的学生成绩失败',
                type: 'warning'
            });
        });
      }
      else if(params[0]==1){
        axios.all([
        delGrade(params[1]).then(response=>{
        }).catch((error)=>{
            this.$message({
                message: '删除学号为'+params[1].studentid+'的学生成绩失败',
                type: 'warning'
            });
        })
        ]).then(()=>{
          this.changeExam(this.params);
        })
      }
    }

  },    
  components: {
    InsCourseExam,
    AddGradeTable,
    ModGradeTable
  },
  watch:{
    value:{
      handler(val){
        this.changeSemester();
      }
    },
  }
}
</script>

<style lang="scss" scoped>
::v-deep.el-divider{
    background-color:rgb(48, 46, 46)
  }

::v-deep.el-divider--vertical {
    display: inline-block;
    width: 1px;
    height: 300px;
    margin: 0 8px;
    vertical-align: middle;
    position: relative;
}
</style>