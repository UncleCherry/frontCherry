<template>
    <div>
      <span style="color:white;  font-size: 15px;">{{semester[curSemester]}}课表查看</span>
      <el-dropdown style=" font-size : 12px; float:right;">
        <span style="color:white; font-size: 12px; float:right">切换学期</span>
        <i class="el-icon-setting" style=" color:white; "></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="item in 4" :key="item" @click.native="changeSemester(item-1)">
            {{semester[item-1]}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
</template>

<script>
  export default {
      name: 'Score',
    data() {
      return {
        semester:[
          '2022第二学期',
          '2022第一学期',
          '2021第二学期',
          '2021第一学期',
        ],
        curSemester:0,

      }
    },
    methods: {   
      changeSemester(chooseTerm){
        if(this.curSemester!=chooseTerm)
        {
          this.curSemester=chooseTerm;
          this.$emit('func');
        }
      },
    }
  }
</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>