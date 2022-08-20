<template>
  <div>
    <div style="width:100%;display: inline-block;">
      <div style="float: left; font-weight:bold; font-size:15px">已添加成绩表</div>
    </div>
    <el-table :data="tableData"
              :key="randomKey"
              style="width: 100%">
      <el-table-column label="学号"
                       property="studentId"
                       min-width="35%" />
      <el-table-column label="学生名称"
                       property="studentName"
                       min-width="35%" />
      <el-table-column label="成绩"
                       property="score"
                       min-width="30%">
        <template slot-scope="scope">
          <el-input v-if="scope.row[scope.column.property + 'isShow']"
                    :ref="scope.column.property"
                    v-model="scope.row.score"
                    @blur="alterData(scope.row,scope.column)"
                    oninput="value=value.replace(/[^\d]|^[0]/g, '')"></el-input>
          <span v-else>{{ scope.row.score }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="auto"
        min-width="25%">
        <template slot-scope="scope">
            <el-button @click="modify(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
        </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    props:['tableData'],
    methods: {
      modify(row) {
        row['scoreisShow']=true;
        this.refreshTable()
        this.$nextTick(() => {
            this.$refs['score'] && this.$refs['score'].focus()
        })
      },
      alterData (row, column) {
        if(row['score']==""||row['score']==null)
        {
          this.$message({
              message: '修改成绩不能为空',
              type: 'warning'
          });
          return;
        }
        var temp= {
            examid:this.examId,
            studentid:row['studentId'],
            grade:row['score']
        }
        this.$emit('func',0,temp);
        row[column.property + "isShow"] = false
        this.refreshTable()
      },
      refreshTable () {
        this.randomKey = Math.random()
      },
      del(row){
        var temp= {
            examid:this.examId,
            studentid:row['studentId'],
            grade:row['score']
        }
        this.$emit('func',1,temp);
      }
    },

    data() {
      return {
        randomKey: Math.random(),
        examId:''
      }
    }
  }
</script>