<!-- eslint-disable vue/no-dupe-keys -->
<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <div style="font-weight: bold; font-size: large">查询</div>
      <div
        style="
          clear: both;
          float: left;
          margin-top: 20px;
          display: inline-block, inline;
        "
      >
        <span>课程名称</span>
        <el-input
          class="childTable-input"
          v-model="queryKeyCode"
          placeholder="请输入课程名称"
          clearable
          style="width: 300px; margin-left: 10px"
        ></el-input>
        <el-button
          class="childTable-queryBtn"
          type="primary"
          icon="el-icon-search"
          @click="btnKeyCode = queryKeyCode"
          >搜索</el-button
        >
      </div>
    </div>
    <div style="width: 100%; margin-top: 50px">
      <div style="font-weight: bold; font-size: large">申请免修/免听列表</div>
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        v-loading="TableLoading"
        border
        @selection-change="handleSelectionChange"
        ref="multipleTable"
        style="margin-top: 20px"
        @filter-change="filterChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>

        <el-table-column prop="Snum" label="序号" width="120">
        </el-table-column>
        <el-table-column prop="CourseID" label="课程ID" width="160">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="课程名称"
          width="180"
          column-key="filterTag"
          :filters="getfilterNameItem()"
        >
        </el-table-column>
        <el-table-column prop="applyDate" label="申请日期" width="200">
        </el-table-column>
        <el-table-column prop="applyData" label="申请人" width="160">
        </el-table-column>
        <el-table-column prop="State" label="审核状态" width="160">
        </el-table-column>
        <el-table-column prop="applyData" label="查看资料" width="60">
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
        :total="10"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      courseNameOptions: [
        {
          label: "数据库原理和应用",
          value: "数据库原理和应用",
        },
        {
          label: "计算机系统结构",
          value: "计算机系统结构",
        },
        {
          label: "操作系统",
          value: "操作系统",
        },
        {
          label: "系统分析与设计",
          value: "系统分析与设计",
        },
        {
          label: "毛泽东思想概述",
          value: "毛泽东思想概述",
        },
      ],
      applyTypeOptions: [
        {
          label: "申请免听",
          value: "申请免听",
        },
        {
          label: "申请免修",
          value: "申请免修",
        },
      ],
      courseName: "",
      applyType: "",
      applyReason: "",
      btnKeyCode: "",
      queryKeyCode: "",

      fileList: [],
      multipleSelection: [],
      tableData: [
        {
          Snum: 1,
          CourseID: 20512314,
          courseName: "数据库原理和应用",
          applyDate: "2016-05-03",
          applyType: "张三",
          State: "待审核",
        },
        {
          Snum: 2,
          CourseID: 20534512,
          courseName: "计算机系统结构",
          applyDate: "2022-02-03",
          applyType: "李四",
          State: "已审核",
        },
      ],
      currentPage: 1,
      pageSize: 2,
    };
  },
  watch: {
    queryKeyCode(val) {
      this.queryKeyCode = val;
    },
  },
  computed: {
    // 模糊搜索右侧子表名称筛选
    // eslint-disable-next-line vue/no-dupe-keys
    tableData() {
      const search = this.btnKeyCode.trim();
      if (search) {
        return this.childData.filter((data) => {
          return data.eva_item_display.indexOf(search) > -1;
        });
      }
      return this.childData; //chilData 就是之前el-table 的 data数据
    },
  },

  methods: {
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
      console.log(filterObj.filterTag);
      if (filterObj.filterTag.length > 0) {
        console.log("点击筛选");
      } else {
        console.log("点击重置");
      }
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
      this.tableData.splice(index, 1);
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
