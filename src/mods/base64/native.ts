import { BytesOrMemory, Slice } from "@hazae41/memory"
import { Adapter } from "./adapter.js"

declare global {
  interface Uint8Array {
    toBase64(options?: unknown): string
  }

  interface Uint8ArrayConstructor {
    fromBase64(base64: string, options?: unknown): Uint8Array
  }
}

export function fromNative() {

  function getBytes(bytes: BytesOrMemory) {
    return "bytes" in bytes ? bytes.bytes : bytes
  }

  return {
    base64: {
      encodePaddedOrThrow(bytes: BytesOrMemory) {
        return getBytes(bytes).toBase64()
      },

      decodePaddedOrThrow(text: string) {
        return new Slice(Uint8Array.fromBase64(text))
      },

      encodeUnpaddedOrThrow(bytes: BytesOrMemory) {
        return getBytes(bytes).toBase64({ omitPadding: true })
      },

      decodeUnpaddedOrThrow(text: string) {
        return new Slice(Uint8Array.fromBase64(text))
      }
    },
    base64url: {
      encodePaddedOrThrow(bytes: BytesOrMemory) {
        return getBytes(bytes).toBase64({ alphabet: "base64url" })
      },

      decodePaddedOrThrow(text: string) {
        return new Slice(Uint8Array.fromBase64(text, { alphabet: "base64url" }))
      },

      encodeUnpaddedOrThrow(bytes: BytesOrMemory) {
        return getBytes(bytes).toBase64({ alphabet: "base64url", omitPadding: true })
      },

      decodeUnpaddedOrThrow(text: string) {
        return new Slice(Uint8Array.fromBase64(text, { alphabet: "base64url" }))
      }
    }
  } satisfies Adapter
}