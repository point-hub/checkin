import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "@/layouts/AppLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import GuestLayout from "@/layouts/GuestLayout.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    component: AppLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/app/Home")
      },
      {
        path: "checkin/create",
        name: "Create",
        component: () => import("@/views/app/Create")
      },
      {
        path: "checkin/:id",
        name: "Show",
        component: () => import("@/views/app/Show")
      },
      {
        path: "account",
        name: "Account",
        component: () => import("@/views/app/Account")
      },
      {
        path: "coming-soon",
        name: "ComingSoon",
        component: () => import("@/views/app/ComingSoon")
      },
      {
        path: "guide",
        name: "Guide",
        component: () => import("@/views/app/Guide")
      },
      {
        path: "guide/how-to-verify-email",
        name: "HowToVerifyEmail",
        component: () => import("@/views/app/guides/HowToVerifyEmail")
      },
      {
        path: "guide/how-to-create-group",
        name: "HowToCreateGroup",
        component: () => import("@/views/app/guides/HowToCreateGroup")
      }
    ],
    beforeEnter: async (to, from, next) => {
      await store.dispatch("auth/loginUsingToken");
      next();
    }
  },
  {
    path: "/",
    component: GuestLayout,
    children: [
      {
        path: "terms",
        name: "Terms",
        component: () => import("@/views/Terms.vue")
      },
      {
        path: "policy",
        name: "Policy",
        component: () => import("@/views/Policy.vue")
      },
      {
        path: "support",
        name: "Support",
        component: () => import("@/views/Support.vue")
      }
    ]
  },
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: "login",
        name: "Login",
        component: () => import("@/views/auth/Login.vue")
      }
    ]
  },
  {
    path: "/signup",
    component: AuthLayout,
    children: [
      {
        path: "",
        name: "Signup",
        component: () => import("@/views/auth/Signup.vue")
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
