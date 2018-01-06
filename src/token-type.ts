export enum TokenType {
  Unrecognized = 'unrecognized',
  EndOfInput = 'end of input',
  
  Accidental = 'accidental',
  NoteLetter = 'note letter',
  OctaveNumber = 'octave number',
  Duration = 'duration',
  Meter = 'meter',

  // Punctuation
  Barline = '|',
  ChordStart = '[',
  ChordEnd = ']'
}