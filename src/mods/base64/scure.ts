import { Result } from "@hazae41/result"
import type { base64 } from "@scure/base"
import { Adapter, Copied } from "./base64.js"
import { fromBuffer } from "./buffer.js"
import { DecodingError, EncodingError } from "./error.js"

export function fromBufferOrScure(scure: typeof base64) {
  if ("process" in globalThis)
    return fromBuffer()
  return fromScure(scure)
}

export function fromScure(scure: typeof base64): Adapter {

  function tryEncode(bytes: Uint8Array) {
    return Result.runAndWrapSync(() => scure.encode(bytes)).mapErrSync(EncodingError.from)
  }

  function tryDecode(text: string) {
    return Result.runAndWrapSync(() => scure.decode(text)).mapSync(Copied.new).mapErrSync(DecodingError.from)
  }

  return { tryEncode, tryDecode }
}