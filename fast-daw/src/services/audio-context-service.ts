import { Injectable } from '@angular/core';
import { AudioContext } from 'angular-audio-context';
 
@Injectable({
  providedIn: 'root',
})
export class AudioContextService {

  sources = []
 
  constructor(private audioContext: AudioContext) { }

  playAudio = () => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://www2.cs.uic.edu/~i101/SoundFiles/PinkPanther30.wav"; // site that doesn’t send Access-Control-*
    fetch(proxyurl + url)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => this.audioContext.decodeAudioData(arrayBuffer))
      .then(decodedAudio => {
        const playSound = this.audioContext.createBufferSource()
        playSound.buffer = decodedAudio
        playSound.connect(this.audioContext.destination)
        playSound.start(this.audioContext.currentTime)
      })
      .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
  }

  stopAudio = () => {
    this.audioContext.suspend()
  }
}