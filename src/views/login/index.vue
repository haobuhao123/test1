<template>
  <div class='container'>
    <el-card class="my-card">
      <img src="../../assets/images/logo_index.png" alt="">
    </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang='less'>
.container{
  position: absolute;
  width: 100%;
  height: 100%;
  // 背景图定位 / 背景图尺寸 contain 等比缩放完整在容器内显示  cover  等比缩放完全铺面容器
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover
}
.my-card{
  width: 400px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-60%);
  img{
    display: block;
    width: 200px;
    margin: 0 auto;
  }
}
.el-card__body{
  background: red;
}

</style>
