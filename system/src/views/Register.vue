<!--
  注册页面
-->
<template>
    <div
    class="background" style="margin-left:-205px"
    >
      <div class="register">
        <br/>
        <strong style="font-family:仿宋;font-size:30px;color:white;">欢迎注册</strong>
        <el-divider></el-divider>
        <el-form label-width="80px" class="item" style="font-color:white">
          <el-form-item label="用户名" prop="Username">
            <el-input v-model="userName" style="width:85%"></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="Id">
            <el-input v-model="Id" style="width:85%"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="name">
            <el-input v-model="name" style="width:85%"></el-input>
          </el-form-item>
          <el-form-item label="注册身份" prop="type">
            <el-radio-group v-model="userType">
              <el-radio :label="0">学生</el-radio>
              <el-radio :label="1">教师</el-radio>
              <el-radio :label="2">教务</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="入学年份" v-if="userType==0" prop="grade">
            <!-- <el-input type="grade"  v-model="grade" style="width:85%"></el-input> -->
            <el-date-picker type="year" placeholder="选择年份" v-model="grade" :picker-options="optionsDisable" value-format="yyyy-MM-dd" ></el-date-picker>
          </el-form-item>
          <el-form-item label="专业" v-if="userType==0" prop="major">
             <el-select v-model="major" placeholder="请选择专业">
              <el-option label="软件工程" value="软件工程"></el-option>
              <el-option label="计算机科学与技术" value="计算机科学与技术"></el-option>
              <el-option label="网络安全" value="网络安全"></el-option>
              <el-option label="电子信息" value="电子信息"></el-option>
              <el-option label="自动化" value="自动化"></el-option>
              <el-option label="测绘" value="测绘"></el-option>
              <el-option label="光电" value="光电"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="院系" v-if="userType==1||userType==2" prop="department">
            <!-- <el-input type="department"  v-model="department" style="width:85%"></el-input> -->
            <el-select v-model="department" placeholder="请选择院系">
              <el-option label="软件工程" value="软件工程"></el-option>
              <el-option label="计算机科学与技术" value="计算机科学与技术"></el-option>
              <el-option label="网络安全" value="网络安全"></el-option>
              <el-option label="电子信息" value="电子信息"></el-option>
              <el-option label="自动化" value="自动化"></el-option>
              <el-option label="测绘" value="测绘"></el-option>
              <el-option label="光电" value="光电"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password"  v-model="password" style="width:85%"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="checkPass" style="width:85%"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain style="background-color: rgba(0, 0, 0, 0.3);margin-left:-60px" @click="register">
              <i class="el-icon-edit"></i>
              注册
              </el-button>
            <el-button type="warning" plain style="background-color: rgba(0, 0, 0, 0.3)" @click="reset">
              <i class="el-icon-refresh-left"></i>
              重置
              </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>
<script>  
import { studentRegister, instructorRegister, adminRegister} from '@/api/register'
export default {

  data() {

    return {
      userName:'',
      name: '',
      Id:'',
      userType:0,
      password:'',
      checkPass:'',
      grade:'',
      major:'',
      department:'',
             
      optionsDisable: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    }
  },
  methods: {

    register(){
      //检验是否填写了用户名
      if(this.userName===''){
        this.$message({
          message: '请填写用户名',
          type: 'warning'
        });
        return;
      };

      //检验是否填写了学号
      if(this.Id===''){
        this.$message({
          message: '请填写学号',
          type: 'warning'
        });
        return;
      };

      //检验是否填写了真实姓名
      if(this.name===''){
        this.$message({
          message: '请填写真实姓名',
          type: 'warning'
        });
        return;
      };

      //检验是否填写了密码
      if(this.password===''){
        this.$message({
          message: '请填写密码',
          type: 'warning'
        });
        return;
      };

      //检验是否填写了确认密码
      if(this.checkPass===''){
        this.$message({
          message: '请填写确认密码',
          type: 'warning'
        });
        return;
      };

      //检验填的密码是否一致
      if(this.checkPass!=this.checkPass){
        this.$message({
          message: '两次填写密码不一致',
          type: 'warning'
        });
        return;
      };

      //检验是否填写年级
      if(this.grade===''&&this.userType===0){
        this.$message({
          message: '请填写年级',
          type: 'warning'
        });
        return;
      };

      //检验是否填写专业
      if(this.major===''&&this.userType===0){
        this.$message({
          message: '请填写专业',
          type: 'warning'
        });
        return;
      };

      //检验是否填写院系
      if(this.department===''&&this.userType!=0){
        this.$message({
          message: '请填写院系',
          type: 'warning'
        });
        return;
      };
      this.grade=this.grade.slice(0,4)
      let param={
          username:this.userName,
          name: this.name,
          id:this.Id,
          password:this.password,
          department:this.department,
          grade:this.grade,
          major:this.major,
      };

      //判断注册类型
      if(this.userType===0)
      {    
        studentRegister(param).then(response=>{
          this.$message({
            message: '注册成功',
            type: 'success'
          });
          this.$router.replace('/')
        }).catch((error)=>{
            return;
        })
      }
      else if(this.userType===1)
      {
        instructorRegister(param).then(response=>{
          this.$message({
            message: '注册成功',
            type: 'success'
          });
          this.$router.replace('/')
        }).catch((error)=>{
            return;
        })
      }
      else if(this.userType===2)
      {
        adminRegister(param).then(response=>{
          this.$message({
            message: '注册成功',
            type: 'success'
          });
          this.$router.replace('/')
        }).catch((error)=>{
            return;
        })
      }
      
      
    },

    reset(){
      this.userName='';
      this.name= '';
      this.Id='';
      this.userType=1;
      this.password='';
      this.checkPass='';
      this.grade='';
      this.major='';
      this.department='';
    }
  }
}
</script>

<style lang="scss">
.router-link-active{
  background-color: green;
  font-size: larger;
  color: aliceblue

}

.background{
    width:100%;  
    height:100%;
    z-index:-1;
    position: absolute;
    background-image: url('../assets/test.jpg');
    background-size:cover;
}



.front{
    z-index:1;
    position: absolute;
}

.register{
  width: 35%;
	height: 85%;
	border: 1px solid black;
	border-radius: 3px;
	box-shadow: 0px 0px 7px #cdcdcd;
	position: absolute;
	top: 50%;
	left:50%;
	transform: translate(-50%,-50%);
  background-color: rgb(52, 42, 85);
  background-color: rgba(0, 0, 0, 0.3);
  z-index:1;
}

.el-textarea__inner,.el-input__inner {
    background: transparent !important;
    color:white
}

.item .el-form-item__label{
    color: white;
}

.el-radio__label {
    padding-left: 20px;
    color: white;
}

.el-radio__input.is-checked + .el-radio__label {
    color: #05fdfd !important;
}

.el-radio__input.is-checked .el-radio__inner {
    background: #38c3e6 !important;
    border-color: #38c3e6 !important;
}


</style>