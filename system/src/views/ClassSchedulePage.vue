<template>
    <el-container style="height: 100%; margin-top:0px; margin-left:0px">
      <el-header style=" background-color: #545c64;">
        <ClassTableHead ref="head"/>
      </el-header>
      <el-main style="margin-top:-20px">
        <ClassTable :classMsg="msg"/>
        </el-main>
      </el-container>
</template>

<script>
import ClassTable from '@/components/ClassTable.vue'
import ClassTableHead from '@/components/ClassTableHead.vue'
export default {
  name: 'ScoreRetabulation',
  data() {
      return{
        /*到时候从head里面读出具体学期再从数据库中取数据*/ 
        msg:["计算机网络 - 2 - 周一1-2节/周三1-2节"]
      }
    },
   methods:{
  },    
  components: {
      ClassTable,
      ClassTableHead
  }
}
</script>

<style>
</style>