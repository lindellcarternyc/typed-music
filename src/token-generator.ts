import { TokenType } from './token-type'
import Token from './token'

const FLAT = '♭'
const SHARP = '♯'

export default class TokenGenerator {
  position: number
  line:     number
  column:   number
  input:    string

  constructor(input: string) {
    this.input = input
    this.position = 0
    this.line = 0
    this.column = 0
  }

  getTokens(): Token[] {
    let tokens: Token[] = []

    let nextToken = this.nextToken()
    tokens.push(nextToken)

    while(
      nextToken.type !== TokenType.EndOfInput && 
      nextToken.type !== TokenType.Unrecognized
    ) {
      nextToken = this.nextToken()
      tokens.push(nextToken)
    }
    return tokens
  }

  nextToken(): Token {
    if (this.position >= this.input.length) {
      return new Token(
        TokenType.EndOfInput, 
        {line: this.line, column: this.column},
        ''
      )
    }

    const char = this.input[this.position]

    if (char === SHARP || char === FLAT) {
      return this.recognizeAcidental()
    } else if (isNoteLetter(char)) { // letters a - g
      if (char === 'd' && this.peek() === 'w') {
        return this.recognizeDuration()
      } else if (char === 'e' && this.peek() === 'n') {
        return this.recognizeDuration()
      }
      return this.recognizeNoteLetter()
    } else if (char === '-' || isDigit(char)) { // A single digit
      if (char === '1' && this.peek() === '2' && this.peek(2) === '8') {
        return this.recognizeDuration()
      } else if (char === '2' && this.peek() === '5' && this.peek(2) === '6') {
        return this.recognizeDuration()
      }
      return this.recognizeOctaveNumber()
    } else if (canStartDuration(char)) { // any of the letters that can start a duration
      return this.recognizeDuration()
    } else if (char === ' ') {
      return this.recognizeSpace()
    } else if (char === '|') {
      return this.recognizeBarline()
    } else if (char === 'M') {
      return this.recognizeMeter()
    } else if (char === '[') {
      return this.recognizeChordStart()
    } else if (char === ']') {
      return this.recognizeChordEnd()
    }
    return new Token(TokenType.Unrecognized, {line: this.line, column: this.column}, '')
  }

  peek(distance: number = 1): string | null {
    if (this.position + distance < this.input.length) {
      return this.input[this.position + distance]
    }
    return null
  }

  recognizeAcidental(): Token {
    const type = TokenType.Accidental
    const position = {line: this.line, column: this.column}
    const value = this.input[this.position]

    this.position += 1
    this.column += 1

    const token = new Token(type, position, value)
    return token
  }

  recognizeNoteLetter(): Token {
    const type = TokenType.NoteLetter
    const position = {line: this.line, column: this.column}
    const value = this.input[this.position]
    const token = new Token(type, position, value)

    this.position += 1
    this.column += 1

    return token
  }

  recognizeOctaveNumber(): Token {
    const type = TokenType.OctaveNumber
    let value = this.input[this.position]
    if (value === '-') {
      value += this.input[this.position + 1]
    }
    const position = {line: this.line, column: this.column}
    const token = new Token(type, position, value)

    this.position += value.length
    this.column += value.length

    return token
  }

  recognizeDuration(): Token {
    const type = TokenType.Duration
    const line = this.line
    const column = this.column

    let position = this.position
    let duration = ''
    let char = this.input[position]

    while (char !== ' ' && position < this.input.length) {
      duration += char
      position += 1
      char = this.input[position]
    }
    const token = new Token(type, {line, column}, duration)

    this.position += duration.length
    this.column += duration.length

    return token
  }

  recognizeSpace(): Token {
    const space = ' '
    this.position += 1
    this.column += 1

    return this.nextToken()
  }

  recognizeBarline(): Token {
    const type = TokenType.Barline
    const line = this.line
    const column = this.column
    const value = this.input[this.position]

    this.position += 1
    this.column += 1

    return new Token(type, {line, column}, value)
  }

  recognizeMeter(): Token {
    const type = TokenType.Meter
    const line = this.line
    const column = this.column

    this.position += 1
    this.column += 1

    let position = this.position
    let meter = ''
    let nextChar = this.input[position]
    while (position < this.input.length && nextChar !== ' ') {
      meter += nextChar
      position += 1
      nextChar = this.input[position]
    }

    this.position += meter.length
    this.column += meter.length

    return new Token(type, {line, column}, meter)
  }

  recognizeChordStart(): Token {
    const type = TokenType.ChordStart
    const position = {
      line: this.line,
      column: this.column
    }
    const value = '['
    const token = new Token(type, position, value)
    this.position += 1
    this.column += 1

    return token
  }

  recognizeChordEnd(): Token {
    const type = TokenType.ChordEnd
    const position = {line: this.line, column: this.column}
    this.position += 1
    this.column += 1

    const token = new Token(type, position, ']')
    return token
  }
}

const isDigit = (input: string) => input.match(/^\d$/)

const isNoteLetter = (input: string) => input.match(/^[a-g]$/i)

const canStartDuration = (input: string) => input.match(/^(d|w|h|q|e|s|t|1|2)$/)