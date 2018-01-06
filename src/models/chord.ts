import { Pitch, Duration } from '.'

export default class Chord {
  readonly pitches: Pitch[]
  readonly duration: Duration

  static fromString(input: string): Chord {
    const firstSplit = input.split(']')
    // console.dir(firstSplit, null, 2)
    
    const durationString = firstSplit[1]
    const duration = Duration.fromString(durationString)

    const pitchesInput = firstSplit[0].slice(1).split(' ')
    // console.log(pitchesInput)
    const pitches = pitchesInput.map(input => {
      return Pitch.fromString(input)
    })
    console.dir(pitches, null, 2)

    return new Chord(duration, ...pitches)
  }

  constructor(duration: Duration, ...pitches: Pitch[]) {
    this.duration = duration
    this.pitches = pitches
  }
}