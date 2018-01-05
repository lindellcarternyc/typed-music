import Pitchclass, { PitchclassValue } from './pitchclass'
import Pitch from './pitch'


console.log('Testing this package!!!')

const octave = 4
for (let value = 0; value <= 11; value++) {
  const val = value as PitchclassValue
  const pitchclass = new Pitchclass(val)
  const pitch = new Pitch(pitchclass, octave)

  console.dir(pitch, null, 2)
  console.log('')
}
console.log('Thanks!!!')