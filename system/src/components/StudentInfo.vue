<template>
<el-drawer
  title="个人资料"
  :visible.sync="drawer"
  :direction="direction"
  :before-close="handleClose"
  class=""
  style="text-aline:left;">
   <el-avatar :size="150"> 用户头像 </el-avatar>
   <div style="text-align:left;padding-left:160px">
    <br>
    <span class="bigFontSize" style="font-size: 25px;position: relative;top: 10px;">姓名:&emsp;{{name}}</span>
    <br>
    <span class="bigFontSize" style="font-size: 25px;position: relative;top: 20px;">学号:&emsp;{{id}}</span>
    <br>
    <span class="bigFontSize" style="font-size: 25px;position: relative;top: 30px;">专业:&emsp;{{major}}</span>
    <br>
    <span class="bigFontSize" style="font-size: 25px;position: relative;top: 40px;">入学年份:&emsp;{{grade}}</span>
    <br>
    <span class="bigFontSize" style="font-size: 25px;position: relative;top: 50px;">已修学分:&emsp;{{credit}}</span>
    <br>
  </div>
  <el-image
      style="width: 100%; height: 300px;bottom:-90px"
      :src="imgUrl"
      fit="fill"></el-image>
</el-drawer>
</template>
<script>
import {getStudentInfo} from "../api/studentInfo";
  export default {
    created(){
      this.getMessage()
    },
    data() {
      return {
        drawer: false,
        direction: 'rtl',
        id:'',
        name:'',
        grade:'',
        major:'',
        credit:'',
        imgUrl:require('../assets/picture1.jpg'),
      };
    },
    methods: {
      handleClose(done) {
        done();
      },
      getMessage(){
        let token=localStorage.getItem('Authorization');
        if(token==null||token=='')
        {
          //无token,需要登陆
          console.log('无token信息')
          return;
        }
        else {
          //有token,则读取token
          console.log('有token信息')
          this.userName = localStorage.getItem('userName');
          //调用api
          getStudentInfo().then(response=>{
            console.log(response.data);
            //获取api中的数据
            this.id=response.data.studentID;
            this.name=response.data.studentName;
            this.grade=response.data.studentGrade;
            this.major=response.data.studentMajor;
            this.credit=response.data.studentCredit;
          }).catch((error)=>{
            this.$message({
              message:error,
              type:'warning'
            });
            console.log('error',error)
            return;
          })
        }
      }

    }
  };
</script>

<style scoped>
.bigFontSize
{
  font-family: "PingFang SC";
  font-size: 30px;
  font-weight: bold;
  animation: fadeInDown;
  animation-duration: 1s;
}

::v-deep .el-drawer {
  background-color: #c2e4bf !important
}
::v-deep .el-drawer__header {
    font-family: "PingFang SC";
  font-size: 30px;
  font-weight: bold;
  animation: fadeInDown;
  animation-duration: 1s;
  }

</style>