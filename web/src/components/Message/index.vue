<template>
    <div class="message_container">
        <div class="message" v-if="message.type != 'public'"
            :style="{ display: 'flex', flexDirection: message.username == UserStore.username ? 'row-reverse' : 'row' }">
            <div class="user">
                <span>{{ message.username }}</span>
                <img :src="message.avatar" class="user_header">
            </div>
            <div class="space"></div>
            <div class="message_content"
                :style="{ backgroundColor: message.username == UserStore.username ? 'white' : 'aquamarine' }">
                <p>{{ message.content }}</p>
            </div>
        </div>
        <div v-else class="public_message">
            <p>{{ message.username + (message.action == 'enter' ? '进入' : '离开') }}聊天室</p>
        </div>
    </div>
</template>

<script setup lang='ts'>
import useUserStore from '@/stores/modules/user';
let UserStore = useUserStore()
defineProps(['message'])
</script>

<style scoped lang='scss'>
.message_container {
    width: 100%;
    padding: 5px 20px;

    .message {
        display: flex;
        flex-direction: row-reverse;

        .user {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .user_header {
                width: 50px;
                height: 50px;
                border-radius: 15%;
                margin-top: 5px;
            }
        }


        .space {
            width: 15px;
        }

        .message_content {
            margin-top: 40px;
            padding: 20px;
            width: 250px;
            vertical-align: top;
            word-wrap: break-word;
            line-height: 1.4;
        }
    }

    .public_message {
        color: gray;
        text-align: center;
    }
}
</style>