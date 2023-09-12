import { Result } from "@hazae41/result"
import { Buffers } from "libs/buffers/buffers.js"
import { Bytes } from "libs/bytes/bytes.js"
import { Adapter, Copied } from "./adapter.js"
import { DecodeError, EncodeError } from "./errors.js"

export function fromBuffer(): Adapter {

  function tryEncode(bytes: Uint8Array) {
    return Result.runAndWrapSync(() => {
      return Buffers.fromView(bytes).toString("base64")
    }).mapErrSync(EncodeError.from)
  }

  function tryDecode(text: string) {
    return Result.runAndWrapSync(() => {
      return Bytes.fromView(Buffer.from(text, "base64"))
    }).mapSync(Copied.new).mapErrSync(DecodeError.from)
  }

  return { tryEncode, tryDecode }
}