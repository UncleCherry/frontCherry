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
        <el-button @click="handleClick(scope.row)" type="text" size="small" style="color:red">撤销申请</el-button>
      </template>
    </el-table-column>
  </el-table>

</template>

<script>
  export default {
    methods: {
        show(val){
            this.tableData=[];
            for(var i=0;i<val.length;++i){
                var leaveinfo = val[i].split(" - "); 
                var tmp = {};
                tmp['courseid']=leaveinfo[0];
                tmp['course']=leaveinfo[1];
                tmp['name']=leaveinfo[2];
                tmp['id']=leaveinfo[3];
                tmp['date']=leaveinfo[4];
                if(leaveinfo[5]=='0')
                  tmp['state']='待审核'
                else if(leaveinfo[5]=='1')
                  tmp['state']='申请成功'
                else if(leaveinfo[5]=='2')
                  tmp['state']='申请失败'
                this.tableData.push(tmp);
            }
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
