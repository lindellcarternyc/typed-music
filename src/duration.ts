import BaseDuration from './baseduration'

type Dots = 0 | 1 | 2
export default class Duration {
  readonly baseduration: BaseDuration
  readonly dots: Dots

  static fromString(input: string): Duration {
    const firstDotIdx = input.indexOf('.')
    if (firstDotIdx >= 0) {
      const basedurationString = input.slice(0, firstDotIdx)
      const baseduration = BaseDuration.fromString(basedurationString)
      const numDots = input.slice(firstDotIdx).length as Dots
      return new Duration(baseduration, numDots)
    } else {
      const baseduration = BaseDuration.fromString(input)
      return new Duration(baseduration)
    }
  }

  constructor(baseduration: BaseDuration, dots: Dots = 0) {
    this.baseduration = baseduration
    this.dots = dots
  }
}