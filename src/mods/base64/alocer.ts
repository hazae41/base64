import type { Alocer } from "@hazae41/alocer"
import { Result } from "@hazae41/result"
import { Adapter } from "./adapter.js"
import { fromBuffer } from "./buffer.js"
import { DecodeError, EncodeError } from "./errors.js"

export function fromBufferOrAlocer(alocer: typeof Alocer) {
  if ("process" in globalThis)
    return fromBuffer()
  return fromAlocer(alocer)
}

export function fromAlocer(alocer: typeof Alocer): Adapter {

  function tryEncode(bytes: Uint8Array) {
    return Result.runAndWrapSync(() => alocer.base64_encode(bytes)).mapErrSync(EncodeError.from)
  }

  function tryDecode(text: string) {
    return Result.runAndWrapSync(() => alocer.base64_decode(text)).mapErrSync(DecodeError.from)
  }

  return { tryEncode, tryDecode }
}