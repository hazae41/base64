import { Buffers } from "libs/buffers/buffers.js"
import { Bytes } from "libs/bytes/bytes.js"
import { BytesOrCopiable, Copied } from "libs/copiable/index.js"
import { Adapter } from "./adapter.js"

export function fromBuffer() {

  function getBytes(bytes: BytesOrCopiable) {
    return "bytes" in bytes ? bytes.bytes : bytes
  }

  function encodePaddedOrThrow(bytes: BytesOrCopiable) {
    return Buffers.fromView(getBytes(bytes)).toString("base64")
  }

  function decodePaddedOrThrow(text: string) {
    return new Copied(Bytes.fromView(Buffer.from(text, "base64")))
  }

  function encodeUnpaddedOrThrow(bytes: BytesOrCopiable) {
    return Buffers.fromView(getBytes(bytes)).toString("base64").replaceAll("=", "")
  }

  function decodeUnpaddedOrThrow(text: string) {
    return new Copied(Bytes.fromView(Buffer.from(text, "base64")))
  }

  return { encodePaddedOrThrow, decodePaddedOrThrow, encodeUnpaddedOrThrow, decodeUnpaddedOrThrow } satisfies Adapter
}