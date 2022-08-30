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
      min-width="10%">
    </el-table-column>
    <el-table-column
      fixed
      prop="course"
      label="课程"
      min-width="15%">
    </el-table-column>
    <el-table-column
      fixed
      prop="number"
      label="课次"
      min-width="5%">
    </el-table-column>
    <el-table-column
      prop="id"
      label="学号"
      min-width="10%">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      min-width="10%">
    </el-table-column>
    <el-table-column
      prop="date"
      label="日期"
      min-width="20%">
    </el-table-column>
    <el-table-column
      prop="starttime"
      label="开始时间"
      min-width="10%">
    </el-table-column>
    <el-table-column
      prop="endtime"
      label="结束时间"
      min-width="10%">
    </el-table-column>
    <el-table-column
      prop="effective"
      label="考勤成功"
      min-width="10%">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.$index)" type="text" size="small">编辑</el-button>
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>


</template>

<script>
import {modifyAttendance,deleteAttendance} from "@/api/attendance";
  export default {
    methods: {
        handleClick(row) {
          let _this=this
          let validateStatus = (value) => {
            if (value!="是"&&value!="否") {
              return false
            } else {
              return true
            }
          }
          this.$prompt('请修改考勤状态(是/否):', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator: validateStatus,
          inputErrorMessage: '输入错误'
        }).then(({ value }) => {
          //修改数据库
          let tmp
          if(value=="是")
            tmp=true
          else
            tmp=false
          var param={
            courseid:_this.tableData[row]['courseid'],
            coursenumber:_this.tableData[row]['number'],
            studentid:_this.tableData[row]['id'],
            isEffective:tmp
          };
          modifyAttendance(param).then(response=>{
            this.$message({
              type: 'success',
              message: '考勤状态修改为: ' + value
            });
            }).catch((error)=>{
              this.$message({
              message: '更新失败',
              type: 'warning'
            });
          });

          _this.tableData[row]['effective']=value
        }).catch((error) => {
          console.log(error)
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
        },

        deleteRow(row, rows) {
          //修改数据库
          let _this=this
          var param={
            courseid:_this.tableData[row]['courseid'],
            coursenumber:_this.tableData[row]['number'],
            studentid:_this.tableData[row]['id'],
          };
          deleteAttendance(param).then(response=>{
            this.$message({
              type: 'success',
              message: '考勤信息删除成功' 
            });
            }).catch((error)=>{
              this.$message({
              message: '更新失败',
              type: 'warning'
            });
          });


          rows.splice(row, 1);
        },

        show(val){
            this.tableData=[];
            for(var i=0;i<val.length;++i){
                var attendinfo = val[i].split(" - "); 
                var tmp = {};
                tmp['courseid']=attendinfo[0];
                tmp['course']=attendinfo[1];
                tmp['number']=attendinfo[2];
                tmp['name']=attendinfo[3];
                tmp['id']=attendinfo[4];
                tmp['date']=attendinfo[5];
                tmp['starttime']=attendinfo[6];
                tmp['endtime']=attendinfo[7];
                tmp['effective']=attendinfo[8];
                this.tableData.push(tmp);
            }
        }
    },

    props:['AttendanceMsg'],

    watch:{
        AttendanceMsg:function(val){
            this.show(val);
        }
    },

//1002019 - 数据库 - 1 - 张三 - 200001 - 2.1 - 10:00 - 11.35 - 1
    data() {
      return {
        tableData: [],
      }
    },
  }
</script>
