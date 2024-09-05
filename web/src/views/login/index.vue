<template>
    <div class="Login_bg">
    </div>
    <div class="login_container">
        <el-form label-width="auto">
            <h1>欢迎登录</h1>
            <el-form-item label="用户名:">
                <el-input v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码:">
                <el-input type="password" show-password v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="login_btn" @click="goLogining">登录</el-button>
            </el-form-item>
            <a @click="goRegister">没有账号前去注册</a>
        </el-form>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import useUserStore from '@/stores/modules/user'

let UserStore = useUserStore()
let $router = useRouter();
let loginForm = reactive({
    username: '',
    password: ''
})
const goRegister = () => {
    $router.push('/register')
}

const goLogining = async () => {
    if (loginForm.username == '' || loginForm.password == '') {
        alert('账号密码不存在')
        return;
    }
    try {
        await UserStore.goLoginging(loginForm);
        $router.push('/room')
    } catch (error) {
        alert('账号或者密码错误')
    }

}
</script>

<style scoped lang='scss'>
.Login_bg {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: url('@/assets/login_bg.jpg') no-repeat;
    background-size: cover;
    z-index: -1;
    filter: blur(10px);
}

.login_container {
    margin: 0 auto;
    width: 400px;
    background-color: white;
    border-radius: 5%;
    box-shadow: 2px 2px 2px 4px rgb(128, 128, 128, 0.2);
    position: relative;
    top: 30vh;
    padding: 20px 40px;
    text-align: center;

    h1 {
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 30px;
    }

    .login_btn {
        width: 100%;
    }

    a {
        font-size: 12px;
        color: red;
        text-decoration: underline;
        cursor: pointer;
    }
}
</style>