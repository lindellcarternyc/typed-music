import Pitch from './pitch'
import Duration from './duration'
import { Pitchnames } from './pitchnames';

export default class Note {
  pitch: Pitch
  duration: Duration

  static fromString(input: string): Note {
    const matches = /\d/.exec(input)
    if (matches !== null) {
      const idx = matches.index
      const pitchString = input.slice(0, idx + 1)
      const durationString = input.slice(idx + 1)
      
      const pitch = Pitch.fromString(pitchString)
      const duration = Duration.fromString(durationString)

      return new Note(pitch, duration)
    } else {
      const msg = `${input} is invalid.`
      throw new SyntaxError(msg)
    }
  }

  constructor(pitch: Pitch, duration: Duration) {
    this.pitch = pitch,
    this.duration = duration
  }

  get names(): Pitchnames {
    return this.pitch.names
  }
}