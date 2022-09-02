<template>
    <el-container style="height: 100%; margin-top:0px;">
        <el-main style="margin-top:0px;">
            <div style="font-weight:bolder;font-size:30px;color:#655A5A;margin-top:30px;" v-if="!isTime">
                很抱歉,期中退课还未开放
                <el-button type="text" style="display:block;margin:0 auto" @click="reload()">刷新</el-button>
                <el-button type="text" style="display:block;margin:0 auto" @click="isTime=true">退课页面试看</el-button>     
            </div>            
            <div v-if="isTime">
                <ClassTable :msgAppend="selectMsg" :classMsg="existMsg"/>
                <ClassList :listMsg="listMsg" @func="dropClass"/>
            </div>
        </el-main>         
    </el-container>
</template>

<script>
import ClassTable from '@/components/ClassTable.vue'
import ClassList from '@/components/ClassList.vue'
import { getStudentCourse,takeCourse,dropCourse } from '@/api/course'
import axios from 'axios'
export default {
  inject: ['reload'],
  name: 'CourseSelect',
  created(){
    /*axios.all等待两个请求结束再执行数据处理函数*/
    axios.all([getStudentCourse().then(response=>{
      this.choosedCourse=response.data.CoursesList
    }).catch((error)=>{
      this.$message({
        message: '获取课程信息失败',
        type: 'warning'
      });
    })]).then(()=>{
      this.particularSemesterCourse(this.choosedCourse,this.year,this.semester);   
      this.processData();
    })
  },
  data() {
      return {
        value: [],
        renderFunc(h, option) {
          return <span>{ option.key } - { option.label }</span>;
        },
        selectMsg:[],
        existMsg:[],
        listMsg:[],
        choosedCourse:[],
        year:"2022",
        semester:"第二学期",
        isTime:false
      };
    },
   methods:{
    dropClass(CourseId){
      console.log(CourseId);
      var param={
        courseid:CourseId
      }
      dropCourse(param).then(response=>{
        this.$message({
          message: '退课成功',
          type: 'success'
        });
      }).catch((error)=>{
        this.$message({
          message: '退课失败',
          type: 'warning'
        });
      });
      var that=this;
      setTimeout(function(){that.reload()},500);
    },

    processData(){
      var i=this.choosedCourse.length;
      for(var n=0;n<i;++n)
      {
        var isRequired=this.choosedCourse[n].IsRequired?"必修":"选修";
        var s = this.choosedCourse[n].CourseName+" - "+this.choosedCourse[n].Credit+" - "+this.choosedCourse[n].TimeSlot+" - "+isRequired+" - "+this.choosedCourse[n].MeetingId;
        this.existMsg.push(s);
        this.listMsg.push(this.choosedCourse[n].CourseId+" - "+s)
      }
      
    },
    particularSemesterCourse(course,year,semester){
      for(var i=0;i<course.length;++i)
      {
        if(!(course[i].Year==year&&course[i].Semester==semester))
        {
          course.splice(i,1);
          --i
        }
      }
    }
  },    
  components: {
      ClassTable,
      ClassList,
  },
}
</script>

<style lang="scss" scoped>
 ::v-deep .el-transfer__buttons {
    display: inline-block;
    vertical-align: middle;
    padding: 0 30px;
}
 ::v-deep .el-button {
    display:table-cell;
}


 ::v-deep .el-transfer-panel {
  width:40%;
}


 ::v-deep .el-button--primary:nth-child(1){
  color: #FFF;
    background-color: #ff1e00;
    border-color: #ff1e00;
}
 ::v-deep .el-button--primary:nth-child(1):focus, .el-button--primary:nth-child(1):hover{
  color: #FFF;
    background-color: #fb492a;
    border-color: #fb492a;
}
 ::v-deep .el-button--primary:nth-child(1):disabled{
  color: #FFF;
    background-color: #ffc3bb;
    border-color: #ffc3bb;
}

</style>