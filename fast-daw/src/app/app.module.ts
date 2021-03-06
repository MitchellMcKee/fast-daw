import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { AudioContextModule } from 'angular-audio-context';
import { NgWaveformModule } from 'ng-waveform';

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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

// Services
import { YouTubeSearchService } from 'src/services/youtube-search-service';
import { YouTubeDownloadService } from 'src/services/youtube-download-service';
import { AudioContextService } from 'src/services/audio-context-service';
import { UserService } from 'src/services/user-service';
import { FileService } from 'src/services/file-service';
import { ProjectService } from 'src/services/project-service';
import { TrackService } from 'src/services/track-service';

// UI Components
import { YoutubeDownloadComponent } from './ui-components/youtube-download/youtube-download.component';
import { YoutubeSearchComponent } from './ui-components/youtube-search/youtube-search.component';
import { DawTrackComponent } from './pages/daw/daw-track/daw-track.component';
import { LogoutComponent } from './ui-components/logout/logout.component';
import { LogoComponent } from './ui-components/logo/logo.component';
import { MenuComponent } from './ui-components/menu/menu.component';
import { PlaybackControlsComponent } from './pages/daw/playback-controls/playback-controls.component';
import { WaveformComponent } from './ui-components/waveform/waveform.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    YoutubeDownloadComponent,
    YoutubeSearchComponent,
    DawTrackComponent,
    LogoutComponent,
    LogoComponent,
    MenuComponent,
    PlaybackControlsComponent,
    WaveformComponent
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
    AudioContextModule.forRoot('balanced'),
    NgWaveformModule
  ],
  providers: [
    YouTubeSearchService, 
    YouTubeDownloadService,
    AudioContextService,
    UserService,
    FileService,
    ProjectService,
    TrackService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
