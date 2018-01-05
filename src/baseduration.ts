export enum BaseDurationValue {
  DoubleWholeNote = 'double whole note',
  WholeNote = 'whole note',
  HalfNote = 'half note',
  QuarterNote = 'quarter note',
  EighthNote = 'eighth note',
  SixteenthNote = 'sixteenth note',
  ThirtySecondNote = 'thirtysecond note',
  SixtyFourthNote = 'sixtyfourth note',
  OneHundredTwentyEighthNote = 'onehundred twentyeighth note',
  TwoHundredFiftySixthNote = 'twohundred fiftysixth note'
}

// export const fromString = (input: string): Baseduration => {
//   if (input === 'dwn') {
//     return Baseduration.DoubleWholeNote
//   } else if (input === 'wn') {
//     return Baseduration.WholeNote
//   } else if (input === 'qn') {
//     return Baseduration.QuarterNote
//   } else if (input === 'en') {
//     return Baseduration.EighthNote
//   } else if (input === 'sn') {
//     return Baseduration.SixteenthNote
//   } else if (input === 'tsn') {
//     return Baseduration.ThirtySecondNote
//   } else if (input === 'sfn') {
//     return Baseduration.SixtyFourthNote
//   } else if (input === '128n') {
//     return Baseduration.OneHundredTwentyEighthNote
//   } else if (input === '256n') {
//     return Baseduration.TwoHundredFiftySixthNote
//   } else {
//     const msg = `${input} is invalid input`
//     throw new SyntaxError(msg)
//   }
// }

export default class BaseDuration {
  readonly value: BaseDurationValue

  static fromString(input: string): BaseDuration {
    let value: BaseDurationValue

    if (input === 'dwn') {
      value = BaseDurationValue.DoubleWholeNote
    } else if (input === 'wn') {
      value = BaseDurationValue.WholeNote
    } else if (input === 'hn') {
      value = BaseDurationValue.HalfNote
    } else if (input === 'qn') {
      value = BaseDurationValue.QuarterNote
    } else if (input === 'en') {
      value = BaseDurationValue.EighthNote
    } else if (input === 'sn') {
      value = BaseDurationValue.SixteenthNote
    } else if (input === 'tsn') {
      value = BaseDurationValue.ThirtySecondNote
    } else if (input === 'sfn') {
      value = BaseDurationValue.SixtyFourthNote
    } else if (input === '128n') {
      value = BaseDurationValue.OneHundredTwentyEighthNote
    } else if (input === '256n') {
      value = BaseDurationValue.TwoHundredFiftySixthNote
    } else {
      const msg = `${input} is invalid input`
      throw new SyntaxError(msg)
    }

    return new BaseDuration(value)

  }

  static fromNumber(input: number): BaseDuration {
    let value: BaseDurationValue

    switch (input) {
      case 0:
        value = BaseDurationValue.DoubleWholeNote
        break
      case 1:
        value = BaseDurationValue.WholeNote
        break
      case 2:
        value = BaseDurationValue.HalfNote
        break
      case 4:
        value = BaseDurationValue.QuarterNote
        break
      case 8:
        value = BaseDurationValue.EighthNote
        break
      case 16:
        value = BaseDurationValue.SixteenthNote
        break
      case 32:
        value = BaseDurationValue.ThirtySecondNote
        break
      case 64:
        value = BaseDurationValue.SixtyFourthNote
        break
      case 128:
        value = BaseDurationValue.OneHundredTwentyEighthNote
        break
      case 256:
        value = BaseDurationValue.TwoHundredFiftySixthNote
        break
      default:
        const msg = `${input} is invalid input`
        throw new SyntaxError(msg)
    }

    return new BaseDuration(value)
  }

  constructor(value: BaseDurationValue) {
    this.value = value
  }

  double(): BaseDuration {
    let value: BaseDurationValue
    switch(this.value) {
      case BaseDurationValue.WholeNote:
        value = BaseDurationValue.DoubleWholeNote
        break

      case BaseDurationValue.HalfNote:
        value = BaseDurationValue.WholeNote
        break

      case BaseDurationValue.QuarterNote:
        value = BaseDurationValue.HalfNote
        break

      case BaseDurationValue.EighthNote:
        value = BaseDurationValue.QuarterNote
        break

      case BaseDurationValue.SixteenthNote:
        value = BaseDurationValue.EighthNote
        break

      case BaseDurationValue.ThirtySecondNote:
        value = BaseDurationValue.SixteenthNote
        break
      
      case BaseDurationValue.SixtyFourthNote:
        value = BaseDurationValue.ThirtySecondNote
        break

      case BaseDurationValue.OneHundredTwentyEighthNote:
        value = BaseDurationValue.SixtyFourthNote
        break

      case BaseDurationValue.TwoHundredFiftySixthNote:
        value = BaseDurationValue.OneHundredTwentyEighthNote
        break
      default:
        throw new Error('THIS DURATION CANNOT BE DOUBLED ' + this.value)
    }

    return new BaseDuration(value)
  }
}