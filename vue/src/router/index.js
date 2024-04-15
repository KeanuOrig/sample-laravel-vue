import { createRouter, createWebHistory } from "vue-router"
import DefaultLayout from '../components/DefaultLayout.vue'
import GuestLayout from '../components/GuestLayout.vue'
import Home from '../views/Home.vue'
import ProductList from '../views/ProductList.vue'
import UserList from '../views/UserList.vue'
import UserDetails from '../views/UserDetails.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import ProductCreate from '../views/ProductCreate.vue'
import ProductUpdate from '../views/ProductUpdate.vue'

const routes = [
    {
        path: '/',
        component: DefaultLayout,
        children: [
            {
            path: '/',
            name: "home",
            component: Home,
            },
            {
            path: '/product-list',
            name: "productList",
            component: ProductList
            },
            {
            path: '/product-create',
            name: "productCreate",
            component: ProductCreate
            },
            {
            path: '/product-update/:productId',
            name: "productUpdate",
            component: ProductUpdate
            },
            {
            path: '/user-list',
            name: "userList",
            component: UserList,
            },
            {
            path: '/user-list/:userId',
            name: "userDetails",
            component: UserDetails,
            },
            {
            path: '/register',
            name: "register",
            component: Register
            },
            {
            path: '/login',
            name: "login",
            component: Login
            },
            {
            path: '/logout',
            name: "logout",
            component: Home
            },
        ]
    },
    {
        path: '/guest',
        component: GuestLayout
    }
]
/* const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: "/",
        name: "home",
        component: Home,
      },
      {
        path: "/by-name/:name?",
        name: "byName",
        component: MealsByName,
      },
      {
        path: "/by-letter/:letter?",
        name: "byLetter",
        component: MealsByLetter,
      },
      {
        path: "/ingredients",
        name: "ingredients",
        component: Ingredients,
      },
      {
        path: "/by-ingredient/:ingredient",
        name: "byIngredient",
        component: MealsByIngredient,
      },
      {
        path: '/meal/:id',
        name: 'mealDetails',
        component: MealDetails
      }
    ]
  },
  {
    path: '/guest',
    component: GuestLayout
  }
]; */

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;