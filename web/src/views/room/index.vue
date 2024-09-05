<template>
    <div class="Room_container">
        <div class="Room_content">
            <div class="aside">
                <UserInfo :imgUrl="UserStore.avatar" :username="UserStore.username"></UserInfo>
                <div class="divide">
                    <span>在线成员</span>
                </div>
                <el-scrollbar class="scroll">
                    <UserList :users="users"></UserList>
                </el-scrollbar>
            </div>

            <div class="mainContent">
                <div class="chatRoom">
                    <ChatRoom :personNums="num" :messages="messageGroup"></ChatRoom>
                </div>
                <div class="operation">
                    <Operation @sendM="sendToS"></Operation>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import UserInfo from './userInfo/index.vue'
import UserList from './userList/index.vue'
import ChatRoom from './chatRoom/index.vue'
import Operation from './operate/index.vue'
import { io } from 'socket.io-client'
import useUserStore from '@/stores/modules/user'
import { onMounted, ref, reactive } from 'vue'
import { REMOVE_TOKEN } from '@/utils/token'


let num = ref<number>(0)
let users = ref<any>([])
let UserStore = useUserStore();
let socket = io('http://localhost:3000');
let messageGroup = ref<any>([])

onMounted(() => {
    socket.emit('getNewsList');
    socket.emit('enter', { username: UserStore.username, avatar: UserStore.avatar });
    REMOVE_TOKEN()
})

socket.on('userList', data => {
    num.value = data.length;
    users.value = data
})

socket.on('addUser', data => {
    messageGroup.value.push({
        username: data.username,
        avatar: data.avatar,
        type: 'public',
        action: 'enter'
    });
})

socket.on('delUser', data => {
    messageGroup.value.push({
        username: data.username,
        avatar: '',
        type: 'public',
        action: 'leave'
    });
})

function sendToS(data: any) {
    let message = {
        username: UserStore.username,
        avatar: UserStore.avatar,
        type: 'user',
        action: '',
        content: data.message,
    }
    socket.emit('sendMessage', message)
}

socket.on('submitNews', data => {
    messageGroup.value.push({ ...data })
})

socket.on('newsList', data => {
    data.forEach((item: any) => {
        messageGroup.value.push(item)
    })
})

</script>

<style scoped lang='scss'>
.Room_container {
    width: 100%;
    height: 100vh;
    background-color: rgb(174, 174, 174);

    .Room_content {
        width: 1200px;
        height: 100vh;
        margin: 0 auto;
        display: flex;

        .aside {
            width: 300px;
            height: 100vh;
            background-color: #2e2e2e;

            .divide {
                width: 100%;
                height: 40px;
                box-sizing: border-box;
                border-top: 4px solid black;
                border-bottom: 4px solid black;
                line-height: 30px;
                text-align: center;
                font-size: 26px;
                font-weight: 600;
                color: gray;
            }

            .scroll {
                height: calc(100vh - 120px);
            }
        }

        .mainContent {
            width: 900px;
            height: 100vh;
            display: flex;
            flex-direction: column;

            .chatRoom {
                height: 600px;
                width: 100%;
            }

            .operation {
                height: calc(100vh - 600px);
                width: 100%;
            }
        }

    }
}
</style>