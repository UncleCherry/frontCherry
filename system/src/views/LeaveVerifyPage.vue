<!-- eslint-disable vue/no-dupe-keys -->
<template>
  <el-card class="box-card">
    <div style="width: 100%; margin-top: 10px">
      <div style="font-weight: bold; font-size: large">请假申请列表</div>
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        border
        @selection-change="handleSelectionChange"
        ref="multipleTable"
        style="margin-top: 20px"
        @filter-change="filterChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>

        <el-table-column prop="applicationid" label="申请序号" width="120">
        </el-table-column>
        <el-table-column prop="courseid" label="课程ID" width="160">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="课程名称"
          width="180"
          sortable
          column-key="courseName"
          :filters="getfilterNameItem()"
        >
        </el-table-column>
        <el-table-column prop="date" label="申请日期" width="200">
        </el-table-column>
        <el-table-column prop="student" label="申请人" width="160">
        </el-table-column>
        <el-table-column
          prop="state"
          label="审核状态"
          width="140"
          column-key="state"
          :filters="[
            { text: '已审核', value: '已审核' },
            { text: '待审核', value: '待审核' }]"
          :filter-method="filterState"
        >
        </el-table-column>
        <el-table-column prop="reason" label="申请原因" width="80">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              icon="el-icon-search"
            ></el-button>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="175">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >同意</el-button
            >
            <el-button
              size="mini"
              type="danger"
              style="margin-left: 20px"
              @click="handleDelete(scope.$index, scope.row)"
              >拒绝</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="clear: both; float: left; margin-top: 15px">
        <el-button @click="toggleSelection(tableData)">全选</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>

      <el-pagination
        style="clear: both; margin-top: 30px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 5, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalnum"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import { getCourseInfo } from '@/api/course';
import { getAdminLeave } from '@/api/leave'
export default {
  name: 'LeaveVerify',
  inject: ['reload'],
  created(){
    let token=localStorage.getItem('Authorization')
    let _this = this
    if(token==null||token==''){
      //无token,需要登陆
      console.log('无token信息')
      return;
    }
    else{
      //有token,则读取token
      console.log('有token信息')
      _this.getLeave()
    }
  },
  data() {
    return {
      adminid:"",
      courseName: "",
      applyType: "",
      applyReason: "",

      fileList: [],
      multipleSelection: [],
      tableData: [],
      currentPage: 1,
      pageSize: 2,
      totalnum: 0,
    };
  },
  watch: {
    queryKeyCode(val) {
      this.queryKeyCode = val;
    },
  },

  methods: {
    getLeave(){
      let _this = this
      getAdminLeave().then(async(response)=>{
        var list = response.data.ApplicationsList
        for(var i = 0; i < list.length; ++i){
          var tmp = {};
          var myreason = list[i].Reason.split('-')
          var mytime = list[i].Time.split('T')
          var mycoursename = ''
          var param = {
            courseid: parseInt(myreason[0])
          }
          await getCourseInfo(param).then(response=>{
            mycoursename = response.data.course.CourseName
          }).catch((error)=>{
            this.$message({
              message:'获取课程信息失败',
              type:'warning',
            })
          });
          tmp['applicationid'] = list[i].ApplicationId
          tmp['courseid'] = myreason[0]
          tmp['courseName'] = mycoursename
          tmp['date'] = mytime[0]
          tmp['student'] = list[i].UserId.toString() + '-' + list[i].StudentName
          if(list[i].State == 0){
            tmp['state'] = "待审核"
          }
          else if(list[i].State == 1 || list[i].State == 2){
            tmp['state'] = "已审核"
          }
          _this.tableData.push(tmp);
          _this.totalnum++;
        }
      }).catch((error)=>{
        this.$message({
          message:'获取申请信息失败',
          type:'warning',
        })
      });
    },
    getfilterNameItem() {
      let apiArr = [
        // 发请求获取筛选项的数据
        { text: "数据库原理和应用", value: "数据库原理和应用" },
        {
          text: "计算机系统结构",
          value: "计算机系统结构",
        },
      ];
      return apiArr;
    },
    filterChange(filterObj) {
      console.log(filterObj['state'].length);
    },
    filterState(value, row){
      return row.state = value;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
  },
};
</script>

<style>
.text {
  font-size: 20px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
