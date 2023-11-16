import { BytesOrCopiable, Copied } from "@hazae41/box"
import { Result } from "@hazae41/result"
import { Buffers } from "libs/buffers/buffers.js"
import { Bytes } from "libs/bytes/bytes.js"
import { Adapter } from "./adapter.js"
import { DecodeError, EncodeError } from "./errors.js"

export function fromBuffer(): Adapter {

  function getBytes(bytes: BytesOrCopiable) {
    return "bytes" in bytes ? bytes.bytes : bytes
  }

  function encodePaddedOrThrow(bytes: BytesOrCopiable) {
    return Buffers.fromView(getBytes(bytes)).toString("base64")
  }

  function tryEncodePadded(bytes: BytesOrCopiable) {
    return Result.runAndWrapSync(() => {
      return encodePaddedOrThrow(bytes)
    }).mapErrSync(EncodeError.from)
  }

  function decodePaddedOrThrow(text: string) {
    return new Copied(Bytes.fromView(Buffer.from(text, "base64")))
  }

  function tryDecodePadded(text: string) {
    return Result.runAndWrapSync(() => {
      return decodePaddedOrThrow(text)
    }).mapErrSync(DecodeError.from)
  }

  function encodeUnpaddedOrThrow(bytes: BytesOrCopiable) {
    return Buffers.fromView(getBytes(bytes)).toString("base64").replaceAll("=", "")
  }

  function tryEncodeUnpadded(bytes: BytesOrCopiable) {
    return Result.runAndWrapSync(() => {
      return encodeUnpaddedOrThrow(bytes)
    }).mapErrSync(EncodeError.from)
  }

  function decodeUnpaddedOrThrow(text: string) {
    return new Copied(Bytes.fromView(Buffer.from(text, "base64")))
  }

  function tryDecodeUnpadded(text: string) {
    return Result.runAndWrapSync(() => {
      return decodeUnpaddedOrThrow(text)
    }).mapErrSync(DecodeError.from)
  }

  return { encodePaddedOrThrow, tryEncodePadded, decodePaddedOrThrow, tryDecodePadded, encodeUnpaddedOrThrow, tryEncodeUnpadded, decodeUnpaddedOrThrow, tryDecodeUnpadded }
}