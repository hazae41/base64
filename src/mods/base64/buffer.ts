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

  function tryEncodePadded(bytes: BytesOrCopiable) {
    return Result.runAndWrapSync(() => {
      return Buffers.fromView(getBytes(bytes)).toString("base64")
    }).mapErrSync(EncodeError.from)
  }

  function tryDecodePadded(text: string) {
    return Result.runAndWrapSync(() => {
      return Bytes.fromView(Buffer.from(text, "base64"))
    }).mapSync(Copied.new).mapErrSync(DecodeError.from)
  }

  function tryEncodeUnpadded(bytes: BytesOrCopiable) {
    return Result.runAndWrapSync(() => {
      return Buffers.fromView(getBytes(bytes)).toString("base64").replaceAll("=", "")
    }).mapErrSync(EncodeError.from)
  }

  function tryDecodeUnpadded(text: string) {
    return Result.runAndWrapSync(() => {
      return Bytes.fromView(Buffer.from(text, "base64"))
    }).mapSync(Copied.new).mapErrSync(DecodeError.from)
  }

  return { tryEncodePadded, tryDecodePadded, tryEncodeUnpadded, tryDecodeUnpadded }
}