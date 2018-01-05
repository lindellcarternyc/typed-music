import Pitch from './pitch'


const forPitch = (pitch: Pitch): number => {
  // get absolue semitones away from C '0'
  let semitoneDiff = pitch.pitchclass.value

  // get octave difference from middle C
  const octaveDiff = pitch.octave - 4
  semitoneDiff += octaveDiff * 12
  // console.log('forPitch', pitch)
  const freq = 440 * Math.pow(2, (semitoneDiff - 9) / 12)
  return parseFloat(freq.toPrecision(5))
  //return parseFloat((440 * Math.pow(2, (semitoneDiff - 9) / 12)).toFixed(4))
}

const Frequency = {
  forPitch
}

export default Frequency