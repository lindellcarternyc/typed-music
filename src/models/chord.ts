import { Pitch, Duration } from '.'

export default class Chord {
  readonly pitches: Pitch[]
  readonly duration: Duration

  constructor(duration: Duration, ...pitches: Pitch[]) {
    this.duration = duration
    this.pitches = pitches
  }
}