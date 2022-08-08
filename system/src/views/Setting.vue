<template>
    <div >
        <div style="display: flex;justify-content: center; margin-top:50px">
            <el-descriptions class="margin-top" title="登录信息" :column="3" border style="width:70%">
            <el-descriptions-item>
            <template slot="label">
                用户名
            </template>
            kooriookami
            </el-descriptions-item>
            <el-descriptions-item>
            <template slot="label">
                用户id
            </template>
            18100000000
            </el-descriptions-item>
            <el-descriptions-item>
            <template slot="label">
                用户身份
            </template>
            学生
            </el-descriptions-item>
            </el-descriptions>
        </div>
        <div style="margin-top:40px">
            <el-button type="primary" @click="dialogFormVisible = true">修改密码</el-button>
            <el-button type="danger" style="margin-left:50px" @click="unSubscribe">注销账户</el-button>
        </div>
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="500px">
            <el-form>
                <el-form-item label="新密码" :label-width="formLabelWidth">
                <el-input placeholder="请输入密码" v-model="psw" show-password ></el-input>
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth">
                <el-input placeholder="确认密码" v-model="checkpsw" show-password></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="changePsw">确 定</el-button>
            </div>
        </el-dialog>
    </div>
    
</template>

<script>
import {changePassword} from "../api/user";
import {unsubscribe} from "../api/user";
import { mapMutations } from 'vuex';
export default {
  name: 'Setting',
  data() {
      return{
        dialogFormVisible: false,
        formLabelWidth: '100px',
        psw:'',
        checkpsw:'',
      }
    },
   methods:{
    changePsw(){
        if(this.psw===''){
          this.$message({
            message: '未输入密码',
            type: 'warning'
          });
          return false;
        }

        if(this.psw!=this.checkpsw){
          this.$message({
            message: '输入密码不一致',
            type: 'warning'
          });
          return false;
        }

        let param={
          password:this.psw
        };

        changePassword(param).then(response=>{
          this.$message({
            message: '修改密码成功',
            type: 'success'
          });
          this.dialogFormVisible = false;
          }).catch((error)=>{
            this.$message({
              message: '修改失败请稍后再试',
              type: 'warning'
            });
          return;
        })
    },
    ...mapMutations(['delLogin']),
    unSubscribe(){
        this.$confirm('此操作将永久删除该账户信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          unsubscribe().then(response=>{
            this.$message({
                message: '注销账号成功',
                type: 'success'
            });
            this.dialogFormVisible = false;
            this.$parent.$parent.$parent.logout();
          }).catch((error)=>{
            this.$message({
                message: '注销失败请稍后再试',
                type: 'warning'
            });
            return;
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消注销'
          });          
        });  
    }
  },    
}
</script>

<style scoped>

</style>
