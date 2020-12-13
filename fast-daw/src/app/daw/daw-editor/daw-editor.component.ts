import { Component, OnInit } from '@angular/core';
import { AudioContextService } from 'src/services/audio-context-service';

@Component({
  selector: 'app-daw-editor',
  templateUrl: './daw-editor.component.html',
  styleUrls: ['./daw-editor.component.scss']
})
export class DawEditorComponent implements OnInit {

  tracks = [
    {
      "trackId": 0,
      "trackName": "Track Name",
      "selectedTrackId": "id",
      "offset": 0,
      "volume": 0
    }
  ]

  currTrackNum = 1

  constructor(private audioContextService: AudioContextService) {
  }

  ngOnInit(): void {
    this.tracks = []
  }

  addTrack = () => {
    var track = {
      "trackId": this.currTrackNum++,
      "trackName": "Track Name",
      "selectedTrackId": "id",
      "offset": 0,
      "volume": 0
    }
    this.tracks.push(track)
  }

  playAudio = () => this.audioContextService.playAudio()
  stopAudio = () => this.audioContextService.stopAudio()

}
