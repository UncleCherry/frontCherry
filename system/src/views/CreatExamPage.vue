<template>
  <div style="width:100%;display: flex;justify-content: center; margin-top:50px;">
    <div style="width:100%">
    <div style="width:95%">
      <div style="float: left; font-weight:bold; font-size:20px">&nbsp&nbsp&nbsp&nbsp考试总览</div>
        <div style="float: right">
             <el-button type="primary" round @click="openCreate">新建</el-button>
        </div>
        <div style="clear: both;"></div>
      </div>
      <el-main>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="ExamId" label="考试代码" sortable min-width="15%">
        </el-table-column>
        <el-table-column prop="CourseId" label="课程代码" sortable min-width="15%">
        </el-table-column>
        <el-table-column prop="CourseName" label="课程名称" sortable min-width="15%">
        </el-table-column>
        <el-table-column prop="StartTime" label="考试开始时间" sortable min-width="15%">
        </el-table-column>
        <el-table-column prop="EndTime" label="考试结束时间" sortable min-width="15%">
        </el-table-column>
        <el-table-column prop="MeetingId" label="会议号" sortable min-width="15%">
        </el-table-column>
        <el-table-column  sortable label="操作" min-width="10%">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="openChange(scope.$index)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-dialog :title=title :visible.sync="dialogTableVisible" ref="dialog">
      <div v-if="isCreate">
      <el-row :span="200">
        <el-col :span="20">
          <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width:90%;padding-top:20px;padding-bottom:10px">
              <el-form-item label="考试课程" prop="startTime">
              <el-select v-model="courseId" placeholder="选择课程" @change="setCourseId" >
              <el-option
                v-for="item in allWithoutExam"
                :key="item.CourseId"
                :label="item.CourseName"
                :value="item.CourseId">
              </el-option>
            </el-select>
            </el-form-item>
          <el-form-item label="开始时间" prop="startTime">
              <el-date-picker
                v-model="starttime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="MM/dd/yyyy HH:mm:ss">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop="endTime">
              <el-date-picker
                v-model="endtime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="MM/dd/yyyy HH:mm:ss">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="会议号" prop="meetingId">
              <el-input v-model="meetingid" placeholder="请输入考试会议号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="create()">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
          </el-form>
        </el-col>
        </el-row>
        </div>
    </el-dialog>



    <el-dialog :title=title :visible.sync="changeExamTableVisible" ref="dialog">
      <div v-if="isCreate">
      <el-row :span="200">
        <el-col :span="20">
          <el-form :model="changeExamForm"  ref="changeExamForm" label-width="100px" class="demo-ruleForm" style="width:90%;padding-top:20px;padding-bottom:10px">
              <el-form-item label="考试课程" prop="startTime">
              <el-select v-model="courseName" placeholder="选择课程" @change="setExamId">
              <el-option
                v-for="item in tableData"
                :key="item.CourseId"
                :label="item.CourseName"
                :value="item.ExamId">
              </el-option>
            </el-select>
            </el-form-item>
          <el-form-item label="开始时间" prop="starttime">
              <!-- <el-input v-model="changeExamForm.starttime" placeholder="请输入考试开始时间  格式:2022-08-08 10:00:00"></el-input> -->
              <el-date-picker
                v-model="starttime1"
                type="datetime"
                placeholder="选择日期时间"
                value-format="MM/dd/yyyy HH:mm:ss">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop="endtime">
            <el-date-picker
                v-model="endtime1"
                type="datetime"
                placeholder="选择日期时间"
                value-format="MM/dd/yyyy HH:mm:ss">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="会议号" prop="meetingid">
              <el-input v-model="meetingid" placeholder="请输入考试会议号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="change">立即修改</el-button>
            <el-button type = "danger" @click="deleteExam">删除考试</el-button>
          </el-form-item>
          </el-form>
        </el-col>
        </el-row>
        </div>
    </el-dialog>
  </div>
  </div>
</template>

