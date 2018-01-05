import Token from './token'

import MusicSymbol from './music-symbol'
import { MusicSymbolType } from './music-symbol-type'
import { TokenType } from './token-type';

import Meter from './meter'
import Note from './note'
import Duration from './duration'
import Pitch from './pitch'

export default class MusicSymbolGenerator {
  readonly tokens: Token[]
  index: number

  constructor(tokens: Token[]) {
    this.tokens = tokens
    this.index = 0
  }

  nextSymbol(): MusicSymbol {
    const token = this.tokens[this.index]
    if (token.type === TokenType.Meter) {
      return this.recognizeMeter()
    } else if (token.type === TokenType.NoteLetter) {
      return this.recognizeNote()
    }

    return new MusicSymbol(MusicSymbolType.Unrecognized, {line: -1, column: -1}, 'unrecognized')
  }

  peek(distance: number = 1): Token | null {
    if (this.index + distance < this.tokens.length) {
      return this.tokens[this.index + distance]
    } else {
      return null
    }
  }

  recognizeMeter(): MusicSymbol {
    const type = MusicSymbolType.Meter
    
    const token = this.tokens[this.index]
    const meter = Meter.fromString(token.value)
    const position = token.position

    this.index += 1

    return new MusicSymbol(type, position, meter)
  }

  recognizeNote(): MusicSymbol {
    const type = MusicSymbolType.Note

    const noteLetterToken = this.tokens[this.index]
    const position = noteLetterToken.position
    let pitchString = noteLetterToken.value
    this.index += 1

    let nextToken = this.peek()
    if (nextToken !== null && nextToken.type === TokenType.Accidental) {
      this.index += 1
      pitchString += nextToken.value
    }
    const octaveToken = this.tokens[this.index]
    this.index += 1
    pitchString += octaveToken.value

    const pitch = Pitch.fromString(pitchString)

    const durationToken = this.tokens[this.index]
    this.index += 1
    const duration = Duration.fromString(durationToken.value)

    const note = new Note(pitch, duration)
    return new MusicSymbol(type, position, note)
  }
}