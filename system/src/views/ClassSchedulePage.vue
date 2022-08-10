<template>
    <el-container style="height: 100%; margin-top:0px; margin-left:0px">
      <el-header style=" background-color: #545c64;">
        <ClassTableHead ref="head" @func="updateTable"/>
      </el-header>
      <el-main style="margin-top:-20px">
        <ClassTable :classMsg="msg" ref="table"/>
        </el-main>
      </el-container>
</template>

<script>
import ClassTable from '@/components/ClassTable.vue'
import ClassTableHead from '@/components/ClassTableHead.vue'
import { getStudentCourse } from '@/api/course'
export default {
  name: 'ScoreRetabulation',
  created(){
    getStudentCourse().then(response=>{
      this.$message({
        message: '获取课程信息成功',
        type: 'success'
      });
      this.courseMsg=response.data.CoursesList
      this.updateTable()
    }).catch((error)=>{
      this.$message({
        message: '获取课程信息失败',
        type: 'warning'
      });
    })
  },
  data() {
      return{
        /*到时候从head里面读出具体学期再从数据库中取数据*/ 
        msg:[],
        courseMsg:''
      }
    },
  methods:{
    updateTable(){
      this.msg=[];
      var year=this.$refs.head.semester[this.$refs.head.curSemester].substring(0,4);
      var semester =this.$refs.head.semester[this.$refs.head.curSemester].substring(4);
      for(var i=0;i<this.courseMsg.length;++i)
      {
        if(year == this.courseMsg[i].Year&&semester==this.courseMsg[i].Semester)
        {
          var s =this.courseMsg[i].CourseName+" - "+this.courseMsg[i].Credit+" - "+this.courseMsg[i].TimeSlot
          this.msg.push(s);
        }
      }
    },
  },    
  components: {
    ClassTable,
    ClassTableHead
  }
}
</script>

<style>
</style>