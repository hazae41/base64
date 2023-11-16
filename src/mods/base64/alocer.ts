import { Alocer } from "@hazae41/alocer"
import { Box, BytesOrCopiable } from "@hazae41/box"
import { Result } from "@hazae41/result"
import { Adapter } from "./adapter.js"
import { fromBuffer } from "./buffer.js"
import { DecodeError, EncodeError } from "./errors.js"

export async function fromBufferOrAlocer() {
  if ("process" in globalThis)
    return fromBuffer()
  return await fromAlocer()
}

export async function fromAlocer(): Promise<Adapter> {
  await Alocer.initBundledOnce()

  function getMemory(bytesOrCopiable: BytesOrCopiable) {
    if (bytesOrCopiable instanceof Alocer.Memory)
      return Box.greedy(bytesOrCopiable)
    if (bytesOrCopiable instanceof Uint8Array)
      return Box.new(new Alocer.Memory(bytesOrCopiable))
    return Box.new(new Alocer.Memory(bytesOrCopiable.bytes))
  }

  function encodePaddedOrThrow(bytes: BytesOrCopiable) {
    using memory = getMemory(bytes)

    return Alocer.base64_encode_padded(memory.inner)
  }

  function tryEncodePadded(bytes: BytesOrCopiable) {
    return Result.runAndWrapSync(() => {
      return encodePaddedOrThrow(bytes)
    }).mapErrSync(EncodeError.from)
  }

  function decodePaddedOrThrow(text: string) {
    return Alocer.base64_decode_padded(text)
  }

  function tryDecodePadded(text: string) {
    return Result.runAndWrapSync(() => {
      return decodePaddedOrThrow(text)
    }).mapErrSync(DecodeError.from)
  }

  function encodeUnpaddedOrThrow(bytes: BytesOrCopiable) {
    using memory = getMemory(bytes)

    return Alocer.base64_encode_unpadded(memory.inner)
  }

  function tryEncodeUnpadded(bytes: BytesOrCopiable) {
    return Result.runAndWrapSync(() => {
      return encodeUnpaddedOrThrow(bytes)
    }).mapErrSync(EncodeError.from)
  }

  function decodeUnpaddedOrThrow(text: string) {
    return Alocer.base64_decode_unpadded(text)
  }

  function tryDecodeUnpadded(text: string) {
    return Result.runAndWrapSync(() => {
      return decodeUnpaddedOrThrow(text)
    }).mapErrSync(DecodeError.from)
  }

  return { encodePaddedOrThrow, tryEncodePadded, decodePaddedOrThrow, tryDecodePadded, encodeUnpaddedOrThrow, tryEncodeUnpadded, decodeUnpaddedOrThrow, tryDecodeUnpadded }
}