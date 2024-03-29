import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { AudioContextModule } from 'angular-audio-context';

// Styling
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { ClipboardModule } from '@angular/cdk/clipboard';

// Services
import { AudioContextService } from 'src/services/audio-context-service';
import { FileService } from 'src/services/file-service';
import { TrackService } from 'src/services/track-service';

// UI Components
import { DawTrackComponent } from './pages/daw/daw-track/daw-track.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DawTrackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    FormsModule,
    MatSliderModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatGridListModule,
    MatIconModule,
    MatExpansionModule,
    FontAwesomeModule,
    MatDialogModule,
    ClipboardModule,
    AudioContextModule.forRoot('balanced')
  ],
  providers: [
    AudioContextService,
    FileService,
    TrackService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
