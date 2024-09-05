<template>
  <div class="userInfo_container">
    <img class="avatar" :src="imgUrl">
    <p class="username">{{ username }}</p>
  </div>
</template>

<script setup lang='ts'>
defineProps(['imgUrl', 'username'])
</script>

<style scoped lang='scss'>
.userInfo_container {
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;

  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 15%;
    margin: 0 15px;
  }

  .username {
    color: white;
    font-size: 26px;
    font-weight: 600;
  }
}
</style>