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
        <el-table-column prop="applicationid" label="申请序号" width="120">
        </el-table-column>
        <el-table-column prop="courseid" label="课程ID" width="140">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="课程名称"
          width="200"
          sortable
          column-key="courseName"
          :filters="getfilterNameItem()"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column prop="number" label="课次" width="87">
        </el-table-column>
        <el-table-column prop="date" label="申请日期" width="150">
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
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column prop="reason" label="请假理由" width="80">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleSearch(scope.$index)"
              icon="el-icon-search"
            ></el-button>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="handlePass(scope.$index)"
              >同意</el-button
            >
            <el-button
              size="mini"
              type="danger"
              style="margin-left: 20px"
              @click="handleReject(scope.$index)"
              >拒绝</el-button
            >
          </template>
        </el-table-column>
      </el-table>

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
import { getCourseInfo,getAllCourse } from '@/api/course';
import { getAdminLeave,getApplicationInfo,passStudentLeave,rejectStudentLeave } from '@/api/leave'
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
      pageSize: 5,
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
          tmp['number'] = myreason[1]
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
      let apiArr = [];
      let courseMsg = ''
      getAllCourse().then(response=>{
        courseMsg = response.data.CoursesList
        for(var i = 0; i < courseMsg.length; ++i){
          apiArr[i] = { "text":courseMsg[i].CourseName, "value":courseMsg[i].CourseName }
        }
      }).catch((error)=>{
        this.$message({
          message:'获取课程信息失败',
          type:'warning',
        })
      });
      return apiArr;
    },
    filterChange(filterObj) {
      console.log("筛选条件变化",filterObj);
    },
    filterHandler(value, row, column){
      const property = column['property'];
      return row[property] === value;
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
    handleSearch(row){
      let _this = this
      var param = {
        leaveid:_this.tableData[row]['applicationid']
      };
      getApplicationInfo(param).then(response=>{
        var list = response.data.ApplicationsList
        var reason = list[0].Reason.split('-')
        var myreason = reason[2]
        this.$alert(myreason, '请假理由', {
          confirmButtonText: '确定',
        });
      }).catch((error)=>{
        console.log(error)
        this.$message({
          message:'查询请假理由失败',
          type:'warning'
        })
      });
    },
    handlePass(row) {
      let _this = this
      if(_this.tableData[row]['state'] == "已审核"){
        this.$message({
          message:"该申请已通过审核，无法进行操作",
          type:'warning'
        })
      }
      else{
        this.$confirm('确认通过这条申请吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type:'warning'
        }).then(()=>{
          var param = {
            applicationid:_this.tableData[row]['applicationid']
          };
          passStudentLeave(param).then(response=>{
            this.$message({
              type: 'success',
              message: '已通过申请'
            });
            _this.tableData[row]['state'] = "已审核"
            this.reload()
          }).catch((error)=>{
            this.$message({
              type: 'warning',
              message: '通过申请失败'
            });
          })
        }).catch((error) => {
          console.log(error)
          this.$message({
            type: 'info',
            message: '取消通过申请操作'
          });       
        });
      }
      console.log(row);
    },
    handleReject(row) {
      let _this = this
      if(_this.tableData[row]['state'] == "已审核"){
        this.$message({
          message:"该申请已通过审核，无法进行操作",
          type:'warning'
        })
      }
      else{
        this.$confirm('确认拒绝这条申请吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type:'warning'
        }).then(()=>{
          var param = {
            applicationid:_this.tableData[row]['applicationid']
          };
          rejectStudentLeave(param).then(response=>{
            this.$message({
              type: 'success',
              message: '已拒绝申请'
            });
            _this.tableData[row]['state'] = "已审核"
            this.reload()
          }).catch((error)=>{
            this.$message({
              type: 'warning',
              message: '拒绝申请失败'
            });
          })
        }).catch((error) => {
          console.log(error)
          this.$message({
            type: 'info',
            message: '取消拒绝申请操作'
          });       
        });
      }
      console.log(row);
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
