# design-system-starter

A starter pnpm monorepo for design tokens, icons, illustrations, and UI components.

## Packages

- `packages/design-tokens`
- `packages/icons`
- `packages/illustrations`
- `packages/ui-components`

## Setup

```bash
pnpm install
```

## Workspace commands

```bash
pnpm bootstrap
pnpm build
pnpm -r run build
```

## Package usage

Each package is published as a separate workspace package. Import them using their package names, for example:

```js
import { tokens } from '@design-system/design-tokens';
import { icons } from '@design-system/icons';
import { illustrations } from '@design-system/illustrations';
import { Button } from '@design-system/ui-components';
```
