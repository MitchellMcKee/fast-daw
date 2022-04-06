import { Injectable, OnInit } from '@angular/core';
import { AudioContext } from 'angular-audio-context';
import { AudioTrack } from 'src/models/daw-editor.models';

@Injectable({
  providedIn: 'root',
})
export class AudioContextService {

  localUrl = 'http://localhost:3200'
  serverUrl = 'http://ec2-18-216-125-59.us-east-2.compute.amazonaws.com/api'
  url = this.serverUrl
  isLoading = false

  tracks: AudioTrack[] = []

  constructor(private audioContext: AudioContext) {
    this.pauseAudio()
  }

  playAudio = () => this.audioContext.state === 'suspended' ? this.audioContext.resume() : console.log('already playing')
  pauseAudio = () => this.audioContext.state === 'running' ? this.audioContext.suspend() : console.log('already suspended')

  startAudio = () => {
    if (this.isLoading) {
      console.log("can't start, still loading audio")
    } else {
      this.stopAudio()
      this.loadTracks()
      this.playAudio()
    }
  }

  stopAudio = () => {
    console.log(this.tracks)
    this.tracks.forEach(track => {
      track.gainNode.disconnect()
      track.node.disconnect()
    })
    this.pauseAudio()
  }

  loadTracks = () => {
    this.tracks.forEach(track => {
      if (track.filename !== 'filename' && track.filename !== '') {
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
      }
    })
  }

  checkIfLoading = () => this.isLoading

  updateAudioTrackSource = (trackId, filename) => {
    this.stopAudio()
    var foundTrackNum = false
    this.tracks.forEach(track => {
      if(track.trackId === trackId) {
        foundTrackNum = true
        if(filename !== 'filename' && filename !== '') {
          this.isLoading = true
          console.log("loading...")
          fetch(`${this.url}/files/${filename}`)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => this.audioContext.decodeAudioData(arrayBuffer))
            .then(decodedData => {
              const bufferSource = this.audioContext.createBufferSource()
              bufferSource.buffer = decodedData
              track.node = bufferSource
              track.decodedData = decodedData
              track.filename = filename
              this.isLoading = false
              console.log("done loading!")
            })
        } else {
          track.filename = ''
        }
      }
    })
    if(!foundTrackNum) {
      this.addTrack(trackId)
      this.updateAudioTrackSource(trackId, filename)
    }
  }

  private addTrack = (trackId) => {
    var newTrack: AudioTrack = {
      'trackId': trackId,
      'decodedData': this.audioContext.createBuffer(1, 1, 44100),
      'node': this.audioContext.createBufferSource(),
      'filename': 'filename',
      'offset': 0,
      'gain': 0.75,
      'gainNode': this.audioContext.createGain()
    }
    this.tracks.push(newTrack)
  }

  setAudioTrackOffset = (trackId, newOffset) => {
    var foundTrackNum = false
    this.tracks.forEach(track => {
      if(track.trackId === trackId) {
        foundTrackNum = true
        track.offset = newOffset
      }
    })
    if(!foundTrackNum) {
      this.addTrack(trackId)
      this.setAudioTrackOffset(trackId, newOffset)
    }
  }

  deleteAudioTrack = (trackId) => {
    var trackToDelete = -1
    this.tracks.forEach((track, trackIndex) => {
      if(track.trackId === trackId) {
        track.gainNode.disconnect()
        track.node.disconnect()
        trackToDelete = trackIndex
      }
    })
    if (trackToDelete !== -1) {
      this.tracks.splice(trackToDelete, 1)
    }
  }

  updateAudioTrackGain = (trackId, newGain) => {
    var foundTrackNum = false
    this.tracks.forEach(track => {
      if(track.trackId === trackId) {
        foundTrackNum = true
        track.gain = newGain
        track.gainNode.gain.value = track.gain
      }
    })
    if(!foundTrackNum) {
      this.addTrack(trackId)
      this.updateAudioTrackGain(trackId, newGain)
    }
  }

  ngOnDestroy(): void {
    this.stopAudio()
    this.tracks = []
  }
}
