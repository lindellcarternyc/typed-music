import Pitchclass from './pitchclass'
import { 
  Pitchnames, 
  namesFromPitchclassValue, 
  Pitchname,
  nameFromString
} from './pitchnames'

import Frequency from './frequency'
import Midinote from './midinote'

type Octave = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 

export default class Pitch {
  private _pitchclass: Pitchclass
  private _octave: Octave
  private _names: Pitchnames

  static fromPitchname(name: Pitchname, octave: Octave): Pitch {
    let pitchclass: Pitchclass
    switch (name) {
      case Pitchname.C:
        pitchclass = new Pitchclass(0)
        break

      case Pitchname.C_Sharp:
      case Pitchname.D_Flat:
        pitchclass = new Pitchclass(1)
        break

      case Pitchname.D:
        pitchclass = new Pitchclass(2)
        break

      case Pitchname.D_Sharp:
      case Pitchname.E_Flat:
        pitchclass = new Pitchclass(3)
        break

      case Pitchname.E:
        pitchclass = new Pitchclass(4)
        break

      case Pitchname.F:
        pitchclass = new Pitchclass(5)
        break

      case Pitchname.F_Sharp:
      case Pitchname.G_Flat:
        pitchclass = new Pitchclass(6)
        break

      case Pitchname.G:
        pitchclass = new Pitchclass(7)
        break

      case Pitchname.G_Sharp:
      case Pitchname.A_Flat:
        pitchclass = new Pitchclass(8)
        break 

      case Pitchname.A:
        pitchclass = new Pitchclass(9)
        break

      case Pitchname.A_Sharp:
      case Pitchname.B_Flat:
        pitchclass = new Pitchclass(10)
        break

      case Pitchname.B:
        pitchclass = new Pitchclass(11)
        break 

      default:
        const msg = `${name} is an invalid pitchname`
        throw new TypeError(msg)
    }

    return new Pitch(pitchclass, octave)
  }

  static fromString(input: string): Pitch {
    let octave: Octave
    if (input.match(/-1$/)) {
      octave = -1
    } else {
      const octaveString = input.charAt(input.length - 1)
      octave = parseInt(octaveString, 10) as Octave
    }
    
    let nameInput: string
    if (octave === -1) {
      nameInput = input.slice(0, input.length - 2)
    } else {
      nameInput = input.slice(0, input.length - 1)
    }

    const name = nameFromString(nameInput)

    return Pitch.fromPitchname(name, octave as Octave)
  }

  constructor(pitchclass: Pitchclass, octave: Octave) {
    this._pitchclass = pitchclass
    this._octave = octave
    this._names = namesFromPitchclassValue(pitchclass.value)
  }

  get pitchclass(): Pitchclass {
    return this._pitchclass
  }

  get octave(): Octave {
    return this._octave
  }

  get frequency(): number {
    return Frequency.forPitch(this)
  }

  get midinote(): number {
    return Midinote.forPitch(this)
  }

  get names(): Pitchnames {
    return this._names
  }

  toString(): string {
    return `Pitch: ${this.pitchclass.toString()} ${this.octave}`
  }
}