import { Alocer } from "@hazae41/alocer"
import { Box, Copiable } from "@hazae41/box"
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

  function tryEncodePadded(bytes: Box<Copiable>) {
    return Result.runAndWrapSync(() => Alocer.base64_encode_padded(bytes)).mapErrSync(EncodeError.from)
  }

  function tryDecodePadded(text: string) {
    return Result.runAndWrapSync(() => Alocer.base64_decode_padded(text)).mapErrSync(DecodeError.from)
  }

  function tryEncodeUnpadded(bytes: Box<Copiable>) {
    return Result.runAndWrapSync(() => Alocer.base64_encode_unpadded(bytes)).mapErrSync(EncodeError.from)
  }

  function tryDecodeUnpadded(text: string) {
    return Result.runAndWrapSync(() => Alocer.base64_decode_unpadded(text)).mapErrSync(DecodeError.from)
  }

  return { tryEncodePadded, tryDecodePadded, tryEncodeUnpadded, tryDecodeUnpadded }
}