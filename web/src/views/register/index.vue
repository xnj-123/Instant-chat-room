<template>
  <div class="register_container">
    <el-row>
      <el-col :span="12"></el-col>
      <el-col :span="12">
        <div class="register_content">
          <el-form>
            <h1>Register</h1>
            <p>欢迎前来注册！</p>
            <el-form-item>
              <el-input placeholder="请输入用户名" prefix-icon="User" v-model="form_content.username"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="请输入密码" prefix-icon="Lock" type="password" show-password
                v-model="form_content.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="请确认密码" prefix-icon="Lock" type="password" show-password
                v-model="form_content.sure"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox>
                <template #default>
                  <p class="agree">同意《用户使用守则》</p>
                </template>
              </el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="register_btn" @click="goRegister()">注册</el-button>
            </el-form-item>
            <div class="hasAccount">
              <a @click="goLoginView">已有账号,去登录</a>
            </div>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router'
import { reactive } from 'vue';
import useUserStore from '@/stores/modules/user';
let UserStore = useUserStore();
let form_content = reactive({
  username: '',
  password: '',
  sure: ''
})
let $router = useRouter();
const goLoginView = () => {
  $router.push('/login')
}
const goRegister = async () => {
  if (form_content.username == '' || form_content.password == '') {
    alert('账号或者密码错误')
    return;
  }
  if (form_content.sure !== form_content.password) {
    alert('两次密码不一样')
    return
  }
  try {
    await UserStore.goRegister({ username: form_content.username, password: form_content.password });
    alert('创建成功');
    $router.push('/login')
  } catch (error) {
    alert(error)
  }


}

</script>

<style scoped lang='scss'>
.register_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/login_bg.jpg');
  background-size: cover;

  .register_content {
    width: 80%;
    background: url('@/assets/register_form.png');
    color: white;
    padding: 20px 40px;
    position: relative;
    top: 20vh;

    h1 {
      font-size: 36px;
    }

    p {
      font-size: 16px;
      margin: 25px 0;
    }

    .agree {
      color: rgb(204, 204, 204);
    }

    .register_btn {
      width: 100%;
    }

    .hasAccount {
      width: 100%;
      text-align: center;

      a {
        font-size: 14px;
        color: rgb(160, 2, 2);
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
</style>