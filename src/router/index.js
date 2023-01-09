import { createRouter, createWebHistory } from "vue-router";
import useAuthUser from "@/composables/UseAuthUser";

const routes = [
  {
    name: "EmailConfirmation",
    path: "/email-confirmation",
    component: () => import("@/pages/EmailConfirmation.vue"),
  },
  {
    name: "Home",
    path: "/",
    component: () => import("@/pages/Home.vue"),
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/pages/Dashboard.vue"),
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("@/pages/Login.vue"),
  },
  {
    name: "ForgotPassword",
    path: "/forgotPassword",
    component: () => import("@/pages/ForgotPassword.vue"),
  },
  {
    name: "Logout",
    path: "/logout",
    beforeEnter: async () => {
      const { logout } = useAuthUser();
      await logout();
      return { name: "Home" };
    },
  },
  {
    name: "Register",
    path: "/register",
    component: () => import("@/pages/Register.vue"),
  },

  // Target pages - TODO: Is there a way to make this more compact?
  {
    name: "AllTargets",
    path: "/target",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/pages/target/AllTargets.vue"),
  },

  {
    name: "CreateTarget",
    path: "/target/create",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/pages/target/CreateTarget.vue"),
  },

  {
    name: "Meal",
    path: "/meal/:id",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/pages/Meal.vue"),
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const { isLoggedIn } = useAuthUser();
  if (
    !isLoggedIn() &&
    to.meta.requiresAuth &&
    !Object.keys(to.query).includes("fromEmail")
  ) {
    return { name: "Login" };
  }
});

export default router;
