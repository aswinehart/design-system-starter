# Build stage
FROM node:22-slim AS builder

WORKDIR /app

# Copy workspace metadata before source for better layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages ./packages

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile

# Build the Storybook static site for the ui-components package
RUN pnpm --dir packages/ui-components build:storybook

# Runtime stage
FROM nginx:stable-alpine AS runner

COPY --from=builder /app/packages/ui-components/storybook-static /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
