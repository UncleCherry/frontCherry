<template>
  <div class="building" >
    <div class="block">
    <el-carousel :interval="4000" type="card" height="590px">
    <el-carousel-item v-for="item in 4" :key="item">
      <el-image :src="imgUrl[item-1]"></el-image>
      <h1>{{msg[item-1]}}</h1>
    </el-carousel-item>
  </el-carousel>

  </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  data() {
    return {
      imgUrl:[require('../assets/5293.jpg'),
              require('../assets/10088.jpg'),
              require('../assets/11070.jpg'),
              require('../assets/6602.jpg'),
              ],
      msg:['师生一站式学习系统',
            '成绩查询简单快捷',
            '考试安排清晰明了',
            '网课考勤样样俱全',
          ]
    }
  },
  components: {
  }
}
</script>

<style scoped>
.home{

  position: relative;  
  /* background-image: url("../assets/pexels-jeffrey-czum-2904142-removebg.png"); */
  background-image:  url("../assets/5293.jpg");
  /* background-size:contain; */
  background-attachment:fixed;

  background-repeat: no-repeat;
  /* -webkit-background-size: cover;
  -o-background-size: cover; */
  top: 60;
  left: 0;
  width:100%;
  height:100%px;

  animation: fadeIn;
  animation-duration: 2s;
}

.bgimg{
  width:60%;
  margin-top:3%;
}

#building{
width:100%;
height:100%;
position:fixed;
background-size:100% 100%;
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
</style>
