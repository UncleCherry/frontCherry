<template>
  <div style="width:100%;display: flex;justify-content: center; margin-top:50px;">
    <div style="width:80%">
      <div style="float: left; font-weight:bold; font-size:20px">培养计划总览</div>
        <div style="float: right">
             <el-button type="primary" round @click="openCreate">新建</el-button>
        </div>
        <div style="clear: both;"></div>
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="年份"
        min-width="25%"
        sortable>
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.Grade }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="专业"
        min-width="25%"
        prop="Major">
      </el-table-column>
      <el-table-column
        label="创建教务id"
        min-width="25%"
        prop="AdminId"
        sortable>
      </el-table-column>
      <el-table-column label="操作" min-width="25%">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleCheck(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>

    <el-dialog :title=title :visible.sync="dialogTableVisible" width="75%" ref="dialog">
      <div v-if="isCreate">
        <el-col :span="11">
            <el-date-picker type="year" placeholder="选择年份" v-model="grade" value-format="yyyy-MM-dd" ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
            <el-select v-model="value" placeholder="选择专业">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-col>
      </div>
      <PlanTable :tableData="planData" ref="planTbl"/>
      <div v-if="isModify" style="margin-top:30px;margin-bottom:15px">
        <el-button type="primary" icon="el-icon-edit" @click="modify">修改</el-button>
        <el-button type="success" icon="el-icon-check" @click="submit">确认</el-button>
      </div>
      <div v-if="isCreate" style="margin-top:30px;margin-bottom:15px">
        <el-button type="primary" icon="el-icon-check" @click="create">创建</el-button>
        <el-button type="danger" icon="el-icon-close" @click="close">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getAllPlans,altTrainingPlan,createTrainingPlan} from '@/api/trainingPlan.js'
import PlanTable from '@/components/PlanTable.vue'
import axios from 'axios'
  export default {
    inject: ['reload'],
    mounted(){
      this.$refs.dialog.rendered=true;
    },
    created(){
      getAllPlans().then(response=>{
        this.tableData=response.data.PlansList
      }).catch((error)=>{
        this.$message({
          message: '获取培养计划失败',
          type: 'warning'
        });
      })
    },
    data() {
      return {
        tableData: [],
        dialogTableVisible: false,
        title:'',
        planData:[],
        grade:'',
        major:'',
        isCreate:false,
        isModify:false,
        options: [{
          value: '软件工程',
          label: '软件工程'
        }, {
          value: '计算机科学与技术',
          label: '计算机科学与技术'
        }, {
          value: '大数据',
          label: '大数据'
        }, {
          value: '电子信息',
          label: '电子信息'
        },{
          value: '自动化',
          label: '自动化'
        },{
          value: '网络安全',
          label: '网络安全'
        },{
          value: '测绘',
          label: '测绘'
        },{
          value: '光电',
          label: '光电'
        },],
        value: ''
      }
    },
    components:{
      PlanTable
    },
    methods: {
      handleCheck(index, row) {
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
      submit(){
        if(this.$refs.planTbl.isEdit!=true)
        {
          this.dialogTableVisible=false;
          return;
        }
        //过滤
        var infomation={
          课程类别:this.planData[0].课程类别,
          大类基础课程:this.planData[0].大类基础课程,
          个性课程:this.planData[0].个性课程,
          通识必修课:this.planData[0].通识必修课,
          通识选修课:this.planData[0].通识选修课,
          专业基础课:this.planData[0].专业基础课,
          专业必修课:this.planData[0].专业必修课,
          专业选修课:this.planData[0].专业选修课,
          实践环节:this.planData[0].实践环节
        }
        var param={
          grade:this.grade,
          major:this.major,
          info:JSON.stringify(infomation)
        }
        altTrainingPlan(param).then(response=>{
          this.$message({
            message: '修改培养计划成功',
            type: 'success'
          });
          this.dialogTableVisible=false;
        }).catch((error)=>{
          this.$message({
            message: '修改培养计划失败',
            type: 'warning'
          });
        })
      },
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
      openCreate(){
        this.dialogTableVisible=true;
        this.planData=[{
          课程类别:"需修学分",
          大类基础课程:"0",
          个性课程:"0",
          通识必修课:"0",
          通识选修课:"0",
          专业基础课:"0",
          专业必修课:"0",
          专业选修课:"0",
          实践环节:"0"
        }];
        this.title="新建专业培养计划";
        this.isModify=false
        this.isCreate=true; 
        this.$refs.planTbl.isEdit=true;
      },
      create(){
         var infomation={
          课程类别:this.planData[0].课程类别,
          大类基础课程:this.planData[0].大类基础课程,
          个性课程:this.planData[0].个性课程,
          通识必修课:this.planData[0].通识必修课,
          通识选修课:this.planData[0].通识选修课,
          专业基础课:this.planData[0].专业基础课,
          专业必修课:this.planData[0].专业必修课,
          专业选修课:this.planData[0].专业选修课,
          实践环节:this.planData[0].实践环节
        }
        var param={
          grade:this.grade.slice(0,4),
          major:this.value,
          info:JSON.stringify(infomation)
        }
        axios.all([createTrainingPlan(param).then(response=>{
          this.$message({
            message: '创建培养计划成功',
            type: 'success'
          });
        }).catch((error)=>{
          this.$message({
            message: '创建培养计划失败',
            type: 'warning'
          });
        })]).then(()=>{
          this.reload();
        })
      },
      close(){
        this.dialogTableVisible=false;
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>