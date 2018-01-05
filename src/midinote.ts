import Pitch from './pitch'

const forPitch = (pitch: Pitch): number => {
  const root = pitch.pitchclass.value
  const octaveDiff = pitch.octave + 1
  return root + (octaveDiff * 12)
}

const Midinote = {
  forPitch
}

export default Midinote