import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { ForgotPasswordComponent } from './components/account/forgot-password/forgot-password.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'account/login' },
    { path: 'account/login', component: LoginComponent },
    { path: 'account/register', component: RegisterComponent },
    { path: 'account/forgot-password', component: ForgotPasswordComponent },
    { path: 'admin/dashboard', component: DashboardComponent, canActivate: [AdminGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
