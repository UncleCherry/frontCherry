<template>
  <el-container style="height: 100%; margin-top: 0px; margin-left: 0px">
    <el-header style="background-color: #545c64">
      <span style="color: white; font-size: 15px"
        >{{ semester[curSemester] }}成绩查询</span
      >
      <el-dropdown style="font-size: 12px; float: right">
        <span style="color: white; font-size: 12px; float: right"
          >切换学期</span
        >
        <i class="el-icon-setting" style="color: white"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="item in 4"
            :key="item"
            @click.native="changeSemester(item - 1)"
          >
            {{ semester[item - 1] }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>

    <el-main>
      <el-table :data="tableData" height="600px" style="width: 100%">
        <!-- <el-table-column prop="number" label="序号" sortable min-width="7%">
        </el-table-column> -->
        <el-table-column
          prop="CourseId"
          label="课程代码"
          sortable
          min-width="10%"
        >
        </el-table-column>
        <el-table-column
          prop="CourseName"
          label="课程名称"
          sortable
          min-width="18%"
        >
        </el-table-column>
        <el-table-column prop="type" label="课程类别" sortable min-width="18%">
        </el-table-column>
        <el-table-column prop="credit" label="学分" sortable min-width="7%">
        </el-table-column>
        <el-table-column prop="gpa" label="绩点" sortable min-width="7%">
        </el-table-column>
        <el-table-column prop="Grade" label="成绩" sortable min-width="7%">
        </el-table-column>
        <el-table-column prop="pass" label="是否通过" sortable min-width="8%">
        </el-table-column>
        <el-table-column
          prop="updateDate"
          sortable
          label="更新时间"
          min-width="12%"
        >
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import { getStudentScore } from "@/api/grade";

export default {
  name: "Score",
  data() {
    // const item = {
    //   number: 1,
    //   code: "10000",
    //   name: "数据库原理和应用",
    //   type: "工程能力与创新思维",
    //   credit: 4,
    //   gpa: 5,
    //   grade: "优",
    //   pass: "是",
    //   updateDate: "2022-7-13",
    // };
    return {
      tableData: [],
      // tableData: Array(20).fill(item),
      semester: [
        "2021-2022第二学期",
        "2021-2022第一学期",
        "2020-2021第二学期",
        "2020-2021第一学期",
      ],
      curSemester: 0,
    };
  },
  mounted() {
    getStudentScore()
      .then((response) => {
        this.$message({
          message: "获取成绩信息成功",
          type: "success",
        });

        this.tableData = response.data.GradesList;
        console.log(this.tableData);
      })
      .catch((error) => {
        this.$message({
          message: "获取成绩信息失败",
          type: "warning",
        });
      });
  },
  methods: {
    changeSemester(chooseTerm) {
      this.curSemester = chooseTerm;
    },
  },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
