<template>
        <el-container style="height: 100%; border: 1px solid #eee; width:201px; position:fixed">
  <el-aside width="201px" style="overflow-x: hidden; overflow-y: auto;">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo side"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="height:100%;text-align: left;">
      <el-menu-item index="1" @click="OpenInstructSchedule">
        <i class="el-icon-menu"></i>
        <span slot="title">查看授课表</span>
      </el-menu-item>
      <el-menu-item index="2" @click="OpenInstructSelect">
        <i class="el-icon-menu"></i>
        <span slot="title">选择授课</span>
      </el-menu-item>
      <!-- 有新功能加这里 -->
      <el-menu-item index="3" @click="OpenSetting">
        <i class="el-icon-setting"></i>
        <span slot="title">设置</span>
      </el-menu-item>
    </el-menu>
   </el-aside>
    </el-container>
</template>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>

<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
      OpenSetting()
      {
        this.$router.replace('/Setting');
      },
      OpenInstructSchedule()
      {
        this.$router.replace('/InstructSchedule')
      },
      OpenInstructSelect()
      {
        this.$router.replace('/InstructSelect')
      }
    }
  }
</script>
<style>
.side {
  height:700px;
  width:30%;
  
}
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>