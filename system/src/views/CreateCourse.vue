<template>
    <div style="width:100%;display: flex;justify-content: center; margin-top:50px;">
      <el-card style="width:50%;border-style:solid;border-width:2px;border-color:#7494f3;box-shadow: 5px 5px 5px 5px #2D485C;">
        <div slot="header" class="clearfix" style="height:50px;background:#DCDFE6;overflow:hidden;">
          <span style="font-size:20px; font-weight:bold;  line-height: 50px">创建课程</span>
        </div>
        <div style="background:#DCDFE6;overflow:hidden;">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width:90%;padding-top:20px;padding-bottom:10px">
          <el-form-item label="课程名称" prop="coursename">
              <el-input v-model="ruleForm.coursename" placeholder="请输入课程名称"></el-input>
          </el-form-item>
          <el-form-item label="课程时间" prop="timeslot">
              <el-input v-model="ruleForm.timeslot" placeholder="请输入课程时间  格式:周一1-3节/周三3-5节"></el-input>
          </el-form-item>
          <el-form-item label="课程学分" prop="credit">
              <el-select v-model="ruleForm.credit" placeholder="请选择学分">
                  <el-option label="0.5" value="0.5"></el-option>
                  <el-option label="1" value="1"></el-option>
                  <el-option label="1.5" value="1.5"></el-option>
                  <el-option label="2" value="2"></el-option>
                  <el-option label="2.5" value="2.5"></el-option>
                  <el-option label="3" value="3"></el-option>
                  <el-option label="3.5" value="3.5"></el-option>
                  <el-option label="4" value="4"></el-option>
                  <el-option label="4.5" value="4.5"></el-option>
                  <el-option label="5" value="5"></el-option>
                  <el-option label="5.5" value="5.5"></el-option>
                  <el-option label="6" value="6"></el-option>
                  <el-option label="6.5" value="6.5"></el-option>
                  <el-option label="7" value="7"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="是否必修" prop="isRequired">
              <el-switch v-model="ruleForm.isRequired"></el-switch>
          </el-form-item>
          <el-form-item label="课程年份" prop="year">
              <el-date-picker type="year" placeholder="选择年份" v-model="ruleForm.year"  value-format="yyyy-MM-dd" ></el-date-picker>
          </el-form-item>
          <el-form-item label="课程学期" prop="semester">
              <el-select v-model="ruleForm.semester" placeholder="请选择学期">
                  <el-option label="第一学期" value="第一学期"></el-option>
                  <el-option label="第二学期" value="第二学期"></el-option>
              </el-select>
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
import { createCourse } from '@/api/course'
  export default {
    data() {
      return {
        ruleForm: {
          coursename: '',
          timeslot: '',
          credit: '',
          isRequired: true,
          year: '',
          semester: '',
        },
        rules: {
          coursename: [
            { required: true, message: '请输入课程名称', trigger: 'blur' },
          ],
          timeslot: [
            { required: true, message: '请输入课程时间  格式:周一1-3节/周三3-5节', trigger: 'change' },
            { required: true, trigger: "blur", validator: this.validTimeSlot },
          ],
          credit:[
            {required: true, message: '请选择所占学分', trigger: 'change'}
          ],
          year: [
            { required: true, message: '请选择一个年份', trigger: 'change' }
          ],
          semester: [
            { required: true, message: '请选择一个学期', trigger: 'change' }
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
            createCourse(this.ruleForm).then(response=>{
              this.$message({
                message: '创建课程成功',
                type: 'success'
              });
              this.resetForm('ruleForm')
            }).catch((error)=>{
              this.$message({
                message: '创建课程失败,请稍后再试',
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
        return patt.test(str);
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