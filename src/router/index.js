import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DetailView from "../views/DetailView.vue";
import SignUpView from "../views/signUp.vue";
import LoginView from "../views/loginView.vue";
import CartView from "../views/CartView.vue";
import ConfirmView from "../views/ConfirmView.vue";
import ThankYou from "../views/ThankYouView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/:id",
    name: "detail",
    component: DetailView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
  },
  {
    path: "/confirm",
    name: "confirm",
    component: ConfirmView,
  },
  {
    path: "/thankyou",
    name: "thankyou",
    component: ThankYou,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
