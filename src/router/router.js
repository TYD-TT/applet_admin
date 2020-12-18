import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import Welcome from '../views/Welcome.vue'
import S_message from '../views/student/S_message.vue'
import S_password from '../views/student/S_password.vue'
import T_software from '../views/teacher/T_software.vue'
import T_basic from '../views/teacher/T_basic.vue'
import T_fault from '../views/teacher/T_fault.vue'
import T_host from '../views/teacher/T_host.vue'
import T_password from '../views/teacher/T_password.vue'
import T_port from '../views/teacher/T_port.vue'
import T_new from '../views/teacher/T_new.vue'
import T_virtual from '../views/teacher/T_virtual.vue'
import T_advisory from '../views/teacher/T_advisory.vue'

import Image from '../views/teacher/image.vue'
import Feedback from '../views/feedback/feedback.vue'
import ContentEdit from '../views/content/ContentEdit.vue'
import ContentList from '../views/content/ContentList.vue'


Vue.use(VueRouter)

const routes = [
  { path: '/', component: Login },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/student/s_message', component: S_message },
      { path: '/student/s_password', component: S_password },
      { path: '/teacher/t_software', component: T_software },
      { path: '/teacher/t_basic', component: T_basic },
      { path: '/teacher/t_fault', component: T_fault },
      { path: '/teacher/t_host', component: T_host },
      { path: '/teacher/t_password', component: T_password },
      { path: '/teacher/t_port', component: T_port },
      { path: '/teacher/t_virtual', component: T_virtual },
      { path: '/teacher/t_new', component: T_new },
      { path: '/teacher/t_advisory', component: T_advisory },
      { path: '/main/image', component: Image },
      { path: '/feedback', component: Feedback
     },
      { path: '/content/contentEdit', component: ContentEdit },
      { path: '/content/contentList', component: ContentList }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
