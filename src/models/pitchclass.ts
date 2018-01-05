export type PitchclassValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

export default class Pitchclass {
  private _value: PitchclassValue

  constructor(value: PitchclassValue) {
    this._value = value
  }

  get value(): PitchclassValue {
    return this._value
  }

  toString(): string {
    if (this.value === 10) {
      return 'T'
    } else if (this.value === 11) {
      return 'E'
    } else {
      return this.value.toString(10)
    }
  }
}
