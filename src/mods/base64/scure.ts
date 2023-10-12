import { BytesOrCopiable, Copied } from "@hazae41/box"
import { Result } from "@hazae41/result"
import { base64 } from "@scure/base"
import { Adapter } from "./adapter.js"
import { fromBuffer } from "./buffer.js"
import { DecodeError, EncodeError } from "./errors.js"

export function fromBufferOrScure() {
  if ("process" in globalThis)
    return fromBuffer()
  return fromScure()
}

export function fromScure(): Adapter {

  function getBytes(bytes: BytesOrCopiable) {
    return "bytes" in bytes ? bytes.bytes : bytes
  }

  function tryEncodePadded(bytes: BytesOrCopiable) {
    return Result.runAndWrapSync(() => {
      return base64.encode(getBytes(bytes))
    }).mapErrSync(EncodeError.from)
  }

  function tryDecodePadded(text: string) {
    return Result.runAndWrapSync(() => {
      return base64.decode(text)
    }).mapSync(Copied.new).mapErrSync(DecodeError.from)
  }

  function tryEncodeUnpadded(bytes: BytesOrCopiable) {
    return Result.runAndWrapSync(() => {
      return base64.encode(getBytes(bytes)).replaceAll("=", "")
    }).mapErrSync(EncodeError.from)
  }

  function tryDecodeUnpadded(text: string) {
    return Result.runAndWrapSync(() => {
      return base64.decode(text.padEnd(text.length + ((4 - (text.length % 4)) % 4), "="))
    }).mapSync(Copied.new).mapErrSync(DecodeError.from)
  }

  return { tryEncodePadded, tryDecodePadded, tryEncodeUnpadded, tryDecodeUnpadded }
}