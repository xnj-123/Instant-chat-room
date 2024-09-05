import router from './router'

import pinia from './stores';
import useUserStore from '@/stores/modules/user'

let UserStore = useUserStore(pinia);

router.beforeEach(async(to:any,from:any,next:any)=>{
    const token = UserStore.token;
    const username = UserStore.username;

    if(to.path == '/room'){
        if(token){
            if(username){
                next();
            }else{

                try {
                    await UserStore.getUserInfo();
                    next()
                } catch (error) {
                    next({path:'/login'})
                }
            }
        }else{
            next({path:'/login'})
        }
    }else{
        next();
    }

})