<script>
import {getAllExam,changeExam,deleteExam,createExam} from '@/api/Exam.js'
import axios from 'axios'
import { getAllCourse,allWithoutExam } from '@/api/course'
  export default {
    inject: ['reload'],
    mounted(){
      this.$refs.dialog.rendered=true;
    },
    created(){
      allWithoutExam().then(response=>{
        /*this.$message({
          message: '获取课程信息成功',
          type: 'success'
        });*/
        this.allWithoutExam=response.data.CoursesList
      }).catch((error)=>{
        this.$message({
          message: '获取课程信息失败',
          type: 'warning'
        });
      })
      getAllCourse().then(response=>{
        /*this.$message({
          message: '获取课程信息成功',
          type: 'success'
        });*/
        this.allCourse=response.data.CoursesList
      }).catch((error)=>{
        this.$message({
          message: '获取课程信息失败',
          type: 'warning'
        });
      })
      getAllExam().then(response=>{
        /*this.$message({
          message: '获取考试信息成功',
          type: 'success'
        });*/
        this.tableData=response.data.ExamsList
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
        starttime1:'',
        starttime:'',
        examId:"",  
        endtime:'',
        endtime1:'',
        meetingid: '',
        title:'',



        courseId:"",
        courseName:"",
        allCourse: [],
        allWithoutExam:[],
        tableData: [],
        dialogTableVisible: false,
        changeExamTableVisible: false,
        isCreate:false,
        value1:''
      }
    },
    methods: {
      test(){
        console.log(this.value1);
      },
      setCourseId(){
        this.ruleForm.courseid = this.courseId;
        console.log(this.ruleForm.courseid);
      },
      setExamId(){
        this.changeExamForm.examid = this.examId;
      },
      openCreate(){
        this.meetingid='';
        this.dialogTableVisible=true;
        this.title="添加考试";
        this.isCreate=true; 
      },
      create(){
        // var param=this.ruleForm;
        var param={
          courseid: this.courseId,
          starttime: this.starttime,
          endtime: this.endtime,
          meetingid: this.meetingid,
        }
        axios.all([createExam(param).then(response=>{
          this.$message({
            message: '创建考试成功',
            type: 'success'
          });
        }).catch((error)=>{
          this.$message({
            message: '创建考试失败',
            type: 'warning'
          });
        })]).then(()=>{
          this.reload();
        })
      },
      openChange(index){
        this.changeExamTableVisible=true;
        this.title="修改考试";
        this.isCreate=true; 
        this.courseName = this.tableData[index].CourseName;
        this.examId = this.tableData[index].ExamId;
        // this.changeExamForm.starttime = this.tableData[index].StartTime.replace(" ","T");
        // this.changeExamForm.endtime = this.tableData[index].EndTime.replace(" ","T");
        this.starttime1 = this.tableData[index].StartTime;
        this.endtime1 = this.tableData[index].EndTime;
        this.meetingid = this.tableData[index].MeetingId;

        console.log(this.changeExamForm);
      },
      change(){
        //var param=this.changeExamForm;
        var param={
          examid:this.examId,
          starttime: this.starttime1,
          endtime: this.endtime1,
          meetingid: this.meetingid,
        };
        console.log(param);
        axios.all([changeExam(param).then(response=>{
          this.$message({
            message: '修改考试成功',
            type: 'success'
          });
        }).catch((error)=>{
          this.$message({
            message: '修改考试失败',
            type: 'warning'
          });
        })]).then(()=>{
          this.reload();
        })        
      },
      close(){
        this.dialogTableVisible=false;
      },
      deleteExam(){
        if(this.examId != ""){
        var param = {examid:this.examId};
        axios.all([deleteExam(param).then(response=>{
          this.$message({
            message: '删除考试成功',
            type: 'success'
          });
        }).catch((error)=>{
          this.$message({
            message: '删除考试失败',
            type: 'warning'
          });
        })]).then(()=>{
          this.reload();
        })  
        }else{
          this.$message({
            message: '请选择要删除的考试',
            type: 'warning'
          });          
        }
      },
    }
  }

</script>

<style lang="scss" scoped>

</style>