 <!--
  登录输入框组件
-->
 
 <template>
 <el-header
    style="display: inline-block;width: 100%;margin-bottom: -5px;
    margin-top: -5px;
    position: fixed;left: 0;z-index: 10;">
      <el-menu 
      :default-active="activeIndex" 
      class="el-menu-demo" 
      mode="horizontal" 
      style="
      display: block;
      
      height: 100%;
      width: 111.8%;
      left: -10%;
      top:-5%;
      align-self: center;
      background-color: rgba(246,248,248,0.913);
      box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
      ">
        <el-menu-item style="width:20%;">
          <el-image 
            :src='imgUrl'
            style="width:17%;
            left: 10%;
            top:10%;
            "
            >
          </el-image>
          
        </el-menu-item>

        <el-menu-item style="width: 20%;margin:0;padding:0">
          <!--标题-->
          <a href="https://github.com/UncleCherry" target="_blank">
          <div style="width:100%;">
              <el-image
              :src="logoUrl"
              fit="contain"
              style="background-color: rgba(246,248,248,0.913);"></el-image>
          </div>
          </a>
        </el-menu-item>
        
        <el-menu-item style="margin-left:30%;">
          <el-divider direction="vertical" >  </el-divider>
        </el-menu-item>
      
        <el-menu-item index="1" style="padding-left:0%" @click="help">
          <i class="el-icon-question"></i>
          帮助

        </el-menu-item>
        <el-submenu index="2" v-if="loginState!=-1" style="float: right;">
          <template #title>
            <!--显示头像-->
            <el-avatar :size="30" href='https://www.baidu.com/s?wd=%E4%B8%AA%E4%BA%BA%E4%BF%A1%E6%81%AF%E7%95%8C%E9%9D%A2' :src="userAvatar" @error="errorHandler">
              <!--这里是失败时候展示的图片-->
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
            </el-avatar>
            {{userName}}
          </template>
          <el-menu-item index="2-1"  style="margin-left:15px">
            姓名: {{name}}</el-menu-item>
            <el-menu-item v-if="loginState==0" index="2-2"  style="margin-left:15px">
            学号: {{id}}</el-menu-item>
            <el-menu-item v-if="loginState==1||loginState==2" index="2-2"  style="margin-left:15px">
            教工号: {{id}}</el-menu-item>
            <el-menu-item v-if="loginState==0" index="2-3"  style="margin-left:15px">
            入学年份: {{grade}}</el-menu-item>
            <el-menu-item v-if="loginState==0"  index="2-4"  style="margin-left:15px">
            培养专业: {{major}}</el-menu-item>
            <el-menu-item v-if="loginState==0" index="2-5"  style="margin-left:15px">
            已修学分: {{credit}}</el-menu-item>
            <el-menu-item v-if="loginState==1||loginState==2" index="2-3"  style="margin-left:15px">
            学院: {{department}}</el-menu-item>
            <el-menu-item index="2-6"  style="margin-left:15px">
              <el-button plain size="mini" @click="gotoSetting">修改信息</el-button>
              <el-button type="primary" size="mini" @click="Logout">退出</el-button>
          </el-menu-item>
        </el-submenu>
        <el-menu-item  v-if="loginState==-1" style="float: right;" >
          <el-link :underline="false"  @click="openLogin" >登录</el-link>
        </el-menu-item>
      </el-menu>

    </el-header>
</template>

