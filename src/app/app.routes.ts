import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent,canActivate:[logedGuard]},
    {path:'register',component:RegisterComponent,canActivate:[logedGuard]},
    {path:'home',component:HomeComponent,canActivate:[authGuard]},
    {path:'**',component:NotfoundComponent},

];
