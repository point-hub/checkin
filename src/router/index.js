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
        path: "contact",
        name: "Contact",
        component: () => import("@/views/app/Contact")
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
      try {
        await store.dispatch("auth/loginUsingToken");
        next();
      } catch (error) {
        // Token invalid or expired, redirect to login
        next("/auth/login");
      }
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
        component: () => import("@/views/auth/Login.vue"),
        beforeEnter: async (to, from, next) => {
          try {
            // Check if user is already logged in
            await store.dispatch("auth/loginUsingToken");
            // If successful, redirect to home
            next("/");
          } catch (error) {
            // Not logged in or token expired, proceed to login page
            next();
          }
        }
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
        component: () => import("@/views/auth/Signup.vue"),
        beforeEnter: async (to, from, next) => {
          try {
            // Check if user is already logged in
            await store.dispatch("auth/loginUsingToken");
            // If successful, redirect to home
            next("/");
          } catch (error) {
            // Not logged in or token expired, proceed to signup page
            next();
          }
        }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
