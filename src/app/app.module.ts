import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopnavComponent } from './nav/topnav/topnav.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './nav/footer/footer.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductsComponent } from './pages/store/products/products.component';
import { ProductsDetailsComponent } from './pages/store/products-details/products-details.component';
import { CartComponent } from './pages/store/cart/cart.component';
import { CheckoutComponent } from './pages/store/checkout/checkout.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './pages/store/authui/signup/signup.component';
import { LoginComponent } from './pages/store/authui/login/login.component';
import { OrdersComponent } from './pages/store/orders/orders.component';


@NgModule({
  declarations: [
    AppComponent,
    TopnavComponent,
    HomeComponent,
    FooterComponent,
    AboutComponent,
    ProductsComponent,
    ProductsDetailsComponent,
    CartComponent,
    CheckoutComponent,
    ContactUsComponent,
    LoginComponent,
    SignupComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    FormsModule,
    BrowserAnimationsModule,
    CalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
