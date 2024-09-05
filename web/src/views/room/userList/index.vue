<template>
  <div class="List_container">
    <ul>
      <li v-for="(item) in users">
        <div v-if="UserStore.username != item.username" class="element">
          <img class="userHeader" :src="item.avatar">
          <p>{{ item.username }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang='ts'>
import useUserStore from '@/stores/modules/user';
let UserStore = useUserStore()
defineProps(['users'])
</script>

<style scoped lang='scss'>
.List_container {
  .element {
    height: 80px;
    width: 100%;
    display: flex;
    align-items: center;

    .userHeader {
      width: 50px;
      height: 50px;
      border-radius: 15%;
      margin: 0 15px;
    }

    p {
      color: white;
      font-size: 26px;
      font-weight: 600;
    }
  }
}
</style>