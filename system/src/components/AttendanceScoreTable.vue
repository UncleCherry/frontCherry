<template>
  <el-table
    :data="tableData"
    border
    height="550px"
    style="width: 100%;  margin-top: 20px; box-shadow: 0 0 8px 0 #aaa;"
    :row-style="{height: '30px'}">
    <el-table-column
      fixed
      prop="courseid"
      label="课程ID"
      min-width="15%">
    </el-table-column>
    <el-table-column
      fixed
      prop="course"
      label="课程"
      min-width="20%">
    </el-table-column>
    <el-table-column
      prop="id"
      label="学号"
      min-width="15%">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      min-width="15%">
    </el-table-column>
    <el-table-column
      prop="score"
      label="考勤成绩"
      min-width="10%">
    </el-table-column>
    <el-table-column
      prop="absence"
      label="缺勤课次"
      min-width="25%">
    </el-table-column>
  </el-table>

</template>

<script>
  export default {
    methods: {
        show(val){
            this.tableData=[];
            for(var i=0;i<val.length;++i){
                var attendinfo = val[i].split(" - "); 
                var tmp = {};
                tmp['courseid']=attendinfo[0];
                tmp['course']=attendinfo[1];
                tmp['name']=attendinfo[2];
                tmp['id']=attendinfo[3];
                tmp['score']=attendinfo[4];
                tmp['absence']=attendinfo[5];
                this.tableData.push(tmp);
            }
        }
    },

    props:['AttendanceScoreMsg'],

    watch:{
        AttendanceScoreMsg:function(val){
            this.show(val);
        }
    },

//1002019 - 数据库 - 张三 - 200001 - 90 - 1
//1002019 - 数据库 - 李四 - 200002 - 80 - 1,2,3
    data() {
      return {
        tableData: [],
      }
    },
  }
</script>
