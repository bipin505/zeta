import VueRouter from 'vue-router'
import EmployeeList from '@/components/EmployeeList'
import Login from '@/components/Login'
export default new VueRouter({
    routes: [{
            path: '/',
            redirect: {
                name: "login"
            }
        },
        {
            path: "/login",
            name: "login",
            component: Login
        }, {
            path: '/EmployeeList',
            name: 'EmployeeList',
            component: EmployeeList
        }
    ]
})