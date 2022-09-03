<!--
  登录页面
-->
<template>
  <div class="background" style="margin-left: -201px">
    <div class="login">
      <br />
      <strong style="font-family: 仿宋; font-size: 25px; color: white"
        >欢迎登录</strong
      >
      <el-divider></el-divider>
      <el-form label-width="80px" class="item" style="font-color: white">
        <el-form-item label="账号" prop="Id">
          <el-input
            placeholder="请输入账号"
            v-model="Id"
            style="width: 85%"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="password"
            show-password
            style="width: 85%"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="code">
          <el-row :span="24">
            <el-col :span="12">
              <el-input
                v-model="code"
                auto-complete="off"
                placeholder="请输入验证码"
                size=""
                style="width: 50%; margin-left: 60px"
              ></el-input>
            </el-col>
            <el-col :span="12">
              <div class="login-code" width="100%" @click="refreshCode">
                <Identify :identifyCode="identifyCode" />
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- <el-row :span="24">
            <el-col :span="12">
              <el-input v-model="code" auto-complete="off" placeholder="请输入验证码" size="" style="width:50%;margin-left:60px"
                        ></el-input>
            </el-col>
            <el-col :span="12">
              <div class="login-code" width="100%" @click="refreshCode">
                <Identify :identifyCode="identifyCode" />
              </div>
            </el-col>
          </el-row> -->
        <!-- <Identify /> -->
        <el-form-item style="margin-top: 20px">
          <el-button
            type="primary"
            plain
            style="background-color: rgba(0, 0, 0, 0.3); margin-left: -60px"
            @click="login"
          >
            <i class="el-icon-edit"></i>
            登录
          </el-button>
          <el-button
            type="warning"
            plain
            style="background-color: rgba(0, 0, 0, 0.3)"
            @click="openRegister"
          >
            <i class="el-icon-refresh-left"></i>
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Identify from "@/components/Identify";
import { eventBus } from "../main";
export default {
  components: {
    Identify,
  },
  created() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  data() {
    return {
      Id: "",
      password: "",
      code: "",
      identifyCode: "",
      identifyCodes: "1234567890abcdefjhijklinopqrsduvwxyz", //随机串内容
    };
  },
  methods: {
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode +=
          this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
      }
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    login() {
      //检验是否填写了学号
      if (this.Id === "") {
        this.$message({
          message: "请填写账号",
          type: "warning",
        });
        return;
      }

      //检验是否填写了密码
      if (this.password === "") {
        this.$message({
          message: "请填写密码",
          type: "warning",
        });
        return;
      }

      //检验是否填写了验证码
        if(this.code===''){
          this.$message({
            message: '请填写验证码',
            type: 'warning'
          });
          return;
        };

        //检验验证码是否填写正确
        if(this.code.toLowerCase()!=this.identifyCode.toLowerCase()){
          this.$message({
            message: '验证码填写错误',
            type: 'warning'
          });
          this.refreshCode()
          return;
        };

      let param = {
        account: this.Id,
        password: this.password,
      };

      eventBus.$emit("loginMsg", param);
    },
    openRegister() {
      this.$router.replace("/Register");
    },
  },
};
</script>

<style lang="scss" scoped>
.background {
  width: 100%;
  height: calc(100vh - 55px);
  background-position: center;
  position: absolute;
  background-image: url("../assets/loginBg.jpg");
  background-size: cover;
}

.front {
  position: absolute;
}

.login {
  width: 35%;
  height: auto;
  border: 1px solid black;
  border-radius: 3px;
  box-shadow: 0px 0px 7px #cdcdcd;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(52, 42, 85);
  background-color: rgba(0, 0, 0, 0.3);
}

/deep/ .el-input__inner {
  background-color: rgba(0, 0, 0, 0) !important;
  color: white;
}

::v-deep .item .el-form-item__label {
  color: white;
}

::v-deep .el-radio__label {
  padding-left: 20px;
  color: white;
}

::v-deep .el-radio__input.is-checked + .el-radio__label {
  color: #05fdfd !important;
}

::v-deep .el-radio__input.is-checked .el-radio__inner {
  background: #38c3e6 !important;
  border-color: #38c3e6 !important;
}
</style>
