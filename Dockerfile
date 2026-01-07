# https://hono.dev/docs/getting-started/nodejs#dockerfile
# https://pnpm.io/docker#example-1-build-a-bundle-in-a-docker-container

FROM node:24-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS dist
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile && \
    pnpm build

FROM base AS runner
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=dist /app/dist /app/dist
EXPOSE 1188
ENTRYPOINT ["node", "/app/dist/cli.js"]
CMD ["serve"]
