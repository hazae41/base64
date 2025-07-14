import { BytesOrMemory, Slice } from "@hazae41/memory"
import { Buffers } from "libs/buffers/buffers.js"
import { Bytes } from "libs/bytes/bytes.js"
import { Adapter } from "./adapter.js"
import { fromNative } from "./native.js"

export function fromNativeOrBuffer() {
  if ("fromBase64" in Uint8Array)
    return fromNative()
  return fromBuffer()
}

export function fromBuffer() {

  function getBytes(bytes: BytesOrMemory) {
    return "bytes" in bytes ? bytes.bytes : bytes
  }

  return {
    base64: {
      encodePaddedOrThrow(bytes: BytesOrMemory) {
        return Buffers.fromView(getBytes(bytes)).toString("base64")
      },

      decodePaddedOrThrow(text: string) {
        return new Slice(Bytes.fromView(Buffer.from(text, "base64")))
      },

      encodeUnpaddedOrThrow(bytes: BytesOrMemory) {
        return Buffers.fromView(getBytes(bytes)).toString("base64").replaceAll("=", "")
      },

      decodeUnpaddedOrThrow(text: string) {
        return new Slice(Bytes.fromView(Buffer.from(text, "base64")))
      }
    },
    base64url: {
      encodePaddedOrThrow(bytes: BytesOrMemory) {
        const unpadded = Buffers.fromView(getBytes(bytes)).toString("base64url")
        const repadded = unpadded + "=".repeat((4 - unpadded.length % 4) % 4)

        return repadded
      },

      decodePaddedOrThrow(text: string) {
        return new Slice(Bytes.fromView(Buffer.from(text, "base64url")))
      },

      encodeUnpaddedOrThrow(bytes: BytesOrMemory) {
        return Buffers.fromView(getBytes(bytes)).toString("base64url")
      },

      decodeUnpaddedOrThrow(text: string) {
        return new Slice(Bytes.fromView(Buffer.from(text, "base64url")))
      }
    }
  } satisfies Adapter
}