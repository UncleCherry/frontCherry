<!-- eslint-disable no-unused-vars -->
<template>
  <el-table
    :data="tableData"
    max-height="250">
    <el-table-column
      fixed
      prop="id"
      label="课程号"
      width="200px">
    </el-table-column>
    <el-table-column
      prop="name"
      label="课程名"
      width="200px">
    </el-table-column>
    <el-table-column
      prop="credit"
      label="学分"
      width="200px">
    </el-table-column>
    <el-table-column
      prop="time"
      label="上课时间"
      width="200px">
    </el-table-column>
    <el-table-column
      prop="isRequired"
      label="必修/选修"
      width="200px">
    </el-table-column>
    <el-table-column
      prop="meetingId"
      label="会议号"
      width="200px">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="200px">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          退课
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    methods: {
      deleteRow(index, rows) {
        this.$emit('func',this.tableData[index].id);
        rows.splice(index, 1);
      }
    },
    data() {
      return {
        tableData: [],
      }
    },
    props:['listMsg'],
    watch:{
      listMsg:{
        // eslint-disable-next-line no-unused-vars
        handler(val) {
          for(var i=0;i<this.listMsg.length;++i)
          {
            var temp = this.listMsg[i];
            var inctrm=this.listMsg[i].split(" - "); //id - name - credit - time - isRequired - meetingId
            this.tableData.push({
              id:parseInt(inctrm[0]),
              name:inctrm[1],
              credit:parseInt(inctrm[2]),
              time:inctrm[3],
              isRequired:inctrm[4],
              meetingId:inctrm[5]
            });
          }
        },
        immediate: true,
      }
    }
  }
</script>
