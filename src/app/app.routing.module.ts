import { NgModule } from '@angular/core';

import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './Auth/login/login.component';
import { AuthGuard } from './Auth/auth-guard.service';

const appRoutes: Routes = [
    // Routes acccessible to all including anonymous users
    { path: '', component: HomeComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'shopping-cart', component: ShoppingCartComponent },
    { path: 'login', component: LoginComponent },
    
    // Routes protected by Auth guard - only acccessible to logged in users
    { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
    { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuard] },
    { path: 'my/orders', component: OrderSuccessComponent, canActivate: [AuthGuard] },
    
    // Routes for admin
    { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard] },
    { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard] }
];


@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})

export class AppRoutingModule {
};