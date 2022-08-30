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
      <el-menu-item index="1" @click="OpenEditTrainingPlan">
        <i class="el-icon-menu" ></i>
        <span slot="title">编辑专业培养计划</span>
      </el-menu-item>
      <el-menu-item index="2"  @click="OpenCreateCourse">
        <i class="el-icon-menu"></i>
        <span slot="title">创建课程</span>
      </el-menu-item>
      <el-menu-item index="3" @click="OpenCreatExamPage">
        <i class="el-icon-menu"></i>
        <span slot="title">添加考试安排</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-menu"></i>
        <span slot="title">添加成绩</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-menu"></i>
        <span slot="title">申请审核</span>
      </el-menu-item>
      <el-menu-item index="6"  @click="OpenOnlineCourseManagement">
        <i class="el-icon-menu"></i>
        <span slot="title">网课管理</span>
      </el-menu-item>
      <el-menu-item index="7" @click="OpenSetting">
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
      OpenCreateCourse()
      {
        this.$router.replace('/CreateCourse');
      },
      OpenSetting()
      {
        this.$router.replace('/Setting');
      },
      OpenCreatExamPage()
      {
        this.$router.replace('/CreatExamPage');
      },
      OpenOnlineCourseManagement()
      {
        this.$router.replace('/OnlineCourseManagement')
      },
      OpenEditTrainingPlan()
      {
        this.$router.replace('/EditTrainingPlan');
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