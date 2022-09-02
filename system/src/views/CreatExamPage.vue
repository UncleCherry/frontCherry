<template>
  <div style="width:100%;display: flex;justify-content: center; margin-top:50px;">
    <div style="width:80%">
      <div style="float: left; font-weight:bold; font-size:20px">考试总览</div>
        <div style="float: right">
             <el-button type="primary" round @click="openCreate">新建</el-button>
        </div>
        <div style="clear: both;"></div>
      <el-main>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="ExamId" label="考试代码" sortable width="150">
        </el-table-column>
        <el-table-column prop="CourseId" label="课程代码" sortable width="150">
        </el-table-column>
        <el-table-column prop="CourseName" label="课程名称" sortable width="150">
        </el-table-column>
        <el-table-column prop="StartTime" label="考试开始时间" sortable width="200">
        </el-table-column>
        <el-table-column prop="EndTime" label="考试结束时间" sortable width="200">
        </el-table-column>
        <el-table-column prop="MeetingId" label="会议号" sortable width="120">
        </el-table-column>
        <el-table-column  sortable label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="openChange">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-dialog :title=title :visible.sync="dialogTableVisible" width="75%" ref="dialog">
      <div v-if="isCreate">
      <el-row :span="200">
        <el-col :span="20">
          <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width:90%;padding-top:20px;padding-bottom:10px">
              <el-form-item label="考试课程" prop="startTime">
              <el-select v-model="value" placeholder="选择课程" @change="setCourseId">
              <el-option
                v-for="item in allCourse"
                :key="item.CourseId"
                :label="item.CourseName"
                :value="item.CourseId">
              </el-option>
            </el-select>
            </el-form-item>
          <el-form-item label="开始时间" prop="startTime">
              <el-input v-model="ruleForm.starttime" placeholder="请输入课程时间  格式:2022-08-08T10:00:00"></el-input>
          </el-form-item>
          <el-form-item label="结束时间" prop="endTime">
              <el-input v-model="ruleForm.endtime" placeholder="请输入课程时间  格式:2022-08-08T11:00:00"></el-input>
          </el-form-item>
          <el-form-item label="会议号" prop="meetingId">
              <el-input v-model="ruleForm.meetingid" placeholder="请输入考试会议号"></el-input>
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



    <el-dialog :title=title :visible.sync="changeExamTableVisible" width="75%" ref="dialog">
      <div v-if="isCreate">
      <el-row :span="200">
        <el-col :span="20">
          <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width:90%;padding-top:20px;padding-bottom:10px">
              <el-form-item label="考试课程" prop="startTime">
              <el-select v-model="value" placeholder="选择课程" @change="setCourseId">
              <el-option
                v-for="item in allCourse"
                :key="item.CourseId"
                :label="item.CourseName"
                :value="item.CourseId">
              </el-option>
            </el-select>
            </el-form-item>
          <el-form-item label="开始时间" prop="startTime">
              <el-input v-model="ruleForm.starttime" placeholder="请输入课程时间  格式:2022-08-08T10:00:00"></el-input>
          </el-form-item>
          <el-form-item label="结束时间" prop="endTime">
              <el-input v-model="ruleForm.endtime" placeholder="请输入课程时间  格式:2022-08-08T11:00:00"></el-input>
          </el-form-item>
          <el-form-item label="会议号" prop="meetingId">
              <el-input v-model="ruleForm.meetingid" placeholder="请输入考试会议号"></el-input>
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
  </div>
  </div>
</template>

<script>
import {getAllExam,changeExam,deleteExam,createExam} from '@/api/Exam.js'
import CreateExamTable from '@/components/CreateExamTable.vue'
import ChangeExamTable from '@/components/ChangeExamTable.vue'
import PlanTable from '@/components/PlanTable.vue'
import axios from 'axios'
import { getAllCourse } from '@/api/course'
  export default {
    inject: ['reload'],
    mounted(){
      this.$refs.dialog.rendered=true;
    },
    created(){
      getAllCourse().then(response=>{
        this.$message({
          message: '获取课程信息成功',
          type: 'success'
        });
        this.allCourse=response.data.CoursesList
      }).catch((error)=>{
        this.$message({
          message: '获取课程信息失败',
          type: 'warning'
        });
      })
      getAllExam().then(response=>{
        this.$message({
          message: '获取考试信息成功',
          type: 'success'
        });
        this.tableData=response.data.ExamsList
      }).catch((error)=>{
        this.$message({
          message: '获取考试信息失败',
          type: 'warning'
        });
      })
    },
    data() {
      return {
        ruleForm: {
          courseid: '',
          starttime: '',
          endtime: '',
          meetingtd: '',
        },
        changeForm: {
          examid: '',
          starttime: '',
          endtime: '',
          meetingtd: '',
        },

        allCourse: [],
        tableData: [],
        dialogTableVisible: false,
        changeExamTableVisible: false,
        title:'',
        planData:[],
        grade:'',
        major:'',
        isCreate:false,
        isModify:false,
      }
    },
    components:{
      CreateExamTable
    },
    methods: {
      setCourseId(value){
        this.ruleForm.courseid = value;
        console.log(this.ruleForm.courseid);
      },
      changeExam(index, row) {
        this.isModify=true;
        this.isCreate=false;
        this.planData=[];
        this.grade=row["Grade"];
        this.major=row["Major"];
        this.title=this.grade+"年"+this.major+"专业培养计划";
        this.planData.push(eval("(" + row["Info"] + ")"));
        this.subtotal();
        this.total();
        this.dialogTableVisible=true;
  
        this.$refs.planTbl.isEdit=false;
      },
      modify(){
        this.$refs.planTbl.isEdit=true;
        this.$message({
          message: '单击单元格输入修改',
          type: 'success'
        });
      },
      openCreate(){
        this.dialogTableVisible=true;
        this.title="添加考试";
        this.isModify=false
        this.isCreate=true; 
        this.$refs.planTbl.isEdit=true;
      },
      create(){
        var param=this.ruleForm;
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
      openChange(){
        this.changeExamTableVisible=true;
        this.title="修改考试";
        this.isModify=false
        this.isCreate=true; 
        this.$refs.planTbl.isEdit=true;
      },
      change(){
        var param=this.ruleForm;
        axios.all([changeExam(param).then(response=>{
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
      close(){
        this.dialogTableVisible=false;
      },

    }
  }

</script>

<style lang="scss" scoped>

</style>