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

  function encodePaddedOrThrow(bytes: BytesOrCopiable) {
    return base64.encode(getBytes(bytes))
  }

  function tryEncodePadded(bytes: BytesOrCopiable) {
    return Result.runAndWrapSync(() => {
      return encodePaddedOrThrow(bytes)
    }).mapErrSync(EncodeError.from)
  }

  function decodePaddedOrThrow(text: string) {
    return new Copied(base64.decode(text))
  }

  function tryDecodePadded(text: string) {
    return Result.runAndWrapSync(() => {
      return decodePaddedOrThrow(text)
    }).mapErrSync(DecodeError.from)
  }

  function encodeUnpaddedOrThrow(bytes: BytesOrCopiable) {
    return base64.encode(getBytes(bytes)).replaceAll("=", "")
  }

  function tryEncodeUnpadded(bytes: BytesOrCopiable) {
    return Result.runAndWrapSync(() => {
      return encodeUnpaddedOrThrow(bytes)
    }).mapErrSync(EncodeError.from)
  }

  function decodeUnpaddedOrThrow(text: string) {
    return new Copied(base64.decode(text.padEnd(text.length + ((4 - (text.length % 4)) % 4), "=")))
  }

  function tryDecodeUnpadded(text: string) {
    return Result.runAndWrapSync(() => {
      return decodeUnpaddedOrThrow(text)
    }).mapErrSync(DecodeError.from)
  }

  return { encodePaddedOrThrow, tryEncodePadded, decodePaddedOrThrow, tryDecodePadded, encodeUnpaddedOrThrow, tryEncodeUnpadded, decodeUnpaddedOrThrow, tryDecodeUnpadded }
}