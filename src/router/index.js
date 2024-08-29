import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterPage from "../views/RegisterPage.vue";
import LoginPage from "../views/LoginPage.vue";
import ViewJobs from "../components/ViewJobs.vue";
import JobView from "../views/JobView.vue";
import DashboardPage from "../components/DashboardPage.vue";
import ViewAll from "../components/ViewAll.vue";
import JobDetails from "../components/JobDetails.vue";
import SearchResult from "../components/SearchResult.vue"


const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/job/create",
    name: "create",
    component: JobView,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/view",
    name: "view",
    component: ViewJobs,
  },
  {
    path: "/view/all",
    name: "all",
    component: ViewAll,
  },

  { 
    path: "/job/:id",
    name:"JobDetails",
    component: JobDetails, 
    props: true,
    meta: { requiresAuth: true },
  },

  {
    path:"/job/search",
    name:"SearchResult",
    component:SearchResult
  }

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});
// 4$Ly45HAZv$rENC
export default router;
