import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { ClearCartDialogComponent } from './components/shopping/shopping.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AdminAddNewProductDialogComponent } from './components/admin-page/admin-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './components/home/home.component';
import { HomeDialogComponent } from './components/home/home.component';
import { ThanksForShoppingDialog } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { PurchaseDialogComponent } from './components/purchase/purchase.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { TextHighlightPipe } from './pipes/text-highlight.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
    HomeComponent,
    AdminPageComponent,
    ShoppingComponent,
    PageNotFoundComponent,
    RegisterComponent,
    PurchaseComponent,
    ClearCartDialogComponent,
    TextHighlightPipe,
    PurchaseDialogComponent,
    AdminAddNewProductDialogComponent,
    HomeDialogComponent,
    ThanksForShoppingDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatDialogModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [LayoutComponent],
})
export class AppModule {}
