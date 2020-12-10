import { Injectable, OnInit } from '@angular/core';
import { AudioContext } from 'angular-audio-context';
 
@Injectable({
  providedIn: 'root',
})
export class AudioContextService {

  tracks = [
    {
      'trackNum': 0,
      'node': this.audioContext.createBufferSource(),
      'url': 'url-placeholder',
      'offset': 0,
      'gain': 0,
    }
  ]
 
  constructor(private audioContext: AudioContext) { 
    this.stopAudio()
    this.tracks = []
  }

  playAudio = () => {
    this.tracks.forEach(track => {
      track.node.start(this.audioContext.currentTime + track.offset)
      var gainNode = this.audioContext.createGain()
      gainNode.gain.value = track.gain
      gainNode.connect(this.audioContext.destination)
      track.node.connect(gainNode)
    })
    this.audioContext.resume()
  }

  stopAudio = () => this.audioContext.suspend()

  updateAudioTrackSource = (trackNum, url) => {
    var foundTrackNum = false
    this.tracks.forEach(track => {
      if(track.trackNum === trackNum) {
        foundTrackNum = true
        fetch(url)
          .then(response => response.arrayBuffer())
          .then(arrayBuffer => this.audioContext.decodeAudioData(arrayBuffer))
          .then(decodedData => {
            track.node.connect(this.audioContext.destination)
            track.node.disconnect(this.audioContext.destination)

            const bufferSource = this.audioContext.createBufferSource()

            bufferSource.buffer = decodedData

            track.node = bufferSource
            track.url = url
          })
          .catch(error => console.log(error))
      }
    })
    if(!foundTrackNum) {  
      this.addTrack(trackNum)
      this.updateAudioTrackSource(trackNum, url)
    }
  }

  private addTrack = (trackNum) => {
    var newTrack = {
      'trackNum': trackNum,
      'node': this.audioContext.createBufferSource(),
      'url': 'url-placeholder',
      'offset': 0,
      'gain': 0 
    }
    this.tracks.push(newTrack)
  }

  increaseAudioTrackOffset = (trackNum, offset) => {
    var foundTrackNum = false
    this.tracks.forEach(track => {
      if(track.trackNum === trackNum) {
        foundTrackNum = true
        track.offset += offset
      }
    })
    if(!foundTrackNum) {  
      this.addTrack(trackNum)
      this.increaseAudioTrackOffset(trackNum, offset)
    }
  }

  decreaseAudioTrackOffset = (trackNum, offset) => { }

  updateAudioTrackGain = (trackNum, gain) => {
    var foundTrackNum = false
    this.tracks.forEach(track => {
      if(track.trackNum === trackNum) {
        foundTrackNum = true
        track.gain = gain
        console.log(track.gain)
      }
    })
    if(!foundTrackNum) {  
      this.addTrack(trackNum)
      this.updateAudioTrackGain(trackNum, gain)
    }
  }
}