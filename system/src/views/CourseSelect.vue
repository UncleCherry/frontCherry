<template>
    <el-container style="height: 100%; margin-top:0px;">
      <el-main style="margin-top:-20px;">
        <div style="border-right: 0; border-bottom: 0; width:100%;">
            <el-transfer
            style="text-align: left; display: inline-block; width:100%;"
            v-model="value"
            filterable
            :left-default-checked="[]"
            :right-default-checked="[]"
            :render-content="renderFunc"
            :titles="['待选', '预选']"
            :button-texts="['取消预选', '预选课程']"
            :format="{
                noChecked: '${total}',
                hasChecked: '${checked}/${total}'
            }"
            @change="handleChange"
            :data="data">
            <el-button class="transfer-footer" slot="left-footer" size="small" >切换选课种类</el-button>
            <el-button class="transfer-footer" slot="right-footer" size="small" @click="submitChange">提交选课</el-button>
            </el-transfer>
        </div>
        <ClassTable :msgAppend="selectMsg" :classMsg="existMsg"/>
        <ClassList :listMsg="listMsg" @func="dropClass"/>
      </el-main>
    </el-container>
</template>

<script>
import ClassTable from '@/components/ClassTable.vue'
import ClassList from '@/components/ClassList.vue'
import { getAllCourse,getStudentCourse,takeCourse,dropCourse } from '@/api/course'
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
    }),getAllCourse().then(response=>{
      this.allCourse=response.data.CoursesList
    }).catch((error)=>{
      this.$message({
        message: '获取课程信息失败',
        type: 'warning'
      });
    })]).then(()=>{
      this.particularSemesterCourse(this.choosedCourse,this.year,this.semester);   
      this.particularSemesterCourse(this.choosedCourse,this.year,this.semester);
      this.processData();
    })
    //初始化二维数组
    this.checkArray = new Array(12); //表格有12行
    for(var i = 0;i < this.checkArray.length; ++i){
      this.checkArray[i] = new Array(7).fill(0); //每行有7列
    }
  },
  data() {
      //时间格式：周几？-？节，多个时间段用/分开
      const generateData = _ => {
        const data = [{
          key:123456,
          label:'软件工程课程设计 - 2 - 周三10-11节',
        },{
          key:123457,
          label:'软件设计模式 - 2 - 周一10-11节/周四7-8节',
        }];
        // for (let i = 1; i <= 15; i++) {
        //   data.push({
        //     key:123456+i,
        //     label: `课程名称 - 学分 - 上课时间`,
        //     disabled: i % 4 === 0
        //   });
        // }
        return data;
      };
      return {
        data: [],
        value: [],
        renderFunc(h, option) {
          return <span>{ option.key } - { option.label }</span>;
        },
        selectMsg:[],
        checkArray:[[]], //将课程表转化为二维数组检查是否有时间冲突

        existMsg:[],
        listMsg:[],
        allCourse:[],
        choosedCourse:[],
        year:"2022",
        semester:"第二学期"
      };
    },
   methods:{
    /*将预选信息选出用于改变课程表，和现存课程时间冲突的课程将预选失败并提醒*/
    handleChange(value, direction, movedKeys) {
      this.clearCheckArr();
      this.fillCheckArr();
      this.selectMsg=[];
      for(var i=0;i<value.length;++i)
      {
        var m=this.data.find(c => c.key===value[i]).label.split(" - ");
        var times = m[2].split("/");
        if(!this.checkTime(times))
        {
          this.$message({
            message: '课号为'+value[i]+'的课程时间冲突',
            type: 'warning'
          });
          
          value.splice(i,1);
          this.value.splice(i,1);
          --i;          
        }
        else
        {
          this.selectMsg.push(this.data.find(c => c.key===value[i]).label);
        }
      }
    },
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
    submitChange(){
      this.selectMsg=[];
      for(var i=0;i<this.value.length;++i)
      {
        var param={
          courseid:this.value[i]
        };
        takeCourse(param).then(response=>{
          this.$message({
            message: '选课成功',
            type: 'success'
          });
        }).catch((error)=>{
          this.$message({
            message: '选课失败',
            type: 'warning'
          });
        });
      }
      this.value=[];
      
      var that = this;
      setTimeout(function(){that.reload()},500);
    },
    /*将检测数组用已存在的课程填充*/
    fillCheckArr(){
      for(var i=0;i<this.choosedCourse.length;++i)
      {
        var times=this.choosedCourse[i].TimeSlot.split("/");
        for(var j=0;j<times.length;++j)
        {
          var section=times[j].split("-")
          var start,end;
          if(section.length==2)
          {
            start = parseInt(section[0].substring(1).substring(1));
            end = parseInt(section[1]);
          }
          else
            start=end=parseInt(section[0]);
          for(var k=start;k<=end;++k)
          {             
            if(times[j][1]==="一")
            {
                this.checkArray[k-1][0]=1;
            }
            else if(times[j][1]==="二")
            {
                this.checkArray[k-1][1]=1;
            }
            else if(times[j][1]==="三")
            {
                this.checkArray[k-1][2]=1;
            }
            else if(times[j][1]==="四")
            {
                this.checkArray[k-1][3]=1;
            }
            else if(times[j][1]==="五")
            {
                this.checkArray[k-1][4]=1;
            }
            else if(times[j][1]==="六")
            {
                this.checkArray[k-1][5]=1;
            }
            else if(times[j][1]==="日")
            {
                this.checkArray[k-1][6]=1;
            }
          }
        }
      }
    },
    checkTime(times){
      for(var j=0;j<times.length;++j)
      {
        var section=times[j].split("-")
        var start,end;
        if(section.length==2)
        {
          start = parseInt(section[0].substring(1).substring(1));
          end = parseInt(section[1]);
        }
        else
          start=end=parseInt(section[0]);
        for(var k=start;k<=end;++k)
        {             
          if(times[j][1]==="一")
          {
            if(this.checkArray[k-1][0]==1)
              return false;
            else
              this.checkArray[k-1][0]=1;
          }
          else if(times[j][1]==="二")
          {
            if(this.checkArray[k-1][1]==1)
              return false;
            else
              this.checkArray[k-1][1]=1;
          }
          else if(times[j][1]==="三")
          {
            if(this.checkArray[k-1][2]==1)
              return false;
            else
              this.checkArray[k-1][2]=1;
          }
          else if(times[j][1]==="四")
          {
            if(this.checkArray[k-1][3]==1)
              return false;
            else
              this.checkArray[k-1][3]=1;
          }
          else if(times[j][1]==="五")
          {
            if(this.checkArray[k-1][4]==1)
              return false;
            else
              this.checkArray[k-1][4]=1;
          }
          else if(times[j][1]==="六")
          {
            if(this.checkArray[k-1][5]==1)
              return false;
            else
              this.checkArray[k-1][5]=1;
          }
          else if(times[j][1]==="日")
          {
            if(this.checkArray[k-1][6]==1)
              return false;
            else
              this.checkArray[k-1][6]=1;
          }
        }
      }
      return true;
    },
    clearCheckArr(){
      for(var i=0;i<12;++i)
      {
        for(var j=0;j<7;++j)
          this.checkArray[i][j]=0;
      }
    },
    /*在选课学期里面所有课程中去掉已选的放入未选数组，已选的放入已选数组 */
    processData(){
      var i=this.choosedCourse.length;
      var j=this.allCourse.length;
      console.log(i);
      if(i>0)
      {
        for(var m=0;m<j;++m)
        {
          for(var n=0;n<i;++n)
          {
            if(this.allCourse[m].CourseId==this.choosedCourse[n].CourseId)
            {
              this.allCourse.splice(m,1);
              --m;
              --j;
              break;
            }
          }
        }
      }
      for(var m=0;m<j;++m)
      {
        var s = {
          key:this.allCourse[m].CourseId,
          label:this.allCourse[m].CourseName+" - "+this.allCourse[m].Credit+" - "+this.allCourse[m].TimeSlot
        }
        this.data.push(s);
      }
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