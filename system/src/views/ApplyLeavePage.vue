<template>
    <el-container style="height: 100%; margin-top:0px; margin-left:0px">
        <el-header style=" background-color: #545c64;">
        <span style="color:white;  font-size: 15px;">提交请假申请</span>
        </el-header>
      <el-main style="margin-top:-20px">
        <div>
            <el-input placeholder="请输入内容" v-model="courseid" @input="change($event)">
                <template slot="prepend">请假课程ID:</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="date" @input="change($event)">
                <template slot="prepend">请假课次:  </template>
            </el-input>
          <div style="margin: 15px 0;"></div>
          <span style="float: left;  margin-left: 100px;">请假理由:</span>
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="reason"
              style="width: 1000px"
              maxlength="100"
              show-word-limit
            >
            </el-input>
            <div style="margin: 20px 0;"></div>
            <el-button type="primary" @click.native="getResult">提交申请</el-button>
        </div>
        <ApplyLeaveTable :LeaveMsg="message" style="margin-top: 50px"/>
      </el-main>
      </el-container>
</template>

<script>
import ApplyLeaveTable from '@/components/ApplyLeaveTable.vue'
export default {
  name: 'ApplyLeave',
  data() {
      return{
        /*到时候从head里面读出具体学期再从数据库中取数据*/ 
        message:[],
        courseid:'',
        date:'',
        reason:'',
      }
    },
   methods:{
    change(event){
        this.$forceUpdate(event)
    },
    getResult(){
        this.message=["1002019 - 数据库 - 张三 - 200001 - 2.1 - 1",
                      "1002019 - 数据库 - 张三 - 200001 - 2.3 - 2",
                      "1002019 - 数据库 - 张三 - 200001 - 2.5 - 0"];
        
    },
  },    
  components: {
    ApplyLeaveTable,
}
}
</script>

<style scoped>
.el-input {
  margin-top: 30px;
  margin-right: 30px;
  width: 250px;
}
</style>