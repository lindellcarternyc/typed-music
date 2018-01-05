import Beat from './beat'

export default class Tempo {
  readonly bpm: number
  readonly beat: Beat

  static fromString(input: String): Tempo {
    let [numBeatsString, beatString] = input.split('(')

    const bpm = parseInt(numBeatsString, 10)
    beatString = beatString.split(')')[0]

    const beat = Beat.fromString(beatString)
    return new Tempo(bpm, beat)
  }

  constructor(bpm: number, beat: Beat) {
    this.bpm = bpm
    this.beat = beat
  }
}