export type AnyError =
  | EncodeError
  | DecodeError

export class EncodeError extends Error {
  readonly #class = DecodeError
  readonly name = this.#class.name

  constructor(options?: ErrorOptions) {
    super(`Could not encode`, options)
  }

  static from(cause: unknown) {
    return new EncodeError({ cause })
  }

}

export class DecodeError extends Error {
  readonly #class = DecodeError
  readonly name = this.#class.name

  constructor(options?: ErrorOptions) {
    super(`Could not decode`, options)
  }

  static from(cause: unknown) {
    return new DecodeError({ cause })
  }

}