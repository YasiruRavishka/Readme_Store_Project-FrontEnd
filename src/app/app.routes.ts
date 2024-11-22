import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { UserLoginComponent } from './pages/user/user-login/user-login.component';
import { UserSignupComponent } from './pages/user/user-signup/user-signup.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { UserCartComponent } from './pages/user/user-cart/user-cart.component';
import { UserOrdersComponent } from './pages/user/user-orders/user-orders.component';
import { CheckoutComponent } from './pages/user/checkout/checkout.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminDashboardComponent } from './pages/admin/pages/admin-dashboard/admin-dashboard.component';
import { BookManagementComponent } from './pages/admin/pages/book-management/book-management.component';
import { OrderManagementComponent } from './pages/admin/pages/order-management/order-management.component';
import { UserManagementComponent } from './pages/admin/pages/user-management/user-management.component';

export const routes: Routes = [
    {
        path: "",
        component: DashboardComponent
    },
    {
        path: "search",
        component: SearchPageComponent
    },
    {
        path: "about",
        component: AboutComponent
    },
    {
        path: "user",
        children: [
            {
                path: "",
                redirectTo: "profile",
                pathMatch: "full"
            },
            {
                path: "profile",
                component: UserProfileComponent
            },
            {
                path: "login",
                component: UserLoginComponent
            },
            {
                path: "signup",
                component: UserSignupComponent
            },
            {
                path: "orders",
                component: UserOrdersComponent
            },
            {
                path: "cart",
                component: UserCartComponent
            },
            {
                path: "checkout",
                component: CheckoutComponent
            }
        ]
    },
    {
        path: "admin",
        component: AdminComponent,
        children: [
            {
                path: "",
                redirectTo: "dashboard",
                pathMatch: "full"
            },
            {
                path: "dashboard",
                component: AdminDashboardComponent
            },
            {
                path: "book-management",
                component: BookManagementComponent
            },
            {
                path: "order-management",
                component: OrderManagementComponent
            },
            {
                path: "user-management",
                component: UserManagementComponent
            }
        ]
    }
];
