<template>
  <div>
    <div style="width:100%;display: inline-block;">
      <div style="float: left; font-weight:bold; font-size:15px">待添加成绩表</div>
      <div style="float: right;">
        <el-button type="primary" icon="el-icon-edit" size="mini" @click="openEdit">编辑</el-button>
        <el-button type="success" icon="el-icon-check" size="mini" @click="submit">提交</el-button>
      </div>
    
      <div style="clear: both;"></div>
    </div>
    <el-table :data="items"
              :key="randomKey"
              @cell-click="editData"
              style="width: 100%"
              max-height="400">
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
          <el-input v-if="scope.row[scope.column.property + 'isShow']&&isEdit"
                    :ref="scope.column.property"
                    v-model="scope.row.score"
                    @blur="alterData(scope.row,scope.column)"
                    oninput="value=value.replace(/[^\d]|^[0]/g, '')"></el-input>
          <span v-else>{{ scope.row.score }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props:['items'],
  data () {
    return {
      randomKey: Math.random(),
      isEdit:false,
      examId:"",
      addedGrade:[]
    }
  },
  methods: {
    openEdit(){
      if(!this.isEdit){
        this.isEdit=true;
        this.$message({
          message: '单击表格成绩处输入成绩',
          type: 'success'
        });
      }      
    },
    editData (row, column) {
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
    submit(){
      this.addedGrade=[];
      for(var i=0;i<this.items.length;++i)
      {
        if(this.items[i].score!=null&&this.items[i].score!="")
        {
          this.addedGrade.push({
            examid:this.examId,
            studentid:this.items[i].studentId,
            grade:this.items[i].score
          })
        }
      };
      this.$emit('func',this.addedGrade);
    }
  }

}
</script>