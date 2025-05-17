# ----------- Stage 1: Build the app -----------
  FROM node:20-alpine AS builder

  WORKDIR /app
  
  # 安装指定版本的 pnpm（9.7.1）
  RUN corepack enable && corepack prepare pnpm@9.7.1 --activate
  
  # 构建阶段需要传入 TIPTAP_TOKEN（支持 .npmrc 中的环境变量）
  ARG TIPTAP_TOKEN
  ENV TIPTAP_TOKEN=${TIPTAP_TOKEN}
  
  # 拷贝依赖配置和 .npmrc
  COPY moon/package.json ./
  COPY moon/pnpm-lock.yaml ./
  COPY moon/.npmrc ./
  
  # 安装依赖
  RUN pnpm install --frozen-lockfile
  
  # 拷贝项目源码
  COPY moon ./
  
  # 构建 Next.js 应用（SSR 模式）
  RUN pnpm build
  
  # ----------- Stage 2: Run the app with only needed files -----------
  FROM node:20-alpine AS runner
  
  WORKDIR /app
  
  ENV NODE_ENV=production
  ENV PORT=3000
  
  # 安装 pnpm（保持一致版本）
  RUN corepack enable && corepack prepare pnpm@9.7.1 --activate
  
  # 拷贝构建产物和依赖
  COPY --from=builder /app/public ./public
  COPY --from=builder /app/.next ./.next
  COPY --from=builder /app/node_modules ./node_modules
  COPY --from=builder /app/package.json ./package.json
  COPY --from=builder /app/next.config.js ./next.config.js
  
  # 启动 SSR 服务
  CMD ["pnpm", "dev"]
  