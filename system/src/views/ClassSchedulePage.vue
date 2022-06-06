<template>
    <el-container style="height: 100%; margin-top:-19px; margin-left:-12px">
      <el-header style=" background-color: #545c64;">
 <ClassTableHead />
 </el-header>
 <el-main style="margin-top:-20px">
  <ClassTable />
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