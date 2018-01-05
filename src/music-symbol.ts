import { MusicSymbolType } from './music-symbol-type'

import Meter from './meter'
import Note from './note'

type MusicSymbolValue = Meter | Note | 'unrecognized'

export default class MusicSymbol {
  readonly type: MusicSymbolType
  readonly value: MusicSymbolValue
  readonly position: {
    line: number
    column: number
  }

  constructor(type: MusicSymbolType, position: {line: number, column: number}, value: MusicSymbolValue) {
    this.type = type
    this.position = position
    this.value = value
  }
}