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
      'gain': 0 
    }
  ]
 
  constructor(private audioContext: AudioContext) { 
    this.stopAudio()
    this.tracks = []
  }

  playAudio = () => this.audioContext.resume()

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
            bufferSource.connect(this.audioContext.destination)
            bufferSource.start(this.audioContext.currentTime)

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
        fetch(track.url)
          .then(response => response.arrayBuffer())
          .then(arrayBuffer => this.audioContext.decodeAudioData(arrayBuffer))
          .then(decodedData => {
            track.node.connect(this.audioContext.destination)
            track.node.disconnect(this.audioContext.destination)

            const bufferSource = this.audioContext.createBufferSource()

            bufferSource.buffer = decodedData
            bufferSource.connect(this.audioContext.destination)
            
            track.offset += offset
            bufferSource.start(this.audioContext.currentTime + track.offset)

            track.node = bufferSource
            
          })
          .catch(error => console.log(error))
      }
    })
    if(!foundTrackNum) {  
      this.addTrack(trackNum)
      this.increaseAudioTrackOffset(trackNum, offset)
    }
  }

  decreaseAudioTrackOffset = (trackNum, offset) => {
    // var foundTrackNum = false
    // this.tracks.forEach(track => {
    //   if(track.trackNum === trackNum) {
    //     foundTrackNum = true
    //     fetch(track.url)
    //       .then(response => response.arrayBuffer())
    //       .then(arrayBuffer => this.audioContext.decodeAudioData(arrayBuffer))
    //       .then(decodedData => {
    //         track.node.connect(this.audioContext.destination)
    //         track.node.disconnect(this.audioContext.destination)

    //         const bufferSource = this.audioContext.createBufferSource()

    //         bufferSource.buffer = decodedData
    //         bufferSource.connect(this.audioContext.destination)
            
    //         if(this.audioContext.currentTime + (track.offset - offset) < this.audioContext.currentTime) {
    //           this.tracks.forEach(track => 
    //             track.trackNum !== trackNum 
    //               ? this.increaseAudioTrackOffset(track.trackNum, offset) 
    //               : bufferSource.start(this.audioContext.currentTime + (track.offset - offset))) 
    //         } else {

    //         }

    //         track.node = bufferSource
    //       })
    //       .catch(error => console.log(error))
    //   }
    // })
    // if(!foundTrackNum) {  
    //   this.addTrack(trackNum)
    //   this.decreaseAudioTrackOffset(trackNum, offset)
    // }
  }

  updateAudioTrackGain = (trackNum, gain) => {
    this.tracks.forEach(track => {
      if(track.trackNum === trackNum) {
        track.gain = gain
      }
    })
  }
}