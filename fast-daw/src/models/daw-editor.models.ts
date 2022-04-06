/**
 * an AudioTrack holds the data for needed in the service for
 * each of the tracks
 */
export type AudioTrack = {
    'trackId': number,
    'decodedData': AudioBuffer,
    'node': any,
    'filename': string,
    'offset': number,
    'gain': number,
    'gainNode': any,
    'rawData'?: ArrayBuffer
}

// a UITrack contrains all the info needed to display a track on the DAW page
export type UITrack = {
    'trackId': number,
    'selectedFilename': string,
    'offset': number,
    'volume': number
}

// an audioSoruce contains the info needed to find the correct audio file to load
export type audioSource = {
  'name': '',
  'filename': ''
}
