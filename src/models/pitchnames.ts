import Pitchclass, { PitchclassValue } from './pitchclass'

export enum Pitchname {
  C = 'C',

  C_Sharp = 'C♯',
  D_Flat = 'D♭',

  D = 'D',

  D_Sharp = 'D♯',
  E_Flat = 'E♭',

  E = 'E',

  F = 'F',

  F_Sharp = 'F♯',
  G_Flat = 'G♭',

  G = 'G',

  G_Sharp = 'G♯',
  A_Flat = 'A♭',

  A = 'A',

  A_Sharp = 'A♯',
  B_Flat = 'B♭',

  B = 'B'
}


export interface Pitchnames {
  naturalName: Pitchname | null
  sharpName: Pitchname | null
  flatName: Pitchname | null
}

export const nameFromString = (input: string): Pitchname => {
  if (input.length === 1) {
    input = input.toUpperCase()
  } else if (input.length === 2) {
    input = input.charAt(0).toUpperCase() + input.charAt(1)
  }
  if (input === 'C') {
    return Pitchname.C
  } else if (input === 'D') {
    return Pitchname.D
  } else if (input === 'E') {
    return Pitchname.E
  } else if (input === 'F') {
    return Pitchname.F
  } else if (input === 'G') {
    return Pitchname.G
  } else if (input === 'A') {
    return Pitchname.A
  } else if (input === 'B') {
    return Pitchname.B
  } else if (input === 'C♯') {
    return Pitchname.C_Sharp
  } else if (input === 'D♯') {
    return Pitchname.D_Sharp
  } else if (input === 'F♯') {
    return Pitchname.F_Sharp
  } else if (input === 'G♯') {
    return Pitchname.G_Sharp
  } else if (input === 'A♯') {
    return Pitchname.A_Sharp
  } else if (input === 'D♭') {
    return Pitchname.D_Flat
  } else if (input === 'E♭') {
    return Pitchname.E_Flat
  } else if (input === 'G♭') {
    return Pitchname.G_Flat
  } else if (input === 'A♭') {
    return Pitchname.A_Flat
  } else if (input === 'B♭') {
    return Pitchname.B_Flat
  } else {
    const msg = `${input} is invalid`
    throw new SyntaxError(msg)
  }
} 

export const namesFromPitchclass = (pitchclass: Pitchclass): Pitchnames => {
  const value = pitchclass.value
  return namesFromPitchclassValue(value)
}

export const namesFromPitchclassValue = (value: PitchclassValue): Pitchnames => {
  const names: Pitchnames = {
    naturalName: naturalNameForPitchclassValue(value),
    sharpName: sharpNameForPitchclassValue(value),
    flatName: flatNameForPitchclassValue(value)
  }
  return names
}

const naturalNameForPitchclassValue = (value: PitchclassValue): Pitchname | null => {
  switch (value) {
    case 0:
      return Pitchname.C
    case 2:
      return Pitchname.D
    case 4:
      return Pitchname.E
    case 5:
      return Pitchname.F
    case 7:
      return Pitchname.G
    case 9:
      return Pitchname.A
    case 11:
      return Pitchname.B
    default:
      return null
  }
}

const sharpNameForPitchclassValue = (value: PitchclassValue): Pitchname | null => {
  switch (value) {
    case 1:
      return Pitchname.C_Sharp
    case 3:
      return Pitchname.D_Sharp
    case 6:
      return Pitchname.F_Sharp
    case 8:
      return Pitchname.G_Sharp
    case 10:
      return Pitchname.A_Sharp
    default:
      return null
  }
}

const flatNameForPitchclassValue = (value: PitchclassValue): Pitchname | null => {
  switch (value) {
    case 1:
      return Pitchname.D_Flat
    case 3:
      return Pitchname.E_Flat
    case 6:
      return Pitchname.G_Flat
    case 8:
      return Pitchname.A_Flat
    case 10:
      return Pitchname.B_Flat
    default:
      return null
  }
}