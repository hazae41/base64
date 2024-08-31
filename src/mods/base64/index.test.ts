import "@hazae41/symbol-dispose-polyfill"

import { assert, test } from "@hazae41/phobos"
import { fromScure } from "./scure.js"
import { fromWasm } from "./wasm.js"

import { Base64Wasm } from "@hazae41/base64.wasm"
import * as Scure from "@scure/base"

test("encode and decode", async ({ message }) => {
  const scure = fromScure(Scure)
  const encodeda = scure.encodeUnpaddedOrThrow(new Uint8Array([1, 2, 3, 4, 5, 6, 7]))
  using decodeda = scure.decodeUnpaddedOrThrow(encodeda)

  console.log(encodeda, decodeda.bytes)

  await Base64Wasm.initBundled()

  const wasm = fromWasm(Base64Wasm)
  const encodedb = wasm.encodeUnpaddedOrThrow(new Uint8Array([1, 2, 3, 4, 5, 6, 7]))
  using decodedb = wasm.decodeUnpaddedOrThrow(encodedb)

  console.log(encodedb, decodedb.bytes)

  assert(encodeda === encodedb)
  assert(Buffer.from(decodeda.bytes).equals(Buffer.from(decodedb.bytes)))
})