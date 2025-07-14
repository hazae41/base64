import type * as Scure from "@scure/base"

import { BytesOrMemory, Slice } from "@hazae41/memory"
import { Adapter } from "./adapter.js"
import { fromBuffer } from "./buffer.js"
import { fromNative } from "./native.js"

export function fromNativeOrBufferOrScure(scure: typeof Scure) {
  if ("fromBase64" in Uint8Array)
    return fromNative()
  if ("process" in globalThis)
    return fromBuffer()
  return fromScure(scure)
}

export function fromScure(scure: typeof Scure) {
  const { base64, base64nopad, base64url, base64urlnopad } = scure

  function getBytes(bytes: BytesOrMemory) {
    return "bytes" in bytes ? bytes.bytes : bytes
  }

  return {
    base64: {
      encodePaddedOrThrow(bytes: BytesOrMemory) {
        return base64.encode(getBytes(bytes))
      },

      decodePaddedOrThrow(text: string) {
        return new Slice(base64.decode(text))
      },

      encodeUnpaddedOrThrow(bytes: BytesOrMemory) {
        return base64nopad.encode(getBytes(bytes))
      },

      decodeUnpaddedOrThrow(text: string) {
        return new Slice(base64nopad.decode(text))
      }
    },
    base64url: {
      encodePaddedOrThrow(bytes: BytesOrMemory) {
        return base64url.encode(getBytes(bytes))
      },

      decodePaddedOrThrow(text: string) {
        return new Slice(base64url.decode(text))
      },

      encodeUnpaddedOrThrow(bytes: BytesOrMemory) {
        return base64urlnopad.encode(getBytes(bytes))
      },

      decodeUnpaddedOrThrow(text: string) {
        return new Slice(base64urlnopad.decode(text))
      }
    }
  } satisfies Adapter
}