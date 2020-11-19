import { Component, OnInit } from '@angular/core';
import { AudioContextService } from 'src/services/audio-context-service';

@Component({
  selector: 'app-daw-editor',
  templateUrl: './daw-editor.component.html',
  styleUrls: ['./daw-editor.component.scss']
})
export class DawEditorComponent implements OnInit {

  constructor(private audioContextService: AudioContextService) {
  }

  ngOnInit(): void {
  }

  playAudio = () => this.audioContextService.playAudio()
  stopAudio = () => this.audioContextService.stopAudio()

}
