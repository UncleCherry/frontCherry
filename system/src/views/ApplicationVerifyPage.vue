<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix"></div>
    <div style="width: 100%">
      <div style="font-weight: bold; font-size: large">学生申请信息</div>
      <el-table
        :data="
          tableData_1.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )
        "
        border
        @selection-change="handleSelectionChange"
        ref="multipleTable"
        tooltip-effect="light"
      >
        <el-table-column type="selection" width="50"> </el-table-column>
        <el-table-column prop="ApplicationId" label="申请编号" width="200">
        </el-table-column>
        <el-table-column prop="StudentName" label="学生姓名" width="200">
        </el-table-column>
        <el-table-column
          prop="Reason"
          label="申请理由"
          width="200"
          show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column prop="Time" label="时间" width="200">
        </el-table-column>
        <el-table-column prop="Type" label="申请类型" width="200">
        </el-table-column>
        <el-table-column prop="State" label="审核状态" width="200">
        </el-table-column>
        <el-table-column label="操作" width="200">
          <el-button size="mini" @click="PassApplication()">通过</el-button>
          <el-button size="mini" type="danger" @click="RejectApplication()"
            >拒绝</el-button
          >
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
        :page-sizes="[2, 5]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="20"
      >
      </el-pagination>
    </div>

    <!-- <el-dialog title="考生信息" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column
          property="date"
          label="日期"
          width="150"
        ></el-table-column>
        <el-table-column
          property="name"
          label="姓名"
          width="200"
        ></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog> -->
  </el-card>
</template>

<script>
import { AdminRejectApplication } from "@/api/apply";
import { AdminPassScoreApplication } from "@/api/apply";
import { AdmingetStudentApplication } from "@/api/apply";

export default {
  name: "TeacherScorePage",
  data() {
    return {
      courseName: "",
      search: "",
      courseMsg: "",
      multipleSelection: [],
      tableData_1: [],
      currentPage: 1,
      pageSize: 2,
      dialogTableVisible: false,
      dialogFormVisible: false,
    };
  },
  created() {
    AdmingetStudentApplication()
      .then((response) => {
        this.$message({
          message: "获取申请信息成功",
          type: "success",
        });
        this.tableData_1 = response.data.ApplicaitionsList;
      })
      .catch((error) => {
        this.$message({
          message: "获取申请信息失败",
          type: "warning",
        });
      });
  },
  mounted() {},
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    PassApplication() {
      this.$confirm("是否确认通过该学生申请", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var param = { applicationid: this.ApplicationId };
          AdminPassScoreApplication(param)
            .then((response) => {
              this.$message({ message: "已通过申请", type: "success" });
            })
            .catch((error) => {
              this.$message({ message: "操作失败,请重试", type: "warning" });
            });
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消" });
        });
    },
    RejectApplication() {
      this.$confirm("是否确认拒绝该学生的申请", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var param = { applicationid: this.ApplicationId };
          AdminRejectApplication(param)
            .then((response) => {
              this.$message({ message: "已拒绝申请", type: "success" });
            })
            .catch((error) => {
              this.$message({ message: "操作失败,请重试", type: "warning" });
            });
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消" });
        });
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
