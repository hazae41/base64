import "@hazae41/symbol-dispose-polyfill"

import { assert, test } from "@hazae41/phobos"
import { fromScure } from "./scure.js"
import { fromWasm } from "./wasm.js"

import { Base64Wasm } from "@hazae41/base64.wasm"
import * as Scure from "@scure/base"

test("encode and decode", async ({ message }) => {
  const scure = fromScure(Scure)
  const encodeda = scure.base64.encodeUnpaddedOrThrow(new Uint8Array([1, 2, 3, 4, 5, 6, 7]))
  using decodeda = scure.base64.decodeUnpaddedOrThrow(encodeda)

  console.log(encodeda, decodeda.bytes)

  await Base64Wasm.initBundled()

  const wasm = fromWasm(Base64Wasm)
  const encodedb = wasm.base64.encodeUnpaddedOrThrow(new Uint8Array([1, 2, 3, 4, 5, 6, 7]))
  using decodedb = wasm.base64.decodeUnpaddedOrThrow(encodedb)

  console.log(encodedb, decodedb.bytes)

  assert(encodeda === encodedb)
  assert(Buffer.from(decodeda.bytes).equals(Buffer.from(decodedb.bytes)))
})

test("encode and decode", async ({ message }) => {
  const scure = fromScure(Scure)

  const encodeda = scure.base64url.encodePaddedOrThrow(new Uint8Array([1, 2, 3, 4, 5, 6, 7]))
  using decodeda = scure.base64url.decodePaddedOrThrow(encodeda)

  console.log(encodeda, decodeda.bytes)

  await Base64Wasm.initBundled()

  const wasm = fromWasm(Base64Wasm)

  const encodedb = wasm.base64url.encodePaddedOrThrow(new Uint8Array([1, 2, 3, 4, 5, 6, 7]))
  using decodedb = wasm.base64url.decodePaddedOrThrow(encodedb)

  console.log(encodedb, decodedb.bytes)

  assert(encodeda === encodedb)
  assert(Buffer.from(decodeda.bytes).equals(Buffer.from(decodedb.bytes)))
})