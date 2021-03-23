import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/store/login/login.component';


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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
