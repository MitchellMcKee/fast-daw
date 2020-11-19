import { Component, OnInit } from '@angular/core';
import { AudioContextService } from 'src/services/audio-context-service';

@Component({
  selector: 'app-daw-track',
  templateUrl: './daw-track.component.html',
  styleUrls: ['./daw-track.component.scss']
})
export class DawTrackComponent implements OnInit {

  name = 'Track Name'
  audioSrc = 'Audio Src Name'

  constructor(private audioContextService: AudioContextService) { }

  ngOnInit(): void {
  }
}
