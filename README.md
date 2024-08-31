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

### Buffer (NodeJS)

```typescript
import { Base64 } from "@hazae41/base64"

Base64.set(Base64.fromBuffer())
```

### WebAssembly

```bash
npm i @hazae41/base64.wasm
```

```typescript
import { Base64 } from "@hazae41/base64"
import { Base64Wasm } from "@hazae41/base64.wasm"

Base64.set(await Base64.fromBufferOrWasm(Base64Wasm))
```

### Scure (JavaScript)

```bash
npm i @scure/base
```

```typescript
import { Base64 } from "@hazae41/base64"
import * as Scure from "@scure/base"

Base64.set(Base64.fromBufferOrScure(Scure))
```

## Usage

### Direct

```tsx
const encoded: string = Base64.get().getOrThrow().encodePaddedOrThrow(new Uint8Array([1,2,3,4,5]))
using decoded: Memory = Base64.get().getOrThrow().decodePaddedOrThrow(encoded)
const decoded2: Uint8Array = decoded.bytes.slice()
```