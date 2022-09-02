<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    max-height="250">
    <el-table-column
      fixed
      prop="courseId"
      label="课程号"
      width="auto"
      min-width="15%">
    </el-table-column>
    <el-table-column
      prop="courseName"
      label="课程名"
      width="auto"
      min-width="15%">
    </el-table-column>
    <el-table-column
      prop="examId"
      label="考试号"
      width="auto"
      min-width="15%">
    </el-table-column>
    <el-table-column
      prop="startTime"
      label="考试开始时间"
      width="auto"
      min-width="15%">
    </el-table-column>
    <el-table-column
      prop="endTime"
      label="考试结束时间"
      width="auto"
      min-width="15%">
    </el-table-column>
    <el-table-column
      prop="meetingId"
      label="考试会议号"
      width="auto"
      min-width="15%">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="auto"
      min-width="10%">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="editExamScore(scope.$index, tableData)"
          type="text"
          size="small">
          开始编辑
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    methods: {
      editExamScore(index, rows) {
        var param={
            examId:rows[index].examId,
            courseName:rows[index].courseName
        };
        this.$emit("func",param);
      }
    },
    props:['tableData']
  }
</script>