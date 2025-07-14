import { Memory } from "@hazae41/memory"
import { Nullable, Option, Some } from "@hazae41/option"
import { BytesOrMemory } from "libs/memory/index.js"
import { fromNativeOrBuffer } from "./buffer.js"

let global: Option<Adapter> = new Some(fromNativeOrBuffer())

export function get() {
  return global
}

export function set(value: Nullable<Adapter>) {
  global = Option.wrap(value)
}

export interface Adapter {
  readonly base64: Coder
  readonly base64url: Coder
}

export interface Coder {
  encodePaddedOrThrow(bytes: BytesOrMemory): string
  decodePaddedOrThrow(text: string): Memory

  encodeUnpaddedOrThrow(bytes: BytesOrMemory): string
  decodeUnpaddedOrThrow(text: string): Memory
}