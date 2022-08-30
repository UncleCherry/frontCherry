<template>
    <div>
        <el-dialog
            title="欢迎使用教学信息管理系统"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
          <span>本系统使用学号加密码登录,验证码不区分大小写</span><br /><br />
          <span>小组成员:</span><br />
          <span>2050304 郑元瑜</span><br />
          <span>2050277   林晨</span><br />
          <span>2020253 邱光磊</span><br />
          <span>2050251 王轶则</span><br />
          <span>2051826 杨正青</span><br />
          <span>2054172   金彦</span><br />
          <span>2054193 刘彦辰</span><br />
          <span>2050248 赵泽宇</span><br />
          <span>2052343   王晨</span><br />
          <span>2053500 董一成</span><br />
          <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>


<script>
  export default {
    data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>