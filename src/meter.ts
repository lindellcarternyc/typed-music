import Duration from './duration'
// import { Baseduration } from './baseduration'
import BaseDuration, { BaseDurationValue } from './baseduration'
import Beat from './beat'

export default class Meter {
  readonly numBeats: number
  readonly baseDuration: BaseDuration

  static fromString(input: string): Meter {
    const [numBeatsInput, baseDurationInput] = input.split('/')
    const numBeats = parseInt(numBeatsInput, 10)
    const baseDuration = BaseDuration.fromNumber(parseInt(baseDurationInput, 10))

    return new Meter(numBeats, baseDuration)
  }

  constructor(numBeats: number, baseDuration: BaseDuration) {
    this.numBeats = numBeats
    this.baseDuration = baseDuration
  }

  get isDuple(): boolean {
    return this.numBeats % 2 === 0 || this.numBeats === 1
  }

  get isTriple(): boolean {
    return this.numBeats % 3 === 0 && this.numBeats !== 12
  }

  get isAdditive(): boolean {
    return !this.isTriple && !this.isDuple
  }

  get isSimple(): boolean {
    if (this.isDuple) {
      return this.numBeats % 3 !== 0
    } else if (this.isAdditive) {
      return true
    } else if (this.isTriple) {
      if (this.numBeats === 3) {
        return true
      } else {
        return false
      }
    } else {
      throw new Error('Invalid meter!!!')
    }
  }

  get isCompound(): boolean {
    return !this.isSimple
  }

  get beats(): Beat[] {
    let beats: Beat[] = []

    if (this.isSimple) {
      for (let beatNum = 0; beatNum < this.numBeats; beatNum++) {
        const beat = new Beat(new Duration(this.baseDuration))
        beats.push(beat)
      }
    } else if (this.isCompound) {
      const numBeats = this.numBeats / 3
      for (let beatNum = 0; beatNum < numBeats; beatNum++) {
        const doubledBaseDuration = this.baseDuration.double()
        const duration = new Duration(doubledBaseDuration, 1)
        const beat = new Beat(duration)
        beats.push(beat)
      }
    }

    return beats
  }
}