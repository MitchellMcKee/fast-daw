import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

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

// Services
import { YouTubeSearchService } from 'src/services/youtube-search-service';
import { YouTubeDownloadService } from 'src/services/youtube-download-service';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents
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
    FormsModule
  ],
  providers: [YouTubeSearchService, YouTubeDownloadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
