export default [
    {
        path:'/',
        redirect:'/room',
        children:[
            {
                path:'/room',
                component:()=>import('@/views/room/index.vue'),
                name:'Room'
            }
        ]
    },
    {
        path:'/login',
        component:()=>import('@/views/login/index.vue'),
        name:'Login'
    },
    {
        path:'/register',
        component:()=>import('@/views/register/index.vue'),
        name:'Register'
    },
    {
        path:'/404',
        component:()=>import('@/views/404/index.vue'),
        name:'404'
    },
    {
        path: '/:pathMact(.*)*',
        redirect: './404',
        name: 'Any',
    }
]