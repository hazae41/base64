# Base64

Base64 adapter for WebAssembly and JS implementations

```bash
npm i @hazae41/base64
```

[**Node Package 📦**](https://www.npmjs.com/package/@hazae41/base64)

## Features

### Current features
- 100% TypeScript and ESM
- No external dependencies

## Getting started

### Alocer (WebAssembly)

```typescript
import { Base64 } from "@hazae41/base64"
import { Alocer } from "@hazae41/alocer"

await Alocer.initBundledOnce()
const base64 = Base64.fromAlocer(Alocer)

/**
 * Set it globally (optional)
 **/
Base64.set(base64)
```

### Scure (JavaScript)

```typescript
import { Base64 } from "@hazae41/base64"
import * as scure from "@scure/base"

const base64 = Base64.fromScure(scure.base64)

/**
 * Set it globally (optional)
 **/
Base64.set(base64)
```

## Usage

### Direct

```tsx
const encoded: string = base64.tryEncode(new Uint8Array([1,2,3,4,5])).unwrap()
const decoded: Uint8Array = base64.tryDecode(encoded).unwrap().copy()
```