<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :span-method="arraySpanMethod"
    :key="randomKey"
    @cell-click="editData">
    <el-table-column
      prop="课程类别"
      label="课程类别"
      min-width="10%"
      align="center">
    </el-table-column>
    <el-table-column
      prop="大类基础课程"
      label="大类基础课程"
      min-width="10%"
      align="center">
      <template slot-scope="scope">
          <el-input v-if="scope.row[scope.column.property + 'isShow']&&isEdit"
                    :ref="scope.column.property"
                    v-model="scope.row.大类基础课程"
                    @blur="alterData(scope.row,scope.column)"
                    oninput="value=value.replace(/[^\d]|^[0]/g, '')"></el-input>
          <span v-else>{{ scope.row.大类基础课程 }}</span>
      </template>
    </el-table-column>
      
    <el-table-column
      prop="个性课程"
      label="个性课程"
      min-width="10%"
      align="center">
      <template slot-scope="scope">
          <el-input v-if="scope.row[scope.column.property + 'isShow']&&isEdit"
                    :ref="scope.column.property"
                    v-model="scope.row.个性课程"
                    @blur="alterData(scope.row,scope.column)"
                    oninput="value=value.replace(/[^\d]|^[0]/g, '')"></el-input>
          <span v-else>{{ scope.row.个性课程 }}</span>
      </template>
    </el-table-column>
    <el-table-column label="通识课程" align="center">
      <el-table-column
        prop="通识必修课"
        label="通识必修课"
        min-width="10%"
        align="center">
        <template slot-scope="scope">
          <el-input v-if="scope.row[scope.column.property + 'isShow']&&isEdit"
                    :ref="scope.column.property"
                    v-model="scope.row.通识必修课"
                    @blur="alterData(scope.row,scope.column)"
                    oninput="value=value.replace(/[^\d]|^[0]/g, '')"></el-input>
          <span v-else>{{ scope.row.通识必修课 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="通识选修课"
        label="通识选修课"
        min-width="10%"
        align="center">
        <template slot-scope="scope">
          <el-input v-if="scope.row[scope.column.property + 'isShow']&&isEdit"
                    :ref="scope.column.property"
                    v-model="scope.row.通识选修课"
                    @blur="alterData(scope.row,scope.column)"
                    oninput="value=value.replace(/[^\d]|^[0]/g, '')"></el-input>
          <span v-else>{{ scope.row.通识选修课 }}</span>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column label="专业课程" align="center">
      <el-table-column
        prop="专业基础课"
        label="专业基础课"
        min-width="10%"
        align="center">
        <template slot-scope="scope">
          <el-input v-if="scope.row[scope.column.property + 'isShow']&&isEdit"
                    :ref="scope.column.property"
                    v-model="scope.row.专业基础课"
                    @blur="alterData(scope.row,scope.column)"
                    oninput="value=value.replace(/[^\d]|^[0]/g, '')"></el-input>
          <span v-else>{{ scope.row.专业基础课 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="专业必修课"
        label="专业必修课"
        min-width="10%"
        align="center">
        <template slot-scope="scope">
          <el-input v-if="scope.row[scope.column.property + 'isShow']&&isEdit"
                    :ref="scope.column.property"
                    v-model="scope.row.专业必修课"
                    @blur="alterData(scope.row,scope.column)"
                    oninput="value=value.replace(/[^\d]|^[0]/g, '')"></el-input>
          <span v-else>{{ scope.row.专业必修课 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="专业选修课"
        label="专业选修课"
        min-width="10%"
        align="center">
        <template slot-scope="scope">
          <el-input v-if="scope.row[scope.column.property + 'isShow']&&isEdit"
                    :ref="scope.column.property"
                    v-model="scope.row.专业选修课"
                    @blur="alterData(scope.row,scope.column)"
                    oninput="value=value.replace(/[^\d]|^[0]/g, '')"></el-input>
          <span v-else>{{ scope.row.专业选修课 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="实践环节"
        label="实践环节"
        min-width="10%"
        align="center">
        <template slot-scope="scope">
          <el-input v-if="scope.row[scope.column.property + 'isShow']&&isEdit"
                    :ref="scope.column.property"
                    v-model="scope.row.实践环节"
                    @blur="alterData(scope.row,scope.column)"
                    oninput="value=value.replace(/[^\d]|^[0]/g, '')"></el-input>
          <span v-else>{{ scope.row.实践环节 }}</span>
        </template>
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        // tableData: [{
        //     课程类别:"需修学分",
        //     大类基础课程:"23.5",
        //     个性课程:"2",
        //     通识必修课:"35",
        //     通识选修课:"8",
        //     专业基础课:"43",
        //     专业必修课:"6",
        //     专业选修课:"12",
        //     实践环节:"36.5"
        // },
        // {
        //     课程类别:"学分小计",
        //     大类基础课程:"23.5",
        //     个性课程:"2",
        //     通识必修课:"43",
        //     通识选修课:"8",
        //     专业基础课:"97.5",
        //     专业必修课:"6",
        //     专业选修课:"12",
        //     实践环节:"36.5"
        // },
        // {
        //     课程类别:"学分总计",
        //     大类基础课程:"166",
        //     个性课程:"2",
        //     通识必修课:"43",
        //     通识选修课:"8",
        //     专业基础课:"97.5",
        //     专业必修课:"6",
        //     专业选修课:"12",
        //     实践环节:"36.5"
        // }],
        randomKey: Math.random(),
        isEdit:false
      }
    },
    props:['tableData'],
    methods:{
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 1) {
          if (columnIndex === 3) {
            return [1, 2];
          }else if(columnIndex === 4){
            return [0,0];
          }
          if (columnIndex === 5) {
            return [1, 4];
          }else if(columnIndex > 5){
            return [0,0];
          }
        }
        if (rowIndex === 2) {
          if (columnIndex === 1) {
            return [1, 8];
          }else if(columnIndex > 1){
            return [0,0];
          }
        }        
      },
      editData (row, column) {
        if(!this.isEdit)
          return;
        if(row["课程类别"]!='需修学分')
          return;
        row[column.property + "isShow"] = true
        
        //refreshTable是table数据改动时，刷新table的
        this.refreshTable()
        this.$nextTick(() => {
          this.$refs[column.property] && this.$refs[column.property].focus()
        })
      },
      alterData (row, column) {
        row[column.property + "isShow"] = false
        this.refreshTable()
      },
      refreshTable () {
        this.randomKey = Math.random()
      },
    }
  }
</script>