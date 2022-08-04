<template>

    <div id="app">
        <Header @func="getLoginState"/>  
    <el-container style="width:100%;height:100%">

         <StudentPageSide v-if="LoginState" style="padding-top: 55px;"/>
        <StudentInfo ref="studentInfo"/>
          <el-main style="margin:0%;padding:0%;">
            <router-view
      style="padding-top: 55px;"
      />
          </el-main>
    </el-container >
  </div>
  
</template>

<script>
import Header from './components/Header.vue'
import StudentPageSide from './views/StudentPageSide.vue'
import StudentInfo from './components/StudentInfo.vue'
export default {
  name: 'app',
  data() {
      return{
        LoginState:false,
      }
    },
   methods:{
      getLoginState(data){
        this.LoginState=data;      
      },
      openStudentInfo(){
        this.$refs.studentInfo.getMessage();
        this.$refs.studentInfo.drawer=true;
      }
  },    
  created(){
    let router_path = this.$route.path;
    console.log(router_path);
    console.log(router_path=='/');
    let token = localStorage.getItem('Authorization');
    if(!(token === null || token === ''))
    {
      this.LoginState=true;
    }
    // let token = localStorage.getItem('Authorization');
    // this.LoginState=true;
  },
  components: {
    Header,
    StudentPageSide,
    StudentInfo
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
