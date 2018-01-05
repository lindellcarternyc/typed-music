import Duration from './duration'

export default class Beat {
  readonly duration: Duration

  static fromString(input: string): Beat {
    const duration = Duration.fromString(input)
    return new Beat(duration)
  }

  constructor(duration: Duration) {
    this.duration = duration
  }
}