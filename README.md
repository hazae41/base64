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

### Alocer (WebAssembly)

```bash
npm i @hazae41/alocer
```

```typescript
import { Base64 } from "@hazae41/base64"

Base64.set(await Base64.fromBufferOrAlocer())
```

### Scure (JavaScript)

```bash
npm i @scure/base
```

```typescript
import { Base64 } from "@hazae41/base64"

Base64.set(Base64.fromBufferOrScure())
```

## Usage

### Direct

```tsx
const encoded: string = Base64.get().tryEncode(new Uint8Array([1,2,3,4,5])).unwrap()
const decoded: Uint8Array = Base64.get().tryDecode(encoded).unwrap().copyAndDispose()
```