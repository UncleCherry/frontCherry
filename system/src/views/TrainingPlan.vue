<template>
    <div style="width:100%;display: flex;justify-content: center; margin-top:50px;">
        <el-card class="box-card" >
            <div slot="header" class="clearfix">
                <span>{{grade}}{{major}}专业培养计划</span>
            </div>
            <div >
                <PlanTable :tableData=planData />
            </div>
        </el-card>
    </div>
</template>

<script>
import PlanTable from '@/components/PlanTable'
import {getStudentPlan} from '@/api/trainingPlan.js'
export default {
  name: 'TrainingPlan',
  created(){
    getStudentPlan().then(response=>{
      this.data=response.data.TrainingPlan
      this.grade=this.data.Grade+"年"
      this.major=this.data.Major      
      this.planData.push(eval("(" + this.data.Info + ")"))
      this.subtotal()
      this.total()
    }).catch((error)=>{
      this.$message({
        message: '获取培养计划失败',
        type: 'warning'
      });
    })
  },
  data() {
      return{
        planData:[],
        data:'',
        grade:'',
        major:'',
        info:''
      }
    },
   methods:{
    subtotal(){
      var subttl={
        课程类别:"学分小计",
        大类基础课程:this.planData[0].大类基础课程,
        个性课程:this.planData[0].个性课程,
        通识必修课:parseInt(this.planData[0].通识必修课)+parseInt(this.planData[0].通识选修课),
        通识选修课:this.planData[0].通识选修课,
        专业基础课:parseInt(this.planData[0].专业基础课)+parseInt(this.planData[0].专业必修课)+parseInt(this.planData[0].专业选修课),
        专业必修课:this.planData[0].专业必修课,
        专业选修课:this.planData[0].专业选修课,
        实践环节:this.planData[0].实践环节
      }
      this.planData.push(subttl);
    },
    total(){
      var ttl={
        课程类别:"学分总计",
        大类基础课程:parseInt(this.planData[0].大类基础课程)+parseInt(this.planData[0].个性课程)+parseInt(this.planData[0].通识必修课)+parseInt(this.planData[0].通识选修课)+parseInt(this.planData[0].专业基础课)+parseInt(this.planData[0].专业必修课)+parseInt(this.planData[0].专业选修课)+parseInt(this.planData[0].实践环节),
        个性课程:"",
        通识必修课:"",
        通识选修课:"",
        专业基础课:"",
        专业必修课:"",
        专业选修课:"",
        实践环节:""
      }
      this.planData.push(ttl);
    },
  },    
  components: {
    PlanTable
  }
}
</script>


<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    height: 500px;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 95%;
  }
</style>