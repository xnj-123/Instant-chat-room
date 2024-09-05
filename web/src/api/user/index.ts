import request from "@/utils/request"

import type { LoginData } from "./type"

enum API {
    USERLOGIN_URL = '/login',
    USERREGISTER_URL = '/createUser',
    GETUSERINFO_URL = '/getUserInfo'
}

export const reqLogin = (data:LoginData) => request.post<any,any>(API.USERLOGIN_URL,data);
export const reqRegister = (data:any) => request.post<any,any>(API.USERREGISTER_URL,data);
export const reqUserInfo = () => request.get<any,any>(API.GETUSERINFO_URL);
