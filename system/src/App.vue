<template>

    <div id="app">
        <Header @func="getLoginState"/>  
    <el-container style="width:100%;height:100%">

         <StudentPageSide v-if="LoginState" style="padding-top: 55px;"/>
          <el-main>
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
  },    
  components: {
    Header,
    StudentPageSide
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
