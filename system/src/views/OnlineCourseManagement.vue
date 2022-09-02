<template>
  <el-container style="height: 100%; margin-top:40px;">
    <el-main style="margin-top:-20px;">
      <OnlineCourseList :listMsg="listMsg" />
    </el-main>
  </el-container>
</template>

<script>
  import OnlineCourseList from '@/components/OnlineCourseList.vue'
  import { getAllCourse, getInstructorCourse, instructCourse, unInstructCourse } from '@/api/course'
  import axios from 'axios'
  export default {
    inject: ['reload'],
    name: 'CourseSelect',
    created() {
      axios.all([getAllCourse().then(response => {
        this.allCourse = response.data.CoursesList
      }).catch((error) => {
        this.$message({
          message: '获取课程信息失败',
          type: 'warning'
        });
      })]).then(() => {
        this.processData();
      })
    },
    data() {
      return {
        data: [],
        value: [],
        selectMsg: [],
        listMsg: [],
        allCourse: [],
        year: "2022",
        semester: "第二学期",
      };
    },
    methods: {
      processData() {
        var i = this.allCourse.length;
        for (var n = 0; n < i; ++n) {
          var isRequired = this.allCourse[n].IsRequired ? "必修" : "选修";
          var s = this.allCourse[n].CourseName + " - " + this.allCourse[n].Credit + " - " + this.allCourse[n].TimeSlot + " - " + isRequired + " - ";
          if (this.allCourse[n].MeetingId == null||this.allCourse[n].MeetingId == 0)
            s = s + " "
          else
            s = s + this.allCourse[n].MeetingId
          this.listMsg.push(this.allCourse[n].CourseId + " - " + s)
        }
      },

      refreshCourse() {


      },

    },
    components: {
      OnlineCourseList,
    },

  }
</script>

<style lang="scss" scoped>
  ::v-deep .el-button {
    display: incline;
  }

  ::v-deep .el-transfer-panel {
    width: 40%;
  }

  ::v-deep .el-button--primary:nth-child(1):focus,
  .el-button--primary:nth-child(1):hover {
    color: #FFF;
    background-color: #fb492a;
    border-color: #fb492a;
  }

  ::v-deep .el-button--primary:nth-child(1):disabled {
    color: #FFF;
    background-color: #ffc3bb;
    border-color: #ffc3bb;
  }
</style>