# ResumeLM Frontend Dockerfile
# Multi-stage build for the Next.js frontend application

# ==========================================
# Build base - includes build tools for native modules
# ==========================================
FROM node:22-slim AS build-base

# Install build dependencies for node-gyp and canvas
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    libcairo2-dev \
    libpango1.0-dev \
    libgif-dev \
    libjpeg-dev \
    librsvg2-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Pin pnpm version for reproducibility
ARG PNPM_VERSION=9.15.1
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

# ==========================================
# Dependencies stage
# ==========================================
FROM build-base AS deps

# Copy workspace configuration
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY frontend/package.json ./frontend/
COPY shared/package.json ./shared/

# Install all dependencies (including devDependencies for build)
RUN pnpm install --frozen-lockfile

# ==========================================
# Development stage
# ==========================================
FROM build-base AS development

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/frontend/node_modules ./frontend/node_modules

# Copy workspace and package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY frontend/package.json ./frontend/

# Copy config files (changes less frequently = better caching)
COPY frontend/next.config.ts frontend/tsconfig.json frontend/tailwind.config.ts frontend/postcss.config.mjs ./frontend/
COPY frontend/components.json frontend/eslint.config.mjs ./frontend/

# Copy source and assets
COPY frontend/src ./frontend/src
COPY frontend/public ./frontend/public
COPY frontend/content ./frontend/content

WORKDIR /app/frontend

EXPOSE 3000

ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

CMD ["pnpm", "dev"]

# ==========================================
# Builder stage
# ==========================================
FROM build-base AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/frontend/node_modules ./frontend/node_modules

# Copy workspace and package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY frontend/package.json ./frontend/

# Copy config files (changes less frequently = better caching)
COPY frontend/next.config.ts frontend/tsconfig.json frontend/tailwind.config.ts frontend/postcss.config.mjs ./frontend/
COPY frontend/components.json frontend/eslint.config.mjs ./frontend/

# Copy source and assets
COPY frontend/src ./frontend/src
COPY frontend/public ./frontend/public
COPY frontend/content ./frontend/content

WORKDIR /app/frontend

# Build with placeholder values - replaced at runtime by entrypoint.sh
# Base path uses placeholder in next.config.ts: /__NEXT_BASEPATH_PLACEHOLDER__
ENV NEXT_PUBLIC_SUPABASE_URL="__NEXT_PUBLIC_SUPABASE_URL__" \
    NEXT_PUBLIC_SUPABASE_ANON_KEY="__NEXT_PUBLIC_SUPABASE_ANON_KEY__" \
    NEXT_PUBLIC_SITE_URL="__NEXT_PUBLIC_SITE_URL__" \
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="__NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY__" \
    NEXT_PUBLIC_STRIPE_PRO_PRICE_ID="__NEXT_PUBLIC_STRIPE_PRO_PRICE_ID__" \
    NEXT_PUBLIC_BASE_PATH="/__NEXT_BASEPATH_PLACEHOLDER__" \
    NEXT_TELEMETRY_DISABLED=1

# Stripe key for build-time page pre-rendering (use placeholder)
ENV STRIPE_SECRET_KEY="sk_placeholder_for_build"

# Build the application
RUN pnpm build

# ==========================================
# Production stage - minimal runtime image
# ==========================================
FROM node:22-slim AS production

# OCI labels for container metadata
LABEL org.opencontainers.image.title="ResumeLM Frontend" \
      org.opencontainers.image.description="AI-powered resume builder - Next.js frontend" \
      org.opencontainers.image.vendor="ResumeLM" \
      org.opencontainers.image.source="https://github.com/resumelm/resumelm"

# Install ONLY runtime libraries for canvas (not -dev packages)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libcairo2 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libgif7 \
    libjpeg62-turbo \
    librsvg2-2 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME="0.0.0.0"

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs \
    && chown nextjs:nodejs /app

# Copy entrypoint script
COPY --chmod=755 docker/entrypoint.sh /entrypoint.sh

# Copy built application from builder
COPY --from=builder --chown=nextjs:nodejs /app/frontend/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# Health check for container orchestration
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD node -e "require('net').createConnection(3000, 'localhost').on('connect', () => process.exit(0)).on('error', () => process.exit(1))"

ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "server.js"]
