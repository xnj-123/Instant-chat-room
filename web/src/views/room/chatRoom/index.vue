<template>
    <div class='chatroom'>
        <div class="room_header">
            <p>在线人数({{ personNums }})</p>
        </div>
        <div class="room_main" ref="roomMain">
            <ul class="message_group">
                <li v-for="message in messages">
                    <Message :message="message"></Message>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang='ts'>
import Message from '@/components/Message/index.vue'
const prop = defineProps(['personNums', 'messages'])
import { ref, watch, nextTick, onMounted } from 'vue'

const roomMain = ref();
onMounted(() => {
    nextTick(() => {
        if (roomMain.value) {
            roomMain.value.scrollTop = roomMain.value.scrollHeight;
        }
    });
})

watch(() => prop.messages, () => {

    nextTick(() => {
        if (roomMain.value) {
            roomMain.value.scrollTop = roomMain.value.scrollHeight;
        }
    });

}, { deep: true })


</script>

<style scoped lang='scss'>
.chatroom {
    width: 100%;
    height: 100%;
    background-color: rgb(220, 216, 216);

    .room_header {
        height: 60px;
        border-bottom: 2px white solid;
        line-height: 60px;
        text-align: center;
        color: black;

        p {
            font-size: 22px;
            font-weight: 600;
        }
    }

    .room_main {
        width: 100%;
        height: 540px;
        overflow-y: auto;

    }
}
</style>