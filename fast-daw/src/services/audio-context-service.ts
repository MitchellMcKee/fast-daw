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
      'decodedData': this.audioContext.createBuffer(1, 1, 3000),
      'node': this.audioContext.createBufferSource(),
      'filename': 'filename',
      'offset': 0,
      'gain': 0.75,
      'gainNode': this.audioContext.createGain()
    }
  ]

  constructor(private audioContext: AudioContext) {
    this.pauseAudio()
    this.tracks = []
  }

  playAudio = () => this.audioContext.state === 'suspended' ? this.audioContext.resume() : console.log('already playing')
  pauseAudio = () => this.audioContext.state === 'running' ? this.audioContext.suspend() : console.log('already suspended')

  startAudio = () => {
    this.loadTracks();
    console.log(this.tracks)
    this.playAudio()
  }

  stopAudio = () => {
    this.tracks.forEach(track => {
      track.gainNode.disconnect()
      track.node.disconnect()
    })
    this.pauseAudio()
  }

  loadTracks = () => {
    this.tracks.forEach(track => {
      // load audio data
      const bufferSource = this.audioContext.createBufferSource()
      bufferSource.buffer = track.decodedData
      track.node = bufferSource
      track.decodedData = track.decodedData

      // connect to volume control
      var gainNode = this.audioContext.createGain()
      gainNode.gain.value = track.gain
      track.node.connect(gainNode)
      gainNode.connect(this.audioContext.destination)
      track.gainNode = gainNode

      track.node.start(this.audioContext.currentTime + track.offset) 
    })
  }

  updateAudioTrackSource = (trackOrder, filename) => {
    if(filename !== 'Filename' && filename !== '') {
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
              track.decodedData = decodedData
              track.filename = filename
            })
        }
      })
      if(!foundTrackNum) {
        this.addTrack(trackOrder)
        this.updateAudioTrackSource(trackOrder, filename)
      }
    }
  }

  private addTrack = (trackOrder) => {
    var newTrack = {
      'trackOrder': trackOrder,
      'decodedData': this.audioContext.createBuffer(1, 1, 3000),
      'node': this.audioContext.createBufferSource(),
      'filename': 'filename',
      'offset': 0,
      'gain': 0.75,
      'gainNode': this.audioContext.createGain()
    }
    this.tracks.push(newTrack)
  }

  setAudioTrackOffset = (trackOrder, newOffset) => {
    var foundTrackNum = false
    this.tracks.forEach(track => {
      if(track.trackOrder === trackOrder) {
        foundTrackNum = true
        track.offset = newOffset
        console.log(track.offset)
      }
    })
    if(!foundTrackNum) {
      this.addTrack(trackOrder)
      this.setAudioTrackOffset(trackOrder, newOffset)
    }
  }

  updateAudioTrackGain = (trackOrder, newGain) => {
    var foundTrackNum = false
    this.tracks.forEach(track => {
      if(track.trackOrder === trackOrder) {
        foundTrackNum = true
        track.gain = newGain
        track.gainNode.gain.value = track.gain
      }
    })
    if(!foundTrackNum) {
      this.addTrack(trackOrder)
      this.updateAudioTrackGain(trackOrder, newGain)
    }
  }

  createProjectFile = () => {
    const projectFile = []
    this.tracks.forEach(track => {
      const trackToAdd = {
        'trackOrder': track.trackOrder,
        'decodedData': track.decodedData,
        'trackName': "Track Name",
        'selectedFilename': track.filename,
        'offset': track.offset,
        'volume': track.gain
      }
      projectFile.push(trackToAdd)
    })
    return projectFile
  }

  ngOnDestroy(): void {
    this.stopAudio()
    this.tracks = []
  }
}