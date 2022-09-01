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
            v-for="item in semester.length"
            :key="item"
            @click.native="changeSemester(item - 1)"
          >
            {{ semester[item - 1] }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>

    <el-main>
      <div style="text-align: left; font-size: 15px">
        总平均绩点:{{ avgGpa }}&nbsp;&nbsp; 实修学分:{{ allCredit }}&nbsp;&nbsp;
        不及格学分:{{ passFailedCredit }}&nbsp;&nbsp; 不及格门数:{{
          passFailedNum
        }}
      </div>
      <el-table :data="tableData" height="600px" style="width: 100%">
        <el-table-column type="index" label="序号" min-width="12%">
        </el-table-column>
        <el-table-column prop="code" label="课程代码" sortable min-width="12%">
        </el-table-column>
        <el-table-column prop="name" label="课程名称" sortable min-width="14%">
        </el-table-column>
        <el-table-column prop="examId" label="考试号" sortable min-width="14%">
        </el-table-column>
        <el-table-column prop="credit" label="学分" sortable min-width="12%">
        </el-table-column>
        <el-table-column prop="gpa" label="绩点" sortable min-width="12%">
        </el-table-column>
        <el-table-column prop="grade" label="成绩" sortable min-width="12%">
        </el-table-column>
        <el-table-column prop="pass" label="是否通过" sortable min-width="12%">
        </el-table-column>
      </el-table>
      <div style="text-align: left; font-size: 15px">
        学期平均绩点:{{ avgSemesterGpa }}
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { getGrades } from "../api/grade";
export default {
  name: "Score",
  created() {
    getGrades()
      .then((response) => {
        this.$message({
          message: "获取成绩成功",
          type: "success",
        });
        this.allGrades = response.data.GradesList;
        this.changeTableData();
        this.countData();
      })
      .catch((error) => {
        this.$message({
          message: "获取成绩失败",
          type: "warning",
        });
        return;
      });
    var year = parseInt(localStorage.getItem("grade"));
    var myDate = new Date();
    var tYear = parseInt(myDate.getFullYear());
    for (var i = tYear; i > year; --i) {
      this.semester.push(i.toString() + "第二学期");
      this.semester.push(i.toString() + "第一学期");
    }
    this.semester.push(year.toString() + "第二学期");
  },
  data() {
    return {
      tableData: [],
      semester: [],
      curSemester: 0,
      allGrades: [],
      allCredit: 0,
      avgSemesterGpa: 0,
      avgGpa: 0,
      passFailedCredit: 0,
      passFailedNum: 0,
      semesterCourseNum: 0,
    };
  },
  methods: {
    changeSemester(chooseTerm) {
      this.curSemester = chooseTerm;
      this.changeTableData();
    },
    //计算总学分和平均绩点
    countData() {
      for (var i = 0; i < this.allGrades.length; ++i) {
        var grade = this.allGrades[i].Grade;
        this.allCredit += this.allGrades[i].Credit;
        var grade = parseInt(this.allGrades[i].Grade);
        var gpa;
        if (grade < 60) {
          this.passFailedCredit += this.allGrades[i].Credit;
          this.passFailedNum += 1;
          this.allCredit -= this.allGrades[i].Credit;
          gpa = 0;
        } else if (grade >= 60 && grade < 70) {
          gpa = 2;
        } else if (grade >= 70 && grade < 80) {
          gpa = 3;
        } else if (grade >= 80 && grade < 90) {
          gpa = 4;
        } else {
          gpa = 5;
        }
        this.avgGpa += gpa;

        if (this.allGrades.length != 0) {
          this.avgGpa /= this.allGrades.length;
        }
      }
    },
    changeTableData() {
      this.avgSemesterGpa = 0;
      this.semesterCourseNum = 0;
      var year = this.semester[this.curSemester].substring(0, 4);
      var semester = this.semester[this.curSemester].substring(4);
      this.tableData = [];
      for (var i = 0; i < this.allGrades.length; ++i) {
        if (
          this.allGrades[i].Year == year &&
          this.allGrades[i].Semester == semester
        ) {
          ++this.semesterCourseNum;
          var grade = this.allGrades[i].Grade;
          var pass = "是",
            gpa;
          if (parseInt(grade) < 60) {
            pass = "否";
            gpa = 0;
          } else if (parseInt(grade) >= 60 && parseInt(grade) < 70) {
            gpa = 2;
          } else if (parseInt(grade) >= 70 && parseInt(grade) < 80) {
            gpa = 3;
          } else if (parseInt(grade) >= 80 && parseInt(grade) < 90) {
            gpa = 4;
          } else {
            gpa = 5;
          }
          this.avgSemesterGpa += gpa;
          var temp = {
            code: this.allGrades[i].CourseId,
            name: this.allGrades[i].CourseName,
            examId: this.allGrades[i].ExamId,
            credit: this.allGrades[i].Credit,
            gpa: gpa,
            grade: this.allGrades[i].Grade,
            pass: pass,
          };
          this.tableData.push(temp);
        }
      }
      if (this.semesterCourseNum != 0)
        this.avgSemesterGpa /= this.semesterCourseNum;
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
