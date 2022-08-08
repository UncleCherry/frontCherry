<template>
        <el-container style="height: 100%; border: 1px solid #eee; width:201px; position:fixed">
  <el-aside width="201px" style="overflow-x: hidden; overflow-y: auto;">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo side"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1" style="text-align: left;">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>成绩管理</span>
        </template>
          <el-menu-item index="1-1" @click="OpenScorePage">成绩查询</el-menu-item>
          <el-menu-item index="1-2" @click="OpenRetabulationPage">免修/免听申请</el-menu-item>
          <el-menu-item index="1-3">申请成绩复核</el-menu-item>
      </el-submenu>
      <el-submenu index="2" style="text-align: left;">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>考试管理</span>
        </template>
          <el-menu-item index="2-1" @click="OpenScorePage">考试安排查询</el-menu-item>
          <el-menu-item index="2-2">重/缓考申请</el-menu-item>
      </el-submenu>
      <el-submenu index="3" style="text-align: left;">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>课程管理</span>
        </template>
          <el-menu-item index="3-1" @click="OpenScorePage">查看专业培养计划</el-menu-item>
          <el-menu-item index="3-2" @click="OpenCourseSelect">个人选课</el-menu-item>
          <el-menu-item index="3-3">期中退课</el-menu-item>
          <el-menu-item index="3-4" @click="OpenScheduleTable">查看课表</el-menu-item>
      </el-submenu>
      <el-submenu index="4" style="text-align: left;">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>考勤管理</span>
        </template>
          <el-menu-item index="4-1" @click="OpenScorePage">出勤/缺勤次数查询</el-menu-item>
          <el-menu-item index="4-2">请假</el-menu-item>
          <el-menu-item index="4-3">缺勤申述</el-menu-item>
      </el-submenu>
      <el-menu-item index="5" style="text-align: left;" @click="OpenSetting">
        <i class="el-icon-setting"></i>
        <span slot="title" >设置</span>
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
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item),
        isCollapse: true
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      OpenScorePage()
      {
          this.$router.replace('/StudentScorePage');
      },
      OpenRetabulationPage()
      {
          this.$router.replace('/ApplyExemptionPage');
      },
      OpenScheduleTable()
      {
        this.$router.replace('/ClassSchedulePage');
      },
      OpenCourseSelect()
      {
        this.$router.replace('/CourseSelect');
      },
      OpenSetting()
      {
        this.$router.replace('/Setting');
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