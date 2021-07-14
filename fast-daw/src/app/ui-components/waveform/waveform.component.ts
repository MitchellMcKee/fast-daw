import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ITimeUpdateEvent, NgWaveformComponent, IRegionPositions } from 'ng-waveform';


@Component({
  selector: 'app-waveform',
  templateUrl: './waveform.component.html',
  styleUrls: ['./waveform.component.scss']
})
export class WaveformComponent implements OnInit {
  @Input() audioData: ArrayBuffer

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('waveform', { static: false }) waveform: NgWaveformComponent;
 
  onPlayButtonClick() {
    this.waveform.play();
  }
  onPauseButtonClick() {
    this.waveform.pause();
  }
  
}
