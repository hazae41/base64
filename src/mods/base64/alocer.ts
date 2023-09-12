import { Alocer } from "@hazae41/alocer"
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

  function tryEncode(bytes: Uint8Array) {
    return Result.runAndWrapSync(() => Alocer.base64_encode(bytes)).mapErrSync(EncodeError.from)
  }

  function tryDecode(text: string) {
    return Result.runAndWrapSync(() => Alocer.base64_decode(text)).mapErrSync(DecodeError.from)
  }

  return { tryEncode, tryDecode }
}