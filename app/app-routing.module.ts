import { PurchaseComponent } from './components/purchase/purchase.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'shopping', component: ShoppingComponent },
  { path: 'purchase', component: PurchaseComponent },
  { path: 'gmLoggedInAd', component: AdminPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  
}
