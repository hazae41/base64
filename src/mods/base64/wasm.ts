import type { Base64Wasm } from "@hazae41/base64.wasm"
import { Ref } from "@hazae41/box"
import { BytesOrMemory } from "libs/memory/index.js"
import { fromBuffer } from "./buffer.js"
import { fromNative } from "./native.js"

export function fromNativeOrBufferOrWasm(wasm: typeof Base64Wasm) {
  if ("fromBase64" in Uint8Array)
    return fromNative()
  if ("process" in globalThis)
    return fromBuffer()
  return fromWasm(wasm)
}

export function fromWasm(wasm: typeof Base64Wasm) {
  const { Memory } = wasm
  const { base64_encode_padded, base64_decode_padded, base64_encode_unpadded, base64_decode_unpadded } = wasm
  const { base64url_encode_padded, base64url_decode_padded, base64url_encode_unpadded, base64url_decode_unpadded } = wasm

  function getMemory(bytesOrCopiable: BytesOrMemory) {
    if (bytesOrCopiable instanceof Memory)
      return Ref.with(bytesOrCopiable, () => { })

    if (bytesOrCopiable instanceof Uint8Array)
      return Ref.wrap(new Memory(bytesOrCopiable))

    return Ref.wrap(new Memory(bytesOrCopiable.bytes))
  }

  return {
    base64: {
      encodePaddedOrThrow(bytes: BytesOrMemory) {
        using memory = getMemory(bytes)

        return base64_encode_padded(memory.value)
      },

      decodePaddedOrThrow(text: string) {
        return base64_decode_padded(text)
      },

      encodeUnpaddedOrThrow(bytes: BytesOrMemory) {
        using memory = getMemory(bytes)

        return base64_encode_unpadded(memory.value)
      },

      decodeUnpaddedOrThrow(text: string) {
        return base64_decode_unpadded(text)
      }
    },
    base64url: {
      encodePaddedOrThrow(bytes: BytesOrMemory) {
        using memory = getMemory(bytes)

        return base64url_encode_padded(memory.value)
      },

      decodePaddedOrThrow(text: string) {
        return base64url_decode_padded(text)
      },

      encodeUnpaddedOrThrow(bytes: BytesOrMemory) {
        using memory = getMemory(bytes)

        return base64url_encode_unpadded(memory.value)
      },

      decodeUnpaddedOrThrow(text: string) {
        return base64url_decode_unpadded(text)
      }
    }
  }
}