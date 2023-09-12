import { Result } from "@hazae41/result"
import { base64 } from "@scure/base"
import { Adapter, Copied } from "./adapter.js"
import { fromBuffer } from "./buffer.js"
import { DecodeError, EncodeError } from "./errors.js"

export function fromBufferOrScure() {
  if ("process" in globalThis)
    return fromBuffer()
  return fromScure()
}

export function fromScure(): Adapter {

  function tryEncode(bytes: Uint8Array) {
    return Result.runAndWrapSync(() => base64.encode(bytes)).mapErrSync(EncodeError.from)
  }

  function tryDecode(text: string) {
    return Result.runAndWrapSync(() => base64.decode(text)).mapSync(Copied.new).mapErrSync(DecodeError.from)
  }

  return { tryEncode, tryDecode }
}