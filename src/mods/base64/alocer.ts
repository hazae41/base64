import type { Alocer } from "@hazae41/alocer"
import { Result } from "@hazae41/result"
import { Adapter } from "./base64.js"
import { fromBuffer } from "./buffer.js"

export function fromBufferOrAlocer(alocer: typeof Alocer) {
  if ("process" in globalThis)
    return fromBuffer()
  return fromAlocer(alocer)
}

export function fromAlocer(alocer: typeof Alocer): Adapter {

  function tryEncode(bytes: Uint8Array) {
    return Result.runAndDoubleWrapSync(() => alocer.base64_encode(bytes))
  }

  function tryDecode(text: string) {
    return Result.runAndDoubleWrapSync(() => alocer.base64_decode(text))
  }

  return { tryEncode, tryDecode }
}