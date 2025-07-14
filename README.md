# Base64

Base64 adapter for JS implementations

```bash
npm i @hazae41/base64
```

[**Node Package 📦**](https://www.npmjs.com/package/@hazae41/base64)

## Features

### Current features
- 100% TypeScript and ESM
- No external dependencies
- Automatic implementation

## Usage

```tsx
const encoded: string = Base64.encodePaddedOrThrow(new Uint8Array([1,2,3,4,5]))
```

```tsx
const decoded: Uint8Array = Base64.decodePaddedOrThrow(encoded)
```