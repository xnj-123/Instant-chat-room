import { reqLogin, reqRegister, reqUserInfo } from "@/api/user";
import { defineStore } from "pinia";

import type { LoginData } from "@/api/user/type";
import { GET_TOKEN, SET_TOKEN } from "@/utils/token";
const useUserStore = defineStore('User',{
    state:()=>{
        return {
            token:GET_TOKEN(),
            username:'',
            avatar:''
        }
    },
    actions:{
        async goLoginging(data:LoginData){
            let result = await reqLogin(data);
            if(result.code == 200){
                this.token = result.data;
                SET_TOKEN(result.data);
                return 'ok'
            }else{
                return Promise.reject(new Error(result.message))
            }
        },
        async getUserInfo(){
            let result = await reqUserInfo();
            if(result.code == 200){
                this.username = result.data[0].username;
                this.avatar = result.data[0].avatar;
                return 'ok'
            }else{
                return Promise.reject(new Error(result.message))
            }
        },
        async goRegister(data:any){
            let result =await reqRegister(data);
            if(result.code==200){
                return 'ok'
            }
            else{
                return Promise.reject(new Error(result.message))
            }
        }
    },
    getters:{

    }
})

export default useUserStore;