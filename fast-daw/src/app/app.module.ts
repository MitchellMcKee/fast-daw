import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { YouTubeSearchService } from 'src/services/youtube-search-service';
import { YouTubeDownloadService } from 'src/services/youtube-download-service';
import { YoutubeSearchComponent } from './daw/youtube-search/youtube-search.component';
import { YoutubeDownloadComponent } from './daw/youtube-download/youtube-download.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    YoutubeSearchComponent,
    YoutubeDownloadComponent
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
    MatToolbarModule
  ],
  providers: [YouTubeSearchService, YouTubeDownloadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
