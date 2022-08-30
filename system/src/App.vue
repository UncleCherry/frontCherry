<template>

    <div id="app">
        <Header @func="getLoginState" ref="header"/>  
    <el-container style="width:100%;height:100%">

        <StudentNavigate v-if="LoginState==0" style="padding-top: 50px;margin-left:0px"/>
        <InstructorNavigate v-if="LoginState==1" style="padding-top: 50px;margin-left:0px"/>
        <AdminNavigate v-if="LoginState==2" style="padding-top: 50px;"/>
        <Help ref="help" />
          <el-main style="padding:0%; margin-left:201px;">
            <router-view
      style="padding-top: 55px;" v-if="isRouterAlive"
      />
          </el-main>
    </el-container >
  </div>
  
</template>

<script>
import Header from './components/Header.vue'
import StudentNavigate from './components/StudentNavigate.vue'
import InstructorNavigate from './components/InstructorNavigate.vue'
import AdminNavigate from './components/AdminNavigate.vue'
import Help from './components/Help.vue'
import './css/global.scss'
export default {
  name: 'app',
  data() {
    return{
      LoginState:-1,
      isRouterAlive:true
    }
  },
  provide () {
    return {
      reload: this.reload
    }
  },
   methods:{
      getLoginState(data){
        this.LoginState=data;      
      },
      reload () {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      },
      openHelp(){
        this.$refs.help.dialogVisible=true;
      }
  },    
  created(){
    let token = localStorage.getItem('Authorization');
    if(!(token === null || token === ''))
    {
      this.LoginState=localStorage.getItem('userType');
    }
  },
  components: {
    Header,
    Help,
    StudentNavigate,
    InstructorNavigate,
    AdminNavigate
  }
}
</script>

<style>


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
