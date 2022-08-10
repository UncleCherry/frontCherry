 <!--
  顾客登录输入框组件
  王晨
  2020/5/8
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

        <el-menu-item style="width: 30%;">
          <!--搜索框-->
          <div style="width:100%; margin-left: 50px;">
            <el-input 
            placeholder="从这里开始，寻找你的归宿" 
            v-model="searchText" 
            class="input-with-select"
            size='medium'
            maxlength=20
            clearable
            >
              <!--
                <el-select v-model="selectSearch" slot="prepend" placeholder="请选择"
              style="width:80px">
                <el-option label="民宿" value="1"></el-option>
                <el-option label="地点" value="2"></el-option>
              </el-select>
              -->
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>

        </el-menu-item>
        
        <el-menu-item style="margin-left:30%;">
          <el-divider direction="vertical" >  </el-divider>
        </el-menu-item>
      
        <el-menu-item index="1" style="padding-left:0%">
          <i class="el-icon-question"></i>
          帮助

        </el-menu-item>
        <el-submenu index="2" v-if="loginState==0" style="float: right;">
          <template #title>
            <!--显示头像-->
            <el-avatar :size="30" href='https://www.baidu.com/s?wd=%E4%B8%AA%E4%BA%BA%E4%BF%A1%E6%81%AF%E7%95%8C%E9%9D%A2' :src="userAvatar" @error="errorHandler">
              <!--这里是失败时候展示的图片-->
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
            </el-avatar>
            {{userName}}
          </template>
          <el-menu-item index="2-1" @click="openUserInfo">
            <i class="el-icon-info" ></i>
            个人信息</el-menu-item>
          <el-menu-item index="2-2"  @click="Logout">
            <i class="el-icon-remove"></i>
            退出登录</el-menu-item>
        </el-submenu>
        <el-menu-item  v-if="loginState==-1" style="float: right;" >
          <el-link :underline="false"  @click="dialogVisible = true" >登录</el-link>
          <el-dialog  
          :visible.sync="dialogVisible" 
          center 
          :append-to-body='true' 
          :lock-scroll="false" 
          width="500px"
          :show-close="false"
          class="login-dialog-box"
          >
          <div slot="title" class="header-title">
          </div>
            <Login
            ref="loginComponent"
            />
          <div slot="footer">
            <el-button type="primary"  class="loginButton" @click="changeLoginState">登录</el-button>
            <el-button  class="registerButton" @click="register">注册</el-button>
          </div>
          </el-dialog>
        </el-menu-item>
      </el-menu>

    </el-header>
</template>

<script >
import Login from '@/components/Login.vue'
import { login } from '@/api/login'
import { mapMutations } from 'vuex';
export default {
  name: 'header',
  components:{
    Login,
  },
  data(){
    return {
      selectSearch:'2',
      searchText:'',
      activeIndex:'1',
      loginState:0, //登录状态，先用这个
      dialogTableVisible: false,
      hasNewMessage:true,//是否有新消息
      getMessage:'',
      userName:'',//用户名
      userAvatar:'',//用户头像
      userType:0, //用户身份类型
      imgUrl:require('../assets/study.png'),
      dialogVisible: false,
      password:'',
      account:'',
    }
  },
  mounted(){
    window['startLogin']=()=>{
      this.login();
    };
  },
  created(){
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
      if(this.loginState==0)
      {
        this.userAvatar=require('../assets/S_avatar.png');
      }
      else
      {
        this.userAvatar=require('../assets/T_avatar.png');
      }
    }
  },
  methods:{
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      login(){
        this.dialogVisible=true;
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

      openUserInfo()
      {
        console.log(this.$parent)
        this.$parent.openStudentInfo();
      },

      errorHandler(){
        return true
      },

      ...mapMutations(['delLogin']),
      Logout(){
        console.log('正在退出登录')
          //清除token信息
          this.delLogin();
          this.loginState=-1;

          //前往主页
          this.$router.push({path:'/'});
          this.$parent.getLoginState(false);
          this.$message({
              message: '退出成功',
              type: 'success'
          });
      },
      ...mapMutations(['changeLogin']),

      changeLoginState(){
        let param={
          account:this.$refs.loginComponent.account,
          password:this.$refs.loginComponent.password
        };

        if(!this.isLeagalID()){
          this.$message({
            message: '请输入正确的账号',
            type: 'warning'
          });
          return false;
        }
        login(param).then(response=>{
            //判断是否登录成功
          if (response.data.loginState){
            this.userName=response.data.userName;
            //获取token
            this.userToken = response.data.token;
            //获取用户身份类别
            this.userType = response.data.userType
            //将用户token保存到vuex中
            //返回类型为学生登录
            if(this.userType==0)
            {
              this.changeLogin({ 
                Authorization:this.userToken,
                userName:this.userName,
                userType:0
              });             
              this.dialogTableVisible=false;
              this.loginState=0;
              console.log('学生成功登录')
            }
            this.$message({
              message: '登录成功！',
              type: 'success'
            });

            //跳转路由
            this.$router.replace('/StudentScorePage');
            this.$emit('func',true);
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
      },

      register(){
        this.dialogTableVisible=false;
        this.$router.replace('/Register');
      }
  }    
}
</script>