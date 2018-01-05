import { TokenType } from './token-type'

interface TokenPosition {
  line: number
  column: number
}

export default class Token {
  type: TokenType
  position: TokenPosition
  value: string

  constructor(type: TokenType, position: TokenPosition, value: string) {
    this.type = type
    this.position = position
    this.value = value
  }
}