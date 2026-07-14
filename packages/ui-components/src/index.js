import { tokens } from '@design-system/design-tokens';

export function Button({ label = 'Button' }) {
  return `<button style="padding: ${tokens.spacing.md}; background: ${tokens.color.primary}; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">${label}</button>`;
}
