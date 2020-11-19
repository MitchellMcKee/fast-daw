import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { DawEditorComponent } from './daw/daw-editor/daw-editor.component';
import { YoutubeSearchComponent } from './daw/youtube-search/youtube-search.component';
import { YoutubeDownloadComponent } from './daw/youtube-download/youtube-download.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'account', component: AccountComponent},
  {path: 'daw/editor', component: DawEditorComponent}
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
  DawEditorComponent,
  YoutubeSearchComponent,
  YoutubeDownloadComponent
];
