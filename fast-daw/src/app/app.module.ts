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


// Services
import { YouTubeSearchService } from 'src/services/youtube-search-service';
import { YouTubeDownloadService } from 'src/services/youtube-download-service';
import { AudioContextService } from 'src/services/audio-context-service';
import { UserService } from 'src/services/user-service';
import { FileService } from 'src/services/file-service';

// Non-routing Componentsimport { YoutubeSearchComponent } from './daw/youtube-search/youtube-search.component';
import { YoutubeDownloadComponent } from './daw/youtube-download/youtube-download.component';
import { YoutubeSearchComponent } from './daw/youtube-search/youtube-search.component';
import { DawTrackComponent } from './daw/daw-track/daw-track.component';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    YoutubeDownloadComponent,
    YoutubeSearchComponent,
    DawTrackComponent,
    LogoutComponent
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
    AudioContextModule.forRoot('balanced'),
  ],
  providers: [
    YouTubeSearchService, 
    YouTubeDownloadService,
    AudioContextService,
    UserService,
    FileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
