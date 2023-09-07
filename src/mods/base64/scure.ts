import { Result } from "@hazae41/result"
import type { base64 } from "@scure/base"
import { Adapter, Copied } from "./base64.js"
import { fromBuffer } from "./buffer.js"

export function fromBufferOrScure(scure: typeof base64) {
  if ("process" in globalThis)
    return fromBuffer()
  return fromScure(scure)
}

export function fromScure(scure: typeof base64): Adapter {

  function tryEncode(bytes: Uint8Array) {
    return Result.runAndDoubleWrapSync(() => scure.encode(bytes))
  }

  function tryDecode(text: string) {
    return Result.runAndDoubleWrapSync(() => scure.decode(text)).mapSync(Copied.new)
  }

  return { tryEncode, tryDecode }
}