import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AccountComponent } from './pages/account/account.component';
import { DawEditorComponent } from './pages/daw/daw-editor/daw-editor.component';

const routes: Routes = [
  {path: '', component: DawEditorComponent},
  {path: 'home', component: DawEditorComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'account', component: AccountComponent},
  {path: 'daw/editor', component: DawEditorComponent},
  {path: 'daw/:projectId', component: DawEditorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

// add new routes here after adding a path above
export const routingComponents = [ 
  LoginComponent, 
  RegisterComponent,
  AccountComponent,
  DawEditorComponent
];
