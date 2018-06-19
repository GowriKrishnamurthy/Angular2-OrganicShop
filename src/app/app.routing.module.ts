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
import { AdminAuthGuard } from './Auth/admin-auth-guard.service';
import { ErrorComponent } from './Auth/error.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';

const appRoutes: Routes = [
    // Routes acccessible to all including anonymous users
    { path: '', component: HomeComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'shopping-cart', component: ShoppingCartComponent },
    { path: 'login', component: LoginComponent },
    { path: 'error', component: ErrorComponent, data: { errorMessage: 'Permission denied!' } },
    // { path: 'error', component: ErrorComponent },
    // Routes protected by Auth guard - only acccessible to logged in users
    { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
    { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuard] },
    { path: 'my/orders', component: OrderSuccessComponent, canActivate: [AuthGuard] },

    // Routes for admin

    // order of the routes- More specific routes first..
    {
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [AdminAuthGuard, AuthGuard]
    },
    {
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [AdminAuthGuard, AuthGuard]
    },
    // most generic route in the bottom
    {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AdminAuthGuard, AuthGuard]
    },
    {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [AdminAuthGuard, AuthGuard]
    }
];


@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})

export class AppRoutingModule {
};