<template>
  <el-table
    :data="tableData"
    border
    height="550px"
    style="width: 100%;  margin-top: 20px; box-shadow: 0 0 8px 0 #aaa;"
    :row-style="{height: '30px'}">
    <el-table-column
      fixed
      prop="applicationid"
      label="申请序号"
      min-width="6%">
    </el-table-column>
    <el-table-column
      fixed
      prop="courseid"
      label="课程ID"
      min-width="9%">
    </el-table-column>
    <el-table-column
      fixed
      prop="course"
      label="课程名称"
      min-width="15%">
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
      label="申请日期"
      min-width="20%">
    </el-table-column>
    <el-table-column
      prop="state"
      label="审核状态"
      min-width="10%">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      min-width="15%">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small"
          style="color:red">
          撤销申请
        </el-button>
      </template>
    </el-table-column>
  </el-table>

</template>

<script>
  import { deleteLeave } from "@/api/leave";
  export default {
    methods: {
        show(val){
            this.tableData=[];
            for(var i=0;i<val.length;++i){
                var leaveinfo = val[i].split(" - "); 
                var tmp = {};
                tmp['applicationid']=leaveinfo[0];
                tmp['courseid']=leaveinfo[1];
                tmp['course']=leaveinfo[2];
                tmp['name']=leaveinfo[3];
                tmp['id']=leaveinfo[4];
                tmp['date']=leaveinfo[5];
                if(leaveinfo[6]=='0')
                  tmp['state']='待审核'
                else if(leaveinfo[6]=='1')
                  tmp['state']='申请成功'
                else if(leaveinfo[6]=='2')
                  tmp['state']='申请失败'
                this.tableData.push(tmp);
            }
        },
        deleteRow(row, rows){
          let _this = this
          this.$confirm('确认撤销这条申请吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type:'warning'
          }).then(()=>{
            var param = {
              applicationid:_this.tableData[row]['applicationid']
            };
            deleteLeave(param).then(response=>{
              this.$message({
                type: 'success',
                message: '请假申请撤销成功' 
              });
            }).catch((error)=>{
              this.$message({
                message: '撤销失败',
                type: 'warning'
              });
            });
            rows.splice(row, 1);
          }).catch((error) => {
            console.log(error)
            this.$message({
              type: 'info',
              message: '取消撤销操作'
            });       
          });
        },
        handleClick(row) {
          console.log(row);
        } 
    },

    props:['LeaveMsg'],

    watch:{
        LeaveMsg:function(val){
            this.show(val);
        }
    },

//1002019 - 数据库 - 张三 - 200001 - 2.1 - 1
    data() {
      return {
        tableData: [],
      }
    },
  }
</script>
