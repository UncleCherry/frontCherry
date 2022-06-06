<template>
    <el-container style="height: 100%; margin-top:-19px; margin-left:-12px">
    <el-header style=" background-color: #545c64;">
      <span style="color:white;  font-size: 15px;">{{semester[curSemester]}}成绩查询</span>
      <el-dropdown style=" font-size : 12px; float:right;">
        <span style="color:white; font-size: 12px; float:right">切换学期</span>
        <i class="el-icon-setting" style=" color:white; "></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="item in 4" :key="item" @click.native="changeSemester(item-1)">
            {{semester[item-1]}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </el-header>
    
    <el-main>
      <el-table :data="tableData" height="100%">
        <el-table-column prop="number" label="序号" sortable width="120">
        </el-table-column>
        <el-table-column prop="code" label="课程代码" sortable width="150">
        </el-table-column>
        <el-table-column prop="name" label="课程名称" sortable width="200">
        </el-table-column>
        <el-table-column prop="type" label="课程类别" sortable width="200">
        </el-table-column>
        <el-table-column prop="credit" label="学分" sortable width="120">
        </el-table-column>
        <el-table-column prop="gpa" label="绩点" sortable width="120">
        </el-table-column>
        <el-table-column prop="grade" label="成绩" sortable width="120">
        </el-table-column>
        <el-table-column prop="pass" label="是否通过" sortable width="120">
        </el-table-column>
        <el-table-column prop="updateDate" sortable label="更新时间">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
  export default {
      name: 'Score',
    data() {
      const item = {
        number:1,
        code:'10000',
        name:"数据库原理和应用",
        type:"工程能力与创新思维",
        credit:4,
        gpa:5,
        grade:"优",
        pass:'是',
        updateDate: '2022-7-13',
      };
      return {
        tableData: Array(20).fill(item),
        semester:[
          '2021-2022第二学期',
          '2021-2022第一学期',
          '2020-2021第二学期',
          '2020-2021第一学期',
        ],
        curSemester:0,

      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      changeSemester(chooseTerm){
        this.curSemester=chooseTerm;
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