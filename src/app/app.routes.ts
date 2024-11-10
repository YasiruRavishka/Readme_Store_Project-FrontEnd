import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { UserLoginComponent } from './pages/user/user-login/user-login.component';
import { UserSignupComponent } from './pages/user/user-signup/user-signup.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { UserInventoryComponent } from './pages/user/user-inventory/user-inventory.component';
import { UserCartComponent } from './pages/user/user-cart/user-cart.component';
import { UserOrdersComponent } from './pages/user/user-orders/user-orders.component';

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
        path: "user/login",
        component: UserLoginComponent
    },
    {
        path: "user/signup",
        component: UserSignupComponent
    },
    {
        path: "user/profile",
        component: UserProfileComponent
    },
    {
        path: "user/inventory",
        component: UserInventoryComponent
    },
    {
        path: "user/cart",
        component: UserCartComponent
    },
    {
        path: "user/orders",
        component: UserOrdersComponent
    }
];
