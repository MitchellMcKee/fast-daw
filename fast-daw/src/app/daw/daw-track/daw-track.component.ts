import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daw-track',
  templateUrl: './daw-track.component.html',
  styleUrls: ['./daw-track.component.scss']
})
export class DawTrackComponent implements OnInit {

  name = 'Track Name'
  audioSrc = 'Audio Src Name'

  constructor() { }

  ngOnInit(): void {
  }

}
