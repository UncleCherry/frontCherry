<template>
    <div style="width:100%;display: flex;justify-content: center; margin-top:50px;">
      <el-card style="width:50%;border-style:solid;border-width:2px;border-color:#7494f3;">
        <div slot="header" class="clearfix" style="height:50px;background:#DCDFE6;overflow:hidden;">
          <span style="font-size:20px; font-weight:bold;  line-height: 50px">添加考试</span>
        </div>
        <div style="background:#DCDFE6;overflow:hidden;">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width:90%;padding-top:20px;padding-bottom:10px">
          <el-form-item label="考试名称" prop="coursename">
              <el-input v-model="ruleForm.coursename" placeholder="请输入考试名称"></el-input>
          </el-form-item>
          <el-form-item label="课程id" prop="coursename">
              <el-input v-model="ruleForm.courseid" placeholder="请输入课程id"></el-input>
          </el-form-item>
          <el-form-item label="会议号" prop="timeslot">
              <el-input v-model="ruleForm.meetingid" placeholder="请输入考试会议号"></el-input>
          </el-form-item>
          <el-form-item label="考试开始时间" prop="timeslot">
              <el-input v-model="ruleForm.starttime" placeholder="请输入考试开始时间  格式:2022-08-08T10:00:00"></el-input>
          </el-form-item>
          <el-form-item label="考试结束时间" prop="timeslot">
              <el-input v-model="ruleForm.endtime" placeholder="请输入考试结束时间  格式:2022-08-08T10:00:00"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
</template>
<script>
import { creatExam } from '@/api/Exam'
  export default {
    data() {
      return {
        ruleForm: {
          examname: '',
          courseid: '',
          meetingid: '',
          starttime: '',
          endtime: '',
          isRequired: true,
        },
        rules: {
          examname: [
            { required: true, message: '请输入考试名称', trigger: 'blur' },
          ],
          starttime: [
            { required: true, message: '请输入考试开始时间  格式:2022-08-08T10:00:00', trigger: 'change' },
            { required: true, trigger: "blur", validator: this.validTimeSlot },
          ],
          endtime: [
            { required: true, message: '请输入考试结束时间  格式:2022-08-08T12:00:00', trigger: 'change' },
            { required: true, trigger: "blur", validator: this.validTimeSlot },
          ],
          meetingid:[
            {required: true, message: '请选择所占学分', trigger: 'change'}
          ],
          courseid: [
            { required: true, message: '请选择一个年份', trigger: 'change' }
          ],
        },
        optionsDisable: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
        },
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          this.ruleForm.year=this.ruleForm.year.slice(0,4)
          if (valid) {
            createExam(this.ruleForm).then(response=>{
              this.$message({
                message: '添加考试成功',
                type: 'success'
              });
              this.resetForm('ruleForm')
            }).catch((error)=>{
              this.$message({
                message: '创建考试失败,请稍后再试',
                type: 'warning'
              });
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      async validTimeSlot(rule, value, callback) {
        var times=value.split("/");
        for(var i=0;i<times.length;++i)
        {
          if(!this.isValidTime(times[i]))
            callback(new Error("请输入正确的时间格式"));
        }
        callback();
      },
      isValidTime(str){
        var patt=/^周[一二三四五六日]\d{1,2}-\d{1,2}节$/;
        return true;
      }
    }
  }
</script>

<style lang="scss" scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
/deep/.el-card__header {
    padding: 0px 0px;
    border-bottom: 1px solid #7494f3;
    box-sizing: border-box;
}
/deep/.el-card__body, .el-main {
    padding: 0px;
}
</style>