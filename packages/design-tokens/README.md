# Design Tokens

Exports design tokens for spacing, color, and other shared values.

```js
import { tokens } from '@design-system/design-tokens';
```

## Style Dictionary

This package uses Style Dictionary to generate a flat JSON token export.

Change the company token prefix in `build-tokens.cjs` once, and all generated token names will be rebuilt with that prefix.
