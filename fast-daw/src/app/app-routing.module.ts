import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DawEditorComponent } from './pages/daw/daw-editor/daw-editor.component';

const routes: Routes = [
  {path: '', component: DawEditorComponent},
  {path: 'preload/:preloadTrack', component: DawEditorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

// add new routes here after adding a path above
export const routingComponents = [
  DawEditorComponent
];
