import { Injectable, OnInit } from '@angular/core';
import { AudioContext } from 'angular-audio-context';
 
@Injectable({
  providedIn: 'root',
})
export class AudioContextService {

  localUrl = 'http://localhost:3200'
  serverUrl = 'http://ec2-18-216-125-59.us-east-2.compute.amazonaws.com/api'
  url = this.localUrl

  tracks = [
    {
      'trackOrder': 0,
      'node': this.audioContext.createBufferSource(),
      'filename': 'filename',
      'offset': 0,
      'gain': 0.75,
      'gainNode': this.audioContext.createGain()
    }
  ]
 
  constructor(private audioContext: AudioContext) { 
    this.stopAudio()
    this.tracks = []
  }

  playAudio = () => this.audioContext.resume()
  pauseAudio = () => this.audioContext.suspend()

  startAudio = () => {
    this.tracks.forEach(track => {
      var gainNode = this.audioContext.createGain()
      gainNode.gain.value = track.gain
      track.node.connect(gainNode)
      gainNode.connect(this.audioContext.destination)
      track.node.start(this.audioContext.currentTime + track.offset)
      track.gainNode = gainNode
    })
    this.playAudio()
  }

  stopAudio = () => {
    this.tracks.forEach(track => { 
      track.node.disconnect()
      track.gainNode.disconnect()
    })
    this.pauseAudio()
  }

  updateAudioTrackSource = (trackOrder, filename) => {
    var foundTrackNum = false
    this.tracks.forEach(track => {
      if(track.trackOrder === trackOrder) {
        foundTrackNum = true
        fetch(`${this.url}/files/${filename}`)
          .then(response => response.arrayBuffer())
          .then(arrayBuffer => this.audioContext.decodeAudioData(arrayBuffer))
          .then(decodedData => {
            const bufferSource = this.audioContext.createBufferSource()
            bufferSource.buffer = decodedData
            track.node = bufferSource
            track.filename = filename
          })
      }
    })
    if(!foundTrackNum) {  
      this.addTrack(trackOrder)
      this.updateAudioTrackSource(trackOrder, filename)
    }
  }

  private addTrack = (trackOrder) => {
    var newTrack = {
      'trackOrder': trackOrder,
      'node': this.audioContext.createBufferSource(),
      'filename': 'filename',
      'offset': 0,
      'gain': 0.75,
      'gainNode': this.audioContext.createGain()
    }
    this.tracks.push(newTrack)
  }

  setAudioTrackOffset = (trackOrder, offset) => { 
    var foundTrackNum = false
    this.tracks.forEach(track => {
      if(track.trackOrder === trackOrder) {
        foundTrackNum = true
        track.offset = offset
      }
    })
    if(!foundTrackNum) {  
      this.addTrack(trackOrder)
      this.setAudioTrackOffset(trackOrder, offset)
    }
  }

  updateAudioTrackGain = (trackOrder, gain) => {
    var foundTrackNum = false
    this.tracks.forEach(track => {
      if(track.trackOrder === trackOrder) {
        foundTrackNum = true
        track.gain = gain
      }
    })
    if(!foundTrackNum) {  
      this.addTrack(trackOrder)
      this.updateAudioTrackGain(trackOrder, gain)
    }
  }
}