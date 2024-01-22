import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { UnAuthenticatedComponent } from './core/un-authenticated/un-authenticated.component';
import { StoreComponent } from './store/store.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';

const routes: Routes = [
  {path: '',  component:StoreComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'un-authenticated', component: UnAuthenticatedComponent},
  {path:'server-error', component: ServerErrorComponent},
  {path: 'details', loadChildren:()=>import('./store/store.module').then(mod=>mod.StoreModule)},
  {path: 'account', loadChildren:()=>import('./account/account.module').then(mod=>mod.AccountModule), data:{breadcrumb:{skip:true}}},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
