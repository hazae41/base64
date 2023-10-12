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

  function tryEncodePadded(bytes: BytesOrCopiable) {
    using memory = getMemory(bytes)

    return Result.runAndWrapSync(() => {
      return Alocer.base64_encode_padded(memory.inner)
    }).mapErrSync(EncodeError.from)
  }

  function tryDecodePadded(text: string) {
    return Result.runAndWrapSync(() => {
      return Alocer.base64_decode_padded(text)
    }).mapErrSync(DecodeError.from)
  }

  function tryEncodeUnpadded(bytes: BytesOrCopiable) {
    using memory = getMemory(bytes)

    return Result.runAndWrapSync(() => {
      return Alocer.base64_encode_unpadded(memory.inner)
    }).mapErrSync(EncodeError.from)
  }

  function tryDecodeUnpadded(text: string) {
    return Result.runAndWrapSync(() => {
      return Alocer.base64_decode_unpadded(text)
    }).mapErrSync(DecodeError.from)
  }

  return { tryEncodePadded, tryDecodePadded, tryEncodeUnpadded, tryDecodeUnpadded }
}