<script >
import { login } from '@/api/login'
import { getStudentInfo,getInstructorInfo,getAdminInfo } from '@/api/userInfo'
import { mapMutations } from 'vuex';
import { eventBus } from '../main'
import axios from 'axios';
export default {
  name: 'header',
  data(){
    return {
      selectSearch:'2',
      searchText:'',
      activeIndex:'1',
      loginState:-1, //登录状态，先用这个
      dialogTableVisible: false,
      hasNewMessage:true,//是否有新消息
      getMessage:'',
      userName:'',//用户名
      userAvatar:'',//用户头像
      imgUrl:require('../assets/study.png'),
      logoUrl:require('../assets/logo.png'),
      dialogVisible: false,
      password:'',
      account:'',
      name:'',
      id:'',
      major:'',
      grade:'',
      credit:'',
      department:''
    }
  },
  created(){
 
    eventBus.$on('loginMsg', message => {
        this.changeLoginState(message);
        eventBus.$off('loginMsg', {})
    });
    eventBus.$on('logout', message => {
        this.Logout();
        eventBus.$off('logout', {})
    });
    /*
    初始化，判断是否有token
    */
    let token = localStorage.getItem('Authorization');
 
    if (token === null || token === '') {
      //无token，需要登录
      console.log('本次访问网页无token信息')
      return;
    }
    else{
      //有token，则读取token
      console.log('本次访问网页有token信息，已自动读取')
      this.userName=localStorage.getItem('userName');
      this.loginState=localStorage.getItem('userType');
      this.name=localStorage.getItem('name');
      this.id=localStorage.getItem('id');
      if(this.loginState==0)
      {
        this.userAvatar=require('../assets/S_avatar.png');
        this.major=localStorage.getItem('major');
        this.credit=localStorage.getItem('credit');
        this.grade=localStorage.getItem('grade');
      }
      else
      {
        this.userAvatar=require('../assets/T_avatar.png');
        this.department=localStorage.getItem('department');
      }
    };

  },
  methods:{
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      isLeagalID(){
        // var myreg = /[0-9]{2}[5|3]{1}[0-9]{4}$/;
        // if (!myreg.test(this.$refs.loginComponent.account)) {
        //     console.log("账号格式不正确")
        //     return false;
        // } 
        // else {
        //     console.log('账号格式正确')
        //     return true;
        // }
        return true;
      },

      errorHandler(){
        return true
      },

      gotoSetting(){
        this.$router.replace('/setting')
      },

      ...mapMutations(['delLogin']),
      Logout(){
        console.log('正在退出登录')
          //清除token信息
          this.delLogin();
          this.loginState=-1;

          //前往主页
          this.$emit('func',-1);
          this.$router.push({path:'/'});
          this.$message({
              message: '退出成功',
              type: 'success'
          });
      },
      ...mapMutations(['changeLogin']),

      changeLoginState(param){
        axios.all([
          login(param).then(response=>{
              //判断是否登录成功
            if (response.data.loginState){
              this.userName=response.data.userName;
              //获取token
              this.userToken = response.data.token;
              //获取用户身份类别
              this.loginState = response.data.userType

              this.changeLogin({ 
                Authorization:this.userToken,
                userName:this.userName,
                userType:this.loginState
              });     
              this.dialogTableVisible=false;
              if(this.loginState==0)
              {
                this.$router.replace('/StudentScorePage');
              }
              else if(this.loginState==1)
              {
                this.$router.replace('/InstructSchedule');
              }
              else
              {
                this.$router.replace('/CreateCourse');
              }
              this.$message({
                message: '登录成功！',
                type: 'success'
              });

              //跳转路由

              this.$emit('func',this.loginState);
              this.userAvatar=require('../assets/S_avatar.png');
            }
            else{
              this.$message({
                message: '账号不存在或密码错误！',
                type: 'warning'
              });
              return;
            }
          }).catch((error)=>{
          this.$message({
            message: '登录失败，请稍后重试',
            type: 'warning'
          });
          console.log('error',error)
          return;
          })   
        ]).then(()=>{
          this.getUserInfo();
        })  
      },
      ...mapMutations(['storeInfo']),
      getUserInfo(){
        if(this.loginState==0)
        {
          getStudentInfo().then(response=>{
            //获取api中的数据
            var student={
              id:response.data.studentID,
              name:response.data.studentName,
              grade:response.data.studentGrade,
              major:response.data.studentMajor,
              credit:response.data.studentCredit
            }
            this.id=student.id
            this.name=student.name
            this.major=student.major
            this.grade=student.grade
            this.credit=student.credit
            this.storeInfo({
              id:this.id,
              name:this.name,
              grade:this.grade,
              major:this.major,
              credit:this.credit
            })
            console.log(student);
          }).catch((error)=>{
            this.$message({
              message:'获取学生信息失败',
              type:'warning'
            });
            console.log('error',error)
            return;
          })
        }
        else if(this.loginState==1)
        {
          getInstructorInfo().then(response=>{
            //获取api中的数据
            var Instructor={
              id:response.data.instructorID,
              name:response.data.instructorName,
              department:response.data.instructorDepartment,
            }
            this.id=Instructor.id
            this.name=Instructor.name
            this.department=Instructor.department
            this.storeInfo(Instructor)
            console.log({
              id:this.id,
              name:this.name,
              department:this.department,
            });
          }).catch((error)=>{
            this.$message({
              message:'获取教师信息失败',
              type:'warning'
            });
            console.log('error',error)
            return;
          })
        }
        else if(this.loginState==2)
        {
          getAdminInfo().then(response=>{
            //获取api中的数据
            var Admin={
              id:response.data.adminID,
              name:response.data.adminName,
              department:response.data.adminDepartment,
            }
            this.id=Admin.id
            this.name=Admin.name
            this.department=Admin.department
            this.storeInfo({
              id:this.id,
              name:this.name,
              department:this.department,
            })
            console.log(Admin);
          }).catch((error)=>{
            this.$message({
              message:'获取教务信息失败',
              type:'warning'
            });
            console.log('error',error)
            return;
          })
        }
      },

      register(){
        this.dialogTableVisible=false;
        this.$router.replace('/Register');
      },
      openLogin(){
        this.$router.replace('/Login');
      },
      help(){
        this.$parent.openHelp();
      }
  }    
}
</script>

<style lang="scss" scoped>
::v-deep .el-image__inner {
    vertical-align: middle;
}
</style>