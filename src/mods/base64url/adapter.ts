import { fromNativeOrBuffer } from "./buffer.js"

const adapter: Adapter = fromNativeOrBuffer()

export interface Adapter {
  encodePaddedOrThrow(bytes: Uint8Array): string

  decodePaddedOrThrow(text: string): Uint8Array

  encodeUnpaddedOrThrow(bytes: Uint8Array): string

  decodeUnpaddedOrThrow(text: string): Uint8Array
}

export function encodePaddedOrThrow(bytes: Uint8Array): string {
  return adapter.encodePaddedOrThrow(bytes)
}

export function decodePaddedOrThrow(text: string): Uint8Array {
  return adapter.decodePaddedOrThrow(text)
}

export function encodeUnpaddedOrThrow(bytes: Uint8Array): string {
  return adapter.encodeUnpaddedOrThrow(bytes)
}

export function decodeUnpaddedOrThrow(text: string): Uint8Array {
  return adapter.decodeUnpaddedOrThrow(text)
}