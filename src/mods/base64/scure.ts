import type * as Scure from "@scure/base"
import { BytesOrCopiable, Copied } from "libs/copiable/index.js"
import { Adapter } from "./adapter.js"
import { fromBuffer } from "./buffer.js"

export function fromBufferOrScure(scure: typeof Scure) {
  if ("process" in globalThis)
    return fromBuffer()
  return fromScure(scure)
}

export function fromScure(scure: typeof Scure) {
  const { base64, base64nopad } = scure

  function getBytes(bytes: BytesOrCopiable) {
    return "bytes" in bytes ? bytes.bytes : bytes
  }

  function encodePaddedOrThrow(bytes: BytesOrCopiable) {
    return base64.encode(getBytes(bytes))
  }

  function decodePaddedOrThrow(text: string) {
    return new Copied(base64.decode(text))
  }

  function encodeUnpaddedOrThrow(bytes: BytesOrCopiable) {
    return base64nopad.encode(getBytes(bytes))
  }

  function decodeUnpaddedOrThrow(text: string) {
    return new Copied(base64nopad.decode(text))
  }

  return { encodePaddedOrThrow, decodePaddedOrThrow, encodeUnpaddedOrThrow, decodeUnpaddedOrThrow } satisfies Adapter
}