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
        handler(val) {
          for(var i=0;i<this.listMsg.length;++i)
          {
            var temp = this.listMsg[i];
            var inct=this.listMsg[i].split(" - "); //id - name - credit - time
            this.tableData.push({
              id:parseInt(inct[0]),
              name:inct[1],
              credit:parseInt(inct[2]),
              time:inct[3]
            });
          }
        },
        immediate: true,
      }
    }
  }
</script>