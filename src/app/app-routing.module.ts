import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductsComponent } from './pages/store/products/products.component';
import { ProductsDetailsComponent } from './pages/store/products-details/products-details.component';
import { CartComponent } from './pages/store/cart/cart.component';
import { CheckoutComponent } from './pages/store/checkout/checkout.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { LoginComponent } from './pages/store/authui/login/login.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { SignupComponent } from './pages/store/authui/signup/signup.component';
import { OrdersComponent } from './pages/store/orders/orders.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['products']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['products']);


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product-detail', component: ProductsDetailsComponent },
  { path: 'cart', component: CartComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'orders', component: OrdersComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  {
    path: 'checkout', component: CheckoutComponent,
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  { path: 'login', component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToItems } },
  { path: 'signup', component: SignupComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToItems } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
